import type {
  AnomalyScore,
  TellerTransaction,
  UserTransactionSettings,
} from "src/types/transaction";
import calculateUserAverageTransactionAmount from "../calculateUserAverageTransactionAmount";

const calculateSingleTransactionAnomalyScore = ({
  userSettings,
  history,
  transaction,
}: {
  transaction: TellerTransaction;
  history: TellerTransaction[];
  userSettings?: UserTransactionSettings;
}): AnomalyScore => {
  const _userSettings = userSettings ?? {
    frequencyWindowHours: 24,
    maxFrequencyThreshold: 2,
    amountThresholdMultiplier: 3,
    amountAnomalyScore: 0.4,
    frequencyAnomalyScore: 0.3,
  };

  const reasons: string[] = [];
  let score = 0;

  // Amount analysis
  const amount = Math.abs(parseFloat(transaction.amount));
  const userAverage = calculateUserAverageTransactionAmount(history);
  if (amount > userAverage * _userSettings.amountThresholdMultiplier) {
    score += _userSettings.amountAnomalyScore;
    reasons.push("Unusually high amount");
  }

  // Frequency analysis
  const recentSimilar = history.filter((t) => {
    return (
      t.details.counterparty.name === transaction.details.counterparty.name &&
      new Date(t.date).getTime() >
        new Date().getTime() -
          _userSettings.frequencyWindowHours * 60 * 60 * 1000
    );
  }).length;

  if (recentSimilar >= _userSettings.maxFrequencyThreshold) {
    score += _userSettings.frequencyAnomalyScore;
    reasons.push(
      `Unusual frequency for ${transaction.details.counterparty.name}`
    );
  }

  return { transaction, score, reasons };
};

export default calculateSingleTransactionAnomalyScore;
