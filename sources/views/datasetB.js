import {JetView} from "webix-jet";

export default class ListView extends JetView {
	config() {
		return {
			view:"datatable",
			editable: true,
		  columns:[
		    { id: "name", header: "Name", fillspace: true},
		    { id: "age", editor: "text", header: "Age"},
		    { id: "gender", header: "Gender"},
		    { id: "company", header: "Company"},
		    { id: "favoriteFruit", header: "Favorite Fruit"}
		  ],
		  scroll: "y",
			datafetch: 40,
	   	// loadahead: 30,
		  url: "http://localhost:3012/users"
		};
	}
	init() {
	}
}
