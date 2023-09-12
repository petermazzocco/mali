import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai"; // OpenAI API
import axios from "axios";
import { Network, Alchemy } from "alchemy-sdk"; // Alchemy SDK
import { AddressValidator } from "./types/address"; // Validate the address type
import { OnTransactionHandler } from "@metamask/snaps-types"; // MetaMask OnTransactionHandler
import { heading, panel, text } from "@metamask/snaps-ui"; // UI for MetaMask Snaps

dotenv.config();
const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const alchemySettings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(alchemySettings);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/ask", async (req, res) => {
  try {
    // Get the body of the request
    const body = await req.body;

    // Validate the inputted address
    const { address } = AddressValidator.parse(body);

    // Check if the address inputted is a contract address
    const isContractAddress = await alchemy.core.isContractAddress(address);

    // If the address inputted is a wallet address:
    if (isContractAddress) {
      // Make an HTTP request to Etherscan to get the contract ABI
      const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
      const etherscanApiUrl = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${etherscanApiKey}`;
      const etherscanResponse = await axios.get(etherscanApiUrl);

      // Extract the contract ABI from the response
      const contractABI = etherscanResponse.data.result;
      // Log the ABI if needed
      // console.log(JSON.stringify(contractABI));

      // Send the message to OpenAI
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: `You are a helpful assistant that provides information and confirmation about the safety of an Ethereum smart contract address. 
          You will take the provided ABI from a Ethereum smart contract address in a JSON format, and determine if the smart contract is considered safe or not. 
          You will check for popular Solidity hacks and vulnerabilities, such as reentrancy, honey pot, rug pulls, phishing, denial of service, malicious code with external contract, integer overflow, and more, and then check for the functions within the ABI to see if there's any crossover.
          You will give a simple answer: 
          If it's safe to use: "We've determined this contract is safe, but we still advise you to do your own research as we are not 100% accurate." 
          If it's not safe to use: "We have determined this contract is NOT safe, but we still advise you to do your own research as we are not 100% accurate." and if the contract is not safe to use, please provide an a simple one sentence explanation as to why it's not safe.
          Here is the ABI ${JSON.stringify(
            contractABI
          )} in the JSON format. Please determine if the contract is safe or not.`,
          },
        ],
        model: "gpt-3.5-turbo-16k",
        max_tokens: 200,
        temperature: 0.1,
      });

      const responseText = completion.choices[0].message.content;
      res.send(responseText);
    } else {
      return res.send("The address is not a contract address");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port} 🚀`);
});
