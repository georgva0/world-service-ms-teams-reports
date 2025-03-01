const ares = require("./ares");
const { tagsTransformer } = require("./tagsTransformer");

const hydrateItems = async (itemsList) => {
  const hydratedItems = [];
  for (const item of itemsList) {
    if (item.includes("article")) {
      const articleJson = await ares.getArticle(item);
      const itemData = {};
      //enrich Optimo article with ARES data
      itemData.seoHeadline =
        articleJson?.promo?.headlines?.seoHeadline ?? "Not available";
      itemData.headline =
        articleJson?.promo?.headlines?.promoHeadline?.blocks[0]?.model
          ?.blocks[0]?.model?.text ?? "Not available";
      if (itemData.seoHeadline == itemData.headline) {
        itemData.seoOptimised = false;
      } else {
        itemData.seoOptimised = true;
      }

      itemData.url = articleJson.metadata.locators.canonicalUrl;
      itemData.language = articleJson.metadata.language;

      if (Object.keys(articleJson.promo.images).length !== 0) {
        if (
          articleJson.promo.images.defaultPromoImage.blocks[1].model.locator ==
            undefined &&
          articleJson.promo.images.defaultPromoImage.blocks[2].model.locator ==
            undefined
        ) {
          itemData.promoImage =
            "https://ichef.bbci.co.uk/news/800/cpsprodpb/7214/live/9ac8d430-80db-11ee-b7d2-dd851f00eaeb.png.webp";
        }

        if (
          articleJson.promo.images.defaultPromoImage.blocks[1].model.locator
        ) {
          itemData.promoImage = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${articleJson.promo.images.defaultPromoImage.blocks[1].model.locator}.webp`;
        } else {
          itemData.promoImage = `https://ichef.bbci.co.uk/news/800/cpsprodpb/${articleJson.promo.images.defaultPromoImage.blocks[2].model.locator}.webp`;
        }
      } else {
        itemData.promoImage =
          "https://ichef.bbci.co.uk/news/800/cpsprodpb/7214/live/9ac8d430-80db-11ee-b7d2-dd851f00eaeb.png.webp";
      }

      if (articleJson.metadata.analyticsLabels.ldp_tags == undefined) {
        itemData.aboutTags = 0;
      } else {
        itemData.aboutTags = tagsTransformer(
          articleJson.metadata.analyticsLabels.ldp_tags
        ).length;
      }

      if (
        articleJson.metadata.analyticsLabels.audience_motivation == undefined
      ) {
        itemData.motivationTags = 0;
      } else {
        itemData.motivationTags = tagsTransformer(
          articleJson.metadata.analyticsLabels.audience_motivation
        ).length;
      }

      if (
        articleJson.metadata.passport.taggings.filter(
          (item) =>
            item.predicate ==
            "http://www.bbc.co.uk/ontologies/creativework/format"
        ) == undefined
      ) {
        itemData.formatTags = 0;
      } else {
        itemData.formatTags = articleJson.metadata.passport.taggings.filter(
          (item) =>
            item.predicate ==
            "http://www.bbc.co.uk/ontologies/creativework/format"
        ).length;
      }

      itemData.lastUpdated = articleJson.metadata.lastUpdated;
      itemData.openInOptimo = `https://optimo.tools.bbc.co.uk/assets/${articleJson.metadata.id.slice(
        22
      )}`;
      itemData.auditTrail = `https://common-metadata.tools.bbc.co.uk/assets/urn:bbc:optimo:asset:${articleJson.metadata.id.slice(
        22
      )}/audit-trail`;

      hydratedItems.push(itemData);
    } else {
      const articleJson = await ares.getAsset(item);
      const itemData = {};

      //enrich CPS article with ARES data
      itemData.seoHeadline =
        articleJson?.promo?.headlines?.shortHeadline ?? "Not available";
      itemData.headline =
        articleJson?.promo?.headlines?.headline ?? "Not available";

      if (itemData.seoHeadline == itemData.headline) {
        itemData.seoOptimised = false;
      } else {
        itemData.seoOptimised = true;
      }

      itemData.url = `https://www.bbc.com${articleJson.metadata.locators.assetUri}`;

      if (articleJson.metadata.analyticsLabels.ldp_tags == undefined) {
        itemData.aboutTags = 0;
      } else {
        itemData.aboutTags = tagsTransformer(
          articleJson.metadata.analyticsLabels.ldp_tags
        ).length;
      }

      if (
        articleJson.metadata.analyticsLabels.audience_motivation == undefined
      ) {
        itemData.motivationTags = 0;
      } else {
        itemData.motivationTags = tagsTransformer(
          articleJson.metadata.analyticsLabels.audience_motivation
        ).length;
      }

      if (
        articleJson.metadata.passport.taggings.filter(
          (item) =>
            item.predicate ==
            "http://www.bbc.co.uk/ontologies/creativework/format"
        ) == undefined
      ) {
        itemData.formatTags = 0;
      } else {
        itemData.formatTags = articleJson.metadata.passport.taggings.filter(
          (item) =>
            item.predicate ==
            "http://www.bbc.co.uk/ontologies/creativework/format"
        ).length;
      }

      itemData.promoImage =
        articleJson?.promo?.indexImage?.href ??
        "https://ichef.bbci.co.uk/news/800/cpsprodpb/7214/live/9ac8d430-80db-11ee-b7d2-dd851f00eaeb.png.webp";

      itemData.lastUpdated = articleJson.metadata.lastUpdated;
      itemData.language = articleJson.metadata.language;
      itemData.openInOptimo = `https://optimo.tools.bbc.co.uk`;
      itemData.auditTrail = `https://common-metadata.tools.bbc.co.uk`;

      hydratedItems.push(itemData);
    }
  }
  return hydratedItems;
};

module.exports = { hydrateItems };
