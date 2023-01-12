export interface IMovie {
  backdrop_path: string;
  id: string | undefined;
  genre_ids: Genres;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  popularity?: number;
  title: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface Genres {
  id: number;
  name: string;
}
