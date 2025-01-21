import getTransactionAnomalyScore from "../src/index";
import "dotenv/config";

const main = async () => {
  const accessToken = process.env.TELLER_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("TELLER_ACCESS_TOKEN is not set");
  }

  try {
    const { TellerClient } = await import("node-teller");

    const client = new TellerClient({
      certificatePath: "./private/certificates/certificate.pem",
      privateKeyPath: "./private/certificates/private_key.pem",
      accessToken,
    });

    const identities = await client.identity.get();

    if (identities[0] === undefined) {
      throw new Error("No identities found");
    }

    for (const identity of identities) {
      const accountId = identity.account.id;

      // eslint-disable-next-line no-await-in-loop
      const transactions = await client.transactions.list(accountId, {
        count: 1000,
        accessToken,
      });

      const latestTransaction = transactions.pop();

      if (latestTransaction === undefined) {
        console.log("No transactions found");
        return;
      }

      const anomalyScore = getTransactionAnomalyScore({
        userSettings: {
          frequencyWindowHours: 0.1,
          maxFrequencyThreshold: 10,
          amountThresholdMultiplier: 0.5,
          amountAnomalyScore: 0.5,
          frequencyAnomalyScore: 0.5,
        },
        transaction: latestTransaction,
        transactionHistory: transactions,
      });

      console.log(anomalyScore);
    }
  } catch (error) {
    console.error("Error fetching identity:", error);
  }
};

main();
