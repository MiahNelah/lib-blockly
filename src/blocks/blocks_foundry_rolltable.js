const blocks = [
    {
        name: "foundry_rolltable_roll",
        definition: {
            init: async () => {
                this.appendDummyInput()
                    .appendField(game.i18n.localize("LibBlocky.Blocks.Foundry.Rolltable.Roll"));
                this.appendValueInput("roll")
                    .setCheck("Roll");
                this.setOutput(true, 'array');
                this.setInput(true);
                this.setNextStatement(true, "action");
                this.setPreviousStatement(true, "action");
                this.setColour(160);
                this.setHelpUrl("");
                this.setTooltip("");

            }
        },
        callback: async (block) => {
            const roll = block.getField("roll").getValue();
            return `(${roll} !== undefined ? (await ${roll}.roll({async:true})?.results) : [];`;
        },
        toolbox: {
            "Foundry.Rolltable": {
                "name": "foundry_rolltable_roll",
                "kind": "block"
            }
        }
    }
]


Blockly.Blocks["foundry_rolltable_roll"] = {
    init: async function() {
        this.appendDummyInput("topInput")
                .appendField("Roll table ")
                .appendField(new Blockly.FieldDropdown([
                    ["From world", "world"],
                    ["From comprendium", "compendium"]
                ], this.validateSourceType), "sourceType")
                /*
                .appendField(new Blockly.FieldDropdown([
                    ["by name", "name"],
                    ["by identifier", "id"]
                ]), "lookupMethod")
                .appendField(new Blockly.FieldDropdown(this.lookupTables), "tableList")
                */
               ;
        this.setOutput(false);
        this.setNextStatement(true, "action");
        this.setPreviousStatement(true, "action");
        this.setColour(160);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    validateSourceType: async function(val) {        
        const topInput = this.getSourceBlock().getInput("topInput");
        if (topInput === undefined) return;
        
        topInput.removeField("compendiumList", true);
        topInput.removeField("tableList", true);
        
        switch (val) {
            case "world":                            
                topInput.appendField(new Blockly.FieldDropdown(await this.getSourceBlock().lookupTables(this.getSourceBlock())), "tableList");
            break;
            case "compendium":                
                topInput.appendField(new Blockly.FieldDropdown(this.getSourceBlock().lookupTableCompendiums), "compendiumList");
                topInput.appendField(new Blockly.FieldDropdown(await this.getSourceBlock().lookupTables(this.getSourceBlock())), "tableList");
            break;
        }        
        return true;
    },

    validateCompendium: function(topInput) {       
        topInput.appendField(new Blockly.FieldDropdown(topInput.getSourceBlock().lookupTables(topInput.getSourceBlock())), "tableList");
        return true;
    }, 

    lookupTableCompendiums: function() {
        return game.packs.filter(table => table.documentName === "RollTable").map(table => [table.title, table.title]);
    },

    lookupTables: async function(sourceBlock) {
        if (sourceBlock === null) return [["-","-"]];
        const sourceType = sourceBlock.getField("sourceType").getValue();
        
        switch (sourceType) {
            case "world": return game.tables.contents.map(table => table.name).map(x => [x, x]);            
            case "compendium": 
                const compendium = sourceBlock.getField("compendiumList").getValue();
                return (await game.packs.getName(compendium).getIndex(["name", "_id"])).map(table => [table.name, table._id]);
        }
        return [["-","-"]];
    }
}

Blockly.JavaScript["foundry_rolltable_roll"] = function(block) {
    const value_sourceType = block.getField("sourceType").getValue();
    const value_lookupMethod = block.getField("lookupMethod").getValue();
    const value_tableList = block.getField("tableList").getValue();

    let code = "";
    if (value_sourceType === "world") {
        code = "game.tables.";
        switch (value_lookupMethod) {
            case "name": code = `${code}getName('${value_tableList}')`;  break;
            case "id": code = `${code}get('${value_tableList}')`;  break;
        }
    } else {
        code = "game.tables.";
        switch (value_lookupMethod) {
            case "name": code = `${code}getName('${value_tableList}')`;  break;
            case "id": code = `${code}get('${value_tableList}')`;  break;
        }
    }
    return `(await ${code}).roll();`;
}    

Hooks.once('ready', async function() {
    //game.modules.get("lib-blockly").instance.registerBlocks(blocks);
})