import { assert, describe, expect, it } from "vitest";
import { supabase } from "./__shared/supabase";
import { Database } from "./types";
type Issues = Database["public"]["Tables"]["issues"];
type IssueInsert = Issues["Insert"];
describe("suite name", () => {
	it("should fetch issues", async () => {
		const { data: issues, error } = await supabase
			.from<Issues>("issues")
			.select("*");
		console.info(issues);
		expect(issues).to.toBeDefined();
		expect(error).to.toBeNull();
	});

	it("should create an issue", async () => {
		const { data: issue_types, error: _ } = await supabase
			.from("issue_types")
			.select("*");
		expect(issue_types).to.toBeDefined();
		expect(issue_types).to.toHaveLength(1);
		const { data: issues, error } = await supabase
			.from<IssueInsert>("issues")
			.insert([{ issue_type_id: issue_types![0].id, gml_id: "gml_id" }]);
		console.error(error);
		expect(issues).to.toBeDefined();
		expect(error).to.toBeNull();
	});

	// it("snapshot", () => {
	// 	expect({ foo: "bar" }).toMatchSnapshot();
	// });
});
