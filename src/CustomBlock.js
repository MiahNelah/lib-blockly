/**
 * 
 */
export class CustomBlock {
    /**
     * 
     * @param {!String} name 
     * @param {!String} category 
     * @param {!Object} definition 
     * @param {String} kind 
     */
    constructor(name, category, options = { kind: "block", localisationPrefix: "LibBlockly.Blocks" }) {
        this._kind = options.kind;
        this._localisationPrefix = options.localisationPrefix;
        this._category = category;
        this._key = `${this._category}.${name}`;
        this._definition = libBlockly.getDefinition(this._key);
        if (!this._definition) throw Error(`Custom block defnition not found: ${this._key}`);
    }

    /**
     * 
     */
    get kind() { return this._kind; }

    /**
     * 
     */
    get category() { return this._category; }

    /**
     * 
     */
    get key() { return this._key; }

    /**
     * 
     * @returns 
     */
    init() {
        return mergeObject({
            "colour": game.i18n.localize(`${this._localisationPrefix}.${this._key}.Colour`),
            "tooltip": game.i18n.localize(`${this._localisationPrefix}.${this._key}.Tooltip`),
            "helpUrl": game.i18n.localize(`${this._localisationPrefix}.${this._key}.HelpUrl`),
            "message0": game.i18n.localize(`${this._localisationPrefix}.${this._key}.Title`),
            "inputsInline": false,
        }, this._definition);
    }

    /**
     * 
     * @param {!BlockSvg} block 
     * @returns 
     */
    generateCode(block) {
        return undefined;
    }
}
Object.freeze(CustomBlock);