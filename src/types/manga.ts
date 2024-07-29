export interface MangaAPIResponse {
	data: MangaResponse;
}

export default interface MangaResponse {
	id: number;
	name: string;
	cover_url: string;
	cover_mobile_url: string;
	panorama_url: string;
	panorama_mobile_url: string;
	newest_chapter_number: string;
	newest_chapter_id: number;
	newest_chapter_created_at: string;
	author: Author;
	description: string;
	full_description: string;
	official_url: string;
	is_region_limited: boolean;
	is_ads: boolean;
	chapters_count: number;
	views_count: number;
	is_nsfw: boolean;
	tags: Tag[];
	team: Team;
	is_following: boolean;
	titles: Title[];
	created_at: string;
	updated_at: string;
}

export interface Author {
	name: string;
}

export interface Tag {
	name: string;
	slug: string;
	tagging_count: number;
}

export interface Team {
	id: number;
	name: string;
	description: string;
	is_ads: boolean;
	facebook_address: any;
	views_count: number;
	translations_count: number;
	created_at: string;
	updated_at: string;
}

export interface Title {
	id: number;
	name: string;
	primary: boolean;
}
