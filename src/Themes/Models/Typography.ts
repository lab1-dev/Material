export interface BaseTypography {
    fontFamily: string[]
    fontWeight: number
    fontSize: string
    lineHeight: number
    letterSpacing: string,
    textTransform:string
}

export interface Default extends BaseTypography {}

export interface H1 extends BaseTypography {}

export interface H2 extends BaseTypography {}

export interface H3 extends BaseTypography {}

export interface H4 extends BaseTypography {}

export interface H5 extends BaseTypography {}

export interface H6 extends BaseTypography {}

export interface Subtitle1 extends BaseTypography {}

export interface Subtitle2 extends BaseTypography {}

export interface Body1 extends BaseTypography {}

export interface Body2 extends BaseTypography {}

export interface Button extends BaseTypography {}

export interface Caption extends BaseTypography {}

export interface Overline extends BaseTypography {}

export class Typography {
    default: Default = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: ".875rem",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: ".01071em",
        textTransform:'none'
    }
    h1: H1 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "6rem",
        fontWeight: 300,
        lineHeight: 1.167,
        letterSpacing: "-.01562em",
        textTransform:'none'
    }
    h2: H2 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "3.75rem",
        fontWeight: 300,
        lineHeight: 1.2,
        letterSpacing: "-.00833em",
        textTransform:'none'
    }
    h3: H3 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "3rem",
        fontWeight: 400,
        lineHeight: 1.167,
        letterSpacing: "0",
        textTransform:'none'
    }
    h4: H4 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "2.125rem",
        fontWeight: 400,
        lineHeight: 1.235,
        letterSpacing: ".00735em",
        textTransform:'none'
    }
    h5: H5 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "1.5rem",
        fontWeight: 400,
        lineHeight: 1.334,
        letterSpacing: "0",
        textTransform:'none'
    }
    h6: H6 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: ".0075em",
        textTransform:'none'
    }
    subtitle1: Subtitle1 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: ".00938em",
        textTransform:'none'
    }
    subtitle2: Subtitle2 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: ".875rem",
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: ".00714em",
        textTransform:'none'
    }
    body1: Body1 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: ".00938em",
        textTransform:'none',
    }
    body2: Body2 = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: ".875rem",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: ".01071em",
        textTransform:'none'
    }
    button: Button = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: ".875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: ".02857em",
        textTransform: "uppercase"
    }
    caption: Caption = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: ".75rem",
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: ".03333em",
        textTransform:'none'
    }
    overline: Overline = {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: ".75rem",
        fontWeight: 400,
        lineHeight: 2.66,
        letterSpacing: ".08333em",
        textTransform:'none'
    }
}
