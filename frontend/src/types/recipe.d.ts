
export interface Recipe {
	"id": string,
	"title": string,
	"description": string,
	"tags": string[],
	"isFavorite": boolean,
	"steps": string[],
	"ingredients": string[],
	"notes": string,
	"url": string
}