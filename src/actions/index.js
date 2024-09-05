import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
} from "../components/heroesList/heroesSlice";

import {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
} from "../components/heroesFilters/filtersSlice";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
};

// export const filtersFetching = () => {
//     return {
//         type: "FILTERS_FETCHING",
//     };
// };

// export const filtersFetching = createAction("FILTERS_FETCHING");

// export const filtersFetched = (filters) => {
//     return {
//         type: "FILTERS_FETCHED",
//         payload: filters,
//     };
// };

// export const filtersFetched = createAction("FILTERS_FETCHED");

// export const filtersFetchingError = () => {
//     return {
//         type: "FILTERS_FETCHING_ERROR",
//     };
// };

// export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");

// export const activeFilterChanged = (filter) => {
//     return {
//         type: "ACTIVE_FILTER_CHANGED",
//         payload: filter,
//     };
// };

// export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED");
