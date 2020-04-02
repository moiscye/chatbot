"use strict";

const dialogflow = require("dialogflow");
const strucjson = require("./strucjson");
const keys = require("../config/keys");

const projectID = keys.googleProjectID;
const credentials = {
  client_email: keys.googleClientEmail,
  private_key: keys.googlePrivateKey
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });
const sessionPath = sessionClient.sessionPath(keys.googleProjectID, keys.dialogFlowSessionID);

module.exports = {
  textQuery: async function(text, parameters = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: keys.dialogFlowSessionLanguageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function(event, parameters = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: strucjson.jsonToStructProto(parameters),
          languageCode: keys.dialogFlowSessionLanguageCode
        }
      }
    };

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  handleAction: async function(responses) {
    return responses;
  }
};