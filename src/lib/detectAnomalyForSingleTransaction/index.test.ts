import { readFileSync } from "fs";
import { TellerTransaction } from "src/types/transaction";
import detectAnomalyForSingleTransaction from ".";

describe("detectAnomalyForSingleTransaction", () => {
  it("should return a score of 0.5 if the transaction amount is 1.5 times the user's average transaction amount", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const latestTransaction = transactions.pop();

    if (latestTransaction === undefined) {
      console.log("No transactions found");
      return;
    }

    const score = detectAnomalyForSingleTransaction({
      userSettings: {
        frequencyWindowHours: 0.00001,
        maxFrequencyThreshold: 0,
        amountThresholdMultiplier: 0.1,
        amountAnomalyScore: 0.2,
        frequencyAnomalyScore: 0.2,
        timePatternAnomalyScore: 0.2,
        timePatternWindowHours: [0, 4],
        roundAmountAnomalyScore: 0.1,
        roundAmountThreshold: 10,
        velocityAnomalyScore: 0.1,
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

    const score = detectAnomalyForSingleTransaction({
      transaction: latestTransaction,
      transactionHistory: transactions,
    });

    expect(score.score).toBe(0);
  });
});
