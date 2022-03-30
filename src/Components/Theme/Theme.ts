import {Component, StringHelper} from "@lab1/core"
import {MudTheme} from "../../Themes/MudTheme";
import  '../../Codes/Extensions'
import {MudColor, MudColorOutputFormats} from "../../Utilities/MudColor";
import {Colors} from "../../Utilities/Colors";
import {ThemeProps} from "./ThemeProps";

function defaultProps(): Partial<ThemeProps> {
 return {
    defaultScrollbar:true
 }
}
export class Theme implements ThemeProps{

    theme=new MudTheme();
    palette= "mud-palette";
    elevation="mud-elevation";
    typography='mud-typography';
    defaultScrollbar=true;
    layoutProperties='mud';
    zIndex= "mud-zindex"
    element=document.createElement('style') as HTMLStyleElement;


    constructor(userProps:ThemeProps) {
        let props:ThemeProps={...defaultProps(), ...userProps};
        if(!props.defaultScrollbar)this.buildMudBlazorScrollbar();

        //console.log('(Theme)constructor');
        let theme:string='';
        theme=theme.append(":root");
        theme=theme.appendLine("{");
        theme=this.generateTheme(theme);
        theme=theme.appendLine("}");
        this.element.innerHTML=theme;
        document.head.appendChild(this.element);
    }

    public buildMudBlazorScrollbar() : void{
        let scrollbar = '';
        scrollbar=scrollbar.appendLine(`<style>`);
        scrollbar=scrollbar.appendLine(`::-webkit-scrollbar {width: 8px;height: 8px;z-index: 1;}`);
        scrollbar=scrollbar.appendLine(`::-webkit-scrollbar-track {background: transparent;}`);
        scrollbar=scrollbar.appendLine(`::-webkit-scrollbar-thumb {background: #c4c4c4;border-radius: 1px;}`);
        scrollbar=scrollbar.appendLine(`::-webkit-scrollbar-thumb:hover {background: #a6a6a6;}`);
        //Firefox
        scrollbar=scrollbar.appendLine(`html, body * {scrollbar-color: #c4c4c4 transparent;scrollbar-width: thin;}`);
        scrollbar=scrollbar.appendLine(`</style>`);
        let element = document.createElement('style') as HTMLStyleElement;//FIXME ver se adiciona no header mesmo
        element.innerHTML=scrollbar;//innerText: replaces \n with <br>
        document.head.appendChild(element);
    }

    private generateTheme(theme:string):string{
        //Palette
        theme=theme.appendLine(`--${this.palette}-black: ${this.theme.palette.Black};`);
        theme=theme.appendLine(`--${this.palette}-white: ${this.theme.palette.White};`);

        theme=theme.appendLine(`--${this.palette}-primary: ${this.theme.palette.Primary};`);
        theme=theme.appendLine(`--${this.palette}-primary-rgb: ${this.theme.palette.Primary.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-primary-text: ${this.theme.palette.PrimaryContrastText};`);
        theme=theme.appendLine(`--${this.palette}-primary-darken: ${this.theme.palette.PrimaryDarken};`);
        theme=theme.appendLine(`--${this.palette}-primary-lighten: ${this.theme.palette.PrimaryLighten};`);
        theme=theme.appendLine(`--${this.palette}-primary-hover: ${ this.theme.palette.Primary.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-secondary: ${this.theme.palette.Secondary};`);
        theme=theme.appendLine(`--${this.palette}-secondary-rgb: ${this.theme.palette.Secondary.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-secondary-text: ${this.theme.palette.SecondaryContrastText};`);
        theme=theme.appendLine(`--${this.palette}-secondary-darken: ${this.theme.palette.SecondaryDarken};`);
        theme=theme.appendLine(`--${this.palette}-secondary-lighten: ${this.theme.palette.SecondaryLighten};`);
        theme=theme.appendLine(`--${this.palette}-secondary-hover: ${ this.theme.palette.Secondary.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-tertiary: ${this.theme.palette.Tertiary};`);
        theme=theme.appendLine(`--${this.palette}-tertiary-rgb: ${this.theme.palette.Tertiary.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-tertiary-text: ${this.theme.palette.TertiaryContrastText};`);
        theme=theme.appendLine(`--${this.palette}-tertiary-darken: ${this.theme.palette.TertiaryDarken};`);
        theme=theme.appendLine(`--${this.palette}-tertiary-lighten: ${this.theme.palette.TertiaryLighten};`);
        theme=theme.appendLine(`--${this.palette}-tertiary-hover: ${ this.theme.palette.Tertiary.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-info: ${this.theme.palette.Info};`);
        theme=theme.appendLine(`--${this.palette}-info-rgb: ${this.theme.palette.Info.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-info-text: ${this.theme.palette.InfoContrastText};`);
        theme=theme.appendLine(`--${this.palette}-info-darken: ${this.theme.palette.InfoDarken};`);
        theme=theme.appendLine(`--${this.palette}-info-lighten: ${this.theme.palette.InfoLighten};`);
        theme=theme.appendLine(`--${this.palette}-info-hover: ${ this.theme.palette.Info.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-success: ${this.theme.palette.Success};`);
        theme=theme.appendLine(`--${this.palette}-success-rgb: ${this.theme.palette.Success.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-success-text: ${this.theme.palette.SuccessContrastText};`);
        theme=theme.appendLine(`--${this.palette}-success-darken: ${this.theme.palette.SuccessDarken};`);
        theme=theme.appendLine(`--${this.palette}-success-lighten: ${this.theme.palette.SuccessLighten};`);
        theme=theme.appendLine(`--${this.palette}-success-hover: ${ this.theme.palette.Success.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-warning: ${this.theme.palette.Warning};`);
        theme=theme.appendLine(`--${this.palette}-warning-rgb: ${this.theme.palette.Warning.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-warning-text: ${this.theme.palette.WarningContrastText};`);
        theme=theme.appendLine(`--${this.palette}-warning-darken: ${this.theme.palette.WarningDarken};`);
        theme=theme.appendLine(`--${this.palette}-warning-lighten: ${this.theme.palette.WarningLighten};`);
        theme=theme.appendLine(`--${this.palette}-warning-hover: ${ this.theme.palette.Warning.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-error: ${this.theme.palette.Error};`);
        theme=theme.appendLine(`--${this.palette}-error-rgb: ${this.theme.palette.Error.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-error-text: ${this.theme.palette.ErrorContrastText};`);
        theme=theme.appendLine(`--${this.palette}-error-darken: ${this.theme.palette.ErrorDarken};`);
        theme=theme.appendLine(`--${this.palette}-error-lighten: ${this.theme.palette.ErrorLighten};`);
        theme=theme.appendLine(`--${this.palette}-error-hover: ${ this.theme.palette.Error.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-dark: ${this.theme.palette.Dark};`);
        theme=theme.appendLine(`--${this.palette}-dark-rgb: ${this.theme.palette.Dark.toString(MudColorOutputFormats.ColorElements)};`);
        theme=theme.appendLine(`--${this.palette}-dark-text: ${this.theme.palette.DarkContrastText};`);
        theme=theme.appendLine(`--${this.palette}-dark-darken: ${this.theme.palette.DarkDarken};`);
        theme=theme.appendLine(`--${this.palette}-dark-lighten: ${this.theme.palette.DarkLighten};`);
        theme=theme.appendLine(`--${this.palette}-dark-hover: ${ this.theme.palette.Dark.setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);

        theme=theme.appendLine(`--${this.palette}-text-primary: ${this.theme.palette.TextPrimary};`);
        theme=theme.appendLine(`--${this.palette}-text-secondary: ${this.theme.palette.TextSecondary};`);
        theme=theme.appendLine(`--${this.palette}-text-disabled: ${this.theme.palette.TextDisabled};`);

        theme=theme.appendLine(`--${this.palette}-action-default: ${this.theme.palette.ActionDefault};`);
        theme=theme.appendLine(`--${this.palette}-action-default-hover: ${ new MudColor(Colors.Shades.Black).setAlpha(this.theme.palette.HoverOpacity).toString(MudColorOutputFormats.RGBA)};`);
        theme=theme.appendLine(`--${this.palette}-action-disabled: ${this.theme.palette.ActionDisabled};`);
        theme=theme.appendLine(`--${this.palette}-action-disabled-background: ${this.theme.palette.ActionDisabledBackground};`);

        theme=theme.appendLine(`--${this.palette}-surface: ${this.theme.palette.Surface};`);
        theme=theme.appendLine(`--${this.palette}-background: ${this.theme.palette.Background};`);
        theme=theme.appendLine(`--${this.palette}-background-grey: ${this.theme.palette.BackgroundGrey};`);
        theme=theme.appendLine(`--${this.palette}-drawer-background: ${this.theme.palette.DrawerBackground};`);
        theme=theme.appendLine(`--${this.palette}-drawer-text: ${this.theme.palette.DrawerText};`);
        theme=theme.appendLine(`--${this.palette}-drawer-icon: ${this.theme.palette.DrawerIcon};`);
        theme=theme.appendLine(`--${this.palette}-appbar-background: ${this.theme.palette.AppbarBackground};`);
        theme=theme.appendLine(`--${this.palette}-appbar-text: ${this.theme.palette.AppbarText};`);

        theme=theme.appendLine(`--${this.palette}-lines-default: ${this.theme.palette.LinesDefault};`);
        theme=theme.appendLine(`--${this.palette}-lines-inputs: ${this.theme.palette.LinesInputs};`);

        theme=theme.appendLine(`--${this.palette}-table-lines: ${this.theme.palette.TableLines};`);
        theme=theme.appendLine(`--${this.palette}-table-striped: ${this.theme.palette.TableStriped};`);
        theme=theme.appendLine(`--${this.palette}-table-hover: ${this.theme.palette.TableHover};`);

        theme=theme.appendLine(`--${this.palette}-divider: ${this.theme.palette.Divider};`);
        theme=theme.appendLine(`--${this.palette}-divider-light: ${this.theme.palette.DividerLight};`);

        theme=theme.appendLine(`--${this.palette}-grey-default: ${this.theme.palette.GrayDefault};`);
        theme=theme.appendLine(`--${this.palette}-grey-light: ${this.theme.palette.GrayLight};`);
        theme=theme.appendLine(`--${this.palette}-grey-lighter: ${this.theme.palette.GrayLighter};`);
        theme=theme.appendLine(`--${this.palette}-grey-dark: ${this.theme.palette.GrayDark};`);
        theme=theme.appendLine(`--${this.palette}-grey-darker: ${this.theme.palette.GrayDarker};`);

        theme=theme.appendLine(`--${this.palette}-overlay-dark: ${this.theme.palette.OverlayDark};`);
        theme=theme.appendLine(`--${this.palette}-overlay-light: ${this.theme.palette.OverlayLight};`);


        //Elevations
        theme=theme.appendLine(`--${this.elevation}-0: ${this.theme.shadows.elevation[0]};`);
        theme=theme.appendLine(`--${this.elevation}-1: ${this.theme.shadows.elevation[1]};`);
        theme=theme.appendLine(`--${this.elevation}-2: ${this.theme.shadows.elevation[2]};`);
        theme=theme.appendLine(`--${this.elevation}-3: ${this.theme.shadows.elevation[3]};`);
        theme=theme.appendLine(`--${this.elevation}-4: ${this.theme.shadows.elevation[4]};`);
        theme=theme.appendLine(`--${this.elevation}-5: ${this.theme.shadows.elevation[5]};`);
        theme=theme.appendLine(`--${this.elevation}-6: ${this.theme.shadows.elevation[6]};`);
        theme=theme.appendLine(`--${this.elevation}-7: ${this.theme.shadows.elevation[7]};`);
        theme=theme.appendLine(`--${this.elevation}-8: ${this.theme.shadows.elevation[8]};`);
        theme=theme.appendLine(`--${this.elevation}-9: ${this.theme.shadows.elevation[9]};`);
        theme=theme.appendLine(`--${this.elevation}-10: ${this.theme.shadows.elevation[10]};`);
        theme=theme.appendLine(`--${this.elevation}-11: ${this.theme.shadows.elevation[11]};`);
        theme=theme.appendLine(`--${this.elevation}-12: ${this.theme.shadows.elevation[12]};`);
        theme=theme.appendLine(`--${this.elevation}-13: ${this.theme.shadows.elevation[13]};`);
        theme=theme.appendLine(`--${this.elevation}-14: ${this.theme.shadows.elevation[14]};`);
        theme=theme.appendLine(`--${this.elevation}-15: ${this.theme.shadows.elevation[15]};`);
        theme=theme.appendLine(`--${this.elevation}-16: ${this.theme.shadows.elevation[16]};`);
        theme=theme.appendLine(`--${this.elevation}-17: ${this.theme.shadows.elevation[17]};`);
        theme=theme.appendLine(`--${this.elevation}-18: ${this.theme.shadows.elevation[18]};`);
        theme=theme.appendLine(`--${this.elevation}-19: ${this.theme.shadows.elevation[19]};`);
        theme=theme.appendLine(`--${this.elevation}-20: ${this.theme.shadows.elevation[20]};`);
        theme=theme.appendLine(`--${this.elevation}-21: ${this.theme.shadows.elevation[21]};`);
        theme=theme.appendLine(`--${this.elevation}-22: ${this.theme.shadows.elevation[22]};`);
        theme=theme.appendLine(`--${this.elevation}-23: ${this.theme.shadows.elevation[23]};`);
        theme=theme.appendLine(`--${this.elevation}-24: ${this.theme.shadows.elevation[24]};`);
        theme=theme.appendLine(`--${this.elevation}-25: ${this.theme.shadows.elevation[25]};`);

        //Layout Properties
        theme=theme.appendLine(`--${this.layoutProperties}-default-borderradius: ${this.theme.layoutProperties.DefaultBorderRadius};`);
        if (!StringHelper.isNullOrEmpty(this.theme.layoutProperties.DrawerWidth)) {
            theme=theme.appendLine(`--${this.layoutProperties}-drawer-width-left: ${this.theme.layoutProperties.DrawerWidth};`);
            theme=theme.appendLine(`--${this.layoutProperties}-drawer-width-right: ${this.theme.layoutProperties.DrawerWidth};`);
        } else {
            theme=theme.appendLine(`--${this.layoutProperties}-drawer-width-left: ${this.theme.layoutProperties.DrawerWidthLeft};`);
            theme=theme.appendLine(`--${this.layoutProperties}-drawer-width-right: ${this.theme.layoutProperties.DrawerWidthRight};`);
        }
        theme=theme.appendLine(`--${this.layoutProperties}-drawer-width-mini-left: ${this.theme.layoutProperties.DrawerMiniWidthLeft};`);
        theme=theme.appendLine(`--${this.layoutProperties}-drawer-width-mini-right: ${this.theme.layoutProperties.DrawerMiniWidthRight};`);
        if (!StringHelper.isNullOrEmpty(this.theme.layoutProperties.AppbarMinHeight)) {
            theme=theme.appendLine(`--${this.layoutProperties}-appbar-height: ${this.theme.layoutProperties.AppbarMinHeight};`);
        } else {
            theme=theme.appendLine(`--${this.layoutProperties}-appbar-height: ${this.theme.layoutProperties.AppbarHeight};`);
        }

        //Typography
        theme+=`--${this.typography}-default-family: ${this.theme.typography.default.fontFamily.map(txt => `'${txt}'`).join(',')};\n`
        theme+=`--${this.typography}-default-size: ${this.theme.typography.default.fontSize};\n`;
        theme+=`--${this.typography}-default-weight: ${this.theme.typography.default.fontWeight};\n`;
        theme+=`--${this.typography}-default-lineheight: ${this.theme.typography.default.lineHeight};\n`;
        theme+=`--${this.typography}-default-letterspacing: ${this.theme.typography.default.letterSpacing};\n`;
        theme+=`--${this.typography}-default-text-transform: ${this.theme.typography.default.textTransform};\n`;

        theme=theme.appendLine(`--${this.typography}-h1-family: ${this.theme.typography.h1.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-h1-size: ${this.theme.typography.h1.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-h1-weight: ${this.theme.typography.h1.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-h1-lineheight: ${this.theme.typography.h1.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-h1-letterspacing: ${this.theme.typography.h1.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-h1-text-transform: ${this.theme.typography.h1.textTransform};`);


        theme=theme.appendLine(`--${this.typography}-h2-family: ${this.theme.typography.h2.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-h2-size: ${this.theme.typography.h2.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-h2-weight: ${this.theme.typography.h2.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-h2-lineheight: ${this.theme.typography.h2.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-h2-letterspacing: ${this.theme.typography.h2.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-h2-text-transform: ${this.theme.typography.h2.textTransform};`);


        theme=theme.appendLine(`--${this.typography}-h3-family: ${this.theme.typography.h3.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-h3-size: ${this.theme.typography.h3.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-h3-weight: ${this.theme.typography.h3.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-h3-lineheight: ${this.theme.typography.h3.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-h3-letterspacing: ${this.theme.typography.h3.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-h3-text-transform: ${this.theme.typography.h3.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-h4-family: ${this.theme.typography.h4.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-h4-size: ${this.theme.typography.h4.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-h4-weight: ${this.theme.typography.h4.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-h4-lineheight: ${this.theme.typography.h4.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-h4-letterspacing: ${this.theme.typography.h4.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-h4-text-transform: ${this.theme.typography.h4.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-h5-family: ${ this.theme.typography.h5.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-h5-size: ${this.theme.typography.h5.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-h5-weight: ${this.theme.typography.h5.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-h5-lineheight: ${this.theme.typography.h5.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-h5-letterspacing: ${this.theme.typography.h5.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-h5-text-transform: ${this.theme.typography.h5.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-h6-family: ${this.theme.typography.h6.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-h6-size: ${this.theme.typography.h6.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-h6-weight: ${this.theme.typography.h6.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-h6-lineheight: ${this.theme.typography.h6.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-h6-letterspacing: ${this.theme.typography.h6.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-h6-text-transform: ${this.theme.typography.h6.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-subtitle1-family: ${this.theme.typography.subtitle1.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-subtitle1-size: ${this.theme.typography.subtitle1.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-subtitle1-weight: ${this.theme.typography.subtitle1.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-subtitle1-lineheight: ${this.theme.typography.subtitle1.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-subtitle1-letterspacing: ${this.theme.typography.subtitle1.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-subtitle1-text-transform: ${this.theme.typography.subtitle1.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-subtitle2-family: ${this.theme.typography.subtitle2.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-subtitle2-size: ${this.theme.typography.subtitle2.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-subtitle2-weight: ${this.theme.typography.subtitle2.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-subtitle2-lineheight: ${this.theme.typography.subtitle2.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-subtitle2-letterspacing: ${this.theme.typography.subtitle2.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-subtitle2-text-transform: ${this.theme.typography.subtitle2.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-body1-family: ${this.theme.typography.body1.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-body1-size: ${this.theme.typography.body1.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-body1-weight: ${this.theme.typography.body1.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-body1-lineheight: ${this.theme.typography.body1.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-body1-letterspacing: ${this.theme.typography.body1.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-body1-text-transform: ${this.theme.typography.body1.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-body2-family: ${this.theme.typography.body2.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-body2-size: ${this.theme.typography.body2.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-body2-weight: ${this.theme.typography.body2.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-body2-lineheight: ${this.theme.typography.body2.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-body2-letterspacing: ${this.theme.typography.body2.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-body2-text-transform: ${this.theme.typography.body2.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-button-family: ${this.theme.typography.button.fontFamily.map(txt => `'${txt}'`).join(',')};`)
        theme=theme.appendLine(`--${this.typography}-button-size: ${this.theme.typography.button.fontSize};`)
        theme=theme.appendLine(`--${this.typography}-button-weight: ${this.theme.typography.button.fontWeight};`)
        theme=theme.appendLine(`--${this.typography}-button-lineheight: ${this.theme.typography.button.lineHeight.toString()};`)
        theme=theme.appendLine(`--${this.typography}-button-letterspacing: ${this.theme.typography.button.letterSpacing};`)
        theme=theme.appendLine(`--${this.typography}-button-text-transform: ${this.theme.typography.button.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-caption-family: ${this.theme.typography.caption.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-caption-size: ${this.theme.typography.caption.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-caption-weight: ${this.theme.typography.caption.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-caption-lineheight: ${this.theme.typography.caption.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-caption-letterspacing: ${this.theme.typography.caption.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-caption-text-transform: ${this.theme.typography.caption.textTransform};`);

        theme=theme.appendLine(`--${this.typography}-overline-family: ${this.theme.typography.overline.fontFamily.map(txt => `'${txt}'`).join(',')};`);
        theme=theme.appendLine(`--${this.typography}-overline-size: ${this.theme.typography.overline.fontSize};`);
        theme=theme.appendLine(`--${this.typography}-overline-weight: ${this.theme.typography.overline.fontWeight};`);
        theme=theme.appendLine(`--${this.typography}-overline-lineheight: ${this.theme.typography.overline.lineHeight.toString()};`);
        theme=theme.appendLine(`--${this.typography}-overline-letterspacing: ${this.theme.typography.overline.letterSpacing};`);
        theme=theme.appendLine(`--${this.typography}-overline-text-transform: ${this.theme.typography.overline.textTransform};`);

        //Z-Index
        theme=theme.appendLine(`--${this.zIndex}-drawer: ${this.theme.zIndex.Drawer};`);
        theme=theme.appendLine(`--${this.zIndex}-appbar: ${this.theme.zIndex.AppBar};`);
        theme=theme.appendLine(`--${this.zIndex}-dialog: ${this.theme.zIndex.Dialog};`);
        theme=theme.appendLine(`--${this.zIndex}-popover: ${this.theme.zIndex.Popover};`);
        theme=theme.appendLine(`--${this.zIndex}-snackbar: ${this.theme.zIndex.Snackbar};`);
        theme=theme.appendLine(`--${this.zIndex}-tooltip: ${this.theme.zIndex.Tooltip};`);

        return theme;
    }
}
