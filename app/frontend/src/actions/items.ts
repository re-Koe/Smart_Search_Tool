import fetch from "isomorphic-fetch";

export const incrementSearches = () => ({
  type: "INCREMENT_SEARCHES",
});

export const decrementSearches = () => ({
  type: "DECREMENT_SEARCHES",
});

export const requestItems = (query: any) => ({
  type: "REQUEST_ITEMS",
  query,
});

export const receiveItems = (items: any) => ({
  type: "RECEIVE_ITEMS",
  items,
});

export const itemRequestFailed = (err: Error) => ({
  type: "ITEM_REQUEST_FAILED",
  err,
});

export function fetchItems(query: string | URL | Request) {
  return function (
    dispatch: (arg0: {
      type: string;
      query?: any;
      err?: Error;
      items?: any;
    }) => void,
  ) {
    dispatch(requestItems(query));
    dispatch(incrementSearches());
    return fetch(query)
      .then((response) =>
        response.json().then((json) => ({
          status: response.status,
          json,
        })),
      )
      .then(
        ({ status, json }) => {
          if (status >= 400)
            dispatch(itemRequestFailed(new Error("Request failed")));
          else dispatch(receiveItems(json));
        },
        (err) => {
          dispatch(itemRequestFailed(err));
        },
      );
  };
}
