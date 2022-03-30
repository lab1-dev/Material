import {Component, StyleHelper} from "@lab1/core";
import {MaterialComponentProps} from "../../MaterialExports";

export class MaterialComponent extends Component implements MaterialComponentProps{

    protected setClassAndStyle(className: string, writeUserAttributes: boolean = true, style: string | undefined = undefined): void {
        if (this.className.value && this.className.value.length > 0) className += ' ' + this.className.value;
        if (className?.length > 0) this.element!.className = className;
        if(style==undefined) StyleHelper.setStyle(this.element!,this.style.value,false);
        else StyleHelper.setStyle(this.element!,style+' '+ this.style.value,false);
        this.setStyleAndClassProperties();
        // if (this.style.value && this.style.value.length > 0) style += ' ' + this.style.value;
        // if (style != undefined && style.length>1) {
        //     console.log('setClassAndStyle. Style:',style, '.StyleValue:',this.style.value);
        //     this.element!.style.cssText = style;
        //     this.updateLayout();//whenever assigning a complete new value to style, we need to call updateLayout, since layout also sets a few properties in it.
        // }else this.element?.removeAttribute('style');
        if (writeUserAttributes) {
            if (this.userAttributes != undefined) Object.assign(this.element!.attributes, this.userAttributes);
        }
    }

}
