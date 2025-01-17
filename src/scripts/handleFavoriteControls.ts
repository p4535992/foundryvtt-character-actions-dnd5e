import API from "./api";
import CONSTANTS from "./constants";
import { MyFlags } from "./dnd5eCharacterActions-model";
import { error } from "./lib/lib";

export function addFavoriteControls(
	app: FormApplication & {
		object: Actor;
		actor: Actor;
	},
	html: JQuery
) {
	function createFavButton(filterOverride: boolean) {
		const labelFavOverride = filterOverride
			? game.i18n.localize(`${CONSTANTS.MODULE_ID}.button.setOverrideFalse`)
			: game.i18n.localize(`${CONSTANTS.MODULE_ID}.button.setOverrideTrue`);

		return `<a class="item-detail item-control item-action-filter-override ${
			filterOverride ? "active" : ""
		}" title="${labelFavOverride}">
            <i class="fas fa-fist-raised">
                <i class="fas fa-slash"></i>
                <i class="fas fa-plus"></i>
            </i>
            <span class="control-label">${labelFavOverride}</span>
            </a>`;
	}

	// add button to toggle favourite of the item in their native tab
	if (app.options.editable) {
		// Handle Click on our action
		$(html).on("click", "a.item-action-filter-override", (e) => {
			try {
				// const closestItemLi = <HTMLElement>$(e.target).parents("[data-item-id]")[0]; // BRITTLE
				// const itemId = <string>closestItemLi.dataset.itemId;
				const itemId = e.currentTarget.closest("[data-item-id]").dataset.itemId;

				if (!itemId) {
					return;
				}

				const relevantItem = app.actor
					? <Item5e>app.actor.items.get(itemId)
					: <Item5e>app.object.items.get(itemId);

				if (!relevantItem) {
					return;
				}

				const currentFilter = API.isItemInActionList(relevantItem);

				// set the flag to be the opposite of what it is now
				relevantItem.setFlag(CONSTANTS.MODULE_ID, MyFlags.filterOverride, !currentFilter);

				// log(false, "a.item-action-filter-override click registered", {
				// 	closestItemLi,
				// 	itemId,
				// 	relevantItem,
				// 	currentFilter,
				// });
			} catch (e) {
				error(`Error trying to set flag on item ${e}`);
			}
		});

		// Add button to all item rows
		html.find("[data-item-id]").each((_index, element: HTMLElement) => {
			const itemId = <string>element.dataset.itemId;
			if (!itemId) {
				return;
			}
			const relevantItem = <Item5e>app.object.items.get(itemId);

			if (!relevantItem) {
				return;
			}

			const currentFilter = API.isItemInActionList(relevantItem);

			// log(false, { itemId, currentFilter });

			$(element).find(".item-controls").append(createFavButton(currentFilter));
		});
	}
}
