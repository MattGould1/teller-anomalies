import { TellerClient } from 'node-teller';

const main = async () => {
  const client = new TellerClient({
    token: process.env.TELLER_TOKEN,
  });

  try {
    const transactions = await client.transactions.list();
    console.log('Transactions:', transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }

}

main();