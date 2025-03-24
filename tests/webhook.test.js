const request = require("supertest");
const express = require("express");
const { handleWebhook } = require("../src/controllers/webhookController");

const app = express();
app.use(express.json());
app.post("/webhook", handleWebhook);

describe("Webhook Listener", () => {
    it("should return 200 for valid webhook", async () => {
        const response = await request(app).post("/webhook").send({ cpu_utilization: 90 });
        expect(response.statusCode).toBe(200);
    });
});
