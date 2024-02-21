class WebUrl {

    #url;

    get url() {
        return this.#url;
    }

    set url(value) {
        if (this.#url !== value) {
            this.#url = new URL(value);
        }
    }

    constructor(url) {
        this.#url = new URL(url);
    }

    navigate(path = "") {
        let pathname = this.#url.pathname;
        while (path.startsWith("../")) {
            let cursor = pathname.lastIndexOf("/");
            if (cursor > 0) {
                pathname = pathname.substring(0, cursor);
                path = path.substring(3);
            }
        }
        this.#url.pathname = pathname + "/" + path;
    }

    toString() {
        return this.#url.toString();
    }

}

export {
    WebUrl
}