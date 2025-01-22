import { AnomalyScore, TransactionAnalysisArgs } from "src/types/transaction";

const transactionFrequencyAnalysis = ({
  transaction,
  transactionHistory,
  userSettings,
}: TransactionAnalysisArgs): AnomalyScore => {
  let score = 0;
  const reasons: string[] = [];

  const recentSimilar = transactionHistory.filter((t) => {
    const hoursAgo =
      (new Date().getTime() - new Date(t.date).getTime()) / (60 * 60 * 1000);

    return (
      t.details.counterparty.name === transaction.details.counterparty.name &&
      hoursAgo <= userSettings.frequencyWindowHours
    );
  });

  if (recentSimilar.length >= userSettings.maxFrequencyThreshold) {
    score += userSettings.frequencyAnomalyScore;
    reasons.push(
      `Unusual frequency for ${transaction.details.counterparty.name}`
    );
  }

  return {
    transaction,
    reasons,
    score,
  };
};

export default transactionFrequencyAnalysis;
