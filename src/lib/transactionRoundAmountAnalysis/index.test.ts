import { TellerTransaction } from "src/types/transaction";
import transactionRoundAmountAnalysis from ".";
import { readFileSync } from "fs";

describe("transactionRoundAmountAnalysis", () => {
  it("Works when the transaction amount is not a round number but is above the threshold", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionRoundAmountAnalysis({
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

  it("Score increases because the transaction amount is a round number above the threshold", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = { amount: "100.00" } as unknown as TellerTransaction;

    const analysis = transactionRoundAmountAnalysis({
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
        roundAmountAnomalyScore: 0.1,
        roundAmountThreshold: 10,
        velocityAnomalyScore: 0.1,
      },
    });

    expect(analysis).toEqual({
      reasons: ["Suspiciously round amount"],
      score: 0.1,
      transaction,
    });
  });
});
