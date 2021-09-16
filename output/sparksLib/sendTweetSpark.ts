export const dependencies = {
    "node-fetch": "2.6.1",
};
const sendTweetSpark = async (data) => {  
    const { status, createdBy } = data; // extension sparkBody

    // Retrieve the user's twitter Bearer Token
    // assume user has registered twitter account to Antler through Oauth
    // Problem: how to get user's twitter token?
    const utilFns = require("../utils");
    const {twitterOauthToken, twitterOauthSecret} = await utilFns.getSecret("twitterSecrets");
    const twitterOauth = await utilFns.getApplicationTwitterOauth()

    const url = `https://api.twitter.com/1.1/statuses/update.json?status=${status}`;
    await twitterOauth.post(
        url, 
        twitterOauthToken,
        twitterOauthSecret,
        undefined,
        undefined
    )
    return true
};

export default sendTweetSpark;