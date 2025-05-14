Name - Eyuel Cherenet
University - Unity University
# Cardano-Workshop-1

# Cardano Wallet

A simple Cardano wallet implementation that provides functionality for:

- Seed phrase generation
- Address generation
- Transaction creation

## Installation

1. Make sure you have Node.js installed (version 14 or higher)
2. Clone this repository
3. Install dependencies:

```bash
npm install
```

## Usage

1. Start the application:

```bash
npm start
```

2. The application will:
   - Generate a new seed phrase
   - Create a Cardano address from the seed phrase
   - Demonstrate transaction creation (note: this is just a demonstration and requires real UTXOs to work)

## Important Notes

- This is a demonstration project and should not be used in production without proper security measures
- Always keep your seed phrase secure and never share it
- The transaction creation example requires real UTXOs to work
- For production use, you should add proper transaction signing and submission to the Cardano network

## Dependencies

- @emurgo/cardano-serialization-lib-asmjs: For Cardano serialization and cryptography
- bip39: For seed phrase generation
- dotenv: For environment variable management

## Security Considerations

- Never commit your seed phrase or private keys to version control
- Use environment variables for sensitive information
- Consider implementing additional security measures for production use
