import { WebComponent } from "../web-component.js";
import { WebUrl } from "../web-url.js";

class GraphComponent extends WebComponent {

    /** @type {HTMLCanvasElement} */
    #canvas;

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
            this.update();
        }
    }

    get levels() {
        return this.#levels;
    }

    set levels(value) {
        if (this.#levels !== value) {
            this.#levels = parseInt(value);
            this.update();
        }
    }

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
        this.#canvas = shadow.getElementById("canvas");
        this.update();
    }

    update() {
        if (this.#canvas) {

            let width = this.#canvas.width;
            let height = this.#canvas.height;
            let context = this.#canvas.getContext("2d");
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

            context.strokeStyle = "#FFFFFFFF";
            context.fillStyle = "#000000FF";
            context.beginPath();
            context.ellipse(pAttack.x, pAttack.x, thickness, thickness, 0, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
            context.fill();
            context.beginPath();
            context.ellipse(pDefense.x, pDefense.y, thickness, thickness, 0, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
            context.fill();
            context.beginPath();
            context.ellipse(pSpeed.x, pSpeed.y, thickness, thickness, 0, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
            context.fill();
            context.beginPath();
            context.ellipse(pMagic.x, pMagic.y, thickness, thickness, 0, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
            context.fill();

        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "scale":
                    this.#scale = parseInt(newValue);
                    break;
                case "levels":
                    this.#levels = parseInt(newValue);
                    break;
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
        return ["scale", "levels", "attack", "defense", "speed", "magic"];
    }

}

customElements.define("graph-component", GraphComponent);

export {
    GraphComponent
}