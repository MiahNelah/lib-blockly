class GetJournalByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_journal_get_journal_by_name_or_id";
        this.category = "Foundry.Journal";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Journal.GetJournalByNameOrId.Title"),
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
                "JournalEntry"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Journal.GetJournalByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Journal.GetJournalByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Journal.GetJournalByNameOrId.HelpUrl"),
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
                return [`game.journal.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.journal.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

class OpenJournalCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_journal_open_journal";
        this.category = "Foundry.Journal";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Journal.OpenJournal.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "journal",
                    "check": [
                        "JournalEntry"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Journal.OpenJournal.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Journal.OpenJournal.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Journal.OpenJournal.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'journal', Blockly.JavaScript.ORDER_ATOMIC);
        return `if (${value_name}) await ${value_name}.sheet.render(true);\n`;
    }
}

class ShowJournalAsCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_journal_show_journal_as";
        this.category = "Foundry.Journal";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Journal.ShowJournalAs.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "journal",
                    "check": [
                        "JournalEntry",
                        "String"
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "showAs",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Journal.ShowJournalAs.ShowAsText"), "text"],
                        [game.i18n.localize("LibBlockly.Blocks.Journal.ShowJournalAs.ShowAsImage"), "image"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Journal.ShowJournalAs.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Journal.ShowJournalAs.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Journal.ShowJournalAs.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'journal', Blockly.JavaScript.ORDER_ATOMIC);
        var dropdown_showAs = block.getFieldValue('showAs');
        return `if (${value_name}) await ${value_name}.show("${dropdown_showAs}");\n`;
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new GetJournalByNameOrIdCustomBlock(),
        new OpenJournalCustomBlock(),
        new ShowJournalAsCustomBlock()
    ]);
})






