import { WebComponent } from "../web-component.js";
import { WebUrl } from "../web-url.js";

class CardComponent extends WebComponent {

    #binding;

    #image;
    #icon;
    #name;
    #attack;
    #defense;
    #speed;
    #magic;
    #description;

    get image() {
        return this.#image;
    }

    set image(value) {
        if (this.#image !== value) {
            this.#image = value;
            this.update();
        }
    }

    get icon() {
        return this.#icon;
    }

    set icon(value) {
        if (this.#icon !== value) {
            this.#icon = value;
            this.update();
        }
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (this.#name !== value) {
            this.#name = value;
            this.update();
        }
    }

    get attack() {
        return this.#attack;
    }

    set attack(value) {
        if (this.#attack !== value) {
            this.#attack = parseInt(value);
            if (this.#attack < 1) {
                this.#attack = 1;
            }
            this.update();
        }
    }

    get defense() {
        return this.#defense;
    }

    set defense(value) {
        if (this.#defense !== value) {
            this.#defense = parseInt(value);
            if (this.#defense < 1) {
                this.#defense = 1;
            }
            this.update();
        }
    }

    get speed() {
        return this.#speed;
    }

    set speed(value) {
        if (this.#speed !== value) {
            this.#speed = parseInt(value);
            if (this.#speed < 1) {
                this.#speed = 1;
            }
            this.update();
        }
    }

    get magic() {
        return this.#magic;
    }

    set magic(value) {
        if (this.#magic !== value) {
            this.#magic = parseInt(value);
            if (this.#magic < 1) {
                this.#magic = 1;
            }
            this.update();
        }
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        if (this.#description !== value) {
            this.#description = value;
            this.update();
        }
    }

    constructor() {
        super(import.meta.url);
        this.#attack = 1;
        this.defense = 1;
        this.speed = 1;
        this.magic = 1;
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        this.#binding = {
            image: shadow.getElementById("image"),
            header: shadow.getElementById("header"),
            stat1: shadow.getElementById("stat1"),
            stat2: shadow.getElementById("stat2"),
            stat3: shadow.getElementById("stat3"),
            stat4: shadow.getElementById("stat4"),
            graph: shadow.getElementById("graph"),
            description: shadow.getElementById("description")
        };
        this.update();
    }

    update() {
        if (this.#binding) {
            let url = new WebUrl(import.meta.url);
            url.navigate("../../assets");

            this.#binding.image.src = this.#image ?? url + "/certificate-solid.svg";
            this.#binding.header.icon = this.#icon ?? url + "/certificate-solid.svg";
            this.#binding.header.name = this.name ?? "Unnamed";
            this.#binding.graph.attack = this.#attack;
            this.#binding.graph.defense = this.#defense;
            this.#binding.graph.speed = this.#speed;
            this.#binding.graph.magic = this.#magic;
            this.#binding.description.innerText = this.#description ?? "No description";
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "image":
                    this.image = newValue;
                    break;
                case "icon":
                    this.icon = newValue;
                    break;
                case "name":
                    this.name = newValue;
                    break;
                case "attack":
                    this.attack = newValue;
                    break;
                case "defense":
                    this.defense = newValue;
                    break;
                case "speed":
                    this.speed = newValue;
                    break;
                case "magic":
                    this.magic = newValue;
                    break;
                case "description":
                    this.description = newValue;
                    break;
            }
        }
    }

    static get observedAttributes() {
        return ["image", "icon", "name", "attack", "defense", "speed", "magic", "description"];
    }

}

customElements.define("card-component", CardComponent);

export {
    CardComponent
}