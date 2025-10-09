import fs from "fs";
import convert from "xml-js";
import { ListEntry } from "./pub-sort.js";
import { TemplateParser } from "./parser.js";
import { OptionMap } from "./types.js";

// This probably does not need to be its own function. it's one line that is only used once
/**
 * Load an xml file from the provided path and convert it into a JSON.
 */
export function loadAsJson(path: string): any {
  // Load the XML file as a string then convert it to a JSON string then convert it into an object
  return JSON.parse(
    convert.xml2json(fs.readFileSync(path, "utf-8"), {
      compact: true,
      spaces: 4,
    })
  );
}

/**
 * Parses a JSON string of appearance data into a list of ListEntrys.
 * @param json
 * @returns
 */
export function loadList(path: string): ListEntry[] {
  // Load the file and convert it to a json
  const json = loadAsJson(path);

  // Convert each appearance into a list entry
  let appearances: ListEntry[] = [];
  for (const entry of json.mediawiki.page) {
    appearances.push(
      templateStringToListEntry(entry.revision.text._text as string)
    );
  }
  return appearances;
}

function templateStringToListEntry(data: string): ListEntry {
  const months = new OptionMap(
    Object.entries({
      January: "1",
      February: "2 ",
      March: "3",
      April: "4",
      May: "5",
      June: "6",
      July: "7",
      August: "8",
      September: "9",
      October: "10",
      November: "11",
      December: "12",
    })
  );

  // FIXME: This is kinda arbitrary so I don't love it.
  // If there is a better way to handle the season "dates" I want to do that instead
  const seasons = new OptionMap(
    Object.entries({
      // This I super don't like because Winter of a year could be the December or January!
      Winter: "1",
      Spring: "4",
      Summer: "7",
      Fall: "3",
    })
  );

  const template = new TemplateParser(data).parse(true);
  // FIXME: This feels fragile
  // Need to remove the any appearance of "Vol \d*" if the title has it to avoid duplicates
  const title = (template.get("Title").unwrap() as string).replaceAll(
    / Vol \d*/g,
    ""
  );

  let vol = template.get("Volume").unwrap_or("") as string;
  if (vol.length > 0) {
    // Need the spaces around it so they can be omitted in the interpolated string
    vol = ` Vol ${vol} `;
  }
  const issue = template
    .get("Issue")
    .unwrap_or(template.get("Chapter").unwrap_or("")) as string;
  //TODO: Shouldn't this be digital template? if no add a note saying no once confirmed
  let digital = "";
  if (template.getName().unwrap() == "DC Database:Digital Comic Template") {
    // Space is intentional
    digital = " (Digital)";
  }

  // Create the date
  // Need to also pull release date
  const release_date = template.get("Release Date");

  let year: string;
  let month: string;
  let day: string;

  if (release_date.isSome()) {
    const parsed = new Date(release_date.unwrap() as string);
    year = parsed.getUTCFullYear().toString();
    // The JS month is 0 indexed while Day and Year are 1 indexed
    month = (parsed.getUTCMonth() + 1).toString();
    day = parsed.getUTCDate().toString();
  } else {
    year = template
      .get("Year")
      .unwrap_or(template.get("Pubyear").unwrap_or("")) as string;
    // If no month check for a pub month before going to ""
    month = template
      .get("Month")
      .unwrap_or(template.get("Pubmonth").unwrap_or("")) as string;

    // This could be more robust but I think the possible values for the month are well defined enough this should be sufficient
    if (isNaN(parseFloat(month))) {
      // If the month is not a number try to get it from the months object
      // If that fails, check the pubdate fields
      // If that fails try to get it from the seasons template
      // If that fails mark with ""
      month = months
        .get(month)
        .unwrap_or(
          template
            .get("Pubmonth")
            .unwrap_or(seasons.get(month).unwrap_or("")) as string
        );
    }
    day = template
      .get("Day")
      .unwrap_or(template.get("Pubday").unwrap_or("")) as string;
  }

  return new ListEntry(
    `${title}${vol}${issue}${digital}`,
    year,
    month,
    day,
    template.get("Link").unwrap_or("") as string
  );
}
