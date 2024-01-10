export const fetcher = async (endpoint:string) => {
	const resp = await fetch(endpoint, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const json = resp.status == 201 ? await resp.json() : null
	return json;
}

export const updater = async (endpoint: string, body:{}) => {
	const resp = await fetch(endpoint, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const json = resp.status == 201 ? await resp.json() : null
	return json;
};

export const creator = async (endpoint: string, body: {}) => {
	const resp = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const json = resp.status == 201 ? await resp.json() : null
	return json;
};

