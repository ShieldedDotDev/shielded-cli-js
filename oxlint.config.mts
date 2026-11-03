import { defineConfig } from "oxlint";

export default defineConfig({
	env: {
		node: true,
	},
	categories: {
		correctness: "error",
		suspicious: "error",
	},
	rules: {
		"no-underscore-dangle": "off",
	},
});
