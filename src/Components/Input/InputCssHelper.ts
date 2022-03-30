import {StringHelper} from "@lab1/core";
import {BaseInput} from "../../Base/BaseInput/BaseInput";
import {Adornment} from "../../Enums/Adornment";
import {Margin} from "../../Enums/Margin";
import {Variant} from "../../Enums/Variant";
import {InputType} from "../../Enums/InputType";

export class InputCssHelper{

    static getClassName(baseInput:BaseInput<any>, shrink:boolean):string{
        let className='mud-input';
        className+=` mud-input-${baseInput.variant}`;
        if(baseInput.adornment.value!=Adornment.None) className+=` mud-input-adorned-${baseInput.adornment}`;
        if(baseInput.marginType.value!=Margin.None)className+=` mud-input-margin-${baseInput.marginType}`;
        if(!baseInput.disableUnderline.value &&baseInput.variant.value!=Variant.Outlined)className+=' mud-input-underline';
        if(shrink)className+=' mud-shrink';
        if(baseInput.disabled.value)className+=' mud-disabled';
        if(baseInput.hasErrors)className+=' mud-input-error';
        if(baseInput.getInputType()==InputType.Email || baseInput.getInputType()==InputType.Telephone)className+=' mud-ltr';
        if(baseInput.className.value)className+=` ${baseInput.className.value}`;
        return className;
    }

    static getInputClassName(baseInput:BaseInput<any>):string{
        let className='mud-input-slot';
        className+=' mud-input-root';
        className+=` mud-input-root-${baseInput.variant.value}`;
        if(baseInput.adornment.value!=Adornment.None) className+=` mud-input-root-adorned-${baseInput.adornment}`;
        if(baseInput.marginType.value!=Margin.None) className+=` mud-input-root-margin-${baseInput.marginType}`;
        if(baseInput.className.value)className+=` ${baseInput.className.value}`;
        return className;
    }

    static getAdornmentClassname(baseInput:BaseInput<any>){
        let className='mud-input-adornment';
        if(baseInput.adornment.value!=Adornment.None)className+=` mud-input-adornment-${baseInput.adornment}`;
        if(StringHelper.isNullOrEmpty(baseInput.adornmentText.value))className+=' mud-text';
        if(baseInput.className.value)className+=` ${baseInput.className.value}`;
        return className;
    }
}
