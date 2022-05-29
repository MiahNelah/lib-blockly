import { LibBlocky } from "./LibBlockly.js";
import defaultToolbox from "./blocks/libblocky-toolbox.js";
import "./blocks/blocks_foundry_roll.js";

Hooks.once("init", () => {

    new LibBlocky({
        toolbox: defaultToolbox
    });

});