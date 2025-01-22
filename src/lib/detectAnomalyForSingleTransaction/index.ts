import type {
  AnomalyScore,
  DetectAnomalyForSingleTransactionArgs,
} from "src/types/transaction";
import transactionAmountAnalysis from "../transactionAmountAnalysis";
import transactionFrequencyAnalysis from "../transactionFrequencyAnalysis";
import transactionTimePatternAnalysis from "../transactionTimePatternAnalysis";
import transactionRoundAmountAnalysis from "../transactionRoundAmountAnalysis";
import transactionVelocityAnalysis from "../transactionVelocityAnalysis";

const calculateSingleTransactionAnomalyScore = ({
  userSettings,
  transactionHistory,
  transaction,
}: DetectAnomalyForSingleTransactionArgs): AnomalyScore => {
  const _userSettings = userSettings ?? {
    frequencyWindowHours: 24,
    maxFrequencyThreshold: 2,
    amountThresholdMultiplier: 3,
    amountAnomalyScore: 0.4,
    frequencyAnomalyScore: 0.3,
    timePatternAnomalyScore: 0.2,
    timePatternWindowHours: [0, 4],
    roundAmountAnomalyScore: 0.1,
    roundAmountThreshold: 10,
    velocityAnomalyScore: 0.1,
  };

  const analysisResults = [
    transactionAmountAnalysis,
    transactionFrequencyAnalysis,
    transactionTimePatternAnalysis,
    transactionRoundAmountAnalysis,
    transactionVelocityAnalysis,
  ].map((analyzer) => {
    return analyzer({
      transaction,
      transactionHistory,
      userSettings: _userSettings,
    });
  });

  const score = analysisResults.reduce((total, result) => {
    return total + result.score;
  }, 0);
  const reasons = analysisResults.flatMap((result) => {
    return result.reasons;
  });

  return { transaction, score, reasons };
};

export default calculateSingleTransactionAnomalyScore;
