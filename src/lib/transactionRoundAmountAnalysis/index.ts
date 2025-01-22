import { AnomalyScore, TransactionAnalysisArgs } from "src/types/transaction";

const transactionRoundAmountAnalysis = ({
  transaction,
  userSettings,
}: TransactionAnalysisArgs): AnomalyScore => {
  let score = 0;
  const reasons: string[] = [];

  const amount = Math.abs(parseFloat(transaction.amount));

  const isRoundAmount =
    amount % 10 === 0 && amount > userSettings.roundAmountThreshold;
  if (isRoundAmount) {
    score += userSettings.roundAmountAnomalyScore;
    reasons.push("Suspiciously round amount");
  }

  return {
    transaction,
    reasons,
    score,
  };
};

export default transactionRoundAmountAnalysis;
