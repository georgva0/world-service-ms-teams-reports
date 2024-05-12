const { postToTeams } = require('./helpers/postToTeams');
const { collectItemsListByService } = require('./helpers/collectItemsListByService');
const { hydrateItems } = require('./helpers/hydrateItems');
const { cardBuilder } = require('./helpers/cardBuilder');
const data = require('./data.json');

const init = async () => {
  for (const languageId of data.languagesIds) {
    const itemsListByService = await collectItemsListByService(languageId);

    console.log(`Collected item list for language <<${languageId}>>`)

    const hydratedItems = await hydrateItems(itemsListByService);

    console.log(`Item list for language <<${languageId}>> has been hydrated`)

    const payload = cardBuilder(hydratedItems);

    await postToTeams(payload);

    // console.log(`Sent the latest Teams report for language <<${languageId}>>`)
  }
}

init();