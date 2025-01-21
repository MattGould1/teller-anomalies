import { TellerTransaction } from "src/types/transaction";
import calculateUserAverageTransactionAmount from ".";

describe("calculateUserAverageTransactionAmount", () => {
  it("should calculate the average transaction amount", () => {
    const transactions = [
      { amount: 85 },
      { amount: 80 },
      { amount: 80 },
      { amount: 80 },
    ] as unknown as TellerTransaction[];

    const average = calculateUserAverageTransactionAmount(transactions);

    expect(average).toBe(81.25);
  });
});
