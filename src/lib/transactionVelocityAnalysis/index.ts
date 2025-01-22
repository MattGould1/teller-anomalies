import { AnomalyScore, TransactionAnalysisArgs } from "src/types/transaction";

const transactionVelocityAnalysis = ({
  transaction,
  transactionHistory,
  userSettings,
}: TransactionAnalysisArgs): AnomalyScore => {
  let score = 0;
  const reasons: string[] = [];

  const amounts = transactionHistory.map((t) => {
    return Math.abs(parseFloat(t.amount));
  });

  const mean =
    amounts.reduce((a, b) => {
      return a + b;
    }, 0) / amounts.length;

  const last24Hours = transactionHistory.filter((t) => {
    const hoursAgo =
      (new Date().getTime() - new Date(t.date).getTime()) / (60 * 60 * 1000);
    return hoursAgo <= 24;
  });

  const totalAmount24h = last24Hours.reduce((sum, t) => {
    return sum + Math.abs(parseFloat(t.amount));
  }, 0);

  if (totalAmount24h > mean * 10) {
    score += userSettings.velocityAnomalyScore;
    reasons.push("High velocity of spending in 24h period");
  }

  return {
    transaction,
    reasons,
    score,
  };
};

export default transactionVelocityAnalysis;
