
export class StyleBuilder{

    private stringBuffer='';

    public addStyle(prop:string, value:string):StyleBuilder{
        this.addRaw(`${prop}:${value};`);
        return this;
    }

    public addStyleWhen(prop:string, value:string, when:boolean):StyleBuilder{
        if(when) this.addRaw(`${prop}:${value};`);
        return this;
    }

    public addStyleString(style:string|undefined):StyleBuilder{
        if(style && style.length>0)this.addRaw(`${style};`);
        return this;
    }

    private addRaw(style:string):StyleBuilder{
        this.stringBuffer+=style;
        return this;
    }

    public build():string{
        return this.stringBuffer.trim();
    }
}
