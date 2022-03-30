import {ElementHelper} from "@lab1/core";

export class MaterialHelper{

    static setElevation(element:HTMLElement, colorType:'light'|'dark', elevation:0|1|2|3):void{
        ElementHelper.removeClasses(element,['shadow-none','p-3','mb-5','bg-light','rounded',
                                                                                                    'shadow-sm','bg-white','bg-dark',
                                                                                                    'shadow',
                                                                                                    'shadow-lg'])
        switch (elevation){
            case 0:
                ElementHelper.appendClass(element,'shadow-none p-3 mb-5 rounded')
                break;
            case 1:
                ElementHelper.appendClass(element,'shadow-sm p-3 mb-5 rounded');
                break;
            case 2:
                ElementHelper.appendClass(element,'shadow p-3 mb-5 rounded');
                break;
            case 3:
                ElementHelper.appendClass(element,'shadow-lg p-3 mb-5 rounded');
                break;
        }
        switch(colorType){
            case "light":
                //NativeElementHelper.appendClass(element,'bg-light');
                break;
            case "dark":
                ElementHelper.appendClass(element,'bg-dark');
                break;
        }

    }
}
