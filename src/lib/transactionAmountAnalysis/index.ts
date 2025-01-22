import { AnomalyScore, TransactionAnalysisArgs } from "src/types/transaction";

const transactionAmountAnalysis = ({
  transaction,
  transactionHistory,
  userSettings,
}: TransactionAnalysisArgs): AnomalyScore => {
  let score = 0;
  const reasons: string[] = [];

  const amount = parseFloat(transaction.amount);
  const amounts = transactionHistory.map((t) => {
    return parseFloat(t.amount);
  });

  const mean =
    amounts.reduce((a, b) => {
      return a + b;
    }, 0) / amounts.length;

  const stdDev = Math.sqrt(
    amounts
      .map((x) => {
        return Math.pow(x - mean, 2);
      })
      .reduce((a, b) => {
        return a + b;
      }, 0) / amounts.length
  );

  if (amount > mean + 2 * stdDev) {
    score += userSettings.amountAnomalyScore;
    reasons.push("Amount significantly above historical pattern");
  }

  return {
    transaction,
    score,
    reasons,
  };
};

export default transactionAmountAnalysis;
