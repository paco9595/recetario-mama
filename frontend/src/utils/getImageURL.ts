export default function getImageURL(imageName?: string): string {
  if (!imageName) return 'https://placehold.co/600x400';
  return `${import.meta.env.VITE_URL_BASE_ENDPOINT}/api/static/images/${imageName}`
}