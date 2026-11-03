const Module = require("node:module");
const load = Module._load;

Module._load = function (request, parent, isMain) {
	if (request === "node-fetch") {
		return async (url, options) => {
			console.log(
				"REQUEST " +
					JSON.stringify({
						url,
						authorization: options.headers.Authorization,
						body: Object.fromEntries(options.body),
					}),
			);
			return {
				ok: true,
				json: async () => ({
					ShieldURL: "https://example.test/shield",
				}),
			};
		};
	}
	return load.call(this, request, parent, isMain);
};
