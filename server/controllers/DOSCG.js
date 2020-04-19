const axios = require("axios");

// X, Y, 5, 9, 15, 23, Z - Please create a new function for finding X, Y, Z value
const findXYZ = (req, res) => {
  const arr = ["X", "Y", 5, 9, 15, 23, "Z"];
  const ans = arr.slice(0);

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
  res.send({ arr, ans: ans });
};

// If A = 21, A + B = 23, A + C = -21 - Please create a new function for finding B and C value
const findBC = (req, res) => {
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

  res.send([
    { equation: "A + B = 23", answer: ansB },
    {
      equation: "A + C = -21 ",
      answer: ansC
    }
  ]);
};

// Please use “Google API” for finding the best way to go to Central World from SCG Bangsue
const connectGoogleAPI = async (req, res) => {
  const googleAPIKey = process.env.GOOGLE_API;
  const scg = "13.80615,100.5353643";
  const central = "13.746787,100.5372003";
  const resMap = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${scg}&destination=${central}&alternatives=true&key=${googleAPIKey}`
  );
  res.json(resMap.data);
};

const lineMessageAPI = async (req, res) => {
  // res.send(req);
  // res.sendStatus(200);
  // return;
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
      }
    ];
    reply(replyMessages, replyToken);
  } else {
    const replyMessages = [
      {
        type: "text",
        text: "Delay 10s for send noti"
      }
    ];
    setTimeout(() => reply(replyMessages, replyToken), 10000);
  }
  res.sendStatus(200);
};

module.exports = { findXYZ, findBC, connectGoogleAPI, lineMessageAPI };
