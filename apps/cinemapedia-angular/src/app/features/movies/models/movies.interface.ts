import { ActorResponse } from "../../actors/models/actors.interface";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  credits: ActorResponse;
  videos: VideoResponse;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}
