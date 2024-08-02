import { Tag } from '@/types/manga';
import { AxiosInstance } from '.';

const getTags = async (id: number): Promise<Tag[]> => {
	const response = await (await AxiosInstance()).get('/mangas/' + id);
	if (response.status === 200) {
		const {
			data: { tags: data }
		} = await response.data;
		return data;
	}
	return [];
};

export default getTags;
