export const dependencies = {
    "oauth": "0.9.15"
};

const TWITTER_APP_SECRET = ""
const TWITTER_APP_KEY = ""
export const getApplicationTwitterOauth = () => {
    var OAuth = require('oauth');
    return new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        TWITTER_APP_KEY,
        TWITTER_APP_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
}