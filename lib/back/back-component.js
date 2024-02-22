import { WebComponent } from "../web-component.js";
import { WebUrl } from "../web-url.js";

class BackComponent extends WebComponent {

    constructor() {
        super(import.meta.url);
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        let url = new WebUrl(import.meta.url);
        url.navigate("../../assets");

        shadow.getElementById("logo").src = url + "/certificate-solid.svg";
    }

}

customElements.define("back-component", BackComponent);

export {
    BackComponent
}