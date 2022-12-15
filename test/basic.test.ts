import { assert, describe, expect, it } from "vitest";
import fetch from "node-fetch";
describe("basic suite", () => {
	it("should fetch the definition", async () => {
		// assert.equal(Math.sqrt(4), 2);
		const response = await fetch("http://localhost:54321/rest/v1/", {
			headers: {
				"Content-Type": "application/json",
				apikey:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
			},
		});

		expect(response.status).to.equal(200);
	});
});
