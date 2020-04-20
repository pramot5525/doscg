const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const DeviceSubscribe = require("../models/DeviceSubscribe");
const webPush = require("web-push");

// X, Y, 5, 9, 15, 23, Z - Please create a new function for finding X, Y, Z value
const findXYZ = (req, res) => {
  const arr = ["X", "Y", 5, 9, 15, 23, "Z"];
  const ans = arr.slice(0);

  const data = myCache.get("findXYZ");
  if (data) {
    return res.send({ arr, ans: JSON.parse(data) });
  }

  ans.reverse().forEach((num, i) => {
    if (isNaN(num)) {
      if (ans[i + 1] && !isNaN(ans[i + 1])) {
        // Z 23 15

        ans[i] = ans[i + 1] - ans[i + 2] + 2 + ans[i + 1];
      } else if (ans[i - 1] && !isNaN(ans[i - 1])) {
        // 9 5 Y

        ans[i] = ans[i - 1] - (ans[i - 2] - ans[i - 1] - 2);
      }
    }
  });
  ans.reverse();
  // set cache ans
  myCache.set("findXYZ", JSON.stringify(ans));
  res.send({ arr, ans: ans });
};

// If A = 21, A + B = 23, A + C = -21 - Please create a new function for finding B and C value
const findBC = (req, res) => {
  const data = myCache.get("solveEquation");
  if (data) {
    return res.send({ ...JSON.parse(data) });
  }
  const variable = {
    A: null,
    B: null,
    C: null
  };

  const solveEquation = (equation, target = "B") => {
    let arr = equation.split(" ");

    let total = 0,
      sign = 1,
      x = 0;

    arr.forEach((n, i) => {
      if (Object.keys(variable).includes(n) && variable[n] !== null) {
        // set value
        total += sign * variable[n];
      } else if (parseInt(n)) {
        // if number
        if (["+", "-"].includes(arr[i - 1])) {
          total += sign * parseInt(n) * arr[i - 1];
        } else {
          total += sign * parseInt(n);
        }
      } else if (n === target) {
        // if a,b,c
        if (arr[i - 1] == "+") x += sign;
        else if (arr[i - 1] == "-") x -= sign;
        else x += sign;
      }
      // flip sign once
      else if (n === "=") {
        sign = -1;
      }
    });
    const ans = -total / x;
    variable[target] = ans;

    return `${target} = ${ans}`;
  };
  let ansA = solveEquation("A = 21", "A");
  let ansB = solveEquation("A + B = 23", "B");
  let ansC = solveEquation("A + C = -21 ", "C");
  let answers = [
    { equation: "A + B = 23", answer: ansB },
    {
      equation: "A + C = -21 ",
      answer: ansC
    }
  ];
  // set cache ans
  myCache.set("solveEquation", JSON.stringify(answers));
  res.send(answers);
};

// Please use “Google API” for finding the best way to go to Central World from SCG Bangsue
const connectGoogleAPI = async (req, res) => {
  const data = myCache.get("connectGoogleAPI");
  if (data) {
    return res.json(JSON.parse(data));
  }
  const googleAPIKey = process.env.GOOGLE_API;
  const scg = "13.80615,100.5353643";
  const central = "13.746787,100.5372003";
  const resMap = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${scg}&destination=${central}&alternatives=true&key=${googleAPIKey}`
  );

  // set cache
  myCache.set("connectGoogleAPI", JSON.stringify(resMap.data));
  res.json(resMap.data);
};

// function call from line webhook
const lineMessageAPI = async (req, res) => {
  const reply = (messages, token) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.channelAccessToken}`
    };

    const data = { replyToken: token, messages };

    axios({
      url: "https://api.line.me/v2/bot/message/reply",
      method: "POST",
      headers,
      data
    });
  };
  const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  };

  const { replyToken, message } = req.body.events[0];
  if (`${message.text}`.toLocaleLowerCase() === "hello") {
    const replyMessages = [
      {
        type: "text",
        text: "Hello"
      },
      {
        type: "text",
        text: "Ok"
      }
    ];
    reply(replyMessages, replyToken);
  } else {
    const replyMessages = [
      {
        type: "text",
        text: "Notification will show on web after 10 sec"
      }
    ];
    reply(replyMessages, replyToken);
    setTimeout(async () => {
      let device = await DeviceSubscribe.find({});
      if (device) {
        // return res.json(device);
        device.forEach(data => {
          const { subscription } = data;

          res.status(201).json({});

          const payload = JSON.stringify({
            title: "Line bot can't answer",
            message: "user message"
          });

          webPush
            .sendNotification(subscription, payload)
            .catch(error => console.error(error));
        });
      }
      res.json([]);
    }, 10000);
  }
  res.sendStatus(200);
};

const creteDeviceSubscribe = async (req, res) => {
  const { subscription, endpoint } = req.body;
  try {
    let device = await DeviceSubscribe.findOne({ endpoint });
    if (device) {
      return res.status(200);
    }
    device = new DeviceSubscribe({
      subscription,
      endpoint
    });

    await device.save();
    return res.status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getDevices = async (req, res) => {
  let device = await DeviceSubscribe.find({});
  if (device) {
    return res.json(device);
  }
  res.json([]);
};

module.exports = {
  findXYZ,
  findBC,
  connectGoogleAPI,
  lineMessageAPI,
  creteDeviceSubscribe,
  getDevices
};
