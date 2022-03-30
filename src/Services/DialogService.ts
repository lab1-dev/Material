import {Component, service, Signal} from "@lab1/core"
import {Dialog,DialogOptions} from "../MaterialExports";
import {DialogProps} from "../Components/Dialog/DialogProps";

let sleep = (ms:any) => new Promise(r => setTimeout(r, ms));
let waitFor = async function waitFor(f:any){
    while(!f()) await sleep(500);
    return f();
};

@service()
export class DialogService{

    readonly onClosed = new Signal<(result:any) => void>();
    dlg?:Dialog;
    private dlgResult?:any
    private closed=false;

    constructor() {
        console.log('(DialogService)constructor');
    }

    show<T>(TCreator: new(dialog: Dialog, parameters?:any) => T, parentComponent:Component, parameters?:any, options?:DialogOptions):DialogService{
        this.dlg=new Dialog({parent:parentComponent},this)
        let mySimpleDialog=<DialogProps>new TCreator(this.dlg,parameters);
        this.dlg.renderDialog(mySimpleDialog);
        return this;
    }

    close(result:any){
        this.dlgResult=result;
        this.onClosed.emit(result);
        this.dlg?.delete();
        this.closed=true;
    }

    async result():Promise<any>{
        await waitFor(()=>this.closed);
        this.closed=false;
        return this.dlgResult;
    }
}
