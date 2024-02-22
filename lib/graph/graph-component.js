import { WebComponent } from "../web-component.js";
import { WebUrl } from "../web-url.js";

class GraphComponent extends WebComponent {

    #binding;

    #scale;
    #levels;

    #attack;
    #defense;
    #speed;
    #magic;

    get scale() {
        return this.#scale;
    }

    set scale(value) {
        if (this.#scale !== value) {
            this.#scale = parseInt(value);
            if (this.#scale < 1) {
                this.#scale = 1;
            }
            this.update();
        }
    }

    get levels() {
        return this.#levels;
    }

    set levels(value) {
        if (this.#levels !== value) {
            this.#levels = parseInt(value);
            if (this.#levels < 1) {
                this.#levels = 1;
            }
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
            this.update();
        }
    }

    constructor() {
        super(import.meta.url)
        this.#scale = 1;
        this.#levels = 1;
        this.#attack = 1;
        this.#defense = 1;
        this.#speed = 1;
        this.#magic = 1;
    }

    async init(shadow, htmlURL, cssURL) {
        await super.init(shadow, htmlURL, cssURL);
        let url = new WebUrl(import.meta.url);
        url.navigate("../../assets");

        shadow.getElementById("burst").src = url + "/burst-solid.svg";
        shadow.getElementById("shield").src = url + "/shield-solid.svg";
        shadow.getElementById("feather").src = url + "/feather-solid.svg";
        shadow.getElementById("splotch").src = url + "/splotch-solid.svg";
        this.#binding = {
            canvas: shadow.getElementById("canvas"),
            attack: shadow.getElementById("attack"),
            defense: shadow.getElementById("defense"),
            speed: shadow.getElementById("speed"),
            magic: shadow.getElementById("magic")
        };
        this.update();
    }

    update() {
        if (this.#binding) {

            let width = this.#binding.canvas.width;
            let height = this.#binding.canvas.height;
            let context = this.#binding.canvas.getContext("2d");
            context.clearRect(0, 0, width, height);

            let thickness = 2;
            let hStep = width / this.#levels;
            let vStep = height / this.#levels;
            context.strokeStyle = "#000000FF";
            context.lineWidth = thickness;
            for (let i = 0; i < this.#levels; i++) {
                let hFix = i * hStep + thickness;
                let vFix = i * vStep + thickness;
                context.rect(hFix / 2, vFix / 2, width - hFix, height - vFix);
            }
            context.moveTo(0, 0);
            context.lineTo(width, height);
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.moveTo(width, 0);
            context.lineTo(0, height);
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.stroke();

            let hScale = width / this.#levels / this.#scale / 2;
            let vScale = height / this.#levels / this.#scale / 2;
            let hCenter = width / 2;
            let vCenter = height / 2;
            let pAttack = { x: hCenter - this.#attack * hScale, y: vCenter - this.#attack * vScale };
            let pDefense = { x: hCenter + this.#defense * hScale, y: vCenter - this.#defense * vScale };
            let pSpeed = { x: hCenter - this.#speed * hScale, y: vCenter + this.#speed * vScale };
            let pMagic = { x: hCenter + this.#magic * hScale, y: vCenter + this.#magic * vScale };
            context.fillStyle = "#000000AA";
            context.beginPath();
            context.moveTo(pAttack.x, pAttack.y);
            context.lineTo(pDefense.x, pDefense.y);
            context.lineTo(pMagic.x, pMagic.y);
            context.lineTo(pSpeed.x, pSpeed.y);
            context.closePath();
            context.fill();

            this.#binding.attack.innerText = this.#attack > 0 ? "+" + this.#attack : 0;
            this.#binding.defense.innerText = this.#defense > 0 ? "+" + this.#defense : 0;
            this.#binding.speed.innerText = this.#speed > 0 ? "+" + this.#speed : 0;
            this.#binding.magic.innerText = this.#magic > 0 ? "+" + this.#magic : 0;

        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "scale":
                    this.scale = newValue;
                    break;
                case "levels":
                    this.levels = newValue;
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
            }
        }
    }

    static get observedAttributes() {
        return ["scale", "levels", "attack", "defense", "speed", "magic"];
    }

}

customElements.define("graph-component", GraphComponent);

export {
    GraphComponent
}