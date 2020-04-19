const axios = require("axios");

const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100 });

// X, Y, 5, 9, 15, 23, Z - Please create a new function for finding X, Y, Z value
const findXYZ = (req, res) => {
  // if (myCache.has("myKey")) {
  //   return myCache.get("myKey");
  // } else {
  //   return myCache.set(
  //     "findXYZ",
  //     () => {
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
  //     },
  //     1000
  //   );
  // }
};

// If A = 21, A + B = 23, A + C = -21 - Please create a new function for finding B and C value
const findBC = (req, res) => {
  // return cache.get("findBC", () => {
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
    { q: "A + B = 23", ans: ansB },
    {
      q: "A + C = -21 ",
      ans: ansC
    }
  ]);
  // });
};

// Please use “Google API” for finding the best way to go to Central World from SCG Bangsue
const connectGoogleAPI = async (req, res) => {
  // return cache
  //   .get("connectGoogleAPI", async () => {
  const googleAPIKey = process.env.GOOGLE_API;
  const scg = "13.80615,100.5353643";
  const central = "13.746787,100.5372003";
  const resMap = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${scg}&destination=${central}&alternatives=true&key=${googleAPIKey}`
  );
  // console.log(resMap.data);
  res.json(resMap.data);
  // })
  // .then(result => {
  //   return result;
  // });
};

const lineMessageAPI = (req, res) => {
  const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  };
};

module.exports = { findXYZ, findBC, connectGoogleAPI };
