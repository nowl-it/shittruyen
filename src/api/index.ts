import axios, { AxiosRequestConfig } from 'axios';

const { VITE_PROXY_API, VITE_BASE_API } = import.meta.env;

export const AxiosInstance = (config: AxiosRequestConfig<any> = {}) =>
	axios.create({
		baseURL: VITE_PROXY_API + VITE_BASE_API,
		...config
	});
