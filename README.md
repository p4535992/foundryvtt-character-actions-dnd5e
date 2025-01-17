# Character Actions 5e Variant

![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads@latest&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fp4535992%2Ffoundryvtt-character-actions-dnd5e%2Freleases%2Flatest)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fcharacter-actions-list-5e&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=character-actions-list-5e)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fcharacter-actions-list-5e%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/character-actions-list-5e/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fcharacter-actions-list-5e%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/character-actions-list-5et/)

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-character-actions-dnd5e%2Fmain%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)
![Manifest+ Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-character-actions-dnd5e%2Fmain%2Fsrc%2Fmodule.json&label=Manifest%2B%20Version&query=$.manifestPlusVersion&colorB=blue)

[![ko-fi](https://img.shields.io/badge/-buy%20me%20a%20coke-%23FF5E5B)](https://ko-fi.com/elffriend)
[![patreon](https://img.shields.io/badge/-patreon-%23FF424D)](https://www.patreon.com/ElfFriend_DnD)

## THIS MODULE IS A VARIANT VERSION OF THE [Character Actions 5e](https://github.com/ElfFriend-DnD/foundryvtt-dnd5eCharacterActions)

This module provides a placeable reusable "component" which details all of the actions a given Character Actor can take, intending to replicate the list in the Actions Tab of the D&DBeyond character sheet. The module has two ways in which it can be used: it will either inject the actions tab itself, or another module can leverage the API it provides and use that to inject the proper HTML wherever it desires.

### What is variant ?

The original author expressed doubts about accepting PR on this because the changes on the code are many and would require many checks, but upgrading the system to 2.1.X forced my hand and o decided to create a variant module of the original one for private use anyone can use it if they find it useful. Below are the differences

- Update typescript and all that goes with it (for example replace getGame() with standard game)
- restructured the code to comply with the standard "languages", "scripts", "assests", "lib" folders from https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template 
- all functions related to the API have been transferred to the file "api.ts" and reachable on `game.modules.get('character-actions-list-5e').api`
- For retrocompatibility issue i still use the original module id so be aware
- There is a better css compatibility with the orrible Tidy5e Sheet...

I think I could have done the job better, but let me know what you think.

![preview](./wiki/images/preview.png)

## Known Issues

- Using an item which changes charges or spell slots on any sheet that does not natively implement CharacterActions causes the tab to change.

## List Features

By default the list will attempt to narrow down your active abilities, items, and spells into the ones most likely to be useful in Combat. The full logic for the filter is in `isItemInActionList` inside `src/modules/helpers.ts`. Here are the basics:

For Weapons:

- Is it equipped?

For Equipment:

- Does it have an activation cost (excluding anything that takes longer than a minute or none) and is it equipped?

For Consumables:

- If the "Include Consumables" setting is set, does it have an activation cost (excluding anything that takes longer than a minute or none)?

For Spells:

- If the spell needs to be prepared but isn't, exclude it.
- Does it do damage (or healing)?
- Does it have an activation cost of 1 reaction or 1 bonus action?
- If the "Include Minute-long Spells" setting is set, does it have a duration of up to 1 minute (1 round - 1 minute)?
- If the "Include Spells With Effects" setting is set, does the spell have any active effects?

For Features:

- Does it have an activation cost (excluding anything that takes longer than a minute or none)?

Additionally, you can override the default list by selectively including or excluding items by toggling the little Fist in item controls.

## Installation

Module JSON:

```
https://github.com/p4535992/foundryvtt-character-actions-dnd5e/releases/latest/download/module.json
```

## Options

| **Name**                                          | Description                                                                                                                                                                                          |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Limit Actions to Cantrips**                     | Instead of showing all spells that deal damage in the Actions list, limit it to only cantrips. This is the default D&DBeyond behavior.                                                               |
| **Include Minute-long Spells as Actions**         | Include spells with a duration of one minute or less (e.g. 1 round) and an activation time of 1 Action or 1 Bonus Action (e.g. Bless, Bane, Command) in the Actions tab/panel by default.            |
| **Include Spells with Active Effects as Actions** | Include spells with active effects attached (e.g. Barkskin) in the Actions tab/panel by default.                                                                                                     |
| **Include Consumables as Actions**                | Include consumables which have an activation cost (Action, Bonus Action, etc) in the Actions list by default.                                                                                        |
| **Inject Character Actions List**                 | Should this module inject an Actions List into the default character sheet? Note that if you are using a sheet module which integrates the actions list on its own, this will not affect that sheet. |
| **Inject NPC Actions List**                       | Should this module inject an Actions List into the default npc sheet? Note that if you are using a sheet module which integrates the actions list on its own, this will not affect that sheet.       |
| **Inject Vehicle Actions List**                   | Should this module inject an Actions List into the default vehicle sheet? Note that if you are using a sheet module which integrates the actions list on its own, this will not affect that sheet.   |

## API

After the hook `CharacterActions5eReady` is fired, the following api methods are expected to be available in the `game.modules` entry for this module: `game.modules.get('character-actions-list-5e').api`:

### `async renderActionsList(actorData: Actor5eCharacter, appId: number): HTMLElement`

Returns the output of `renderTemplate` (an `HTMLElement`) after getting the provided actor's action data. This can then be injected wherever in your own DOM.

### Example

```ts

class MyCoolCharacterSheet extends ActorSheet5e {

  // other stuff your sheet module does...

  async _renderInner(...args) {
    const html = await super._renderInner(...args);
    const actionsListApi = game.modules.get('character-actions-list-5e').api;

    try {
      const actionsTab = html.find('.actions');

      const actionsTabHtml = $(await actionsListApi.renderActionsList(this.actor));
      actionsTab.html(actionsTabHtml);
    } catch (e) {
      log(true, e);
    }

    return html;
  }
}
```

### `isItemInActionList(item: Item5e): boolean`

A handlebars helper is provided as well in case any sheet wants an easy way to check if an Item being rendered is expected to be part of the Actions List. `character-actions-list-5e-isItemInActionList` is a simple wrapper around `isItemInActionList`, it expects the same argument of an `item` instance.

#### Example

```ts

class MyCoolItemSheet extends ItemSheet5e {

  // other stuff your sheet module does...

  getData() {
    // const data = { someOtherStuff };
    const actionsListApi = game.modules.get('character-actions-list-5e').api;

    try {
      data.isInActionList = actionsListApi.isItemInActionList(this.item);
    } catch (e) {
      log(true, e);
    }

    return data;
  }
}
```

### `getActorActionsData(actor: Actor5e): ActorActionsList`

```ts
type ActorActionsList = Record<
  'action' | 'bonus' | 'crew' | 'lair' | 'legendary' | 'reaction' | 'other',
  Set<Partial<Item5e>>
>
```

When passed an actor, returns the actor's 'actions list' items organized by activation type. I'm not sure why but it seems some of the information is missing from the Item5e in this list, be wary of that if you are looking to use this in another module.

### Handlebars Helper: `character-actions-list-5e-isItemInActionList`

A handlebars helper is provided as well in case any sheet wants an easy way to check if an Item being rendered is expected to be part of the Actions List. `character-actions-list-5e-isItemInActionList` is a simple wrapper around `isItemInActionList`, it expects the same argument of an `item` instance.

#### Example

```hbs
{{#each items as |item|}}
  {{!-- other stuff --}}
  {{#if (character-actions-list-5e-isItemInActionList item)}}Action{{/if}}
{{/each}}
```

### Blocking the default Injection

If a sheet module wants to specifically block the injection of the actions tab without implementing the actions list itself, add `blockActionsTab` to the options being passed to the FormApplication class.

**Note:** that by default, the actions tab will only inject itself if no DOM element with the class `.character-actions-list-5e` exists in the Application being rendered.

#### Example

```js
// class SomeAwesomeSheet extends SomeActorSheetClass {
  // ...
  // get defaultOptions() {
    // return mergeObject(super.defaultOptions, {
      blockActionsTab: true,
    // ...
```

This will cause the Actions Tab's auto injection to stop before any DOM is injected.

### Compatibility

I'm honestly not sure how well this will play with modules that affect character sheets or dice rolls, I'll try to test as many as possible but if something is obviously breaking please create and issue here and I'll see what I can do.

| **Name**                                                                                            |       Works        | Notes                                                             |
| --------------------------------------------------------------------------------------------------- | :----------------: | ----------------------------------------------------------------- |
| [Better Rolls 5e](https://github.com/RedReign/FoundryVTT-BetterRolls5e)                             | :white_check_mark: | Compatible with version 1.3.7+.                                   |
| [Midi-QOL](https://gitlab.com/tposney/midi-qol)                                                     | :white_check_mark: | Works as expected.                                                |
| [Minimal Roll Enhancements](https://github.com/schultzcole/FVTT-Minimal-Rolling-Enhancements-DND5E) | :white_check_mark: | Works as expected.                                                |
| [Mars 5e](https://github.com/Moerill/fvtt-mars-5e)                                                  | :white_check_mark: | Works as expected.                                                |
| [FoundryVTT Magic Items](https://gitlab.com/riccisi/foundryvtt-magic-items)                         |      :shrug:       | Spells assigned to magic items do not appear in the Actions List. |
| [Inventory+](https://github.com/syl3r86/inventory-plus)                                             | :white_check_mark: | Inventory+ organization has no effect on Actions Tab              |

# Build

## Install all packages

```bash
npm install
```
## npm build scripts

### build

will build the code and copy all necessary assets into the dist folder and make a symlink to install the result into your foundry data; create a
`foundryconfig.json` file with your Foundry Data path.

```json
{
  "dataPath": "~/.local/share/FoundryVTT/"
}
```

`build` will build and set up a symlink between `dist` and your `dataPath`.

```bash
npm run-script build
```

### NOTE:

You don't need to build the `foundryconfig.json` file you can just copy the content of the `dist` folder on the module folder under `modules` of Foundry

### build:watch

`build:watch` will build and watch for changes, rebuilding automatically.

```bash
npm run-script build:watch
```

### clean

`clean` will remove all contents in the dist folder (but keeps the link from build:install).

```bash
npm run-script clean
```

### prettier-format

`prettier-format` launch the prettier plugin based on the configuration [here](./.prettierrc)

```bash
npm run-script prettier-format
```

### package

`package` generates a zip file containing the contents of the dist folder generated previously with the `build` command. Useful for those who want to manually load the module or want to create their own release

```bash
npm run-script package
```

## [Changelog](./CHANGELOG.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/p4535992/foundryvtt-character-actions-dnd5e/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## Acknowledgements

Bootstrapped with Nick East's [create-foundry-project](https://gitlab.com/foundry-projects/foundry-pc/create-foundry-project).

Mad props to the [League of Extraordinary FoundryVTT Developers](https://forums.forge-vtt.com/c/package-development/11) community which helped me figure out a lot.
