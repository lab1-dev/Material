import {MudColor, MudColorOutputFormats} from "../../Utilities/MudColor";
import {Colors} from "../../Utilities/Colors";

export class Palette{
    private _primaryDarken: MudColor|null = null;
    private _primaryLighten: MudColor|null = null;
    private _secondaryDarken: MudColor|null = null;
    private _secondaryLighten: MudColor|null = null;
    private _tertiaryDarken: MudColor|null = null;
    private _tertiaryLighten: MudColor|null = null;
    private _infoDarken: MudColor|null = null;
    private _infoLighten: MudColor|null = null;
    private _successDarken: MudColor|null = null;
    private _successLighten: MudColor|null = null;
    private _warningDarken: MudColor|null = null;
    private _warningLighten: MudColor|null = null;
    private _errorDarken: MudColor|null = null;
    private _errorLighten: MudColor|null = null;
    private _darkDarken: MudColor|null = null;
    private _darkLighten: MudColor|null = null;

    public Black= new MudColor(`#272c34`);
    public White= new MudColor(Colors.Shades.White);
    public Primary= new MudColor(`#594AE2`);
    public PrimaryContrastText= new MudColor(Colors.Shades.White);
    public Secondary= new MudColor(Colors.Pink.Accent2);
    public SecondaryContrastText= new MudColor(Colors.Shades.White);
    public Tertiary= new MudColor(`#1EC8A5`);
    public TertiaryContrastText= new MudColor(Colors.Shades.White);
    public Info= new MudColor(Colors.Blue.Default);
    public InfoContrastText= new MudColor(Colors.Shades.White);
    public Success= new MudColor(Colors.Green.Accent4);
    public SuccessContrastText= new MudColor(Colors.Shades.White);
    public Warning= new MudColor(Colors.Orange.Default);
    public WarningContrastText= new MudColor(Colors.Shades.White);
    public Error= new MudColor(Colors.Red.Default);
    public ErrorContrastText= new MudColor(Colors.Shades.White);
    public Dark= new MudColor(Colors.Grey.Darken3);
    public DarkContrastText= new MudColor(Colors.Shades.White);
    public TextPrimary= new MudColor(Colors.Grey.Darken3);
    public TextSecondary = new MudColor(Colors.Shades.Black).setAlpha(0.54).toString(MudColorOutputFormats.RGBA);
    public TextDisabled = new MudColor(Colors.Shades.Black).setAlpha(0.38).toString(MudColorOutputFormats.RGBA);
    public ActionDefault = new MudColor(Colors.Shades.Black).setAlpha(0.54).toString(MudColorOutputFormats.RGBA);
    public ActionDisabled = new MudColor(Colors.Shades.Black).setAlpha(0.26).toString(MudColorOutputFormats.RGBA);
    public ActionDisabledBackground = new MudColor(Colors.Shades.Black).setAlpha(0.12).toString(MudColorOutputFormats.RGBA);
    public Background= new MudColor(Colors.Shades.White);
    public BackgroundGrey= new MudColor(Colors.Grey.Lighten4);
    public Surface= new MudColor(Colors.Shades.White);
    public DrawerBackground= new MudColor(Colors.Shades.White);
    public DrawerText= new MudColor(Colors.Grey.Darken3);
    public DrawerIcon= new MudColor(Colors.Grey.Darken2);
    public AppbarBackground= new MudColor(`#594AE2`);
    public AppbarText= new MudColor(Colors.Shades.White);
    public LinesDefault=new MudColor(Colors.Shades.Black).setAlpha(0.12).toString(MudColorOutputFormats.RGBA);
    public LinesInputs: MudColor = new MudColor(Colors.Grey.Lighten1);
    public TableLines = new MudColor(Colors.Grey.Lighten2).setAlpha(1.0).toString(MudColorOutputFormats.RGBA);
    public TableStriped = new MudColor(Colors.Shades.Black).setAlpha(0.02).toString(MudColorOutputFormats.RGBA);
    public TableHover = new MudColor(Colors.Shades.Black).setAlpha(0.04).toString(MudColorOutputFormats.RGBA);
    public Divider: MudColor = new MudColor(Colors.Grey.Lighten2);
    public DividerLight = new MudColor(Colors.Shades.Black).setAlpha(0.8).toString(MudColorOutputFormats.RGBA);
    public get PrimaryDarken() : string {
        if(this._primaryDarken)return this._primaryDarken.toString(MudColorOutputFormats.RGB);
        else return this.Primary.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set PrimaryDarken(value: string) {
        this._primaryDarken = new MudColor(value);
    }
    public get PrimaryLighten() : string {
        if(this._primaryLighten)return this._primaryLighten.toString(MudColorOutputFormats.RGB);
        else return this.Primary.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set PrimaryLighten(value: string) {
        this._primaryLighten = new MudColor(value);
    }
    public get SecondaryDarken() : string {
        if(this._secondaryDarken)return this._secondaryDarken.toString(MudColorOutputFormats.RGB);
        else return this.Secondary.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set SecondaryDarken(value: string) {
        this._secondaryDarken = new MudColor(value);
    }
    public get SecondaryLighten() : string {
        if(this._secondaryLighten)return this._secondaryLighten.toString(MudColorOutputFormats.RGB);
        else return this.Secondary.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set SecondaryLighten(value: string) {
        this._secondaryLighten = new MudColor(value);
    }
    public get TertiaryDarken() : string {
        if(this._tertiaryDarken)return this._tertiaryDarken.toString(MudColorOutputFormats.RGB);
        else return this.Tertiary.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set TertiaryDarken(value: string) {
        this._tertiaryDarken = new MudColor(value);
    }
    public get TertiaryLighten() : string {
        if(this._tertiaryLighten)return this._tertiaryLighten.toString(MudColorOutputFormats.RGB);
        else return this.Tertiary.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set TertiaryLighten(value: string) {
        this._tertiaryLighten = new MudColor(value);
    }
    public get InfoDarken() : string {
        if(this._infoDarken)return this._infoDarken.toString(MudColorOutputFormats.RGB);
        else return this.Info.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set InfoDarken(value: string) {
        this._infoDarken = new MudColor(value);
    }
    public get InfoLighten() : string {
        if(this._infoLighten)return this._infoLighten.toString(MudColorOutputFormats.RGB);
        else return this.Info.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set InfoLighten(value: string) {
        this._infoLighten = new MudColor(value);
    }
    public get SuccessDarken() : string {
        if(this._successDarken)return this._successDarken.toString(MudColorOutputFormats.RGB);
        else return this.Success.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set SuccessDarken(value: string) {
        this._successDarken = new MudColor(value);
    }
    public get SuccessLighten() : string {
        if(this._successLighten)return this._successLighten.toString(MudColorOutputFormats.RGB);
        else return this.Success.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set SuccessLighten(value: string) {
        this._successLighten = new MudColor(value);
    }
    public get WarningDarken() : string {
        if(this._warningDarken)return this._warningDarken.toString(MudColorOutputFormats.RGB);
        else return this.Warning.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set WarningDarken(value: string) {
        this._warningDarken = new MudColor(value);
    }
    public get WarningLighten() : string {
        if(this._warningLighten)return this._warningLighten.toString(MudColorOutputFormats.RGB);
        else return this.Warning.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set WarningLighten(value: string) {
        this._warningLighten = new MudColor(value);
    }
    public get ErrorDarken() : string {
        if(this._errorDarken)return this._errorDarken.toString(MudColorOutputFormats.RGB);
        else return this.Error.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set ErrorDarken(value: string) {
        this._errorDarken = new MudColor(value);
    }
    public get ErrorLighten() : string {
        if(this._errorLighten)return this._errorLighten.toString(MudColorOutputFormats.RGB);
        else return this.Error.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set ErrorLighten(value: string) {
        this._errorLighten = new MudColor(value);
    }
    public get DarkDarken() : string {
        if(this._darkDarken)return this._darkDarken.toString(MudColorOutputFormats.RGB);
        else return this.Dark.colorRgbDarken().toString(MudColorOutputFormats.RGB);
    }
    public set DarkDarken(value: string) {
        this._darkDarken = new MudColor(value);
    }
    public get DarkLighten() : string {
        if(this._darkLighten)return this._darkLighten.toString(MudColorOutputFormats.RGB);
        else return this.Dark.colorRgbLighten().toString(MudColorOutputFormats.RGB);
    }
    public set DarkLighten(value: string) {
        this._darkLighten = new MudColor(value);
    }
    public HoverOpacity: number = 0.06;
    public GrayDefault: string = Colors.Grey.Default;
    public GrayLight: string = Colors.Grey.Lighten1;
    public GrayLighter: string = Colors.Grey.Lighten2;
    public GrayDark: string = Colors.Grey.Darken1;
    public GrayDarker: string = Colors.Grey.Darken2;
    public OverlayDark: string = new MudColor(`#212121`).setAlpha(0.5).toString(MudColorOutputFormats.RGBA);
    public OverlayLight: string = new MudColor(Colors.Shades.White).setAlpha(0.5).toString(MudColorOutputFormats.RGBA);

    /*public static ConvertToDarkTheme(palette: Palette | null) : Palette | null {
        palette.Primary = `#776be7`;
        palette.Black = `#27272f`;
        palette.Background = `#32333d`;
        palette.BackgroundGrey = `#27272f`;
        palette.Surface = `#373740`;
        palette.DrawerBackground = `#27272f`;
        palette.DrawerText = `rgba(255,255,255, 0.50)`;
        palette.DrawerIcon = `rgba(255,255,255, 0.50)`;
        palette.AppbarBackground = `#27272f`;
        palette.AppbarText = `rgba(255,255,255, 0.70)`;
        palette.TextPrimary = `rgba(255,255,255, 0.70)`;
        palette.TextSecondary = `rgba(255,255,255, 0.50)`;
        palette.ActionDefault = `#adadb1`;
        palette.ActionDisabled = `rgba(255,255,255, 0.26)`;
        palette.ActionDisabledBackground = `rgba(255,255,255, 0.12)`;
        palette.Divider = `rgba(255,255,255, 0.12)`;
        palette.DividerLight = `rgba(255,255,255, 0.06)`;
        palette.TableLines = `rgba(255,255,255, 0.12)`;
        palette.LinesDefault = `rgba(255,255,255, 0.12)`;
        palette.LinesInputs = `rgba(255,255,255, 0.3)`;
        palette.TextDisabled = `rgba(255,255,255, 0.2)`;
        palette.Info = `#3299ff`;
        palette.Success = `#0bba83`;
        palette.Warning = `#ffa800`;
        palette.Error = `#f64e62`;
        palette.Dark = `#27272f`;
        return palette;
    }*/
}
