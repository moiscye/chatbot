const chatbot = require("../services/chatbot");

exports.textQuery = async (req, res) => {
  console.log(req.body);
  let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
  res.send(responses[0].queryResult);
};
exports.eventQuery = async (req, res) => {
  console.log(req.body);
  let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
  res.send(responses[0].queryResult);
};
