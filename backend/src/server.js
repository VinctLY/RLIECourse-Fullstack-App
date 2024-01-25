import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import * as url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use("/static/images", express.static(path.join(__dirname, "static/images")));

import cors from "cors";

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,DELETE,PUT,PATCH",
		allowedHeaders: "Content-Type,Authorization,Origin",
	})
);

import router from "./api/routes/index.js";

app.use("/api", router);

import mongoose from "mongoose";

const DBConnection = async () => {
	try {
		const database_connection_URI = process.env.MONGODB_URI;
		const dbName = process.env.MONGODB_APPNAME;

		await mongoose.connect(database_connection_URI, { dbName });

		app.listen(port, () => {
			console.log(`App is listening on port ${port}.`);
		});
	} catch (err) {
		console.log(err);
	}
};

DBConnection();
