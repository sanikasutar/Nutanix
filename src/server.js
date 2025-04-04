require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const { handleWebhook } = require("./controllers/webhookController");
const { handleNutanixAction } = require('./controllers/nutanixServicemock');
require("./config/env"); // Load environment 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Enable JSON parsing


// Webhook Endpoint
app.post('/webhook', (req, res) => {
    console.log("Received webhook:", req.body);
const { cpuUsage } = req.body;
    
    if (cpuUsage && cpuUsage > 80) {
        console.log("High CPU detected! Triggering Nutanix action...");
        
        // Call mock Nutanix API
        handleNutanixAction()
            .then(response => {
                res.json({ message: "Nutanix action triggered", response });
            })
            .catch(err => {
                console.error("Error calling Nutanix:", err);
                res.status(500).json({ error: "Failed to trigger Nutanix action" });
            });
    } else {
        console.log("CPU usage normal, no action taken.");
        res.json({ message: "CPU usage normal, no action needed." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Webhook server running on http://localhost:${PORT}`);
});
