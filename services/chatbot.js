"use strict";

const dialogflow = require("dialogflow");
const strucjson = require("./strucjson");
const keys = require("../config/keys");
const Registration = require("../models/registration");

const projectID = keys.googleProjectID;
const credentials = {
  client_email: keys.googleClientEmail,
  private_key: keys.googlePrivateKey,
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

module.exports = {
  textQuery: async function (text, userID, parameters = {}) {
    let self = module.exports;
    const sessionPath = sessionClient.sessionPath(
      keys.googleProjectID,
      keys.dialogFlowSessionID + userID
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: keys.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function (event, userID, parameters = {}) {
    let self = module.exports;
    const sessionPath = sessionClient.sessionPath(
      keys.googleProjectID,
      keys.dialogFlowSessionID + userID
    );
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: strucjson.jsonToStructProto(parameters),
          languageCode: keys.dialogFlowSessionLanguageCode,
        },
      },
    };

    // Send request and log result
    let responses = await sessionClient.detectIntent(request);
    responses = self.handleAction(responses);
    return responses;
  },
  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    switch (queryResult.action) {
      case "recommendcourses-yes":
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
        }

        break;
    }

    return responses;
  },
  saveRegistration: async function (fields) {
    let registration = new Registration({
      name: fields.name.stringValue,
      address: fields.address.stringValue,
      phone: fields.phone.stringValue,
      email: fields.email.stringValue,
    });

    registration = await registration.save();
  },
};
