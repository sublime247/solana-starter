import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"
import { get } from "prompt";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const total_token = 5_000_000_000n * 1_000_000n;

// Mint address
const mint = new PublicKey("8u9939U1pFkBQCMUtYK7stYvyPm7VbVqpj7cJ8jeub35");

(async () => {
    try {
        // Create an ATA
        const ata =await  getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey,);
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, total_token);
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
