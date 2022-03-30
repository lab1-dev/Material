// Copyright (c) MudBlazor 2021
// MudBlazor licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

class MudWindow {

    copyToClipboard (text:any) {
        navigator.clipboard.writeText(text);
    }

    changeCssById (id:any, css:any) {
        let element = document.getElementById(id);
        if (element) {
            element.className = css;
        }
    }

    changeGlobalCssVariable (name:any, newValue:any) {
        document.documentElement.style.setProperty(name, newValue);
    }

    // Needed as per https://stackoverflow.com/questions/62769031/how-can-i-open-a-new-window-without-using-js
    open (args:any) {
        window.open(args);
    }
}
window['mudWindow'] = new MudWindow();
