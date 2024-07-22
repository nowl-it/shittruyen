type CookieType = {
	[key: string]: string;
};

export const CookieGet = (name: string): string | null => {
	const cookies: CookieType = document.cookie.split(';').reduce((cookies: CookieType, cookie: string) => {
		const [name, value] = cookie.split('=').map((c) => c.trim());
		if (name && value) cookies[name] = value;

		return cookies;
	}, {});
	return cookies[name] || null;
};

export const CookieSet = (name: string, value: string, days?: number): void => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const CookieRemove = (name: string): void => {
	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
