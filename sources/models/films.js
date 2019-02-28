export const films = new webix.DataCollection({
	url: "http://localhost:3012/films",
	save: "rest->http://localhost:3012/films"
});
