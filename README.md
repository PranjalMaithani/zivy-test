# Get started

```
yarn
vite dev
```

Check the page on http://localhost:5173/

### DataList

Dummy UI component that renders the data and has infinite scroll. The LOADING text at the bottom of this component has been used as a marker to fetch more data when it appears on screen, enabling infinite scrolling.

### useDataList

Hook containing the logical part of the `DataList` component.

- Fetches data initially from local storage for list data and the current page number of the api
- Keeps track of the pageNumber of the api, the list data and whether data is being loaded
- Returns `list` - the fetched data, `infiniteScrollRef` - a reference to be set for the infinite scroll element and the `loading` state.
- Whenever data is fetched, it is set in local storage and the page number is updated. The `list` is updated with this data.
- After fetching data from localstorage if the initial page number is 1, this hook will fetch data from the API. If it is not 1, then this is not needed since we already have localStorage data to show on the screen.
- If the infinite scroll ref node appears on screen then more data is fetched.

- I have commented out the `Authorization` header. This was required earlier since my IP had been rate limited. Using Github tokens allows for more API calls.

### TODO

- If there is an error and the API doesn't return data, the current code is still updating the page number. We need to validate the API response schema and then only proceed if it is valid. Incase of an error, we can show an error message and show a button to the user that will allow them to retry.
  Example: This can happen if the user gets rate limited for hte APIs.

### Simulate fresh start

To simulate a reset of this application, clear the site data
