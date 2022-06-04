import {LibBlockly} from "./LibBlockly.js";
import defaultToolbox from "./blocks/LibBlockly-toolbox.js";
import "./blocks/blocks_foundry_roll.js";
import "./blocks/blocks_foundry_chat.js";
import "./blocks/blocks_foundry_token.js";
import "./blocks/blocks_foundry_scene.js";
import "./blocks/blocks_foundry_user.js";
import "./blocks/blocks_foundry_rolltable.js";
import "./blocks/blocks_foundry_combat.js";
import "./blocks/blocks_foundry_playlist.js";
import "./blocks/blocks_foundry_macro.js";
import "./blocks/blocks_foundry_notification.js";
import "./blocks/blocks_foundry_utils.js";
import "./blocks/blocks_foundry_item.js";

Hooks.once("init", async () => {

    new LibBlockly({
        toolbox: defaultToolbox
    });

    /* Temporary migration code */
    //await Promise.all(game.macros.contents.filter(x => x.data.flags.blockly?.enabled).map(async x => await x.update({"flags.blockly.enabled":true})));
    //await Promise.all(game.macros.contents.filter(x => x.data.flags.blockly?.enabled==="false").map(async x => await x.update({"flags.blockly.enabled":false})));


    /*
        game.settings.register(LibBlockly.ID(), "collapse", {
            name: game.i18n.localize("LibBlockly.Settings.Collapse.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Collapse.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID(), "comments", {
            name: game.i18n.localize("LibBlockly.Settings.Comments.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Comments.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID(), "disable", {
            name: game.i18n.localize("LibBlockly.Settings.Disable.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Disable.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID(), "trashcan", {
            name: game.i18n.localize("LibBlockly.Settings.Trashcan.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.Trashcan.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: true
        });

        game.settings.register(LibBlockly.ID(), "horizontalLayout", {
            name: game.i18n.localize("LibBlockly.Settings.HorizontalLayout.Title"),
            hint: game.i18n.localize("LibBlockly.Settings.HorizontalLayout.Description"),
            scope: "client",
            config: true,
            type: Boolean,
            default: false
        });
    */
});

/*
class BlocklyToolbox {
    constructor() {
        this.categories = [];
    }

    addCategory(name) {
        return this.categories.push({
            "kind": "category",
            "name": name,
            "contents": []
        });
    }

    pushToCategory(name, block) {
        this.categories.find(c => c.name === name).contents.push(block);
    }

    register(categoryName, block_id, spec, codeGeneration_callback) {
        Blockly.Blocks[block_id] = spec;
        Blockly.JavaScript[block_id] = codeGeneration_callback;
        this.pushToCategory(categoryName, {
            "kind": "block",
            "type": block_id
        });
    }


    build() {
        return {
            collapse: game.settings.get(LibBlockly.ID(), "collapse"),
            comments: game.settings.get(LibBlockly.ID(), "comments"),
            disable: game.settings.get(LibBlockly.ID(), "disable"),
            trashcan: game.settings.get(LibBlockly.ID(), "trashcan"),
            move: {
                scrollbars: {
                    horizontal: true,
                    vertical: true
                },
                drag: true,
                wheel: false
            },
            horizontalLayout: game.settings.get(LibBlockly.ID(), "horizontalLayout"),
            toolbox: this._toolbox
        }
    }
}
*/