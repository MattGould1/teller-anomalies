import { TellerTransaction } from "src/types/transaction";
import transactionTimePatternAnalysis from ".";
import { readFileSync } from "fs";

describe("transactionTimePatternAnalysis", () => {
  it("Works when the transaction time is not between 0 and 4", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionTimePatternAnalysis({
      transaction,
      transactionHistory: transactions,
      userSettings: {
        amountAnomalyScore: 0.4,
        frequencyWindowHours: 24,
        maxFrequencyThreshold: 2,
        amountThresholdMultiplier: 3,
        frequencyAnomalyScore: 0.3,
        timePatternAnomalyScore: 0.2,
        timePatternWindowHours: [0, 4],
        roundAmountAnomalyScore: 0.1,
        roundAmountThreshold: 10,
        velocityAnomalyScore: 0.1,
      },
    });

    expect(analysis).toEqual({
      reasons: [],
      score: 0,
      transaction,
    });
  });

  it("Score increases when the transaction time is between 0 and 24 (all day)", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionTimePatternAnalysis({
      transaction,
      transactionHistory: transactions,
      userSettings: {
        amountAnomalyScore: 0.4,
        frequencyWindowHours: 24,
        maxFrequencyThreshold: 2,
        amountThresholdMultiplier: 3,
        frequencyAnomalyScore: 0.3,
        timePatternAnomalyScore: 0.2,
        timePatternWindowHours: [0, 24],
        velocityAnomalyScore: 0.1,
        roundAmountAnomalyScore: 0.1,
        roundAmountThreshold: 10,
      },
    });

    expect(analysis).toEqual({
      reasons: ["Unusual transaction time"],
      score: 0.2,
      transaction,
    });
  });
});
