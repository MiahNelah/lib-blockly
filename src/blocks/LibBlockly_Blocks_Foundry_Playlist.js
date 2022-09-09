import { CustomBlock } from "../CustomBlock.js";

export class PlaylistGetByNameOrIdCustomBlock extends CustomBlock {
    constructor() {
        super("GetByNameOrId", "Foundry.Playlist");
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
Object.freeze(PlaylistGetByNameOrIdCustomBlock);

export class PlaylistPlayCustomBlock extends CustomBlock {
    constructor() {
        super("Play", "Foundry.Playlist");
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
Object.freeze(PlaylistPlayCustomBlock);

export class PlaylistPlayNextTrackCustomBlock extends CustomBlock {
    constructor() {
        super("PlayNextTrack", "Foundry.Playlist");
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
Object.freeze(PlaylistPlayNextTrackCustomBlock);

export class PlaylistPlayPreviousTrackCustomBlock extends CustomBlock {
    constructor() {
        super("PlayPreviousTrack", "Foundry.Playlist");
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
Object.freeze(PlaylistPlayPreviousTrackCustomBlock);

export class PlaylistGetAllCustomBlock extends CustomBlock {
    constructor() {
        super("GetAll", "Foundry.Playlist");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.playlists.contents`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(PlaylistGetAllCustomBlock);

export class PlaylistGetPlayingCustomBlock extends CustomBlock {
    constructor() {
        super("GetPlaying", "Foundry.Playlist");
    }

    /**
     *
     * @param {!Blockly.BlockSvg} block
     */
    generateCode(block) {
        return [`game.playlists.playing`, Blockly.JavaScript.ORDER_NONE];
    }
}
Object.freeze(PlaylistGetPlayingCustomBlock);

export class PlaylistStopCustomBlock extends CustomBlock {
    constructor() {
        super("Stop", "Foundry.Playlist");
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
Object.freeze(PlaylistStopCustomBlock);

export class PlaylistCycleModeCustomBlock extends CustomBlock {
    constructor() {
        super("CycleMode", "Foundry.Playlist");
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
Object.freeze(PlaylistCycleModeCustomBlock);
