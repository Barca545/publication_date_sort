export interface AppearancesDataResponse {
  mediawiki: {
    _attributes: {
      xmlns: string;
      "xmlns:xsi": string;
      "xsi:schemaLocation": string;
      version: string;
      "xml:lang": string;
    };
    siteinfo: {
      sitename: { _text: string };
      dbname: { _text: string };
      base: { _text: string };
      generator: { _text: string };
      case: { _text: string };
      namespaces: {
        namespace: {
          _attributes: { key: string; case: string };
          _text: string;
        }[];
      };
    };
  };
}

interface Page {
  title: { _text: string };
  ns: { _text: string };
  id: { _text: string };
  revision: {
    id: { _text: string };
    parentid: { _text: string };
    timestamp: { _text: string };
    contributor: { username: { _text: string }; id: { _text: string } };
    origin: { _text: string };
    model: { _text: string };
    format: { _text: string };
    text: {
      _attributes: {
        bytes: string;
        sha1: string;
      };
      text: string;
    };
    sha1: { _text: string };
  };
}

export interface AppearancesResponse {
  batchcomplete: string;
  continue: {
    cmcontinue: string;
    continue: string;
  };
  query: { categorymembers: CategoryMember[] };
}

export interface CategoryMember {
  pageid: number;
  ns: number;
  title: string;
}
