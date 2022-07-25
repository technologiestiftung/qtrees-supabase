// find limit in url.search and replace with mx of 100000
export function set_limit(url: URL, amount: number): URL {
	const limit = url.searchParams.get("limit");
	if (limit) {
		if (parseInt(limit, 10) > amount) {
			url.searchParams.set("limit", `${amount}`);
		}
	} else {
		url.searchParams.set("limit", `${amount}`);
	}
	return url;
}
