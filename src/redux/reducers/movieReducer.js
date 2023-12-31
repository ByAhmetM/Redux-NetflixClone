import { actionTypes } from "../actionTypes";

const initialState = {
  popularMovies: [],
  genres: [],
  isMoviesLoading: false,
  isGenresLoading: false,
  isMoviesError: false,
  isGenresError: false,
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MOVİES_LOADİNG:
      return { ...state, isMoviesLoading: true };

    case actionTypes.SET_MOVİES_ERROR:
      return { ...state, isMoviesLoading: false, isMoviesError: true };

    case actionTypes.SET_MOVİES:
      return {
        ...state,
        isMoviesLoading: false,
        isMoviesError: false,
        popularMovies: payload,
      };

    case actionTypes.SET_GENRES_LOADİNG:
      return { ...state, isGenresLoading: true };

    case actionTypes.SET_GENRES_ERROR:
      return { ...state, isGenresLoading: false, isGenresError: true };

    case actionTypes.SET_GENRES:
      return {
        ...state,
        isGenresLoading: false,
        isGenresError: false,
        genres: payload,
      };

    default:
      return state;
  }
};

export default movieReducer;
