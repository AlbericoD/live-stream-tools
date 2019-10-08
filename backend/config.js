module.exports.PORT = process.env.PORT;

// Define configuration options
module.exports.opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH
  },
  channels: [process.env.CHANNEL_NAME]
};
