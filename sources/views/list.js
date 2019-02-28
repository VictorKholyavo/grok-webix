import {JetView} from "webix-jet";

export default class ListView extends JetView {
	config() {
		return {
			template: "List & details",
			css: "webix_shadow_medium app_start"
		};
	}
	init() {
	}
}
