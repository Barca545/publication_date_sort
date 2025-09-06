var fs = require("fs")
var convert = require("xml-js");
var process = require("process");





function pubSort(filename){
  // Load the XML file as a string the parse it to a JSON
  const jsonList = fs.readFile(filename, "utf-8", (err, data) => {
  // Want to exit early rust lets you panic 
    if (err)
      throw new Error(`Error reading \"${filename}\"`);
    // Parse the string into a JSON and return it
    return convert.xml2json(data, {compact:true, spaces:4});
  })

  let sortedList = []

  // Loop over the entries and place them in the sorted list
  for (entry of jsonList) {
    const title = entry["title"]
    const year = entry["year"]
    const month = entry["month"];
    const day = entry["day"];
    // Treat dates as one integer
    const date = `${year}${month}${day}`

      // Short circut if list is empty 
      if (sortedList.length == 0){
        sortedList.push({"title":title, "year":year, "month":month, "day":day})
      }

    // Binary sort
    // TODO: Is it faster to sort once everything is loaded into the array?
    
    // The indicies of the item in the sorted list we are checking against
    let test = Math.floor(sortedList.length() / 2);
    // TODO: Keep track of test indicies and terminate if one would repeat, I think
    let checkedIndicies = [];
    let stop = false;
    while (!stop){
        // If the date is bigger than the test, then it goes earlier in the list
        if (date > sortedList[test]){
          checkedIndicies.push(test)
          test = Math.floor(test / 2);
          // Terminate if the next possible smallest index has already been checked
        }
        // If the date is bigger than the test, then it goes later in the list
        else if (date < sortedList[test]){
          // Get the number between the current number and the biggest number checked
          let biggest = 0;
          test = test + Math.floor((biggest - test) / 2)
          // Terminate if the next possible biggest index has already been checked
        }
        // If the date equals the test, then push it and stop
        sortedList.push({"title":title, "year":year, "month":month, "day":day})
        stop = true
    }
  } 
}

// Checks if date `a` is later than date `b`
function isBigger(a,b){
  // knowing JS this will do some weird bullshit like comparing the strings as booleans and not numbers so test

    
}

