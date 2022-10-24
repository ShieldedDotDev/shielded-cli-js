import fetch, { Response } from 'node-fetch';

export interface ShieldOptions {
	endpoint: string;
	token: string;
	title?: string;
	text?: string;
	color?: string;
}

export interface ShieldResponse {
	ShieldURL: string;
}

export class StatusError extends Error {
	constructor(message: string, public status: number, public result: Response) {
		super(message);
	}
}

function isShieldOptions(options: Partial<ShieldOptions>): options is ShieldOptions {
	return (typeof options.endpoint === "string") && (typeof options.token === "string");
}

export class ShieldedAPI {

	private options: Omit<ShieldOptions, "token"> = {
		endpoint: 'https://api.shielded.dev',
	};

	constructor(
		options: Partial<ShieldOptions> = {},
	) {
		this.options = { ...this.options, ...options };
	}

	public async updateShield(
		options: Partial<ShieldOptions> = {},
	) {
		options = { ...this.options, ...options };
		if (!isShieldOptions(options)) {
			throw new Error("Calling the API requires endpoint and token options.");
		}

		const params = new URLSearchParams();

		if (options.title) {
			params.append('title', options.title);
		}

		if (options.text) {
			params.append('text', options.text);
		}

		if (options.color) {
			params.append('color', options.color);
		}

		const result = await fetch(options.endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `token ${options.token}`,
			},
			body: params
		})

		if (!result.ok) {
			throw new StatusError(`API returned an error: ${result.status} ${result.statusText}: ${await result.text()}`, result.status, result);
		}

		return await result.json() as ShieldResponse;
	}

}