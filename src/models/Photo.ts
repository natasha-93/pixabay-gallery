export interface IPhoto {
  id: number;
  largeImageURL: string;
  likes: number;
  tags: string[];
  views: number;
  downloads: number;
  user: string;
}
