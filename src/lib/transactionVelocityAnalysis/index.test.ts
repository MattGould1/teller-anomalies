import { TellerTransaction } from "src/types/transaction";
import transactionVelocityAnalysis from ".";
import { readFileSync } from "fs";

describe("transactionVelocityAnalysis", () => {
  it("Works when the transaction time is not between 0 and 4", () => {
    const rawTransactions = readFileSync("./test/data/transactions.json");
    const transactions = JSON.parse(
      rawTransactions.toString()
    ) as TellerTransaction[];

    const transaction = transactions.pop() as unknown as TellerTransaction;

    const analysis = transactionVelocityAnalysis({
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
