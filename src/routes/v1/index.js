const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const docsRoute = require("./docs.route");
const dassResultRoute = require("./dassresult.route");
const reservationRoute = require("./reservation.route");
const consultantRoute = require("./consultant.route");
const journalRoute = require("./journal.route");
const config = require("../../config/config");
const { path } = require("../../app");

const router = express.Router();

const defaultRoutes = [
	{
		path: "/auth",
		route: authRoute,
	},
	{
		path: "/users",
		route: userRoute,
	},
	{
		path: "/dassresults",
		route: dassResultRoute,
	},
	{
		path: "/reservations",
		route: reservationRoute,
	},
	{
		path: "/consultants",
		route: consultantRoute,
	},
	{
		path: "/journals",
		route: journalRoute,
	},
];

const devRoutes = [
	// routes available only in development mode
	{
		path: "/docs",
		route: docsRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
