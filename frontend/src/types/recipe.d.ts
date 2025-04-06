
export interface Recipe {
	id: string,
	title: string,
	description: string,
	tag: string[],
	isFavorite: boolean,
	steps?: string[],
	ingredients?: string[],
	notes?: string,
	image_url?: string
}