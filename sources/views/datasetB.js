import {JetView} from "webix-jet";

export default class ListView extends JetView {
	config() {
		return {
			view:"datatable",
		  columns:[
		    { id:"id", header:"", css:{"text-align":"center"}, width:50 },
		    { id:"package", header:"Name", fillspace:true },
		    { id:"section", header:"Section", width:120 },
		    { id:"size", header:"Size", width:80 },
		    { id:"architecture", header:"PC", width:60 }
		  ],
		  scroll:"y",
		  datafetch:50,//default
		  loadahead:100,
		  url:"http://localhost:3012/users"
		};
	}
	init() {
	}
}
