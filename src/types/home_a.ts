export interface HomeAPIResponse {
	data: {
		spotlight_mangas: SpotlightManga[];
		new_chapter_mangas: NewChapterManga[];
	};
}

export interface SpotlightManga {
	id: number;
	name: string;
	panorama_url: string;
	panorama_mobile_url: string;
	panorama_dominant_color: string;
	panorama_dominant_color_2: string;
	description: string;
}

export interface NewChapterManga {
	id: number;
	name: string;
	cover_url: string;
	cover_mobile_url: string;
	newest_chapter_number: string;
	newest_chapter_id: number;
	newest_chapter_created_at: string;
}
