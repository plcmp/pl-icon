import {css, html, PlElement} from "polylib";

class PlIcon extends PlElement {
    static properties = {
            title: { type: String, reflectToAttribute: true },
            hidden: { type: String, reflectToAttribute: true },
            iconset: { type: String, observer: '_iconChanged' },
            icon: { type: String, reflectToAttribute: true, observer: '_iconChanged' },
            size: { type: Number, value: '16' }
        }

    static css = css`
            :host {
                display: inline-block;
            }

            :host([hidden]) {
                display: none;
            }
            #svg {
                pointer-events: none; 
                display: block;
                fill: var(--pl-icon-fill-color, currentcolor);
                stroke: var(--pl-icon-stroke-color, none);
            }
        `;

    static template = html`<svg id="svg" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" width$="[[size]]" height$="[[size]]"></svg>`;

    _iconChanged() {
        const iconset = document.iconMap[this.iconset];
        if (!iconset) return;

        if (this.icon) {
            let icon = [...iconset].find(i => i.id === this.icon);
            if (!icon) return;

            let ivb = icon.getAttribute("viewBox");
            if (ivb && ivb !== '0 0 16 16') {
                this.$.svg.setAttribute("viewBox", ivb);
            }
            this.$.svg?.replaceChildren(icon.cloneNode(true));
        } else {
            this.$.svg.innerHTML = '';
        }
    }
}

customElements.define('pl-icon', PlIcon);