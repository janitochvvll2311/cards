import { WebComponent } from "../web-component.js";

class CardComponent extends WebComponent {

    constructor() {
        super(import.meta.url);
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        this.update();
    }

    update() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {

            }
        }
    }

    static get observedAttributes() {
        return [];
    }

}

customElements.define("card-component", CardComponent);

export {
    CardComponent
}