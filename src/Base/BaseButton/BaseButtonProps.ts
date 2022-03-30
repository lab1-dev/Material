import {ButtonType} from "../../Enums/ButtonType";
import {ComponentProps, TypeBoolean, TypeSignal_MouseEvent, TypeStringOrUndefined} from "@lab1/core";

export interface BaseButtonProps extends ComponentProps {
    /**If true, disables ripple effect.*/
    disableRipple?: TypeBoolean
    /**If true, no drop-shadow will be used.*/
    disableElevation?: TypeBoolean
    /**If true, the button will be disabled.*/
    disabled?: TypeBoolean
    /**If set to a URL, clicking the button will open the referenced document. Use Target to specify where*/
    link?: string
    /**The target attribute specifies where to open the link, if Link is specified. Possible values: _blank | _self | _parent | _top | <i>framename</i>*/
    target?: string
    /**The button Type (Button, Submit, Refresh)*/
    buttonType?: ButtonType
    ariaLabel?:TypeStringOrUndefined

    //Signals
    onClick?: TypeSignal_MouseEvent
}
