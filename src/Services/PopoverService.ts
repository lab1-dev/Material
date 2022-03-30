import {Div,  Lab1, service} from "@lab1/core"
import {Dialog} from "../Components/Dialog/Dialog";
import {DialogOptions} from "../Components/Dialog/DialogOptions";
import {DialogProps} from "../Components/Dialog/DialogProps";
import {Popover} from "../Components/Popover/Popover";
import {MudPopover}  from "../TScripts/MudPopover";

declare const window: any;


@service()
export class PopoverService{

    popovers = new Map<string, Popover>();
    //popoverDiv=document.createElement('div') as HTMLDivElement;
    providerDiv:Div
    mudPopover=new MudPopover();

    constructor() {
        //console.log('(PopoverService)constructor',window.mudPopover);
        //this.popoverDiv.className='mud-popover-provider';
        this.providerDiv=new Div({className:'mud-popover-provider'});
        document.body.prepend(this.providerDiv.element!);
    }

    register(popover:Popover):string{
        let handleID=Lab1.newID();
        popover.id=`popovercontent-${handleID}`;
        this.providerDiv.setChildContent(popover);
        this.popovers.set(handleID,popover);
        return handleID;
    }

    connect(handleID:string):void{
        //Let's run MudPopover.connect
        this.mudPopover.connect(handleID);
    }



    updateFragment(handleID:string):void{

    }

    unregister(handleID:string):void{

    }

    // register<T>(TCreator: new(popover: Popover, parameters?:any) => T, parentComponent:ComponentBase, parameters?:any, options?:DialogOptions):string{
    //     //this.dlg=new Dialog({parentComponent:parentComponent},this)
    //     // let mySimpleDialog=<DialogProps>new TCreator(this.dlg,parameters);
    //     // this.dlg.renderDialog(mySimpleDialog);
    //
    //     let popoverID=Lab1.newID();
    //     return popoverID;
    // }
}
