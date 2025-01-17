import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import { readFile } from "fs/promises";
import path from "path"
// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
const file_path = path.resolve(__dirname, "images/generug.png")

umi.use(irysUploader({ address: "https://devnet.irys.xyz/" }));
// umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    // import the image
    const image = await readFile(file_path);
    //2. Convert image to generic file.
    const file = createGenericFile(image, "bashydee.jpg", {
      contentType: "image/jpeg",
    });
    //3. Upload image
    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
