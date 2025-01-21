import { readFileSync } from "fs";
import getTransactionAnomalyScore from "../../";
import { TellerTransaction } from "src/types/transaction";

describe("calculateSingleTransactionAnomalyScore", () => {
  it.only("should return a score of 0.5 if the transaction amount is 1.5 times the user's average transaction amount", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const latestTransaction = transactions.pop();

    if (latestTransaction === undefined) {
      console.log("No transactions found");
      return;
    }

    const score = getTransactionAnomalyScore({
      userSettings: {
        frequencyWindowHours: 0.00001,
        maxFrequencyThreshold: 0,
        amountThresholdMultiplier: 0.1,
        amountAnomalyScore: 0.2,
        frequencyAnomalyScore: 0.2,
      },
      transaction: latestTransaction,
      transactionHistory: transactions,
    });

    expect(score.score).toBe(0.4);
  });

  it("should return a score of 0", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const latestTransaction = transactions.pop();

    if (latestTransaction === undefined) {
      console.log("No transactions found");
      return;
    }

    const score = getTransactionAnomalyScore({
      transaction: latestTransaction,
      transactionHistory: transactions,
    });

    expect(score.score).toBe(0);
  });
});
