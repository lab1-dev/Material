import {Property, ComponentProps} from "@lab1/core";

export interface BaseSelectItemProps extends ComponentProps{
    /**If true, the input element will be disabled.*/
    disabled?: Property<boolean> | boolean
    /**If true, disables ripple effect.*/
    disabledRipple?: Property<boolean> | boolean
    /**Link to a URL when clicked.*/
    href?: Property<string | undefined> | Property<string> | string
    /**If true, force browser to redirect outside component router-space.*/
    forceLoad?: Property<boolean> | boolean
}
