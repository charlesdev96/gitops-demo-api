const request = require("supertest");
const app = require("../src/server");

describe("GET /health", () => {
	test("returns status ok", async () => {
		const response = await request(app).get("/health");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ status: "ok" });
	});
});

describe("GET /", () => {
	test("returns the assignment greeting", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			message: "Hello, assignement for charles ogonnaya",
		});
	});
});

