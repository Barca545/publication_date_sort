import { AppearancesResponse } from "./types.js";

export async function getAppearances(charName: string): Promise<string[]> {
  let cmcontinue: string | undefined = "";
  let appearances = [];

  while (cmcontinue != undefined) {
    let params = new URLSearchParams({
      action: "query",
      list: "categorymembers",
      // Sanitize the name
      cmtitle: `Category:${charName.replaceAll(/\s/g, "_")}/Appearances`,
      cmlimit: "50",
      format: "json",
    });

    if (cmcontinue) params.set("cmcontinue", cmcontinue);

    const url = new URL(`https://dc.fandom.com/api.php?${params.toString()}`);

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Node.js https request",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    let data: AppearancesResponse = await res.json();

    appearances.push(...data.query.categorymembers);

    cmcontinue = data.continue?.cmcontinue;
  }

  return appearances.map((appearance) => {
    return appearance.title;
  });
}

// FIXME: Should return an object fitting the export
export async function getAppearancePages(titles: string[]): Promise<string> {
  // Sanitize the titles to get rid of spaces
  titles = titles.map((title) => {
    return title.replaceAll(/\s/g, "_");
  });

  // This is stuff for the actual api instead of special export but it has a limit so I want to avoid it unless it is needed
  // // https://dc.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=Catwoman_Vol_5_25|Catwoman_Vol_5_26&format=json
  // let params = new URLSearchParams({
  //   action: "query",
  //   prop: "revisions",
  //   rvprop: "content",
  //   rvslots: "main",
  //   limit: "50",
  //   titles: titles.join("|"),
  //   format: "json",
  // });

  // const url = new URL(
  //   `https://dc.fandom.com/api.php?${params.toString()}`
  // );

  let params = new URLSearchParams({
    pages: titles.join("\r\n"),
    curonly: "1",
  });

  const url = new URL(
    `https://dc.fandom.com/Special:Export?${params.toString()}`
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "User-Agent": "Node.js https request",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.text();
}
