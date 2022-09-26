# About

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

Let's prepare a battle !
![image](https://user-images.githubusercontent.com/1334405/172059866-a4dc2502-1c26-4622-a048-24072c5744a6.png)

Drag&Drop support

![drag&drop](https://user-images.githubusercontent.com/1334405/171998545-0182f6a2-5c43-4610-b9a1-55a67c677384.gif)


(more to come :blush:)

# Roadmap

The current roadmap is here : https://github.com/MiahNelah/lib-blockly/projects/1

# Extensibility

You can easily add new custom blocks using [Google Blockly documentation](https://developers.google.com/blockly/guides/overview) and [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html).
To create a new custom block, create a new class on the following template, then register the new block with Block Manager.

First, we need to specify our own custom block definition:

```javascript
// "message0", "colour", "tooltip" and "helpUrl" will be pulled from translation file for you.
// Because we often need to translate strings inside definition, we expose defnitions as function to grant access to game.i18n.localise() helper.
const blocksDefinition = function() {
    return {
        "Foundry.Utils.Wait": {            
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
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.Wait.Seconds"), "s"],
                        [game.i18n.localize("LibBlockly.Blocks.Foundry.Utils.Wait.Milliseconds"), "ms"]
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
        }
    }
}
```

Then, we need to add required translations. "Title", "Tooltip", "HelpUrl" and "Colour" are required.
If you want to custimise "LibBlockly.Blocks" prefix, please have a look at `CustomBlock` constructor's parameters.
```json
{
  "LibBlockly.Blocks.Foundry.Utils.Wait.Title": "Wait %1 %2",
  "LibBlockly.Blocks.Foundry.Utils.Wait.Tooltip": "",
  "LibBlockly.Blocks.Foundry.Utils.Wait.HelpUrl": "",
  "LibBlockly.Blocks.Foundry.Utils.Wait.Colour": "230",
}
```

We finally define a custom class to handle code generation:
```javascript
class WaitCustomBlock extends CustomBlock {
    constructor() {
        super("Wait", "Foundry.Utils");
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
```

Let's stick all together !
```javascript
Hooks.once("ready", () => {
    libBlockly.registerDefinitions(blocksDefinition());    

    libBlockly.registerBlockTypes([
        new WaitCustomBlock()
    ]);
 })
```
