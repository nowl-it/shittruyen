import { HomeAPIResponse } from '@/types/home_a';
import { AxiosInstance } from '.';

export const HomeAPI = async (): Promise<HomeAPIResponse> => {
	const response = await (await AxiosInstance()).get('/home_a');

	return response.data;
};
