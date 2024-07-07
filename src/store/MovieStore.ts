import {makeAutoObservable, runInAction} from 'mobx';
import {API} from '../network/API';
import {Movie, MovieDetail} from '../models/Movie';
import {SDKConfigs} from '../models/Configs';

export class MovieStore {
  movies: Movie[] = [];
  searchResults: Movie[] = [];
  movieDetail: MovieDetail | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    if (SDKConfigs.value.movieStoreObservable) {
      makeAutoObservable(this);
    }
  }

  async fetchMovies() {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const randomKeywords = SDKConfigs.value.randomMovieKeywords;
      var keyword: string =
        randomKeywords[((randomKeywords.length * 10) % randomKeywords.length)] ?? '';
      const data = await API.searchMovies(keyword);
      runInAction(() => {
        this.movies = data.slice(0, Math.min(10, data.length));
      });
    } catch (error) {
      runInAction(() => (this.error = 'Failed to fetch movies'));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async search(query: string) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const data = await API.searchMovies(query);
      runInAction(() => (this.searchResults = data));
    } catch (error) {
      runInAction(() => (this.error = 'Failed to search movies'));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async getMovieDetail(id: string) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const data = await API.getMovie(id);
      runInAction(() => (this.movieDetail = data));
    } catch (error) {
      runInAction(() => (this.error = 'Failed to get movie detail'));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}