const { formatDateFromEpoch } = require("./formatDateFromEpoch");
const fs = require("fs");

const cardBuilder = (hydratedData) => {
  const language = hydratedData[0].language;

  let formattedCardPayload = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.3",
    msteams: {
      width: "Full",
    },
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            text: `Tags & Tools report | ${formatDateFromEpoch(Date.now()).date} ${formatDateFromEpoch(Date.now()).time}`,
            wrap: true,
            spacing: "Large",
            separator: true,
            style: "heading",
            fontType: "Default",
            size: "Large",
            weight: "Bolder",
            color: "Good",
            isSubtle: false,
          },
        ],
      },
    ],
  };

  for (let item in hydratedData) {
    //construct item to push
    const itemToPush = {
      type: "Container",
      separator: true,
      spacing: "Large",
      items: [
        {
          type: "ColumnSet",
          columns: [
            // {
            //   type: "Column",
            //   width: "96px",
            //   items: [
            //     {
            //       type: "Image",
            //       url: hydratedData[item].promoImage,
            //       altText: hydratedData[item].headline,
            //       size: "Large",
            //     },
            //   ],
            // },
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "TextBlock",
                  text: `[${hydratedData[item].headline}](${hydratedData[item].url})`,
                  wrap: true,
                  weight: "Bolder",
                  size: "Medium",
                },
              ],
            },
          ],
        },
        {
          type: "ColumnSet",
          spacing: "Large",

          columns: [
            {
              type: "Column",
              items: [
                {
                  type: "TextBlock",
                  horizontalAlignment: "Left",
                  text: `Updated: ${formatDateFromEpoch(hydratedData[item].lastUpdated).date} ${formatDateFromEpoch(hydratedData[item].lastUpdated).time}`,
                  wrap: true,
                  spacing: "Small",
                },
                {
                  type: "TextBlock",
                  horizontalAlignment: "Left",
                  text: `SEO optimised: ${hydratedData[item].seoOptimised}`,
                  wrap: true,
                  color: `${hydratedData[item].seoOptimised === true ? "good" : "attention"}`,
                  spacing: "Small",
                },
              ],
              width: "stretch",
            },
            {
              type: "Column",
              items: [
                {
                  type: "TextBlock",
                  horizontalAlignment: "Right",
                  text: "Format",
                  wrap: true,
                  spacing: "Small",
                },
                {
                  type: "TextBlock",
                  horizontalAlignment: "Right",
                  text: "Audience motivation",
                  wrap: true,
                  spacing: "Small",
                },
                {
                  type: "TextBlock",
                  horizontalAlignment: "Right",
                  text: "About",
                  wrap: true,
                  spacing: "Small",
                },
              ],
              width: "stretch",
            },
            {
              type: "Column",
              items: [
                {
                  type: "TextBlock",
                  text: hydratedData[item].formatTags.toString(),
                  wrap: true,
                  color: `${hydratedData[item].formatTags === 1 ? "good" : "attention"}`,
                  spacing: "Small",
                  weight: "Bolder",
                },
                {
                  type: "TextBlock",
                  text: hydratedData[item].motivationTags.toString(),
                  wrap: true,
                  color: `${hydratedData[item].motivationTags === 1 ? "good" : "attention"}`,
                  spacing: "Small",
                  weight: "Bolder",
                },
                {
                  type: "TextBlock",
                  text: hydratedData[item].aboutTags.toString(),
                  wrap: true,
                  color: `${hydratedData[item].aboutTags > 2 && hydratedData[item].aboutTags < 6 ? "good" : "attention"}`,
                  spacing: "Small",
                  height: "stretch",
                  weight: "Bolder",
                },
              ],
              width: "auto",
            },
          ],
        },

        {
          type: "ActionSet",
          actions: [
            {
              type: "Action.OpenUrl",
              title: "Open in Optimo",
              url: hydratedData[item].openInOptimo,
            },
            {
              type: "Action.OpenUrl",
              title: "Audit trail",
              style: "positive",
              url: hydratedData[item].auditTrail,
            },
          ],
        },
      ],
    };

    formattedCardPayload.body.push(itemToPush);
  }

  fs.writeFile(
    "./helpers/adaptiveCard.json",
    JSON.stringify(formattedCardPayload),
    (err) => {
      // Checking for errors
      if (err) throw err;

      // Success
      console.log("Done writing");
    },
  );

  return { language, formattedCardPayload };
};

module.exports = { cardBuilder };
