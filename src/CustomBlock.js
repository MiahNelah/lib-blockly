export class CustomBlock {
    /**
     * 
     * @param {!String} name 
     * @param {!String} category 
     * @param {!Object} definition 
     * @param {String} kind 
     */
    constructor(name, category, kind = "block") {
        this.kind = kind;
        this.category = category;
        this.key = `${this.category}.${name}`;
        this.definition = libBlockly.getDefinition(this.key);
        if (!this.definition) throw Error(`Custom block defnition not found: ${this.key}`);
    }

    init() {
        return mergeObject({
            "colour": game.i18n.localize(`LibBlockly.Blocks.${this.key}.Colour`),
            "tooltip": game.i18n.localize(`LibBlockly.Blocks.${this.key}.Tooltip`),
            "helpUrl": game.i18n.localize(`LibBlockly.Blocks.${this.key}.HelpUrl`),
            "message0": game.i18n.localize(`LibBlockly.Blocks.${this.key}.Title`),
            "inputsInline": false,
        }, this.definition);
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