import { WebComponent } from "../web_component.js";

class StatsComponent extends WebComponent {

    constructor() {
        super(import.meta.url);
    }

}

customElements.define("stats-component", StatsComponent);

export {
    StatsComponent
}