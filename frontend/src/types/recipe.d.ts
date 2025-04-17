
export interface Recipe {
	id: string,
	title: string,
	description: string,
	duration_minutes: number,
	portion: number
	tags?: {
		id: string,
		name: string
	}[],
	isFavorite: boolean,
	steps?: {
		id: string, 
		step_number: string,
		instruction: string
	}[],
	ingredients?: {
		id: string,
		name: string,
		quantity: string
	}[],
	notes?: {
		id: string,
		note: string
	}[],
	image_url?: string
}