const express = require("express"); //Line 1
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const cors = require("cors"); //Line
const { ppid, nextTick } = require("process");
const axios = require("axios");
const { response } = require("express");
const service = require("./service");

const app = express(); //Line 2
app.use(cors()); //Line
app.use(express.json());

const port = process.env.PORT || 3001; //Line 3

let para = "";

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET middlware, to send user all api data from 'thecatapi',
app.get("/express_backend", async (req, res) => {
  //Line 9
  await axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => res.send({ success: true, response: response.data }))
    .catch((error) => res.send({ success: false, message: error.message }));
});

//POST: when user triggers method, it'll go to wiki, extract paragraph based on the cat and return this value into 'para', and send this value back to the user
app.post("/catPage", async (req, res) => {
  //Line 9
  var fileLocation = req.body;
  console.log(fileLocation.userId);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(fileLocation.userId);
  const pageData = await page.evaluate(() => {
    return {
      html: document.documentElement.innerHTML,
    };
  });
  const $ = await cheerio.load(pageData.html);
  let original_div = await $("div.mw-body-content");
  await original_div.each(async(index, element) => {
    para = await $(element).find("p").text();
  });
  await res.send({ gsh: para });
  await console.log({ gsh: para });
 // para = "";
  await browser.close();
});

//attempting to create a GET request
app.get("/catValues", async (req, res) => {
  setTimeout((async() => {
    const file = await para;
    res.send({ response: file });
  }), 3000)
});
