import { LibBlocky } from "./LibBlockly.js";
import defaultToolbox from "./blocks/libblocky-toolbox.js";
import "./blocks/blocks_foundry_roll.js";
import "./blocks/blocks_foundry_chat.js";
import "./blocks/blocks_foundry_token.js";
import "./blocks/blocks_foundry_scene.js";
import "./blocks/blocks_foundry_user.js";
import "./blocks/blocks_foundry_rolltable.js";
import "./blocks/blocks_foundry_playlist.js";

Hooks.once("init", () => {

    new LibBlocky({
        toolbox: defaultToolbox
    });

});