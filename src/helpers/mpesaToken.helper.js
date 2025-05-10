import axios from "axios"
import "dotenv/config"

export const getMpesaAuthToken = async () => {
    try {
        const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
        const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET
        const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64")

        const res = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        return res.data.access_token
    } catch (error) {
        console.log("Error getting mpesa token", error.message)
    }
}