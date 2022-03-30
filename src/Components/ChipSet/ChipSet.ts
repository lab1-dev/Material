import { ChipSetProps } from './ChipSetProps';
import {Component, Property} from "@lab1/core";
import {Chip} from "../Chip/Chip";


export class ChipSet extends Component implements ChipSetProps{

    //region properties
    readonly readOnly = new Property<boolean>(this, false);
    readonly filter = new Property<boolean>(this, false);
    readonly allClosable = new Property<boolean>(this, false);
    //endregion

    constructor(props:ChipSetProps) {
        super({...{element: document.createElement('mat-card')}, ...props});
    }

    add(chip:Chip):void{
        //todo
    }

    handleChipClick(chip:Chip):void{
        //todo
    }

    handleChipDelete(chip:Chip):void{
        //todo
    }
}
