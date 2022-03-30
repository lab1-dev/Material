
export enum MudColorOutputFormats {
    /// <summary>
    /// Output will be starting with a # and include r,g and b but no alpha values. Example #ab2a3d
    /// </summary>
    Hex,
    /// <summary>
    /// Output will be starting with a # and include r,g and b and alpha values. Example #ab2a3dff
    /// </summary>
    HexA,
    /// <summary>
    /// Will output css like output for value. Example rgb(12,15,40)
    /// </summary>
    RGB,
    /// <summary>
    /// Will output css like output for value with alpha. Example rgba(12,15,40,0.42)
    /// </summary>
    RGBA,
    /// <summary>
    /// Will output the color elements without any decorator and without alpha. Example 12,15,26
    /// </summary>
    ColorElements
}

export class MudColor{
    hex!:string;

    r!:number
    g!:number
    b!:number

    opacity=1;


    arrayToRGBString = (rgb:number[]) => `rgb(${rgb.join(',')})`;
    hexToRGBArray = (hex:string) => hex.match(/[A-Za-z0-9]{2}/g)!.map(v => parseInt(v, 16));
    rgbArrayToHex = (rgb:number[]) => `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
    rgbStringToArray = (rgb:string) => rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)!.splice(1, 3).map(v => Number(v));
    rgbStringToHex = (rgb:string) => this.rgbArrayToHex(this.rgbStringToArray(rgb));

    constructor(color:string) {
        this.hex=color.toLowerCase();
        if(this.hex.length==7)this.hex+='ff';//no opacity
        this.convertToRGB(color);
    }

    setAlpha(opacity:number):MudColor{
        this.opacity=opacity;
        return this;
    }


    convertToRGB(hex:string):void{
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if(result){
            this.r=parseInt(result[1], 16);
            this.g=parseInt(result[2], 16);
            this.b=parseInt(result[3], 16);
        }else console.log('(MudColor)invalid hex:',hex);
    }

    toString(format:MudColorOutputFormats=MudColorOutputFormats.HexA):string{
        switch(format){
            case MudColorOutputFormats.HexA:return this.hex;
            case MudColorOutputFormats.RGB: return `rgb(${this.r},${this.g},${this.b})`;
            case MudColorOutputFormats.RGBA: return `rgba(${this.r},${this.g},${this.b},${this.opacity})`;
            case MudColorOutputFormats.ColorElements: return `${this.r},${this.g},${this.b}`;
        }
        return this.hex;
    }

    hslToRgb(h:number, s:number, l:number):number[]{
        let r, g, b;
        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            let hue2rgb = function hue2rgb(p:number, q:number, t:number){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    rgbToHsl(r:number, g:number, b:number):number[]{
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            if(h==undefined)h=0;
            else h=h/6;
        }
        return [h, s, l];
    }

    colorRgbDarken():MudColor{
        return this.changeLightness(-0.075);
    }

    colorRgbLighten():MudColor{
        return this.changeLightness(0.075);
    }

    changeLightness(amount:number):MudColor{//positive=lighter, negative=darker
        let hsl:number[]|undefined=this.rgbToHsl(this.r,this.g,this.b);
        if(hsl==undefined){
            console.warn('invalid hsl for rgb ');
            return this;
        }
        let newLightness=Math.max(0,Math.min(1,hsl[2]+amount),amount);
        let newRgb=this.hslToRgb(hsl[0],hsl[1],newLightness);
        this.r=newRgb[0];
        this.g=newRgb[1];
        this.b=newRgb[2];
        return this;
    }
}
