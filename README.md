# About

 :warning: This module is still in experimental state, some issues are expected. :warning:

You love creating fantastic worlds and stories in Foundry, but you're afraid of macros? Would you rather plan your campaign than lear how to program? 

LibBlockly offers a visual macro editor integrated with Foundry using [Google Blockly](https://developers.google.com/blockly) technology. This type of editor is generally used for the initiation to programming, so it is easy to access: only the understanding of the algorithmic logic is necessary.

LibBlockly is also extensible framework which allow developers to create new blocks for general purposes or to help people to use their own modules.

Minimum Core Version: 0.9.245

# Tutorials

You can find first steps guides here : [English](https://github.com/MiahNelah/lib-blockly/wiki/First-steps) [Français](https://github.com/MiahNelah/lib-blockly/wiki/Premiers-pas)

# Demo

How to create new Blockly Macro :
![new_macro](https://user-images.githubusercontent.com/1334405/171999317-df2e74d6-3f27-4170-bd01-e2e694dc3f25.gif)


Hello, World !

![HelloWorld](https://user-images.githubusercontent.com/1334405/170825801-e54456d6-5bea-4874-a5de-b670f1a79a03.gif)

Change tokens visibility

![TokenVisibility](https://user-images.githubusercontent.com/1334405/170879543-21ac8ed0-e198-458d-a79b-2b8d902f3901.gif)


(more to come :blush:)

# Roadmap

The current roadmap is here : https://github.com/MiahNelah/lib-blockly/projects/1

# Extensibility

You can easily add new custom blocks using [Google Blockly documentation](https://developers.google.com/blockly/guides/overview) and [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html).
To create a new custom block, create a new class on the following template, then register the new block with Block Manager.

```javascript
class WaitCustomBlock {
    constructor() {
        // Only use "block"
        this.kind = "block";
        
        // An unique identifier for this custom block.
        this.key = "foundry_utils_delay";

        // Toolbox category path. You cas use dot notation to manage sub-category.
        // Categories will be created if needed;
        this.category = "Foundry.Utils";
    }

    // init() must return an object. Object define block's configuration    
    // Use Blockly Developer Tools to generate this object, then tweak it.
    // You can use game.i18n.localize() a bit everywhere to handle translations.
    // WARNING: Please remove "type" attribute: it will be append dynamically.
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Title"),
            "args0": [
                {
                    "type": "field_number",
                    "name": "delay",
                    "value": 1,
                    "min": 0
                },
                {
                    "type": "field_dropdown",
                    "name": "units",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Seconds"), "s"],
                        [game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Milliseconds"), "ms"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Utils.Wait.HelpUrl"),
        }
    }

    // The generateCode() describe how code is generated for your new block.
    // Use Blockly Developer Tools to get parameter resolution statements.
    generateCode(block) {
        const number_delay = block.getFieldValue('delay');
        const dropdown_units = block.getFieldValue('units');

        // In this specific block, we dynamically define a helper method to handle setTimeout promise.
        // This method will only be generated once if needed, and won't be if block is never used.
        // Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ is a placeholder to reference method hersel (useful for recursive calls).
        const delayHelper = Blockly.JavaScript.provideFunction_("blockly_delay_helper", [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(delay) {`,
            `  return new Promise(resolve => {`,
            `    setTimeout(() => resolve(2), delay);`,
            `  });`,
            `}`
        ]);

        return `await ${delayHelper}(${dropdown_units === "s" ? number_delay * 1000 : number_delay});\n`;
    }
}

// We're done! Just register your block using global Block Manager.
Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new WaitCustomBlock()
    ]);
})
```
