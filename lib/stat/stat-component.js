import { WebComponent } from "../web-component.js";
import { WebUrl } from "../web-url.js";

class StatComponent extends WebComponent {

    #binding;

    #icon;
    #points;

    get icon() {
        return this.#icon;
    }

    set icon(value) {
        if (this.#icon !== value) {
            this.#icon = value;
            this.update();
        }
    }

    get points() {
        return this.#points;
    }

    set points(value) {
        if (this.#points !== value) {
            this.#points = parseInt(value);
            this.update();
        }
    }

    constructor() {
        super(import.meta.url);
        this.#icon = null;
        this.#points = 0;
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        this.#binding = {
            icon: shadow.getElementById("icon"),
            points: shadow.getElementById("points")
        };
        this.update();
    }

    update() {
        if (this.#binding) {
            let url = new WebUrl(import.meta.url);
            url.navigate("../../assets");

            this.#binding.icon.src = this.#icon ?? (url + "/certificate-solid.svg");
            this.#binding.points.innerText = this.#points > 0 ? "+" + this.#points : this.#points;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "icon":
                    this.#icon = newValue;
                    break;
                case "points":
                    this.#points = parseInt(newValue);
                    break;
            }
        }
    }

    static get observedAttributes() {
        return ["icon", "points"];
    }

}

customElements.define("stat-component", StatComponent);

export {
    StatComponent
}