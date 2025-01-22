import type {
  AnomalyScore,
  TellerTransaction,
  UserTransactionSettings,
} from "./types/transaction";
import detectAnomalyForSingleTransaction from "./lib/detectAnomalyForSingleTransaction";

const getTransactionAnomalyScore = ({
  userSettings,
  transaction,
  transactionHistory,
}: {
  userSettings?: UserTransactionSettings;
  transaction: TellerTransaction;
  transactionHistory: TellerTransaction[];
}): AnomalyScore => {
  return detectAnomalyForSingleTransaction({
    userSettings,
    transaction,
    transactionHistory,
  });
};

export default getTransactionAnomalyScore;
