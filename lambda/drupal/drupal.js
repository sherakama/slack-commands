/**
 * MEGAPROFILE API MICROSERVICE
 * 
 * This microservice fetches information from the megaprofile api. There is only
 * one endpoint with one parameter. You can fetch information from the API by
 * the person's ENCODEDSUID id. To connect to the API endpoint you have to be
 * authenticated via oauth and pass a bearer token. On each request to the
 * microservice endpoint we fetch a new bearer token and use that in the request
 * for profile data.
 * 
 * This service is only responsible for handling the transaction to/from the API
 * and does not modify or shape the results in any way.
 * 
 * Basic auth is enabled on the profile endpoint to protect abuse of this 
 * service but clients should strive to only access this endpoint from the 
 * "Server Side".
 */

// Variables.
// -----------------------------------------------------------------------------
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Express Configuration.
// Configure express to be able to handle json and cookies.
// -----------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const getJSAContentResponse = () => {
  let ret = `
  Drupal version                  :  7.78
  Site URI                        :  jsa-content.stanford.edu
  Database driver                 :  mysql
  Database                        :  Connected
  Drupal bootstrap                :  Successful
  Default theme                   :  stanford_wilbur
  Administration theme            :  stanford_seven
  Drush version                   :  8.4.2
  Install profile                 :  stanford
`;
  return ret;
}

const getUserGuideStanfordEdu = () => {
  let ret `
  Drupal version   : 9.1.5
  Site URI         : http://userguide.sites.stanford.edu
  DB driver        : mysql
  Database         : Connected
  Drupal bootstrap : Successful
  Default theme    : stanford_basic
  Admin theme      : seven
  Drush version    : 10.4.0
  Install profile  : stanford_profile
  `;
  return ret;
}

// Drupal Endpoint
// -----------------------------------------------------------------------------
app.post(`/api/drupal`,
  (req, res) => {
    const site = req.body.site;
    
    if (site == "jsa-content.stanford.edu") {
      res.send(getJSAContentResponse())
      return;
    }

    if (site == "userguide.sites.stanford.edu") {
      res.send(getJSAContentResponse())
      return;
    }

    res.send('https://youtu.be/ub82Xb1C8os');
  } 
)

// Start the express service as the serverless version by wrapping it.
// -----------------------------------------------------------------------------
module.exports.handler = serverless(app);
