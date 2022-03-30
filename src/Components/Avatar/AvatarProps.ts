import {TypeBoolean, TypeNumber, TypeStringOrUndefined} from "@lab1/core";
import {TypeColor, TypeSize, TypeVariant} from "../../Codes/Types";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";
import {Avatar} from "./Avatar";

export interface AvatarProps extends MaterialComponentProps {
    ref?:Avatar
    /**The higher the number, the heavier the drop-shadow.*/
    elevation?: TypeNumber
    /**If true, border-radius is set to 0.*/
    square?: TypeBoolean
    /**If true, border-radius is set to the themes default value.*/
    rounded?: TypeBoolean
    /**Link to image, if set a image will be displayed instead of text.*/
    image?: TypeStringOrUndefined
    /**If set (and Image is also set), will add an alt property to the img element*/
    alt?: TypeStringOrUndefined
    /**The color of the component. It supports the theme colors.*/
    color?: TypeColor
    /**The Size of the MudAvatar.*/
    size?: TypeSize
    /**The variant to use.*/
    variant?: TypeVariant
    text?: TypeStringOrUndefined
}
