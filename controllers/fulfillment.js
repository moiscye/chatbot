const { WebhookClient } = require("dialogflow-fulfillment");
const Demand = require("../models/demand");
const Coupon = require("../models/coupon");

exports.fulfillment = async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  async function learn({ parameters, add }) {
    let course = await Demand.findOne({ course: parameters.courses });

    if (!course) {
      course.counter++;
      course.save();
    } else {
      course = new Demand({ course: parameters.courses });
      course.save();
    }

    let responseText = `Since you want to learn about ${parameters.course}. Here is a link to all my courses: <a>http://www.moisescruz.me</a>`;

    let coupon = await Coupon.findOne({ course: parameters.courses });
    if (!coupon) {
      responseText = `Since you want to learn about ${parameters.course}. Here is a link to the course you are looking for: <a>${coupon.link}</a>`;
    }
    add(responseText);
  }

  function fallback(agent) {
    agent.add("I didn't understand");
    agent.add("I'm sorry, can you try again?");
  }

  let intentMap = new Map();

  intentMap.set("learn courses", learn);
  intentMap.set("Defauult Fallback Intent", fallback);

  agent.handleRequest(intentMap);

  res.send("welcome to fulfillment");
};
