export class GetItemByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_item_get_item_by_name_or_id";
        this.category = "Foundry.Item";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.LookupByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.LookupById"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Item"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Item.GetItemByNameOrId.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const dropdown_lookuptype = block.getFieldValue('lookupType');
        const value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
        switch (dropdown_lookuptype) {
            case "name":
                return [`game.items.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.items.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

export class GetItemsFromActorOrTokenCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_items_get_items_from_actor_or_token";
        this.category = "Foundry.Item";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Item.GetItemsFromActorOrToken.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "actorOrToken",
                    "check": [
                        "Actor",
                        "Token",
                        "String"
                    ]
                }
            ],
            "output": [
                "Array"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Item.GetItemsFromActorOrToken.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Item.GetItemsFromActorOrToken.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Item.GetItemsFromActorOrToken.HelpUrl")
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_actorortoken = Blockly.JavaScript.valueToCode(block, 'actorOrToken', Blockly.JavaScript.ORDER_ATOMIC);
        const getItemsFromActorOrTokenHelper = Blockly.JavaScript.provideFunction_(`${this.key}_get_items_from_actor_or_token`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken) {`,
            `  if (!actorOrToken) return;`,
            `  if (actorOrToken instanceof Actor) return actorOrToken.getEmbeddedCollection("Item").contents;`,
            `  if (actorOrToken instanceof Token) return ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken.actor);`,
            `  if (typeof actorOrToken === 'string') return ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(await fromUUid(actorOrToken));`,
            `}`
        ]);
        return [`await ${getItemsFromActorOrTokenHelper}(${value_actorortoken})`, Blockly.JavaScript.ORDER_NONE];
    }
}

export class AddItemToTokenOrActorCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_item_add_item_to_token_or_actor";
        this.category = "Foundry.Item";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Item.AddItemToTokenOrActor.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "item",
                    "check": [
                        "Item",
                        "Array",
                        "String"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "parent",
                    "check": [
                        "Token",
                        "Actor",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Item.AddItemToTokenOrActor.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Item.AddItemToTokenOrActor.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Item.AddItemToTokenOrActor.HelpUrl")
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_item = Blockly.JavaScript.valueToCode(block, 'item', Blockly.JavaScript.ORDER_ATOMIC);
        const value_parent = Blockly.JavaScript.valueToCode(block, 'parent', Blockly.JavaScript.ORDER_ATOMIC);

        const getItemsDataHelper = Blockly.JavaScript.provideFunction_(`${this.key}_get_item_data`, [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(item) {`,
            `  if (!item) return [];`,
            `  if (item instanceof Item) return item.toObject();`,
            `  if (Array.isArray(item) && item.length > 0) return item.map(i => ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(i));`,
            `  if (typeof item === 'string') return game.items.get(item) ?? game.items.getName(item);`,
            `}`
        ]);

        const addItemstoActorOrTokenHelper = Blockly.JavaScript.provideFunction_(`${this.key}_add_items_to_actor_or_token`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(parent, items) {`,
            `  if (!parent || !items || items.length === 0) return;`,
            `  if (parent instanceof Actor) return await parent.createEmbeddedDocuments("Item", Array.isArray(items) ? items : [items]);`,
            `  if (parent instanceof Token) return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(parent.actor, items);`,
            `  if (Array.isArray(parent)) return await Promise.all(parent.map(p => ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(p, items)));`,
            `}`
        ]);
        return `await ${addItemstoActorOrTokenHelper}(${value_parent}, await ${getItemsDataHelper}(${value_item}));\n`;
    }
}

export class RemoveItemsFromActorOrTokenCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_items_remove_items_from_actor_or_token";
        this.category = "Foundry.Item";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Item.RemoveItemFromActorOrToken.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "items",
                    "check": ["Array", "Item"]
                },
                {
                    "type": "input_value",
                    "name": "actorOrToken",
                    "check": [
                        "Actor",
                        "Token",
                        "Array"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Item.RemoveItemFromActorOrToken.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Item.RemoveItemFromActorOrToken.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Item.RemoveItemFromActorOrToken.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_items = Blockly.JavaScript.valueToCode(block, 'items', Blockly.JavaScript.ORDER_ATOMIC);
        const value_actorortoken = Blockly.JavaScript.valueToCode(block, 'actorOrToken', Blockly.JavaScript.ORDER_ATOMIC);

        const removeItemsFromActorOrTokenHelper = Blockly.JavaScript.provideFunction_(`${this.key}_remove_items_from_actor_or_token`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken, items) {`,
            `  if (!actorOrToken || !items || items.length === 0) return;`,
            `  if (actorOrToken instanceof Actor) return await actorOrToken.deleteEmbeddedDocuments("Item", Array.isArray(items) ? items.map(i => i.id) : [items.id]);`,
            `  if (actorOrToken instanceof Token) return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken.actor, items);`,
            `  if (Array.isArray(actorOrToken)) return await Promise.all(actorOrToken.map(p => ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(p, items)));`,
            `}`
        ]);
        return `await ${removeItemsFromActorOrTokenHelper}(${value_actorortoken}, ${value_items});\n`;
    }
}
