import { PlElement, html, css } from "polylib";

class PlIcon extends PlElement {
    static get properties() {
        return {
            title: { type: String, reflectToAttribute: true },
            iconset: { type: String },
            icon: { type: String, reflectToAttribute: true, observer: '_iconChanged' },
            size: { type: Number, value: '16' }
        }
    }

    static get css() {
        return css`
            :host {
                display: flex;
                transition: all .3s ease-in-out;
                align-items: center;
                justify-content: center;
                width: fit-content;
                height: fit-content;
            }

            .pl-icon {
                width: var(--pl-icon-width, 24px);;
                height: var(--pl-icon-height, 24px);;
                fill: var(--pl-icon-fill-color, currentcolor);
                stroke: var(--pl-icon-stroke-color, none);
            }
        `;
    }

    static get template() {
        return html`
            <span id="plIcon" class="pl-icon"></span>
        `;
    }


    connectedCallback() {
        super.connectedCallback();
        //this._iconChanged();
    }

    _iconChanged() {
        const iconset = document.iconMap[this.iconset];
        if (!iconset) return;
        const _tpl = document.createElement('template');
        iconset.forEach(icon => _tpl.appendChild(icon));
        if (!this.icon) {
            return;
        }
        let icon = _tpl.querySelector(`#${this.icon}`);
        if (!icon) {
            return;
        }

        this.$.plIcon.innerHTML = '';

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let viewBox = icon.getAttribute("viewBox") || `0 0 16 16`;
        let cssText = "pointer-events: none; display: block; width: 100%; height: 100%;";
        svg.setAttribute("viewBox", viewBox);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("focusable", "false");
        svg.style.cssText = cssText;
        let clonedIcon = icon.cloneNode(true);
        svg.appendChild(clonedIcon);
        this.$.plIcon.style.setProperty('--pl-icon-width', `${this.size}px`)
        this.$.plIcon.style.setProperty('--pl-icon-height', `${this.size}px`)
        this.$.plIcon.appendChild(svg);
    }
}

customElements.define('pl-icon', PlIcon);