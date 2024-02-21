import { WebComponent } from "../web_component.js";
import { WebUrl } from "../web_url.js";

class StatsComponent extends WebComponent {

    constructor() {
        super(import.meta.url);
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        let url = new WebUrl(import.meta.url);
        url.navigate("../../assets");

        shadow.getElementById("burst").src = url + "/burst-solid.svg";
        shadow.getElementById("shield").src = url + "/shield-solid.svg";
        shadow.getElementById("feather").src = url + "/feather-solid.svg";
        shadow.getElementById("splotch").src = url + "/splotch-solid.svg";
    }

}

customElements.define("stats-component", StatsComponent);

export {
    StatsComponent
}