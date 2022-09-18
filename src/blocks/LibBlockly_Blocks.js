import * as Actor from "./LibBlockly_Blocks_Foundry_Actor.js";
import * as Chat from "./LibBlockly_Blocks_Foundry_Chat.js";
import * as Combat from "./LibBlockly_Blocks_Foundry_Combat.js";
import * as Item from "./LibBlockly_Blocks_Foundry_Item.js";
import * as Journal from "./LibBlockly_Blocks_Foundry_Journal.js";
import * as Macro from "./LibBlockly_Blocks_Foundry_Macro.js";
import * as Playlist from "./LibBlockly_Blocks_Foundry_Playlist.js";
import * as Roll from "./LibBlockly_Blocks_Foundry_Roll.js";
import * as RollTable from "./LibBlockly_Blocks_Foundry_RollTable.js";
import * as Scene from "./LibBlockly_Blocks_Foundry_Scene.js";
import * as Token from "./LibBlockly_Blocks_Foundry_Token.js";
import * as User from "./LibBlockly_Blocks_Foundry_User.js";
import * as Utils from "./LibBlockly_Blocks_Foundry_Utils.js";

import BlockDefinitions from "./block_definitions.js";

Hooks.once("ready", () => {
    libBlockly.registerDefinitions(BlockDefinitions());

    libBlockly.registerBlockTypes([
        /* ACTOR */
        Actor.ActorGetByNameOrIdCustomBlock,
        Actor.ActorGetTokenCustomBlock,
        Actor.ActorGetAllCustomBlock,
        Actor.ActorGetTokensInCurrentSceneCustomBlock,

        /* CHAT */
        Chat.SendMessageCustomBlock,

        /* COMBAT */
        Combat.CombatStartCustomBlock,
        Combat.CombatActivateCustomBlock,
        Combat.CombatEndCustomBlock,
        Combat.CombatResetCustomBlock,
        Combat.CombatNextRoundCustomBlock,
        Combat.CombatPreviousRoundCustomBlock,
        Combat.CombatNextTurnCustomBlock,
        Combat.CombatPreviousTurnCustomBlock,
        Combat.CombatIsActiveCustomBlock,
        Combat.CombatGetActiveCustomBlock,
        Combat.CombatCreateCustomBlock,

        /* ITEM */
        Item.ItemGetByNameOrIdCustomBlock,
        Item.ItemAddToTokenOrActorCustomBlock,
        Item.ItemGetFromActorOrTokenCustomBlock,
        Item.ItemRemoveFromActorOrTokenCustomBlock,

        /* JOURNAL */
        Journal.JournalGetByNameOrIdCustomBlock,
        Journal.JournalOpenCustomBlock,
        Journal.JournalShowAsCustomBlock,

        /* MACRO */
        Macro.MacroGetAllCustomBlock,
        Macro.MacroGetByNameOrIdCustomBlock,
        Macro.MacroRunCustomBlock,
        Macro.MacroCanRunCustomBlock,

        /* PLAYLIST */
        Playlist.PlaylistGetByNameOrIdCustomBlock,
        Playlist.PlaylistPlayCustomBlock,
        Playlist.PlaylistPlayNextTrackCustomBlock,
        Playlist.PlaylistPlayPreviousTrackCustomBlock,
        Playlist.PlaylistGetAllCustomBlock,
        Playlist.PlaylistGetPlayingCustomBlock,
        Playlist.PlaylistStopCustomBlock,
        Playlist.PlaylistCycleModeCustomBlock,

        /* ROLL */
        Roll.RollCustomBlock,

        /* ROLLTABLE */
        RollTable.RollTableGetTableResultDataCustomBlock,
        RollTable.RollTableRollCustomBlock,
        RollTable.RollTableGetTableResultDataCustomBlock,

        /* SCENE */
        Scene.SceneGetByNameOrIdCustomBlock,
        Scene.SceneViewCustomBlock,
        Scene.SceneActivateCustomBlock,
        Scene.SceneGetCurrentCustomBlock,
        Scene.SceneGetAllCustomBlock,

        /* TOKEN */
        Token.TokenShowCustomBlock,
        Token.TokenHideCustomBlock,
        Token.TokenToggleVisibilityCustomBlock,
        Token.TokenGetSelectionCustomBlock,
        Token.TokenGetAllInCurrentSceneCustomBlock,
        Token.TokenToggleCombatStateCustomBlock,
        Token.TokenGetAllInSceneCustomBlock,
        Token.TokenRotateCustomBlock,
        Token.TokenSetScaleCustomBlock,
        Token.TokenResetScaleCustomBlock,
        Token.TokenMoveCustomBlock,
        Token.TokenChangeElevationCustomBlock,

        /* USER */
        User.UserGetAllCustomBlock,
        User.UserGetActorCustomBlock,
        User.UserGetTokenInSceneCustomBlock,
        User.UserGetNyNameOrIdCustomBlock,
        User.UserPullToSceneCustomBlock,
        User.UserBanCustomBlock,
        User.UserUnbanCustomBlock,

        /* UTILS */
        Utils.WaitCustomBlock,
        Utils.ShowNotificationCustomBlock,

    ]);
})