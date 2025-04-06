export default function getImageURL(imageName?: string): string {
  if (!imageName) return 'https://placehold.co/600x400';
  return imageName
}