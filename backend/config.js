const CHANNEL_NAME = 'albericod';
const BOT_USERNAME = 'ElissandroSilvaOPrimeiroFlistion';
const OAUTH_TOKEN = 'oauth:7k1p8fvxbzg92hvpsrxe2njhbu1a3n'; //
module.exports.PORT = 8080;

// Define configuration options
module.exports.opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [CHANNEL_NAME]
};
