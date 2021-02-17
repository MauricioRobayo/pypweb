/* eslint-disable no-console, no-await-in-loop */

const axios = require("axios").default;

const maxTimeInHours = 8;
const maxTimeInMinutes = maxTimeInHours * 60;
const maxTimeInSeconds = maxTimeInMinutes * 60;

const webhook =
  "https://api.vercel.com/v1/integrations/deploy/prj_MQlxIz5zQP4GMibWntBaE9r3ws4B/zrVrtysmCF";

let lapseInSeconds = 2;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const exponentialRetryBackOff = async () => {
  while (lapseInSeconds < maxTimeInSeconds) {
    lapseInSeconds *= 2;
    try {
      const { data, status } = await axios.post(webhook);

      console.log({ data, lapseInSeconds, status });

      if (status === 200) {
        return 0;
      }
    } catch (error) {
      console.log(error);
      return 1;
    }
    await sleep(lapseInSeconds * 1000);
  }

  return 1;
};

exponentialRetryBackOff()
  .then(process.exit)
  .catch(() => process.exit(1));
