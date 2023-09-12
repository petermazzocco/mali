# Mali - MetaMask Snap for Safe Contract Transactions

![Mali Logo]()

Mali is a MetaMask Snap that helps you ensure the safety of your smart contract transactions. It checks whether the contract you are interacting with is secure or contains vulnerabilities. Please be aware that Mali is a tool for informational purposes and should be used at your own risk.

## Table of Contents

- [Introduction](#introduction)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Smart contracts are an integral part of the blockchain ecosystem, and their security is of utmost importance. Mali is here to provide you with an additional layer of security when interacting with smart contracts through MetaMask Snaps. With Mali, you can gain insights into the safety of a contract before sending transactions.

## How It Works

Mali processes requests by utilizing OpenAI's GPT model to scan the contract ABI (Application Binary Interface) and cross-check it with known hacks and vulnerabilities commonly found in Solidity smart contracts. This process helps identify potential security issues in the contract, giving you valuable information about its safety. The result of the check will provide you with a simple "safe" or "not safe" answer.

Mali performs the following steps to assess contract safety:

1. **ABI Analysis**: Mali extracts the contract's ABI from the contract address, which defines the functions and data structures of the contract.

2. **GPT Model Scanning**: It uses OpenAI's GPT model to analyze the contract's ABI and identify any suspicious patterns or potential vulnerabilities.

3. **Vulnerability Cross-Checking**: The GPT compares the contract's ABI with a database of popular hacks and vulnerabilities in Solidity. If any matches are found, it raises a warning.

4. **Safety Assessment**: Based on the analysis results, Mali provides a safety score or warning to help you make an informed decision when interacting with the contract.

## Installation

Coming soon...
