export interface TopAPIResponse {
	data: TopMangaResponse[] | TopTeamResponse[];
	_metadata: Metadata;
}

export interface TopMangaResponse {
	id: number;
	name: string;
	cover_url: string;
	cover_mobile_url: string;
	newest_chapter_number: string;
	newest_chapter_id: number;
	newest_chapter_created_at: string;
	views_count: number;
	views_count_week: number;
	views_count_month: number;
}

export interface TopTeamResponse {
	id: number;
	name: string;
	views_count: number;
	views_count_week: number;
	views_count_month: number;
	translations_count: number;
}

export interface Metadata {
	total_count: number;
	total_pages: number;
	current_page: number;
	per_page: number;
}
