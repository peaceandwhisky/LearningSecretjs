import { SecretNetworkClient, Wallet, MsgSend, stringToCoins } from "secretjs";

const wallet = new Wallet(
  "your account mnemonic"
);

const myAddress = wallet.address;

const secretjs = new SecretNetworkClient({
  chainId: "secretdev-1",
  url: "https://1317-(your gitpod scrtlabs-gitpodlocalsec-hogehogehoge.ws-us96.gitpod.io/)",
  wallet: wallet,
  walletAddress: wallet.address,
});

// 残高の参照をする
const {
  balance: { amount },
} = await secretjs.query.bank.balance(
  {
    address: "secret1f0353c2rsg0708ugl7qvhrpr7w8065p0mf0sae",
    denom: "uscrt",
  }
);
console.log(amount)

// uscrtを送金する
const msg = new MsgSend({
  from_address: myAddress,
  to_address: bob,
  amount: stringToCoins("100uscrt"),
});

const tx = await secretjs.tx.broadcast([msg], {
  gasLimit: 20_000,
  gasPriceInFeeDenom: 0.8,
  feeDenom: "uscrt",
});

console.log(tx)
