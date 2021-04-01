/**
 * APRIL FOOLS
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
  Drupal version       :  7.78
  Site URI             :  <https://bit.ly/IqT6zt|https://jsa-content.stanford.edu>
  Database driver      :  mysql
  Database             :  Connected
  Drupal bootstrap     :  Successful
  Default theme        :  stanford_wilbur
  Administration theme :  stanford_seven
  Drush version        :  8.4.2
  Install profile      :  stanford
  <https://bit.ly/IqT6zt|expand more...>
`;
  return ret;
}

const getUserGuideStanfordEdu = () => {
  let ret = `
  Drupal version   : 9.1.5
  Site URI         : <https://bit.ly/IqT6zt|https://userguide.sites.stanford.edu>
  DB driver        : mysql
  Database         : Connected
  Drupal bootstrap : Successful
  Default theme    : stanford_basic
  Admin theme      : seven
  Drush version    : 10.4.0
  Install profile  : stanford_profile
  <https://bit.ly/IqT6zt|expand more...>
`;
  return ret;
}

// Drupal Endpoint
// -----------------------------------------------------------------------------
app.post(`/api/drupal`,
  (req, res) => {
    const site = req.body.text;
    // console.log(req.body);
    
    if (site == "jsa-content.stanford.edu") {
      res.json({text: getJSAContentResponse(),
        unfurl_links: true,
        unfurl_media: true,
      });
      return;
    }

    if (site == "userguide.sites.stanford.edu") {
      res.json({
        text: getUserGuideStanfordEdu(),
        unfurl_links: true,
        unfurl_media: true,
      });
      return;
    }

    let defInfo = `
    Drupal version   : 9.1.5
    Site URI         : <https://bit.ly/IqT6zt|https://${site}>
    DB driver        : mysql
    Database         : Connected
    Drupal bootstrap : Successful
    Default theme    : stanford_basic
    Admin theme      : seven
    Drush version    : 10.4.0
    Install profile  : stanford_profile
`;

    res.json({ 
      text: defInfo + '<https://bit.ly/IqT6zt|expand more...>',
      unfurl_links: true,
      unfurl_media: true
    });
  } 
)

// Start the express service as the serverless version by wrapping it.
// -----------------------------------------------------------------------------
module.exports.handler = serverless(app);
