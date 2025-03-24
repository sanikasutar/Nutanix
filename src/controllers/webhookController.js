const { processNutanixActions } = require("./nutanixService");

exports.handleWebhook = async (req, res) => {
    try {
        console.log("Received Webhook:", req.body);

        // Extract CPU usage from webhook payload
        const cpuUsage = req.body.cpu_utilization || 0;

        if (cpuUsage > 80) { // Threshold for high CPU usage
            console.log(`High CPU detected: ${cpuUsage}%`);
            await processNutanixActions(cpuUsage);
        }

        res.status(200).send("Webhook processed successfully");
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).send("Internal Server Error");
    }
};
