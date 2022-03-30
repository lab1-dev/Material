import {  TypeBoolean, TypeNumber, TypeNumberOrUndefined, TypeString, TypeStringOrUndefined, TypeTOrUndefined} from "@lab1/core";
import {TypeColor, TypePosition, TypeTabHeaderPosition} from "../../Codes/Types";
import {TabPanel} from "./TabPanel";
import {Tabs} from "./Tabs";
import {MaterialComponentProps} from "../MaterialItem/MaterialComponentProps";

export interface TabsProps extends MaterialComponentProps{
    rightToLeft?:TypeBoolean
    /**If true, render all tabs and hide (display:none) every non-active.*/
    keepPanelsAlive?:TypeBoolean
    /**If true, sets the border-radius to theme default.*/
    rounded?:TypeBoolean
    /**If true, sets a border between the content and the toolbar depending on the position.*/
    border?:TypeBoolean
    /**If true, toolbar will be outlined.*/
    outlined?:TypeBoolean
    /**If true, centers the tabitems.*/
    centered?:TypeBoolean
    /**Hides the active tab slider.*/
    hideSlider?:TypeBoolean
    /**Icon to use for left pagination.*/
    prevIcon?:TypeString
    /**Icon to use for right pagination.*/
    nextIcon?:TypeString
    /**If true, always display the scroll buttons even if the tabs are smaller than the required with, buttons will be disabled if there is nothing to scroll.*/
    alwaysShowScrollButtons?:TypeBoolean
    /**Sets the position of the tabs itself.*/
    position?:TypePosition
    /**The color of the component. It supports the theme colors.*/
    color?:TypeColor
    /**The color of the tab slider. It supports the theme colors.*/
    sliderColor?:TypeColor
    /**The color of the icon. It supports the theme colors.*/
    iconColor?:TypeColor
    /**The color of the next/prev icons. It supports the theme colors.*/
    scrollIconColor?:TypeColor
    /**The higher the number, the heavier the drop-shadow, applies around the whole component.*/
    elevation?:TypeNumber
    /**If true, will apply elevation, rounded, outlined effects to the whole tab component instead of just toolbar.*/
    applyEffectsToContainer?:TypeBoolean
    /**If true, disables ripple effect.*/
    disableRipple?:TypeBoolean
    /**If true, disables slider animation*/
    disableSliderAnimation?:TypeBoolean
    /**
     *  This fragment is placed between toolbar and panels.
     *  It can be used to display additional content like an address line in a browser.
     *  The active tab will be the content of this RenderFragement
     */
    prePanelContent?:TypeTOrUndefined<TabPanel>
    /**Custom class/classes for TabPanel*/
    tabPanelClass?:TypeStringOrUndefined
    /**Custom class/classes for Selected Content Panel*/
    panelClass?:TypeStringOrUndefined
    /**The current active panel index. Also with Bidirectional Binding*/
    activePanelIndex?:TypeNumber
    /**A render fragment that is added before or after (based on the value of HeaderPosition) the tabs inside the header panel of the tab control*/
    header?:TypeTOrUndefined<Tabs>
    /**Additional content specified by Header is placed either before the tabs, after or not at all*/
    headerPosition?:TypeTabHeaderPosition
    /**A render fragment that is added before or after (based on the value of HeaderPosition) inside each tab panel*/
    tabPanelHeader?:TypeTOrUndefined<TabPanel>
    /**Additional content specified by Header is placed either before the tabs, after or not at all*/
    tabPanelHeaderPosition?:TypeTabHeaderPosition
}
