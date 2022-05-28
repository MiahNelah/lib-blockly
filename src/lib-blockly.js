import { LibBlocky } from "./LibBlockly.js";
import defaultToolbox from "./blocks/libblocky-toolbox.js";

Hooks.once("init", () => {

    new LibBlocky({
        toolbox: defaultToolbox
    });

});