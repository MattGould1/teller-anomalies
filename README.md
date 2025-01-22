# Teller Anomalies

This is a proof of concept for detecting anomalies in Teller transactions. In dev mode, it uses the Teller API to get all transaction data for an account, pops the last transaction and then calculates the anomaly score for that transaction.

In production mode, you would want to implement this package using a Webhook to get transaction data in real-time and compare the new transaction to the previous transactions stored in your database.

## Installation

```bash
yarn add teller-transaction-anomalies
npm install teller-transaction-anomalies
```

## Usage

```ts
import getTransactionAnomalyScore from "teller-transaction-anomalies";

const anomaly = getTransactionAnomalyScore({
  transaction,
  transactionHistory,
  userSettings,
});

if (anomaly.score > 0) {
  console.log("Anomaly detected", anomaly.transaction);
  anomaly.reasons.forEach((reason) => {
    console.log(reason);
  });
}
```

## Prerequisites

- A Teller account with your certificate and private key

This can be obtained by signing up to https://teller.io/

- A Teller account with a valid access token

The access token needs to be obtained by logging in with your sandbox credentials in Teller Connect. The access token can be generated in https://github.com/MattGould1/teller-connect-vue-playground. Make sure to add your teller account id to the .env file. The access token will be console.logged when you connect.

- A Teller account with at least one transaction (use the sandbox account, this has many transactions setup)

## Setup

1. Clone the repository
2. Run `yarn install`
3. Run `yarn dev`
