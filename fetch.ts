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

interface AppearancesResponse {
  batchcomplete: string;
  continue: {
    cmcontinue: string;
    continue: string;
  };
  query: { categorymembers: CategoryMember[] };
}

interface CategoryMember {
  pageid: number;
  ns: number;
  title: string;
}

// FIXME: Should return an object fitting the export
export async function getAppearancePages(titles: string[]): Promise<any> {
  console.log("did reach");
  // Sanitize the titles to get rid of spaces
  const pages = titles.map((title) => {
    title.replaceAll(/\s/g, "_");
  });

  let params = new URLSearchParams({
    pages: pages.join("|"),
    curonly: "1",
  });

  const url = new URL(
    `https://dc.fandom.com/wiki/Special:Export?pages=${params.toString()}`
  );

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Node.js https request",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  console.log("res");
  console.log(res.json());
}

interface SpecialExportResponse {}
