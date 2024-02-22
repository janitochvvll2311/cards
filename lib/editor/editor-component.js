import { WebComponent } from "../web-component.js";

class EditorComponent extends WebComponent {

    #binding;

    constructor() {
        super(import.meta.url);
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        this.#binding = {
            card: shadow.getElementById("card"),
            name: shadow.getElementById("name"),
            description: shadow.getElementById("description"),
            attack: shadow.getElementById("attack"),
            defense: shadow.getElementById("defense"),
            speed: shadow.getElementById("speed"),
            magic: shadow.getElementById("magic"),
        };
        this.setListeners(this.#binding);
    }

    setListeners() {
        this.#binding.name.addEventListener("input", event => this.#binding.card.name = event.target.value);
        this.#binding.description.addEventListener("input", event => this.#binding.card.description = event.target.value);
        this.#binding.attack.addEventListener("input", event => this.#binding.card.attack = event.target.value);
        this.#binding.defense.addEventListener("input", event => this.#binding.card.defense = event.target.value);
        this.#binding.speed.addEventListener("input", event => this.#binding.speed.defense = event.target.value);
        this.#binding.magic.addEventListener("input", event => this.#binding.magic.defense = event.target.value);
    }

}

customElements.define("editor-component", EditorComponent);