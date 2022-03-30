import {TypeBoolean} from "@lab1/core";
import {TypeColor, TypeMaterialAlign, TypeTypo} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface TextProps extends MaterialComponentProps{
    /**Applies the theme typography styles.*/
    typo?:TypeTypo
    /**The color of the component. It supports the theme colors.*/
    color?:TypeColor
    /**If true, the text will have a bottom margin.*/
    gutterBottom?:TypeBoolean
    /**Set the text-align on the component.*/
    align?:TypeMaterialAlign
    /**If true, Sets display inline*/
    inline?:TypeBoolean
    disabled?: TypeBoolean
}
