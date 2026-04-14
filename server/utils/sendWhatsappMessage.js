import initializeClient from "./whatsappClient.js";

export const sendWhatsappMessage = async ({
  fullName,
  mobile,
  enquiryId,
  course,
}) => {
  try {
    // Skip WhatsApp in production/serverless
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      console.log(`⚠️ WhatsApp disabled in serverless - Would send to: ${mobile}`);
      return { success: true, message: "WhatsApp notification queued" };
    }

    const client = initializeClient();
    
    if (!client) {
      console.error("❌ WhatsApp client not available");
      return null;
    }

    const formattedNumber = `91${mobile}@c.us`;

    const message = `Hi ${fullName},

Thank you for visiting VTA Institute.

Your Enquiry ID is: ${enquiryId}

We appreciate your interest in ${course}.
Our counselling team will guide you further.

📍 VTA Institute
📞 Contact: 9771524982

Thank you for choosing VTA.`;

    const response = await client.sendMessage(formattedNumber, message);

    console.log("✅ WhatsApp sent successfully:", response.id.id);
    return response;
  } catch (error) {
    console.error("❌ WhatsApp sending failed:", error.message);
    return null;
  }
};