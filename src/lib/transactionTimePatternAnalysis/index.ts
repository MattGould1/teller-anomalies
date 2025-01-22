import { AnomalyScore, TransactionAnalysisArgs } from "src/types/transaction";

const transactionTimePatternAnalysis = ({
  transaction,
  userSettings,
}: TransactionAnalysisArgs): AnomalyScore => {
  let score = 0;
  const reasons: string[] = [];

  const transactionHour = new Date(transaction.date).getHours();
  const isUnusualTime =
    transactionHour >= userSettings.timePatternWindowHours[0] &&
    transactionHour <= userSettings.timePatternWindowHours[1];

  if (isUnusualTime) {
    score += userSettings.timePatternAnomalyScore;
    reasons.push("Unusual transaction time");
  }

  return {
    transaction,
    reasons,
    score,
  };
};

export default transactionTimePatternAnalysis;
