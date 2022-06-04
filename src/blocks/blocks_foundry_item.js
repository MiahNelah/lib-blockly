Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_item_add_item_to_token_or_actor",
        "message0": "Add item %1 to actors/tokens %2",
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
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_items_get_items_from_actor_or_token",
        "message0": "Get items from actor/token %1",
        "args0": [
            {
                "type": "input_value",
                "name": "actorOrToken",
                "check": [
                    "Actor",
                    "Token"
                ]
            }
        ],
        "output": "Array",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_items_remove_item_from_actor_or_token",
        "message0": "Remove items %1 from actor/token %2",
        "args0": [
            {
                "type": "input_value",
                "name": "items",
                "check": "Array"
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
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.Blocks['foundry_item_get_item_from_world'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get item from world")
            .appendField(new Blockly.FieldDropdown(this.getItemList), "item-id");
        this.setOutput(true, "Item");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getItemList: function () {
        return game.items.map(x => [x.name, x.id]);
    }
};

Blockly.Blocks['foundry_item_get_item_by_id'] = {
    init: function() {
        this.appendValueInput("itemKey")
            .setCheck("String")
            .appendField("Get item from")
            .appendField(new Blockly.FieldDropdown([["World","world"], ["Compendium","compendium"]]), "sourceType");
        this.setOutput(true, "Item");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}


Blockly.JavaScript["foundry_item_get_item_from_world"] = function (block) {
    const itemId_input = block.getField('item-id').getValue();
    return [`game.items.get("${itemId_input}")`, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['foundry_item_add_item_to_token_or_actor'] = function (block) {
    const value_item = Blockly.JavaScript.valueToCode(block, 'item', Blockly.JavaScript.ORDER_ATOMIC);
    const value_parent = Blockly.JavaScript.valueToCode(block, 'parent', Blockly.JavaScript.ORDER_ATOMIC);

    const getItemsDataHelper = Blockly.JavaScript.provideFunction_("blockly_get_item_data", [
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(item) {`,
        `  if (!item) return [];`,
        `  if (item instanceof Item) return item.toObject();`,
        `  if (Array.isArray(item) && item.length > 0) return item.map(i => ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(i));`,
        `  if (typeof item === 'string') return game.items.get(item) ?? game.items.getName(item);`,
        `}`
    ]);

    const addItemstoActorOrTokenHelper = Blockly.JavaScript.provideFunction_("blockly_add_items_to_actor_or_token", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(parent, items) {`,
        `  if (!parent || !items || items.length === 0) return;`,
        `  if (parent instanceof Actor) return await parent.createEmbeddedDocuments("Item", Array.isArray(items) ? items : [items]);`,
        `  if (parent instanceof Token) return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(parent.actor, items);`,
        `  if (Array.isArray(parent)) return await Promise.all(parent.map(p => ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(p, items)));`,
        `}`
    ]);
    return `await ${addItemstoActorOrTokenHelper}(${value_parent}, await ${getItemsDataHelper}(${value_item}));\n`;
};

Blockly.JavaScript['foundry_items_get_items_from_actor_or_token'] = function(block) {
    const value_actorortoken = Blockly.JavaScript.valueToCode(block, 'actorOrToken', Blockly.JavaScript.ORDER_ATOMIC);
    const getItemsFromActorOrTokenHelper = Blockly.JavaScript.provideFunction_("blockly_get_items_from_actor_or_token", [
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken) {`,
        `  if (!actorOrToken || !items || items.length === 0) return;`,
        `  if (actorOrToken instanceof Actor) return actorOrToken.getEmbeddedCollection("Item").contents;`,
        `  if (actorOrToken instanceof Token) return ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken.actor);`,
        `}`
    ]);
    return [`${getItemsFromActorOrTokenHelper}(${value_actorortoken})`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['foundry_items_remove_item_from_actor_or_token'] = function(block) {
    const value_items = Blockly.JavaScript.valueToCode(block, 'items', Blockly.JavaScript.ORDER_ATOMIC);
    const value_actorortoken = Blockly.JavaScript.valueToCode(block, 'actorOrToken', Blockly.JavaScript.ORDER_ATOMIC);
    const removeItemsFromActorOrTokenHelper = Blockly.JavaScript.provideFunction_("blockly_remove_items_from_actor_or_token", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken, items) {`,
        `  if (!actorOrToken || !items || items.length === 0) return;`,
        `  if (actorOrToken instanceof Actor) return await actorOrToken.deleteEmbeddedDocuments("Item", Array.isArray(items) ? items.map(i => i.id) : [items.id]);`,
        `  if (actorOrToken instanceof Token) return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(actorOrToken.actor, items);`,
        `  if (Array.isArray(actorOrToken)) return await Promise.all(actorOrToken.map(p => ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(p, items)));`,
        `}`
    ]);
    return `await ${removeItemsFromActorOrTokenHelper}(${value_actorortoken}, ${value_items});\n`;
};


Blockly.JavaScript['foundry_item_get_item_by_id'] = function(block) {
    var dropdown_sourcetype = block.getFieldValue('sourceType');
    var value_itemkey = Blockly.JavaScript.valueToCode(block, 'itemKey', Blockly.JavaScript.ORDER_ATOMIC);

    switch (dropdown_sourcetype) {
        case "world":
            return [`game.items.get(${value_itemkey}) ?? game.items.getName(${value_itemkey})`, Blockly.JavaScript.ORDER_NONE];
            break;
        case "compendium":
            return [`(await Promise.all(game.packs.filter(x => x.documentName === "Item").flatMap(async pack => pack.getDocuments({name:${value_itemkey}})))).flatMap(x=>x).filter(x=>x)[0]`, Blockly.JavaScript.ORDER_NONE];
            break;
    }
};

Hooks.once('ready', () => {
    game.modules.get("libblockly")
        .toolboxManager.getCategory("Foundry", true)
        .addCategory("Item")
        .addBlock("block", "foundry_item_get_item_from_world")
        .addBlock("block", "foundry_item_add_item_to_token_or_actor")
        .addBlock("block", "foundry_items_get_items_from_actor_or_token")
        .addBlock("block", "foundry_items_remove_item_from_actor_or_token")
        .addBlock("block", "foundry_item_get_item_by_id");
})