import request from "supertest";
import app from "../src/app.js";


describe("Search Items in Planets & Space Stations by Object ID", () => {
    test("It should respond with Status 404, because of Invalid Item ID", async () => {
        const response = await request(app).get("/api/items/search/5f0f5f4f5f0f5f4f5f0f5f4f");
        expect(response.statusCode).toBe(404);
    });
});

