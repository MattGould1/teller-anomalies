import { TellerTransaction } from "src/types/transaction";
import transactionFrequencyAnalysis from ".";
import { readFileSync } from "fs";

describe("transactionFrequencyAnalysis", () => {
  it("Works when the frequency is 2 within 24 hours", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionFrequencyAnalysis({
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

  it("Raises score when the frequency is 0 within 24 hours (force it)", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionFrequencyAnalysis({
      transaction,
      transactionHistory: transactions,
      userSettings: {
        amountAnomalyScore: 0.4,
        frequencyWindowHours: 24,
        maxFrequencyThreshold: 0,
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
      reasons: ["Unusual frequency for AMC METREON"],
      score: 0.3,
      transaction,
    });
  });
});
