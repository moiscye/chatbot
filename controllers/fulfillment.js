const { WebhookClient } = require("dialogflow-fulfillment");
const Demand = require("../models/demand");
const Coupon = require("../models/coupon");

exports.fulfillment = async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function snoopy(agent) {
    agent.add(`Welcome to my Snoopy fulfillment!`);
  }
  console.log("REQ:", req.body);

  async function learn(agent) {
    let course = await Demand.findOne({ course: agent.parameters.courses });
    console.log("AGENT:", agent.parameters);

    if (course) {
      course.counter++;
      course.save();
    } else {
      course = new Demand({ course: agent.parameters.course });
      course.save();
    }

    let responseText = `Since you want to learn about ${agent.parameters.course}. Here is a link to all my courses: <a>http://www.moisescruz.me</a>`;

    let coupon = await Coupon.findOne({ course: agent.parameters.course });
    if (coupon) {
      responseText = `Since you want to learn about ${agent.parameters.course}. Here is a link to the course you are looking for: <a>${coupon.link}</a>`;
    }
    agent.add(responseText);
  }

  function fallback(agent) {
    agent.add("I didn't understand");
    agent.add("I'm sorry, can you try again?");
  }

  let intentMap = new Map();

  intentMap.set("snoopy", snoopy);
  intentMap.set("learn courses", learn);
  intentMap.set("Default Fallback Intent", fallback);

  agent.handleRequest(intentMap);
};
