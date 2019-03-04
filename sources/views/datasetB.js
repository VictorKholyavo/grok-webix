import {JetView} from "webix-jet";

export default class ListView extends JetView {
	config() {
		return {
			view:"datatable",
			editable: true,
			columns:[
				{ id: "name", header: "Name", editor: "text", sort: "server", fillspace: true},
				{ id: "age", editor: "text", header: "Age"},
				{ id: "gender", editor: "richselect", options: ["male", "female"], header: "Gender"},
				{ id: "company", editor: "text", header: "Company"},
				{ id: "favoriteFruit", editor: "text", header: "Favorite Fruit"}
			],
			scroll: "y",
			datafetch: 40,
			//loadahead: 30,
			url: "http://localhost:3012/users",
			save: "rest->http://localhost:3012/users"
		};
	}
	init() {
	}
}
