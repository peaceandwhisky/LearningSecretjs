import { SecretNetworkClient, Wallet, MsgSend, stringToCoins } from "secretjs";
import * as fs from "fs";

const wallet = new Wallet(
  "your account mnemonic"
);

const contract_wasm = fs.readFileSync("./snip20_reference_impl.wasm");

const secretjs = new SecretNetworkClient({
  chainId: "secretdev-1",
  url: "https://1317-(your gitpod scrtlabs-gitpodlocalsec-hogehogehoge.ws-us96.gitpod.io/)",
  wallet: wallet,
  walletAddress: wallet.address,
});

let upload_contract = async () => {
  let tx = await secretjs.tx.compute.storeCode(
    {
      sender: wallet.address,
      wasm_byte_code: contract_wasm,
      source: "",
      builder: "",
    },
    {
      gasLimit: 4_000_000,
    }
  );

  const codeId = Number(
    tx.arrayLog.find((log) => log.type === "message" && log.key === "code_id")
      .value
  );

  console.log("codeId: ", codeId);

  const contractCodeHash = (
    await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
  ).code_hash;
  console.log(`Contract hash: ${contractCodeHash}`);
};

upload_contract().catch((error) => {
  console.error("An error occurred while uploading the contract:", error);
});