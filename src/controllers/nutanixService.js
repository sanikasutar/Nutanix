const axios = require("axios");

const NUTANIX_API_URL = process.env.NUTANIX_API_URL;
const NUTANIX_TOKEN = process.env.NUTANIX_TOKEN;

const axiosInstance = axios.create({
    baseURL: NUTANIX_API_URL,
    headers: {
        "Authorization": `Bearer ${NUTANIX_TOKEN}`,
        "Content-Type": "application/json"
    }
});

async function callNutanixAPI(endpoint, data) {
    try {
        const response = await axiosInstance.post(endpoint, data);
        console.log(`Nutanix API (${endpoint}) Response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error calling Nutanix API (${endpoint}):`, error.response?.data || error.message);
        throw error;
    }
}

exports.processNutanixActions = async (cpuUsage) => {
    try {
        console.log("Triggering Nutanix actions...");

        // Example: Scaling up resources
        await callNutanixAPI("/scale_up", { reason: "CPU usage exceeded", cpu: cpuUsage });

        // Example: Sending alert notification
        await callNutanixAPI("/send_alert", { message: `High CPU: ${cpuUsage}%` });

        console.log("All Nutanix actions executed.");
    } catch (error) {
        console.error("Failed to process Nutanix actions:", error);
    }
};
