// import { jsonToList, loadJson, parseComicTemplate } from "./load.js";
import { pubDateSort } from "./pub-sort.js";
import fs from "fs";
import wtf from "wtf_wikipedia";

// let result = await wtf.getCategoryPages()

// wtf.extend((models: any, templates: { comictemplate: (tmpl: any, list: any) => void; }) => {
//   templates.comictemplate = function (tmpl, list){
//     let array = tmpl.split('|');
//     list.push({template:"name",score:array.slice(1)})
//     console.log(array);
//   }
// })

// console.log(wtf("{{ComicTemplate|day =1 | name = foo}}"));

// // const path = "File://Users/jamar/Downloads/Lian Harper (Prime Earth) Appearances.xml";
// let path = process.cwd() + "/test/Scarlett Scott Apearances.xml"

// // const list = jsonToList(loadJson(path));

// let doc = await wtf.fetch("Detective_Comics_Vol_1_1090", {
//   domain: "dc.fandom.com"
// });

// console.log((doc as wtf.Document).template())

// // The sorted list of entries
// const out  = pubDateSort(list);

// // Print the list out to a markdown file
// let stream = fs.createWriteStream(process.cwd() + "/sorted by data.md", {flags:"a"});
// // Append each item to a markdown file
// out.forEach((entry) => {
//   stream.write( "- " + entry.date + " " + entry.title + "\n");
// })
