# Search image tags

### API Host & Base path

Currently for this API the URL prefix is: `https://ai.contentfabric.io/search/`

This may be subject to change in the future as different environments
are created, and API endpoints are standardized across services.

### Authorization token

This API requires an authorization token.  There are many types of
tokens, and generating the token is beyond the scope of this
particular document.

There is [sample code](../sample/vector_search_image.js) for this API
which shows [one way](../sample/util.js#L39) one way of generating a
token locally.

## API

The endpoint is: `<base>/q/{iq}/rep/search`

The HTTP operation is `GET`

Where:

  * `<base>` is the API Host Base path
  * `{iq}` is the id of the index content object

The call takes the following query parameters:

  * `terms` The search terms to look for
  * `max_total` Maximum number of results to find (irrespective of pagination)
  * `start` For pagination, which result number to start at
  * `limit` For pagination, how many results to return per page
  * `authorization` Authorization token for this request.  Note: As of
     this writing, the API does not support authorization being passed
     as a header.

## Results

API will return a json object.  The `results` key of this object will
be the matching search results. Some fields have been elided for
clarity.

Important fields under each result:
  * `id` The content object where the image asset can be found
  * `prefix` The path to the image asset on the given content object
  * `score` The score of this result

```yaml
{
  "pagination": {
    "max_total": 2,
    "start": 0,
    "limit": 40,
    "total": 2
  },
  "results": [
    {
      "hash": "hq__Jy1DuiAdwhDvBvBUb6sWSFnhhp6XQr6tsuAQwsU6pcBLwDbr1FHykWwEo4yZ81xiUXBUMFqVqU",
      "id": "iq__2g4MHjXgoM2r14YJZfyVJzo6cwtW",
      "prefix": "/assets/18947750.jpg",
      "rank": 0,
      "qlib_id": "ilibTs4J8Kbjo3WT8CcfQDQVdErZj8K",
      "type": "hq__8v3pmR8Uwihh6qxBHAvXcNsHkDVBo2gG8QxVNbTrsLiRN1Wh3QF4pYtPLMwe4Ck96zxiJH53xs",
      "score": 0.7646982669830322,
    },
    {
      "hash": "hq__Jy1DuiAdwhDvBvBUb6sWSFnhhp6XQr6tsuAQwsU6pcBLwDbr1FHykWwEo4yZ81xiUXBUMFqVqU",
      "id": "iq__2g4MHjXgoM2r14YJZfyVJzo6cwtW",
      "prefix": "/assets/20979342.jpg",
      "rank": 1,
      "qlib_id": "ilibTs4J8Kbjo3WT8CcfQDQVdErZj8K",
      "type": "hq__8v3pmR8Uwihh6qxBHAvXcNsHkDVBo2gG8QxVNbTrsLiRN1Wh3QF4pYtPLMwe4Ck96zxiJH53xs",
      "score": 0.76119065284729,
    }        
  ],
  "stats": {},
  "warnings": [],
  "debug": {}
}
```

