const CardanoWasm = require("@emurgo/cardano-serialization-lib-asmjs");
const bip39 = require("bip39");

class CardanoWallet {
  constructor() {
    this.networkId = CardanoWasm.NetworkId.mainnet();
  }

  // Generate a new seed phrase
  generateSeedPhrase() {
    return bip39.generateMnemonic();
  }

  // Generate a Cardano address from seed phrase
  generateAddress(seedPhrase) {
    const entropy = bip39.mnemonicToEntropy(seedPhrase);
    const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
      Buffer.from(entropy, "hex"),
      Buffer.from("")
    );

    const accountKey = rootKey
      .derive(harden(1852))
      .derive(harden(1815))
      .derive(harden(0));

    const stakeKey = accountKey.derive(2).derive(0).to_public();

    const paymentKey = accountKey.derive(0).derive(0).to_public();

    const baseAddress = CardanoWasm.BaseAddress.new(
      this.networkId,
      CardanoWasm.StakeCredential.from_keyhash(paymentKey.to_raw_key().hash()),
      CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash())
    );

    return baseAddress.to_address().to_bech32();
  }

  // Create a transaction
  async createTransaction(fromAddress, toAddress, amount, utxos) {
    const txBuilder = CardanoWasm.TransactionBuilder.new(
      CardanoWasm.LinearFee.new(
        CardanoWasm.BigNum.from_str("44"),
        CardanoWasm.BigNum.from_str("155381")
      ),
      CardanoWasm.BigNum.from_str("1000000"),
      CardanoWasm.BigNum.from_str("500000000"),
      CardanoWasm.BigNum.from_str("500000000")
    );

    // Add inputs
    for (const utxo of utxos) {
      txBuilder.add_input(
        CardanoWasm.Address.from_bech32(fromAddress),
        CardanoWasm.TransactionInput.new(
          CardanoWasm.TransactionHash.from_bytes(
            Buffer.from(utxo.txHash, "hex")
          ),
          utxo.outputIndex
        ),
        CardanoWasm.Value.new(
          CardanoWasm.BigNum.from_str(utxo.amount.toString())
        )
      );
    }

    // Add output
    txBuilder.add_output(
      CardanoWasm.TransactionOutput.new(
        CardanoWasm.Address.from_bech32(toAddress),
        CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(amount.toString()))
      )
    );

    return txBuilder.build();
  }
}

// Helper function for hardened derivation
function harden(num) {
  return 0x80000000 + num;
}

module.exports = CardanoWallet;
