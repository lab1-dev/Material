import {IFormComponent} from "./IFormComponent";

export interface IForm {
    isValid: boolean;
    errors: Array<string>;
    model: Object;
    add(formControl: IFormComponent | null) : void;
    remove(formControl: IFormComponent | null) : void;
    update(formControl: IFormComponent | null) : void;
}
