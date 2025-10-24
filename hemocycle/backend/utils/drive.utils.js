const { google } = require('googleapis')
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = `http://localhost:5000/oauth2callback`

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

if (process.env.TOKENS_JSON) {
  const tokens = JSON.parse(process.env.TOKENS_JSON);
  oAuth2Client.setCredentials(tokens);
} 

const drive = google.drive({ version: 'v3', auth: oAuth2Client }) 
module.exports = {
    drive,
    oAuth2Client
}