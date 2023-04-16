require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "emailclienttesting2023@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "Email <emailclienttesting2023@gmail.com>",
  to: "emailclienttesting2023@gmail.com",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};