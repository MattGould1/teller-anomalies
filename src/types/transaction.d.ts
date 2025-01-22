export type TellerTransaction = {
  account_id: string;
  amount: string;
  date: string;
  description: string;
  details: {
    processing_status: "pending" | "complete";
    category:
      | "accommodation"
      | "advertising"
      | "bar"
      | "charity"
      | "clothing"
      | "dining"
      | "education"
      | "electronics"
      | "entertainment"
      | "fuel"
      | "general"
      | "groceries"
      | "health"
      | "home"
      | "income"
      | "insurance"
      | "investment"
      | "loan"
      | "office"
      | "phone"
      | "service"
      | "shopping"
      | "software"
      | "sport"
      | "tax"
      | "transport"
      | "transportation"
      | "utilities";
    counterparty: {
      name: string | null;
      type: "person" | "organization";
    };
  };
  status: "posted" | "pending";
  id: string;
  links: {
    self: string;
    account: string;
  };
  running_balance: string | null;
  type: string;
};

export type UserTransactionSettings = {
  /** The distance between the new transaction and the average transaction amount */
  amountThresholdMultiplier: number;
  /** 0 to 1 */
  amountAnomalyScore: number;
  /** 0 to 1 */
  frequencyAnomalyScore: number;
  /** The window of time to consider for the same transaction in a given period */
  frequencyWindowHours: number;
  /** The maximum number of the same transactions in a given period */
  maxFrequencyThreshold: number;
  /** 0 to 1 */
  timePatternAnomalyScore: number;
  /** The time of day to consider for the transaction */
  timePatternWindowHours: [number, number];
  /** 0 to 1 */
  roundAmountAnomalyScore: number;
  /** The amount to consider for the transaction */
  roundAmountThreshold: number;
  /** 0 to 1 */
  velocityAnomalyScore: number;
};

export type AnomalyScore = {
  transaction: TellerTransaction;
  score: number;
  reasons: string[];
};

export type DetectAnomalyForSingleTransactionArgs = {
  transaction: TellerTransaction;
  transactionHistory: TellerTransaction[];
  userSettings?: UserTransactionSettings;
};

export type TransactionAnalysisArgs = {
  transaction: TellerTransaction;
  transactionHistory: TellerTransaction[];
  userSettings: UserTransactionSettings;
};
