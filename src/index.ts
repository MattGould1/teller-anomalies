import type {
  AnomalyScore,
  TellerTransaction,
  UserTransactionSettings,
} from "./types/transaction";
import calculateSingleTransactionAnomalyScore from "./lib/calculateSingleTransactionAnomalyScore";

const getTransactionAnomalyScore = ({
  userSettings,
  transaction,
  transactionHistory,
}: {
  userSettings?: UserTransactionSettings;
  transaction: TellerTransaction;
  transactionHistory: TellerTransaction[];
}): AnomalyScore => {
  return calculateSingleTransactionAnomalyScore({
    userSettings,
    transaction,
    history: transactionHistory,
  });
};

export default getTransactionAnomalyScore;
