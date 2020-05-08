const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const http = require("http");
const https = require("https");
const path = require("path")
const GithubWrapper = require('../utils')

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.use(cors());

app.get("/", (req, res) => {
  setImmediate(() => {
    try {
      res.setHeader("Cache-Control", "public,max-age=0");
      res.sendFile(path.join(__dirname, "../index.html"));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});

app.get("/api/searchrepo", (req, res) => {
    const repo = req.query.q
    res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
    setImmediate(() => {
      try {
        if(repo == '' || repo == null){
          res.status(400).send({
            code: res.statusCode,
            success: false,
            message: "Query string can not be empty!",
            creator: "Satya Wikananda"
          });
        }else{
          GithubWrapper.searchRepo(repo)
            .then((data) => {
              res.json(data);
            })
            .catch((err) => console.log(err));
        }
      } catch (e) {
        res.status(400).send("Something went wrong");
      }
    });
});

app.get("/api/detailuser", (req, res) => {
    const user = req.query.q
    res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
    setImmediate(() => {
      try {
        if(user == '' || user == null){
          res.status(400).send({
            code: res.statusCode,
            success: false,
            message: "Query string can not be empty!",
            creator: "Satya Wikananda"
          });
        }else{
          GithubWrapper.searchUser(user)
            .then((data) => {
              res.json(data);
            })
            .catch((err) => console.log(err));
        }
      } catch (e) {
        res.status(400).send("Something went wrong");
      }
    });
});

app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});