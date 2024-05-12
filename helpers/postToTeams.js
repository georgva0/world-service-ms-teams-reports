const { findWebhook } = require("./findWebhook");
const axios = require("axios");

const postToTeams = async (payload) => {
  //identify the relevant webhook
  const webhookUrl = findWebhook(payload.language);

  try {
    const res = await axios.post(webhookUrl, {
      "type": "message",
      "attachments": [
          {
              "contentType": "application/vnd.microsoft.card.adaptive",
              "contentUrl": null,
              "content": payload.formattedCardPayload
          }
      ]
    });
    console.log(res.statusText);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postToTeams };
