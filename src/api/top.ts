import { TopMangaResponse } from '@/types/top';
import { AxiosInstance } from '.';

export const TopMangaAPI = async ({
	duration = 'week',
	page = 1,
	per_page = 24
}: {
	duration: 'week' | 'month' | 'all';
	page: number;
	per_page: number;
}): Promise<TopMangaResponse[]> => {
	const { data: response } = await AxiosInstance().get(
		`/mangas/top?duration=${duration}&page=${page}&per_page=${per_page}`
	);

	return response.data;
};
