const Nightmare = require("nightmare");

const metaList = [
  "description",
  "keywords",
  "og:title",
  "og:description",
  "og:type",
  "og:site_name",
  "og:image",
  "fb:app_id",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:image:src",
  "twitter:card",
];

function getSiteInfos(metaList) {

  function textContent(query) {
    const dom = document.querySelector(query);
    if(!dom) {
      return null;
    }
    return dom.textContent;
  }

  function attribute(query, attribute) {
    const dom = document.querySelector(query);
    if(!dom) {
      return null;
    }
    return dom.getAttribute(attribute);
  }

  const res = {};
  res.title = textContent("title");
  res.ga_defined = window.ga ? true : false;
  metaList.forEach(meta => {
    res[meta] = attribute(`meta[name="${meta}"]`, "content") || attribute(`meta[property="${meta}"]`, "content");
  });
  res["h1_texts"] = Array.prototype.map.call(document.getElementsByTagName("h1"), h1 => h1.textContent);
  return res;
}

function crawl(url) {
  const nightmare = Nightmare({
    show: false,
  });

  return nightmare
    .goto(url)
    .evaluate(getSiteInfos, metaList)
    .end();
}

module.exports = crawl;
