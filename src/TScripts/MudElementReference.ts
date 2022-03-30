// Copyright (c) MudBlazor 2021
// MudBlazor licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

import {MudHelpers} from "./MudHelpers";

class MudElementReference {

    listenerId: any
    eventListeners: any

    constructor() {
        this.listenerId = 0;
        this.eventListeners = {};
    }

    focus(element: any) {
        if (element) element.focus();
    }

    focusFirst(element: any, skip: number = 0, min: number = 0) {
        if (element) {
            let tabbables = MudHelpers.getTabbableElements(element);
            if (tabbables.length <= min) element.focus();
            else tabbables[skip].focus();
        }
    }

    focusLast(element: any, skip: number = 0, min: number = 0) {
        if (element) {
            let tabbables = MudHelpers.getTabbableElements(element);
            if (tabbables.length <= min) element.focus();
            else tabbables[tabbables.length - skip - 1].focus();
        }
    }

    saveFocus(element:any) {
        if (element)element['mudblazor_savedFocus'] = document.activeElement;
    }

    restoreFocus(element:any) {
        if (element) {
            let previous = element['mudblazor_savedFocus'];
            delete element['mudblazor_savedFocus']
            if (previous) previous.focus();
        }
    }

    selectRange(element:any, pos1:any, pos2:any) {
        if (element) {
            if (element.createTextRange) {
                let selRange = element.createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', pos1);
                selRange.moveEnd('character', pos2);
                selRange.select();
            } else if (element.setSelectionRange) {
                element.setSelectionRange(pos1, pos2);
            } else if (element.selectionStart) {
                element.selectionStart = pos1;
                element.selectionEnd = pos2;
            }
            element.focus();
        }
    }

    select(element:any) {
        if (element) {
            element.select();
        }
    }
    /**
     * gets the client rect of the parent of the element
     * @param {HTMLElement} element
     */
    getClientRectFromParent(element:any) {
        if (!element) return;
        let parent = element.parentElement;
        if (!parent) return;
        return this.getBoundingClientRect(parent);
    }

    /**
     * Gets the client rect of the first child of the element
     * @param {any} element
     */

    getClientRectFromFirstChild(element:any) {
        if (!element) return;
        let child = element.children && element.children[0];
        if (!child) return;
        return this.getBoundingClientRect(child);
    }

    getBoundingClientRect(element:any) {
        if (!element) return;

        let rect = JSON.parse(JSON.stringify(element.getBoundingClientRect()));

        rect.scrollY = window.scrollY || document.documentElement.scrollTop;
        rect.scrollX = window.scrollX || document.documentElement.scrollLeft;

        rect.windowHeight = window.innerHeight;
        rect.windowWidth = window.innerWidth;
        return rect;
    }

    /**
     * Returns true if the element has any ancestor with style position==="fixed"
     * @param {Element} element
     */
    hasFixedAncestors(element:any) {
        for (; element && element !== document; element = element.parentNode) {
            if (window.getComputedStyle(element).getPropertyValue("position") === "fixed")
                return true;
        }
        return false
    };

    changeCss(element:any, css:any) {
        if (element) {
            element.className = css;
        }
    }

    changeCssVariable(element:any, name:any, newValue:any) {
        if (element) {
            element.style.setProperty(name, newValue);
        }
    }

    addEventListener(element:any, dotnet:any, event:any, callback:any, spec:any, stopPropagation:any) {
        let listener = function (e) {
            const args = Array.from(spec, x => MudHelpers.serializeParameter(e, x));
            dotnet.invokeMethodAsync(callback, ...args);
            if (stopPropagation) {
                e.stopPropagation();
            }
        };
        element.addEventListener(event, listener);
        this.eventListeners[++this.listenerId] = listener;
        return this.listenerId;
    }

    removeEventListener(element, event, eventId) {
        element.removeEventListener(event, this.eventListeners[eventId]);
        delete this.eventListeners[eventId];
    }
}

window['mudElementRef'] = new MudElementReference();
