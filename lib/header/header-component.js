import { WebComponent } from "../web-component.js"
import { WebUrl } from "../web-url.js"

class HeaderComponent extends WebComponent {

    #binding;

    #icon;
    #level;
    #name;

    get icon() {
        return this.#icon;
    }

    set icon(value) {
        if (this.#icon !== value) {
            this.#icon = value;
            this.update();
        }
    }

    get level() {
        return this.#level;
    }

    set level(value) {
        if (this.#level !== value) {
            this.#level = parseInt(value);
            this.update();
        }
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (this.#name !== value) {
            this.#name = `${value}`;
            this.update();
        }
    }

    constructor() {
        super(import.meta.url);
        this.#icon = null;
        this.#level = 1;
        this.#name = "Unnamed";
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);

        this.#binding = {
            icon: shadow.getElementById("icon"),
            level: shadow.getElementById("level"),
            name: shadow.getElementById("name")
        };
        this.update();
    }

    update() {
        if (this.#binding) {
            let url = new WebUrl(import.meta.url);
            url.navigate("../../assets");

            this.#binding.icon.src = this.#icon ?? (url + "/certificate-solid.svg");
            this.#binding.level.innerText = this.#level;
            this.#binding.name.innerText = this.#name?.length > 0 ? this.#name : "Unnamed";
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "icon":
                    this.#icon = newValue;
                    break
                case "level":
                    this.#level = parseInt(newValue);
                    break
                case "name":
                    this.#name = newValue;
                    break
            }
        }
    }

    static get observedAttributes() {
        return ["icon", "level", "name"];
    }

}

customElements.define("header-component", HeaderComponent);

export {
    HeaderComponent
}