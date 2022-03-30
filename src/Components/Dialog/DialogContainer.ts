import {DialogProps} from "./DialogProps";
import {Dialog} from "./Dialog";
import { Signal } from "@lab1/core";

let sleep = (ms:any) => new Promise(r => setTimeout(r, ms));
let waitFor = async function waitFor(f:any){
    while(!f()) await sleep(1000);
    return f();
};

export class DialogContainer<T> {

    readonly onClose = new Signal<(result:any) => void>();
    dlg?:Dialog;
    private dlgResult?:any
    private closed=false;
    closePromise = new Promise((resolve, reject) => {

    })

    constructor(TCreator: new(dialog: Dialog, parameters?:any) => T, props: DialogProps={}, parameters:any) {
        /*this.dlg=new Dialog(props,this)
        console.log('vai criar simpleDialog');
        let mySimpleDialog=<DialogProps>new TCreator(this.dlg,parameters);
        props.content=mySimpleDialog.content;
        props.title=mySimpleDialog.title;
        console.log('(Dialog)content from MySimpleDialog:',mySimpleDialog.content)
        this.dlg.render(mySimpleDialog);*/
    }

    close(result:any){
        this.dlgResult=result;
        this.onClose.emit(result);
        this.dlg?.delete();
        this.closed=true;
    }

    async result():Promise<any>{
        await waitFor(()=>this.closed);
        return this.dlgResult;
    }
}
