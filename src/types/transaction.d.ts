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
  /** The window of time to consider for the same transaction in a given period */
  frequencyWindowHours: number;
  /** The maximum number of the same transactions in a given period */
  maxFrequencyThreshold: number;
  /** The distance between the new transaction and the average transaction amount */
  amountThresholdMultiplier: number;
  /** 0 to 1 */
  amountAnomalyScore: number;
  /** 0 to 1 */
  frequencyAnomalyScore: number;
};

export type AnomalyScore = {
  transaction: TellerTransaction;
  score: number;
  reasons: string[];
};
