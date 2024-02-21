class WebComponent extends HTMLElement {

    constructor(metaURL) {
        super();
        let shadow = this.attachShadow({ mode: "closed" });
        metaURL = metaURL.substring(0, metaURL.lastIndexOf("."));
        this.init(shadow, metaURL + ".html", metaURL + ".css");
    }

    async init(shadow, htmlURL, cssURL) {
        if (cssURL) {
            let response = await fetch(cssURL);
            if (response.ok) {
                let CSS = await response.text();
                shadow.innerHTML += `<style>${CSS}</style>`;
            }
        }
        if (htmlURL) {
            let response = await fetch(htmlURL);
            if (response.ok) {
                let HTML = await response.text();
                shadow.innerHTML += HTML;
            }
        }
    }

}

export {
    WebComponent
}