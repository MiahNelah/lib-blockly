Blockly.defineBlocksWithJsonArray([
    {
        "type": "foundry_playlist_get_current_playing_playlist",
        "message0": "Get current playing playlist",
        "output": "Array",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "foundry_playlist_play_next2",
        "message0": "Play next track %1",
        "args0": [
            {
                "type": "input_value",
                "name": "playlist",
                "check": [
                    "String",
                    "Playlist"
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
        "type": "foundry_playlist_play_previous2",
        "message0": "Play previous track %1",
        "args0": [
            {
                "type": "input_value",
                "name": "playlist",
                "check": [
                    "String",
                    "Playlist"
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
        "type": "foundry_playlist_loop_playlist",
        "message0": "Change loop mode %1",
        "args0": [
            {
                "type": "input_value",
                "name": "playlist",
                "check": [
                    "String",
                    "Playlist"
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
        "type": "foundry_playlist_stop",
        "message0": "Stop all playlists",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.Blocks['foundry_playlist_get_playlist'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get playlist")
            .appendField(new Blockly.FieldDropdown(this.getPlaylistList), "playlist-id");
        this.setOutput(true, "Playlist");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getPlaylistList: function () {
        return game.playlists.map(x => [x.name, x.id]);
    }
};

Blockly.Blocks['foundry_playlist_play'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Play")
            .appendField(new Blockly.FieldDropdown(this.getPlaylistList), "playlist-id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getPlaylistList: function () {
        return game.playlists.map(x => [x.name, x.id]);
    }
};

Blockly.Blocks['foundry_playlist_play_next'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Play next")
            .appendField(new Blockly.FieldDropdown(this.getPlaylistList), "playlist-id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getPlaylistList: function () {
        return game.playlists.map(x => [x.name, x.id]);
    }
};

Blockly.JavaScript['foundry_playlist_get_current_playing_playlist'] = function (block) {
    return [`game.playlists.playing`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['foundry_playlist_get_playlist'] = function (block) {
    const dropdown_playlist = block.getFieldValue('playlist-id');
    return [`game.playlists.get("${dropdown_playlist}")`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['foundry_playlist_play'] = function (block) {
    const dropdown_playlist = block.getFieldValue('playlist-id');
    return `await game.playlists.get("${dropdown_playlist}").playAll();\n`;
};

Blockly.JavaScript['foundry_playlist_play_next2'] = function (block) {
    const value_playlist = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
    let playPlaylistHelper = Blockly.JavaScript.provideFunction_("blockly_play_playlist_helper", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist, dir=1) {`,
        `  if (!playlist) return undefined;`,
        `  if (playlist instanceof Playlist) {`,
        `    if (playlist.playing) {`,
        `      return await playlist.playNext(undefined, {direction: dir});`,
        `    } else {`,
        `      return await playlist.playAll();`,
        `    }`,
        `  }`,
        `  if (typeof playlist === 'string') {`,
        `    return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.playlists.get(playlist) ?? game.playlists.getName(playlist));`,
        `  }`,
        "}"
    ]);
    return `${playPlaylistHelper}(${value_playlist});\n`;
};

Blockly.JavaScript['foundry_playlist_play_previous2'] = function (block) {
    const value_playlist = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
    let playPlaylistHelper = Blockly.JavaScript.provideFunction_("blockly_play_playlist_helper", [
        `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist, dir=1) {`,
        `  if (!playlist) return undefined;`,
        `  if (playlist instanceof Playlist) {`,
        `    if (playlist.playing) {`,
        `      return await playlist.playNext(undefined, {direction: dir});`,
        `    } else {`,
        `      return await playlist.playAll();`,
        `    }`,
        `  }`,
        `  if (typeof playlist === 'string') {`,
        `    return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.playlists.get(playlist) ?? game.playlists.getName(playlist));`,
        `  }`,
        "}"
    ]);
    return `${playPlaylistHelper}(${value_playlist}, -1);\n`;
};

Blockly.JavaScript['foundry_playlist_loop_playlist'] = function (block) {
    const value_playlist = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Add loopkup by id
    return `await ${value_playlist}?.cycleMode();\n`;
};

Blockly.JavaScript['foundry_playlist_play_next'] = function (block) {
    const dropdown_playlist = block.getFieldValue('playlist-id');
    return `await game.playlists.get("${dropdown_playlist}").playNext();\n`;
};

Blockly.JavaScript['foundry_playlist_stop'] = function (block) {
    return `await game.playlists.playing.forEach(async playlist => await playlist.stopAll());\n`;
};

const toolbox = [
    {
        "kind": "category",
        "name": "Playlist",
        "contents": [
            {
                "kind": "block",
                "type": "foundry_playlist_get_playlist"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_get_current_playing_playlist"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_play"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_play_next"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_stop"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_play_next2"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_play_previous2"
            },
            {
                "kind": "block",
                "type": "foundry_playlist_loop_playlist"
            }
        ]
    }
]

Hooks.once('ready', () => {
    // TODO: find a better way to add custom blocks than this...
    game.modules.get("libblockly").instance.toolbox()
        .contents // root contents
        .find(x => x.name === "Foundry").contents // foundry category contents
        .push(...toolbox);
})


