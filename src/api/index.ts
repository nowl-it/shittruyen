import { fetch } from '@tauri-apps/plugin-http';
import Config from 'global/config.json';

const { api } = Config;

async function checkHostAPI(): Promise<string[]> {
	if (!api.length) throw new Error('Danh sách API không được để trống');
	const validAPI: string[] = [];

	const promises = api.map(async (url) => {
		try {
			await fetch(url);
			validAPI.push(url);
		} catch (e) {
			console.error(`API ${url} không hoạt động`);
		}
	});

	await Promise.all(promises);

	if (!validAPI.length) throw new Error('Không có API nào hoạt động');

	return validAPI;
}

export const FetchInstance = async (url: URL | Request | string, config: RequestInit = {}) => {
	const validAPI = await checkHostAPI();

	return fetch(validAPI[0] + '/api/v2' + url, config);
};
