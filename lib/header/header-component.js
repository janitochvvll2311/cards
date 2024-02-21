import { WebComponent } from "../web-component.js"
import { WebUrl } from "../web-url.js"

class HeaderComponent extends WebComponent {

    constructor() {
        super(import.meta.url);
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        let url = new WebUrl(import.meta.url);
        url.navigate("../../assets");
        shadow.getElementById("certificate").src = url + "/certificate-solid.svg";
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

customElements.define("header-component", HeaderComponent);

export {
    HeaderComponent
}