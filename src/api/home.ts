import { HomeAPIResponse } from '@/types/home_a';
import { FetchInstance } from '.';

export const HomeAPI = async (): Promise<HomeAPIResponse> => {
	const response = (await FetchInstance('/home_a')).json();
	return response;
};
