import { WebComponent } from "../web_component.js";

class GraphComponent extends WebComponent {

    /** @type {HTMLCanvasElement} */
    #canvas;

    #scale;
    #levels;
    #points;

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

    get points() {
        return this.#points;
    }

    set points(value) {
        if (this.#points !== value) {
            this.#points = value.map(x => parseInt(value));
            this.update();
        }
    }

    constructor() {
        super(import.meta.url)
        this.#scale = 1;
        this.#levels = 1;
        this.#points = [1, 1, 1, 1];
    }

    async init(shadow, htmlURL, cssURL) {
        await super.init(shadow, htmlURL, cssURL);

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
            context.moveTo(width, 0);
            context.lineTo(0, height);
            context.stroke();

            let hScale = width / this.#levels / this.#scale / 2;
            let vScale = height / this.#levels / this.#scale / 2;
            let hCenter = width / 2;
            let vCenter = height / 2;
            context.fillStyle = "#000000AA";
            context.beginPath();
            context.moveTo(hCenter - this.#points[0] * hScale, vCenter - this.points[0] * vScale);
            context.lineTo(hCenter + this.#points[1] * hScale, vCenter - this.points[1] * vScale);
            context.lineTo(hCenter + this.#points[3] * hScale, vCenter + this.points[3] * vScale);
            context.lineTo(hCenter - this.#points[2] * hScale, vCenter + this.points[2] * vScale);
            context.closePath();
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
                case "points":
                    this.#points = newValue.split(",").map(x => parseInt(x));
                    break;
            }
        }
    }

    static get observedAttributes() {
        return ["scale", "levels", "points"];
    }

}

customElements.define("graph-component", GraphComponent);

export {
    GraphComponent
}