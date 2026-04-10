import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth } = pkg;

const client = new Client({
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

client.on("disconnected", (reason) => {
  console.log("⚠️ WhatsApp disconnected:", reason);
});

client.initialize();

export default client;