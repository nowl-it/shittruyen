import { Tag } from '@/types/manga';
import { FetchInstance } from '.';

const getTags = async (id: number): Promise<Tag[]> => {
	const response = await FetchInstance('/mangas/' + id);
	if (response.ok) {
		const {
			data: { tags: data }
		} = await response.json();
		return data;
	}
	return [];
};

export default getTags;
