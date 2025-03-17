// drawing.js
import fs from 'fs';

class GenericElement {
    constructor(name) {
        this.name = name;
        this.attributes = {};
        this.children = [];
        this.content = "";
    }

    addAttr(name, value) {
        this.attributes[name] = value;
    }

    setAttr(name, value) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, name)) {
            this.attributes[name] = value;
        }
    }
    
    addAttrs(obj) {
        Object.entries(obj).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, this.attributes);
    }

    removeAttrs(arr) {
        arr.reduce((acc, key) => {
            delete acc[key];
            return acc;
        }, this.attributes);
    }  

    addChild(child) {
        this.children = [...this.children, child];
    }

    toString() {
        const attrString = Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
        const openTag = `<${this.name}${attrString ? " " + attrString : ""}>`;
        const closeTag = `</${this.name}>`;
        if (this.children.length || this.content) {
            const childrenString = this.children.map(child => child.toString()).join("");
            return `${openTag}${this.content || ""}${childrenString}${closeTag}`;
        } 
        return `${openTag}${closeTag}`;
    }

    write(fileName, cb) {
        fs.writeFile(fileName, this.toString(), cb);
    }
}

class RootElement extends GenericElement {
    constructor() {
        super("svg");
        this.addAttr("xmlns", "http://www.w3.org/2000/svg");
    }
}

class RectangleElement extends GenericElement {
    constructor(x, y, width, height, fill) {
        super("rect");
        this.addAttrs({ x, y, width, height, fill });
    }
}

class TextElement extends GenericElement {
    constructor(x, y, fontSize, fill, content) {
        super("text");
        this.addAttrs({ x, y, "font-size": fontSize, fill });
        this.content = content;
    }
    toString(indent = 0) {
        const indentation = "  ".repeat(indent);
        const attrString = Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
        return `${indentation}<text ${attrString}>${this.content}</text>`;
    }
}

export { GenericElement, RootElement, RectangleElement, TextElement };

