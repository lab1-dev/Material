import {TypeBoolean, TypeString} from "@lab1/core";
import {MaterialComponentProps, Overlay} from "../../MaterialExports";

export interface OverlayProps extends MaterialComponentProps {
    ref?: Overlay
    /**If true overlay will set Visible false on click.*/
    autoClose?: TypeBoolean
    /**If true (default), the Document.body element will not be able to scroll*/
    lockScroll?: TypeBoolean
    /**The css class that will be added to body if lockscroll is used.*/
    lockScrollClass?: TypeString
    /**If true applys the themes dark overlay color.*/
    darkBackground?: TypeBoolean
    /**If true applys the themes light overlay color.*/
    lightBackground?: TypeBoolean
    /**Icon class names, separated by space*/
    absolute?: TypeBoolean
}
