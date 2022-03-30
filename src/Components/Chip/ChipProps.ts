
import { Signal, TypeAny, TypeBoolean, TypeBooleanOrUndefined, TypeSignal_MouseEvent, TypeString, TypeStringOrUndefined} from "@lab1/core";
import {TypeColor, TypeSize, TypeVariant} from "../../Codes/Types";
import {Chip, MaterialComponentProps} from "../../MaterialExports";

export interface ChipProps extends MaterialComponentProps{
    ref?:Chip
    /**The color of the component.*/
    color?:TypeColor
    /**The size of the button. small is equivalent to the dense button styling.*/
    size?:TypeSize
    /**The variant to use.*/
    variant?:TypeVariant
    /**The selected color to use when selected, only works togheter with ChipSet, Color.Inherit for default value.*/
    selectedColor?:TypeColor
    /**Avatar Icon, Overrides the regular Icon if set.*/
    avatar?:TypeStringOrUndefined
    /**Avatar CSS Class, appends to Chips default avatar classes.*/
    avatarClass?:TypeStringOrUndefined
    /**Removes circle edges and applies theme default.*/
    label?:TypeBoolean
    /**If true, the chip will be displayed in disabled state and no events possible.*/
    disabled?:TypeBoolean
    /**Sets the Icon to use.*/
    icon?:TypeStringOrUndefined
    /**Custom checked icon.*/
    checkedIcon?:TypeString
    /**The color of the icon.*/
    iconColor?:TypeColor
    /**Overrides the default close icon, only shown if OnClose is set.*/
    closeIcon?:TypeStringOrUndefined
    /**If true, disables ripple effect, ripple effect is only applied to clickable chips.*/
    disableRipple?:TypeBoolean
    /**If set to a URL, clicking the button will open the referenced document. Use Target to specify where*/
    link?:TypeStringOrUndefined
    /**The target attribute specifies where to open the link, if Link is specified. Possible values: _blank | _self | _parent | _top | <i>framename</i>*/
    target?:TypeStringOrUndefined
    /**A string you want to associate with the chip. If the ChildContent is not set this will be shown as chip text.*/
    text?:TypeStringOrUndefined
    /**
     * A value that should be managed in the SelectedValues collection.
     * Note: do not change the value during the chip's lifetime
     */
    value?:TypeAny
    /**If true, force browser to redirect outside component router-space.*/
    forceLoad?:TypeBoolean
    /**If true, this chip is selected by default if used in a ChipSet.*/
    default?:TypeBooleanOrUndefined

    //Signals
    onClick?:TypeSignal_MouseEvent
    onClose?:(Signal<(chip: Chip) => void>) | ((chip:Chip) => void)
}
