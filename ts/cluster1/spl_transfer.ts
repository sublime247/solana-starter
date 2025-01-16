import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("8u9939U1pFkBQCMUtYK7stYvyPm7VbVqpj7cJ8jeub35");

// Recipient address
const to = new PublicKey("CvPTanAUAeqVpyHc8jAdhZ6iGYeXJy9udRtWNbDfbjRg");

(async () => {
    try {
        const sender_ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        const reciever_ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );
        const transfer_token = await transfer(
            connection,
            keypair,
            sender_ata.address,
            reciever_ata.address,
            keypair,
            1000000 * 1_000_000
        );
        // Transfer the new token to the "toTokenAccount" we just created
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();