import {Component} from "@lab1/core";
import {FileUploaderProps} from "./FileUploaderProps";

function defaultProps(): Partial<FileUploaderProps> {
    return{
        element: document.createElement('mat-file-input') as HTMLButtonElement
    }
}
export class FileUploader extends  Component implements FileUploaderProps{

    constructor(props:FileUploaderProps) {
        super({...defaultProps(), ...props});
    }
}
