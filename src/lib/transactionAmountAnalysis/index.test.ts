import { TellerTransaction } from "src/types/transaction";
import transactionAmountAnalysis from ".";
import { readFileSync } from "fs";

describe("transactionAmountAnalysis", () => {
  it("All transactions are within the historical pattern", () => {
    const transactions = [
      { amount: 85 },
      { amount: 80 },
      { amount: 80 },
      { amount: 180 },
    ] as unknown as TellerTransaction[];

    const analysis = transactionAmountAnalysis({
      transaction: transactions[0] as unknown as TellerTransaction,
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
      transaction: transactions[0],
    });
  });

  it("Detects an amount significantly above the historical pattern", () => {
    const transactions = [
      { amount: 85 },
      { amount: 80 },
      { amount: 500 },
      { amount: -80 },
      { amount: 80 },
      { amount: 80 },
      { amount: -80 },
      { amount: 500 }, // This is significantly above the historical pattern
    ] as unknown as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionAmountAnalysis({
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
      reasons: ["Amount significantly above historical pattern"],
      score: 0.4,
      transaction,
    });
  });

  it("Works with all transaction data", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionAmountAnalysis({
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
});
