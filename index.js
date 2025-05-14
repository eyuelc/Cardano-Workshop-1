const CardanoWallet = require("./wallet");

async function main() {
  // Create a new wallet instance
  const wallet = new CardanoWallet();

  // Generate a new seed phrase
  const seedPhrase = wallet.generateSeedPhrase();
  console.log("Generated Seed Phrase:", seedPhrase);

  // Generate an address from the seed phrase
  const address = wallet.generateAddress(seedPhrase);
  console.log("Generated Address:", address);

  // Example transaction (this is just a demonstration - you'll need real UTXOs)
  const fromAddress = address;
  const toAddress = "addr1q9..."; // Replace with actual recipient address
  const amount = 1000000; // 1 ADA in lovelace
  const utxos = [
    {
      txHash: "1234...", // Replace with actual transaction hash
      outputIndex: 0,
      amount: 2000000, // 2 ADA in lovelace
    },
  ];

  try {
    const transaction = await wallet.createTransaction(
      fromAddress,
      toAddress,
      amount,
      utxos
    );
    console.log("Transaction created successfully");
    // Here you would typically sign and submit the transaction to the network
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
}

main().catch(console.error);
