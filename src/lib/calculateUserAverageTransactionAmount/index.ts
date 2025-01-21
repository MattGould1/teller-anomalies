import { TellerTransaction } from "src/types/transaction";

const calculateUserAverageTransactionAmount = (
  transactions: TellerTransaction[]
): number => {
  const average =
    transactions.reduce((sum, t) => {
      return sum + Math.abs(parseFloat(t.amount));
    }, 0) / transactions.length;

  return average;
};

export default calculateUserAverageTransactionAmount;
