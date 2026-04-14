import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth } = pkg;

let client = null;
let clientInitialized = false;

// Don't initialize client immediately - do it on demand
const initializeClient = () => {
  // Skip in serverless environment (Vercel doesn't support browser processes)
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    console.log("⚠️ WhatsApp client disabled in serverless/production environment");
    return null;
  }

  if (clientInitialized) {
    return client;
  }

  try {
    client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    client.on("qr", (qr) => {
      console.log("📲 Scan this QR with your WhatsApp:");
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("✅ WhatsApp Client is Ready!");
    });

    client.on("authenticated", () => {
      console.log("🔐 WhatsApp Authenticated");
    });

    client.on("auth_failure", (msg) => {
      console.error("❌ Auth Failure:", msg);
    });

    // Initialize the client
    client.initialize().catch((err) => {
      console.error("❌ WhatsApp Client Initialization Error:", err.message);
    });

    clientInitialized = true;
  } catch (error) {
    console.error("❌ Failed to create WhatsApp client:", error.message);
    return null;
  }

  return client;
};

export default initializeClient;
export { client as whatsappClient };

client.on("disconnected", (reason) => {
  console.log("⚠️ WhatsApp disconnected:", reason);
});

client.initialize();

export default client;