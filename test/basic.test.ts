import { assert, describe, expect, it } from "vitest";
import fetch from "node-fetch";
describe("basic suite", () => {
	it("should fetch the definition", async () => {
		// assert.equal(Math.sqrt(4), 2);
		const response = await fetch("http://localhost:54321/rest/v1/", {
			headers: {
				"Content-Type": "application/json",
				apikey:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs",
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs",
			},
		});

		expect(response.status).to.equal(200);
	});
});
