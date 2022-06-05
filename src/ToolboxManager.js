class ToolboxEntry {
    constructor(kind, others) {
        this.contents = [];
        this.keys = mergeObject({
            kind: kind
        }, others)
    }

    get kind() {
        return this.keys.kind;
    }

    set kind(value) {
        this.keys.kind = value;
    }

    /**
     *
     * @return {void|[]}
     */
    getContents() {
        return this.sort ? this._sort(this.contents) : this.contents;
    }

    toJson() {
        const ret = deepClone(this.keys);
        if (this.contents && this.contents.length > 0) {
            ret.contents = this.getContents().map(item => item.toJson());
        }
        return ret;
    }

    /**
     *
     * @param {String} key
     * @param {Array.<Object>} array
     * @private
     */
    _sort(key, array) {
        Object.keys(array).sort().reduce((obj, key) => obj[key] = array[key], {});
    }
}

class ToolboxBlock extends ToolboxEntry {
    constructor(kind, type, others) {
        super(kind, mergeObject({
            type: type
        }, others));
    }
}

class ToolboxSeparator extends ToolboxEntry {
    constructor() {
        super("sep", {
            cssConfig: {
                container: "blocklyTreeSeparator"
            }
        });
    }

}

class ToolboxCategory extends ToolboxEntry {
    /**
     *
     * @param {String} name
     * @param {Object} others
     */
    constructor(name, others = {}) {
        super("category", mergeObject({
            name: name
        }, others));
    }

    /**
     *
     * @returns {ToolboxCategory}
     */
    addSeparator() {
        this.contents.push(new ToolboxSeparator());
        return this;
    }

    /**
     *
     * @param {!String} name
     * @param {Object} [others]
     * @returns {ToolboxCategory}
     */
    addCategory(name, others = {}) {
        const category = new ToolboxCategory(name, others);
        this.contents.push(category);
        this.sortCategories();
        return category;
    }

    /**
     *
     * @returns {(Array.<ToolboxCategory>|[])}
     */
    getCategories() {
        return this.contents.filter(item => item instanceof ToolboxCategory);
    }

    /**
     *
     * @param {!String} name
     * @param {Boolean} [createIfNone]
     * @returns {(undefined|ToolboxCategory)}
     */
    getCategory(name, createIfNone = false) {
        if (this.keys.name === name) return this;
        if (name.indexOf(".") >= 0) {
            let parts = name.split(".");
            let cat = this;
            while (parts.length > 0 && cat) {
                cat = cat.getCategory(parts[0], createIfNone);
                parts.shift();
            }
            return cat;
        }
        const result = this.getCategories().flatMap(item => item.getCategory(name)).filter(x => x)[0];
        if (result) return result;
        if (!createIfNone) return undefined;
        return this.addCategory(name);
    }

    /**
     *
     */
    sortCategories() {
        const categories = this.contents.filter(item => item instanceof ToolboxCategory);
        const sortedCategories = categories.map(cat => cat.keys.name)
            .sort()
            .reduce((obj, key) => {
                const x = categories.find(cat => cat.keys.name === key);
                obj.push(x);
                return obj;
            }, []);
        if (sortedCategories || sortedCategories.length <= 1) return;

        const names = sortedCategories.map(x => x.keys.name);
        this.contents = [
            ...sortedCategories,
            ...this.contents.filter(x => !names.includes(x.keys.name))
        ];
    }

    /**
     *
     * @param {!String} kind
     * @param {!String} type
     * @returns {ToolboxCategory}
     */
    addBlock(kind, type) {
        const block = new ToolboxBlock(kind, type);
        this.contents.push(block);
        return this;
    }
}

export class ToolboxManager extends ToolboxCategory {
    /**
     *
     * @param {Boolean} ignoreDefault
     */
    constructor(ignoreDefault) {
        super("ROOT");
        this.kind = "categoryToolbox";

        if (ignoreDefault) return;
        this.addCategory("Variables", {custom: "VARIABLE"});
        this.addCategory("Functions", {custom: "PROCEDURE"});
        this.addSeparator();
        this.addCategory("Math")
            .addBlock("block", "math_number")
            .addBlock("block", "math_arithmetic")
            .addBlock("block", "math_single")
            .addBlock("block", "math_trig")
            .addBlock("block", "math_constant")
            .addBlock("block", "math_number_property")
            .addBlock("block", "math_round")
            .addBlock("block", "math_on_list")
            .addBlock("block", "math_modulo")
            .addBlock("block", "math_random_int")
            .addBlock("block", "math_random_float")
            .addBlock("block", "math_atan2");
        this.addCategory("Text")
            .addBlock("block", "text")
            .addBlock("block", "text_multiline")
            .addBlock("block", "math_single")
            .addBlock("block", "math_single")
            .addBlock("block", "text_create_join_item")
            .addBlock("block", "text_append")
            .addBlock("block", "text_length")
            .addBlock("block", "text_isEmpty")
            .addBlock("block", "text_indexOf")
            .addBlock("block", "text_charAt")
            .addBlock("block", "text_getSubstring")
            .addBlock("block", "text_changeCase")
            .addBlock("block", "text_trim")
            .addBlock("block", "text_print")
            .addBlock("block", "text_prompt_ext")
            .addBlock("block", "text_prompt")
            .addBlock("block", "text_count")
            .addBlock("block", "text_replace")
            .addBlock("block", "text_reverse");
        this.addCategory("Control")
            .addBlock("block", "controls_if")
            .addBlock("block", "controls_ifelse");
        this.addCategory("Logic")
            .addBlock("block", "logic_compare")
            .addBlock("block", "logic_operation")
            .addBlock("block", "logic_negate")
            .addBlock("block", "logic_boolean")
            .addBlock("block", "logic_null")
            .addBlock("block", "logic_ternary");
        this.addCategory("Loops")
            .addBlock("block", "controls_repeat_ext")
            .addBlock("block", "controls_whileUntil")
            .addBlock("block", "controls_for")
            .addBlock("block", "controls_forEach")
            .addBlock("block", "controls_flow_statements");
        this.addCategory("List")
            .addBlock("block", "lists_create_empty")
            .addBlock("block", "lists_create_with")
            .addBlock("block", "lists_create_with_container")
            .addBlock("block", "lists_repeat")
            .addBlock("block", "lists_reverse")
            .addBlock("block", "lists_length")
            .addBlock("block", "lists_getSublist")
            .addBlock("block", "lists_isEmpty")
            .addBlock("block", "lists_split")
            .addBlock("block", "lists_sort")
            .addBlock("block", "lists_indexOf")
            .addBlock("block", "lists_getIndex")
            .addBlock("block", "lists_setIndex");
        this.addSeparator();
    }
}