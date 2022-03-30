import {Palette} from "./Models/Palette";
import {Shadow} from "./Models/Shadow";
import {Typography} from "./Models/Typography";
import {LayoutProperties} from "./Models/LayoutProperties";
import {ZIndex} from "./Models/ZIndex";

export class MudTheme {
    //public Breakpoints Breakpoints { get; set; }
    public  palette:Palette
    public shadows:Shadow
    public typography:Typography
    public layoutProperties:LayoutProperties
    public zIndex:ZIndex

    constructor(){
        this.palette = new Palette();
        this.shadows = new Shadow();
        this.typography = new Typography();
        this.layoutProperties = new LayoutProperties();
        this.zIndex = new ZIndex();
    }

}
