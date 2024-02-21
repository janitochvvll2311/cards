import { WebComponent } from "../web-component.js";
import { WebUrl } from "../web-url.js";

class StatsComponent extends WebComponent {

    #binding;

    #attack;
    #defense;
    #speed;
    #magic;

    get attack() {
        return this.#attack;
    }

    set attack(value) {
        if (this.#attack !== value) {
            this.#attack = parseInt(value);
            this.update();
        }
    }

    get defense() {
        return this.#defense;
    }

    set defense(value) {
        if (this.#defense !== value) {
            this.#defense = parseInt(value);
            this.update();
        }
    }

    get speed() {
        return this.#speed;
    }

    set speed(value) {
        if (this.#speed !== value) {
            this.#speed = parseInt(value);
            this.update();
        }
    }

    get magic() {
        return this.#magic;
    }

    set magic(value) {
        if (this.#magic !== value) {
            this.#magic = parseInt(value);
            this.update();
        }
    }

    constructor() {
        super(import.meta.url);
        this.#attack = 1;
        this.#defense = 1;
        this.#speed = 1;
        this.#magic = 1;
        this.#binding = {};
    }

    async init(shadow, htmlUrl, cssUrl) {
        await super.init(shadow, htmlUrl, cssUrl);
        let url = new WebUrl(import.meta.url);
        url.navigate("../../assets");

        shadow.getElementById("burst").src = url + "/burst-solid.svg";
        shadow.getElementById("shield").src = url + "/shield-solid.svg";
        shadow.getElementById("feather").src = url + "/feather-solid.svg";
        shadow.getElementById("splotch").src = url + "/splotch-solid.svg";
        this.#binding = {
            attack: shadow.getElementById("attack"),
            defense: shadow.getElementById("defense"),
            speed: shadow.getElementById("speed"),
            magic: shadow.getElementById("magic")
        };
        this.update();
    }

    update() {
        if (this.#binding) {
            let attack = this.#attack;
            this.#binding.attack.innerText = attack >= 0 ? "+" + attack : attack;

            let defense = this.#defense;
            this.#binding.defense.innerText = defense >= 0 ? "+" + defense : defense;

            let speed = this.#speed;
            this.#binding.speed.innerText = speed >= 0 ? "+" + speed : speed;

            let magic = this.#magic;
            this.#binding.magic.innerText = magic >= 0 ? "+" + magic : magic;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "attack":
                    this.#attack = parseInt(newValue);
                    break;
                case "defense":
                    this.#defense = parseInt(newValue);
                    break;
                case "speed":
                    this.#speed = parseInt(newValue);
                    break;
                case "magic":
                    this.#magic = parseInt(newValue);
                    break;
            }
        }
    }

    static get observedAttributes() {
        return ["attack", "defense", "speed", "magic"];
    }

}

customElements.define("stats-component", StatsComponent);

export {
    StatsComponent
}