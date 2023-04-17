const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getUser(req, res) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}

async function getDrafts(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function readFirstMail(req, res) {

  try {
    const url = 'https://gmail.googleapis.com/gmail/v1/users/emailclienttesting2023@gmail.com/messages';
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    let emails = await response.data;

    const firstEmailDetails = emails.messages[0];
    const firstEmailId = firstEmailDetails.id;

    const url1 = `https://gmail.googleapis.com/gmail/v1/users/emailclienttesting2023@gmail.com/messages/${firstEmailId}`;
    const config1 = generateConfig(url1, token);
    const response1 = await axios(config1);

    let data = await response1.data;
    console.log('saket', data.payload)

    const emailData = {
      body: data.snippet,
    }

    data.payload.headers.forEach((data) => {
      if(data.name === 'From'){
        emailData.from = data.value
      }

      if(data.name === 'Subject'){
        emailData.subject = data.value
      }
    })

    res.json(emailData);
  }catch (err){
    res.json(err);
  }
}

async function readMail(req, res) {
  try {
    const url = 'https://gmail.googleapis.com/gmail/v1/users/emailclienttesting2023@gmail.com/messages';
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;

    res.json(data);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getUser,
  sendMail,
  getDrafts,
  readMail,
  readFirstMail,
};