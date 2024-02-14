import express from "express";
import cookieParser from "cookie-parser";
import router from "./router/router.js";
import connect from "./db/db.js";
import { roleAuth } from "./services/index.js";
import "./utils/esm.js";

const port = process.env.PORT;

connect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/user", router);
app.get("/admin", roleAuth("Admin"), (req, res) => res.send("Admin Route"));
app.get("/basic", roleAuth("Basic"), (req, res) => res.send("User Route"));
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
