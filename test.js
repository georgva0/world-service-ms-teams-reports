const {
  collectItemsListByService,
} = require("./helpers/collectItemsListByService");
const ares = require("./helpers/ares");
// const data = require('./data.json');
const { hydrateItems } = require("./helpers/hydrateItems");
const { postToTeams } = require("./helpers/postToTeams");
const { formatDateFromEpoch } = require("./helpers/formatDateFromEpoch");
const axios = require("axios");

const postToTeams_Test = async () => {

  const card = {
      "type": "AdaptiveCard",
      "body": [
          {
              "type": "TextBlock",
              "id": "8e071ee0-9f3a-1b27-dc92-b6b424b564c2",
              "text": "Hello World",
              "wrap": true
          }
      ],
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.0",
      "padding": "None"
  };

  const webhookUrl =  "https://onebbc.webhook.office.com/webhookb2/7e21788c-a256-484f-b88b-c90e9c4cc78c@0e587133-568e-44d6-801d-2266bc52e5cf/IncomingWebhook/fa54c9b2a3524f04aafd9845297ada54/8e548063-aff9-4922-9770-9df87cf77ac8";

  try {
      const res = await axios.post(webhookUrl, {
          "type": "message",
          "attachments": [
              {
                  "contentType": "application/vnd.microsoft.card.adaptive",
                  "contentUrl": null,
                  "content": card
              }
          ]
      });
      console.log(res.status);
  } catch (error) {
      console.error(error.response.status, error.response.statusText, error.response.data);
  }
};

postToTeams_Test().then((data) => console.log(data));

// collectItemsListByService("sr-latn").then(data => console.log(data))

// ares.getArticle("https://ares-api.api.bbci.co.uk/api/article/cgxwy57wgnlo").then(data => console.log(data))

// hydrateItems(
//   ['https://ares-api.api.bbci.co.uk/api/article/cgxwy57wgnlo',
//      'https://ares-api.api.bbci.co.uk/api/asset/serbian/lat/svet-68880940']

// ).then(data => console.log(data))

// const data = [{
//                seoHeadline: "Loterie américaine : L'immigrant atteint d'un cancer qui a gagné 1,3 milliard de dollars ",
//                headline: "L'immigrant atteint d'un cancer qui a gagné 1,3 milliard de dollars à la loterie américaine.",
//                seoOptimised: true,
//                url: 'https://www.bbc.com/afrique/articles/c8vz0m7j5jgo',
//                language: 'fr',
//                promoImage: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/9954/live/4b1ed990-07b6-11ef-bee9-6125e244a4cd.jpg.webp',
//                aboutTags: 1,
//                motivationTags: 1,
//                formatTags: 2,
//                lastUpdated: 1714666023000,
//                openInOptimo: 'https://optimo.tools.bbc.co.uk/assets/c8vz0m7j5jgo',
//                auditTrail: 'https://common-metadata.tools.bbc.co.uk/assets/urn:bbc:optimo:asset:c8vz0m7j5jgo/audit-trail'
//              },
//              {
//                seoHeadline: "Loterie américaine : L'immigrant atteint d'un cancer qui a gagné 1,3 milliard de dollars ",
//                headline: "L'immigrant atteint d'un cancer qui a gagné 1,3 milliard de dollars à la loterie américaine.",
//                seoOptimised: true,
//                url: 'https://www.bbc.com/afrique/articles/c8vz0m7j5jgo',
//                language: 'fr',
//                promoImage: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/9954/live/4b1ed990-07b6-11ef-bee9-6125e244a4cd.jpg.webp',
//                aboutTags: 1,
//                motivationTags: 1,
//                formatTags: 2,
//                lastUpdated: 1714666023000,
//                openInOptimo: 'https://optimo.tools.bbc.co.uk/assets/c8vz0m7j5jgo',
//                auditTrail: 'https://common-metadata.tools.bbc.co.uk/assets/urn:bbc:optimo:asset:c8vz0m7j5jgo/audit-trail'
//              }];

// // postToTeams(data).then(data => console.log(data));

// const cardBuilder = (documentsCollection) => {

//   let formatted_Card_Payload = {
//       "type": "message",
//       "attachments": [
//           {
//               "contentType": "application/vnd.microsoft.card.adaptive",
//               "contentUrl": null,
//               "content": {
//                   "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//                   "type": "AdaptiveCard",
//                   "version": "1.5",
//                   "body": [

//                     {
//                         "type": "Container",
//                         "items": [{
//                             "type": "TextBlock",
//                             "text": `Tags & Tools report | ${formatDateFromEpoch(Date.now()).date} ${formatDateFromEpoch(Date.now()).time}`,
//                             "wrap": true,
//                             "spacing": "Large",
//                             "separator": true,
//                             "style": "heading",
//                             "fontType": "Default",
//                             "size": "Large",
//                             "weight": "Bolder",
//                             "color": "Good",
//                             "isSubtle": false
//                         }]
//                     },
//                   ]
//               }
//           }
//       ]
//   }

//   for(let item in documentsCollection){

//         //construct item to push
//         const itemToPush = {
//             "type": "Container",
//             "separator": true,
//             "spacing": "Large",
//             "items": [

//                 {
//                     "type": "ColumnSet",
//                     "columns": [
//                         {
//                             "type": "Column",
//                             "width": "96px",
//                             "items": [
//                                 {
//                                     "type": "Image",
//                                     "url": documentsCollection[item].promoImage,
//                                     "altText": documentsCollection[item].headline,
//                                     "size": "Large"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "Column",
//                             "width": "stretch",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": `[${documentsCollection[item].headline}](${documentsCollection[item].url})`,
//                                     "wrap": true,
//                                     "weight": "Bolder",
//                                     "size": "Medium"
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "type": "ColumnSet",
//                     "spacing": "Large",

//                     "columns": [
//                         {
//                             "type": "Column",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "horizontalAlignment": "Left",
//                                     "text": `Updated: ${formatDateFromEpoch(documentsCollection[item].lastUpdated)}`,
//                                     "wrap": true,
//                                     "spacing": "Small"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "horizontalAlignment": "Left",
//                                     "text": `SEO optimised: ${documentsCollection[item].seoOptimised}`,
//                                     "wrap": true,
//                                     "color": "Good",
//                                     "spacing": "Small"
//                                 }
//                             ],
//                             "width": "stretch"
//                         },
//                         {
//                             "type": "Column",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "horizontalAlignment": "Right",
//                                     "text": "Format",
//                                     "wrap": true,
//                                     "spacing": "Small"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "horizontalAlignment": "Right",
//                                     "text": "Audience motivation",
//                                     "wrap": true,
//                                     "spacing": "Small"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "horizontalAlignment": "Right",
//                                     "text": "About",
//                                     "wrap": true,
//                                     "spacing": "Small"
//                                 }
//                             ],
//                             "width": "stretch"
//                         },
//                         {
//                             "type": "Column",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": documentsCollection[item].formatTags,
//                                     "wrap": true,
//                                     "color": `${documentsCollection[item].formatTags === 1 ? "good" : "attention"}`,
//                                     "spacing": "Small",
//                                     "weight": "Bolder"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": documentsCollection[item].motivationTags,
//                                     "wrap": true,
//                                     "color": `${documentsCollection[item].motivationTags === 1 ? "good" : "attention"}`,
//                                     "spacing": "Small",
//                                     "weight": "Bolder"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": documentsCollection[item].aboutTags,
//                                     "wrap": true,
//                                     "color": `${documentsCollection[item].aboutTags > 2 && documentsCollection[item].aboutTags < 6 ? "good" : "attention"}`,
//                                     "spacing": "Small",
//                                     "height": "stretch",
//                                     "weight": "Bolder"
//                                 }
//                             ],
//                             "width": "auto"
//                         }
//                     ]
//                 },

//                         {
//             "type": "ActionSet",
//             "actions": [
//                 {
//                     "type": "Action.OpenUrl",
//                     "title": "Open in Optimo",
//                     "url": item.openInOptimo
//                 },
//                     {
//             "type": "Action.OpenUrl",
//             "title": "Audit trail",
//             "style": "positive",
//             "url": item.auditTrail
//           }
//             ]
//           }
//     ]
//           }

//       formatted_Card_Payload.attachments[0].content.body.push(itemToPush)

//     console.log("item has been pushed")
//     //item pushed
//   }

//   return formatted_Card_Payload;

// }

// console.log(cardBuilder(data).attachments[0].content.body[1].items[0].columns[0].items)
