class GetPlaylistByNameOrIdCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_get_playlist_by_name_or_id";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlaylistByNameOrId.Title"),
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "lookupType",
                    "options": [
                        [game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlaylistByNameOrId.LookupByName"), "name"],
                        [game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlaylistByNameOrId.LookupById"), "id"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "input",
                    "check": "String"
                }
            ],
            "output": [
                "Playlist"
            ],
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlaylistByNameOrId.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlaylistByNameOrId.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlaylistByNameOrId.HelpUrl"),
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
                return [`game.playlists.getName(${value_input})`, Blockly.JavaScript.ORDER_NONE];
            case "id":
                return [`game.playlists.get(${value_input})`, Blockly.JavaScript.ORDER_NONE];
        }
    }
}

class PlayPlaylistCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_play_playlist";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPlaylist.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPlaylist.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPlaylist.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPlaylist.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
        const playPlaylistHelper = Blockly.JavaScript.provideFunction_(`${this.key}_playPlaylist`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist) {`,
            `  if (!playlist) return;`,
            `  if (playlist instanceof Playlist && !playlist.playing) return await playlist.playAll();`,
            `  if (typeof playlist === 'string') return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(await fromUuid(playlist));`,
            `}`
        ]);
        return `await ${playPlaylistHelper}(${value_name});\n`;
    }
}

class PlayNextTrackCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_play_next_track";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayNextTrack.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayNextTrack.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayNextTrack.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayNextTrack.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
        const playNextTrackHelper = Blockly.JavaScript.provideFunction_(`${this.key}_playNextTrack`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist) {`,
            `  if (!playlist) return;`,
            `  if (playlist instanceof Playlist) return await playlist.playNext(undefined, {direction: 1});`,
            `  if (typeof playlist === 'string') return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.playlists.get(playlist) ?? game.playlists.getName(playlist));`,
            `}`
        ]);
        return `await ${playNextTrackHelper}(${value_name});\n`;
    }
}

class PlayPreviousTrackCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_play_previous_track";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPreviousTrack.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPreviousTrack.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPreviousTrack.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.PlayPreviousTrack.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
        const playPreviousTrackHelper = Blockly.JavaScript.provideFunction_(`${this.key}_playPreviousTrack`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist) {`,
            `  if (!playlist) return;`,
            `  if (playlist instanceof Playlist) return await playlist.playNext(undefined, {direction: -1});`,
            `  if (typeof playlist === 'string') return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.playlists.get(playlist) ?? game.playlists.getName(playlist));`,
            `}`
        ]);
        return `await ${playPreviousTrackHelper}(${value_name});\n`;
    }
}

class GetAllPlaylistsCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_get_all_playlists";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.GetAllPlaylists.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.GetAllPlaylists.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.GetAllPlaylists.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.GetAllPlaylists.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.playlists.contents`, Blockly.JavaScript.ORDER_NONE];
    }
}

class GetPlayingPlaylistsCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_get_playing_playlists";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlayingPlaylists.Title"),
            "output": "Array",
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlayingPlaylists.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlayingPlaylists.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.GetPlayingPlaylists.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.playlists.playing`, Blockly.JavaScript.ORDER_NONE];
    }
}

class StopPlaylistCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_stop_playlist";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.StopPlaylist.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "Array",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.StopPlaylist.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.StopPlaylist.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.StopPlaylist.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
        const stopPlaylistHelper = Blockly.JavaScript.provideFunction_(`${this.key}_stopPlaylist`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist) {`,
            `  if (!playlist) return;`,
            `  if (playlist instanceof Playlist) return await playlist.stopAll();`,
            `  if (Array.isArray(playlist)) return await Promise.all(playlist.filter(p => p instanceof Playlist && p.playing).map(p => p.stopAll()));`,
            `  if (typeof playlist === 'string') return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(game.playlists.get(playlist) ?? game.playlists.getName(playlist));`,
            `}`
        ]);
        return `await ${stopPlaylistHelper}(${value_name});\n`;
    }
}

class CyclePlaylistModeCustomBlock {
    constructor() {
        this.kind = "block";
        this.key = "foundry_playlist_cycle_playlist_mode";
        this.category = "Foundry.Playlist";
    }

    /**
     *
     * @return {!Object}
     */
    init() {
        return {
            "message0": game.i18n.localize("LibBlockly.Blocks.Playlist.CyclePlaylistMode.Title"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "playlist",
                    "check": [
                        "Playlist",
                        "String"
                    ]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": game.i18n.localize("LibBlockly.Blocks.Playlist.CyclePlaylistMode.Colour"),
            "tooltip": game.i18n.localize("LibBlockly.Blocks.Playlist.CyclePlaylistMode.Tooltip"),
            "helpUrl": game.i18n.localize("LibBlockly.Blocks.Playlist.CyclePlaylistMode.HelpUrl"),
        }
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        const value_name = Blockly.JavaScript.valueToCode(block, 'playlist', Blockly.JavaScript.ORDER_ATOMIC);
        const cyclePlaylistModeHelper = Blockly.JavaScript.provideFunction_(`${this.key}_cyclePlaylistMode`, [
            `async function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(playlist) {`,
            `  if (!playlist) return;`,
            `  if (playlist instanceof Playlist) return await playlist.cycleMode();`,
            `  if (typeof playlist === 'string') return await ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(await fromUuid(playlist));`,
            `}`
        ]);
        return `await ${cyclePlaylistModeHelper}(${value_name});\n`;
    }
}

Hooks.once('ready', () => {
    game.modules.get("libblockly").blockManager.register([
        new GetPlaylistByNameOrIdCustomBlock(),
        new PlayPlaylistCustomBlock(),
        new PlayNextTrackCustomBlock(),
        new PlayPreviousTrackCustomBlock(),
        new GetAllPlaylistsCustomBlock(),
        new GetPlayingPlaylistsCustomBlock(),
        new StopPlaylistCustomBlock(),
        new CyclePlaylistModeCustomBlock()
    ]);
})

