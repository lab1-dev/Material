import {Component, CultureInfo, Property, StringHelper} from "@lab1/core";
import {Form, FormComponentProps, MaterialComponent} from "../../MaterialExports";

export abstract class FormComponent<T> extends MaterialComponent implements FormComponentProps<T>{

    //region properties
    readonly required = new Property<boolean>(this,false);
    readonly requiredError = new Property<string>(this,'Required');
    readonly error = new Property<boolean>(this,false);
    readonly errorText = new Property<string|undefined>(this,undefined);
    readonly value = new Property<T|undefined>(this,undefined);
    //endregion

    //region others
    conversionError=false//todo
    conversionErrorMessage='';//todo
    validationErros:string[]=[];
    touched=false
    form?:Form
    standalone=true;
    validation?: (value: T|undefined) => string|undefined
    //nao uso mais. Só o mud usa. Usar value direto. protected _value?:T
    get hasErrors():boolean{
        return this.error.value || this.conversionError || this.validationErros.length > 0;
    }
    //endregion

    private _culture:CultureInfo=new CultureInfo('en-us')//todo mudar
    get culture(): CultureInfo {
        return this._culture;//todo adicionar converter
    }
    protected setCulture(value:CultureInfo):void{
        //todo
    }

    protected readFormComponentProperties(props:FormComponentProps<T>):void{
    }

    protected setConverter(value:any):boolean{
        //todo
        return true;
    }

    protected onConversionError(error:string):void{
        //todo
    }

    public getErrorText():string|undefined{
        if(!StringHelper.isNullOrWhiteSpace(this.errorText.value))return this.errorText.value;
        if(!StringHelper.isNullOrWhiteSpace(this.conversionErrorMessage))return this.conversionErrorMessage;
        return undefined;
    }

    protected beginValidateAfter():void{
        //todo
    }

    protected beginValidate():void{
        //todo alterei o código para ficar mais simples
        this.validateValue();
    }

    protected validate(){
        this.touched=true;
        return this.validateValue();
    }

    protected validateValue(){
        //console.log(this.id,'(FormComponent)validateValue:', this.error.value)
        //todo aleterei para ficar mais simples
        let changed=false;
        let errors:string[]=[];
        if(this.conversionError) errors.push(this.conversionErrorMessage);
        if(this.validation!=undefined){
            let error=this.validation(this.value.value);
            if(error){
                errors.push(error);
            }
        }
        // required error (must be last, because it is least important!)
        if(this.required.value){
            if(this.touched && !this.hasValue(this.value.value))errors.push(this.requiredError.value);
        }
        // If Value has changed while we were validating it, ignore results and exit
        if(!changed){
            if(errors.length>0) console.warn(this.id,'vai mostrar erro:', errors[0]);
            this.validationErros=errors;
            this.error.value=errors.length>0;
            this.errorText.value=errors.length>0?errors[0]:undefined
            this.form?.update(this);
        }
    }

    protected hasValue(value: T|undefined):boolean{
        if(typeof value==='string')return (!StringHelper.isNullOrWhiteSpace(value));
        return value!=undefined;
    }

    protected validateWithAttribute(attr:any, value:T, errors:string[]):void{
        //todo
    }

    //varios validate with func

    public reset():void{
        this.resetValue();
        this.resetValidation();
    }

    protected resetValue():void{
        /* to be overridden */
        //todo
    }

    public resetValidation():void{

    }
}
