# Vector Search (Video)

### API Host & Base path

Currently for this API the URL prefix is: `https://ai.contentfabric.io/search/`

This may be subject to change in the future as different environments
are created, and API endpoints are standardized across services.

### Authorization token

This API requires an authorization token.  There are many types of
tokens, and generating the token is beyond the scope of this
particular document.

There is [sample code](../sample/vector_search_video.js) for this API
which shows [one way](../sample/util.js#L39) of generating a
token locally.

## API

The endpoint is: `<base>/q/{iq}/rep/search`

The HTTP operation is `GET`

Where:

  * `<base>` is the API Host Base path
  * `{iq}` is the id of the index content object

The call takes the following query parameters:

  * `terms` The search terms to look for
  * `clips` If true, return clips; otherwise return shots
  * `max_total` Maximum number of results to find (irrespective of pagination)
  * `start` For pagination, which result number to start at
  * `limit` For pagination, how many results to return per page
  * `select` video metadata fields to return with each object
    * typically set to `/public/asset_metadata/title,/public/name,public/asset_metadata/display_title`
  * `authorization` Authorization token for this request.  Note: As of
     this writing, the API does not support authorization being passed
     as a header.

## Results

The API will return a json object.

The JSON object will have the following fields

  * `pagination` This is an object that describes basic pagination information for the response
     * `total_clips` is the number of video clips returned (if `clips=true`)
     * `total` is the number of shots returned by the query
     * `max_total` is the max total requested in the query
     * `start` and `limit` are standard pagination values
  * `debug` is empty in normal production use
  * `warnings` may give warnings about the query
  * `stats` is always empty, for queries following this current version of the documentation
  * `contents` is a list of results, described below

### Content entries

The `contents` key of this object will have a list of content entries that match the query.
Each content entry has the following fields:

Fields under each result:
  * `id` The content object of the video
  * `hash` The version of the video indexed by this search and on which results are based
  * `type` The content type of the video
  * `url` A URL that can be used with authorization to play the video with an embedded HLS player
  * `image_url` A URL that can be used with elv-client-js to load a thumbnail of the video
  * `start` The start time of the clip in human readable format (1h40m0.00s)
  * `end` The end time of the clip in human readable format (1h40m0.00s)
  * `start_time` The start time of the clip in milliseconds
  * `end_time` The end time of the clip in milliseconds
  * `meta` Basic meta information as requested with the ``
  * `source_count` How many entries are in the sources array
  * `sources` Information about matching and scoring
    * `score` The score for this shot; the score for the result is effectively
              the highest score in the sources array
    * `fields` Matching field information from the index, which may not represent the content;
               use the [video tag api](api-video-tags.md) instead.


### sample result

For brevity, the `contents[].sources[].fields` values in the JSON are omitted in the
sample response.

```yaml
{
  "pagination": {
    "max_total": 40,
    "start": 0,
    "limit": 160,
    "total": 15,
    "total_clips": 2
  },
  "contents": [
    {
      "hash": "hq__Fec1WUjRym58uhZxhgJDSzDgW3FUUgeLCwdWcFfNuQdjfu8pdiMG8dcM1aHMjmJEsieZTE6Sau",
      "id": "iq__EXYa2f2BpdJe1FAeWxzoQrjh8wK",
      "qlib_id": "ilibTs4J8Kbjo3WT8CcfQDQVdErZj8K",
      "type": "hq__8v3pmR8Uwihh6qxBHAvXcNsHkDVBo2gG8QxVNbTrsLiRN1Wh3QF4pYtPLMwe4Ck96zxiJH53xs",
      "url": "/q/hq__Fec1WUjRym58uhZxhgJDSzDgW3FUUgeLCwdWcFfNuQdjfu8pdiMG8dcM1aHMjmJEsieZTE6Sau/rep/playout/default/options.json?clip_start=70.01&clip_end=100.737&ignore_trimming=true",
      "image_url": "/q/hq__Fec1WUjRym58uhZxhgJDSzDgW3FUUgeLCwdWcFfNuQdjfu8pdiMG8dcM1aHMjmJEsieZTE6Sau/rep/frame/default/video?t=70.01&ignore_trimming=true",
      "start": "1m10.01s",
      "end": "1m40.737s",
      "start_time": 70010,
      "end_time": 100737,
      "source_count": 10,
      "sources": [
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[44]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.5066348910331726
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[45]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.642561137676239
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[46]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.5962401628494263
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[47]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.5904494524002075
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[51]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.5407544374465942
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[53]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.7476992607116699
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[56]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.7546223402023315
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[57]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.808597207069397
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[58]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.6452518105506897
        }
      ],
      "meta": {
        "public": {
          "asset_metadata": {
            "title": "BDRMTV - Test"
          },
          "name": "BDRMTV - Test MEZ"
        }
      }
    },
    {
      "hash": "hq__Fec1WUjRym58uhZxhgJDSzDgW3FUUgeLCwdWcFfNuQdjfu8pdiMG8dcM1aHMjmJEsieZTE6Sau",
      "id": "iq__EXYa2f2BpdJe1FAeWxzoQrjh8wK",
      "qlib_id": "ilibTs4J8Kbjo3WT8CcfQDQVdErZj8K",
      "type": "hq__8v3pmR8Uwihh6qxBHAvXcNsHkDVBo2gG8QxVNbTrsLiRN1Wh3QF4pYtPLMwe4Ck96zxiJH53xs",
      "url": "/q/hq__Fec1WUjRym58uhZxhgJDSzDgW3FUUgeLCwdWcFfNuQdjfu8pdiMG8dcM1aHMjmJEsieZTE6Sau/rep/playout/default/options.json?clip_start=46.01&clip_end=76.838&ignore_trimming=true",
      "image_url": "/q/hq__Fec1WUjRym58uhZxhgJDSzDgW3FUUgeLCwdWcFfNuQdjfu8pdiMG8dcM1aHMjmJEsieZTE6Sau/rep/frame/default/video?t=46.01&ignore_trimming=true",
      "start": "0m46.01s",
      "end": "1m16.838s",
      "start_time": 46010,
      "end_time": 76838,
      "source_count": 4,
      "sources": [
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[38]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.5940147638320923
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[39]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.5484347939491272
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[40]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.737773060798645
        },
        {
          "prefix": "/video_tags/metadata_tags/0000/metadata_tags/shot_tags/tags[41]",
          "fields": { ...indexed_fields_used_in_score_calculation },
          "score": 0.4809831976890564
        }
      ],
      "meta": {
        "public": {
          "asset_metadata": {
            "title": "BDRMTV - Test"
          },
          "name": "BDRMTV - Test MEZ"
        }
      }
    }
  ]
  "stats": {},
  "warnings": [],
  "debug": {}
}
```

