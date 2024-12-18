# Summarize video

### API Host & Base path

Currently for this API the URL prefix is: `https://ai-03.contentfabric.io/summary/`

This may be subject to change in the future as different environments
are created, and API endpoints are standardized across services.

### Authorization token

This API requires an authorization token.  There are many types of
tokens, and generating the token is beyond the scope of this
particular document.

This example shows [one way](../sample/util.js#L39) of generating a
token locally.

## API

The endpoint is: `<base>/q/{iq}/rep/summarize`

The HTTP operation is `GET`

Where:

  * `<base>` is the API Host Base path
  * `{iq}` is the id of the mezzanine content object

The call takes the following query parameters:

  * `start_time` start time of video from which to generate the summary (in milliseconds)
  * `end_time` end time of video from which to generate the summary (in milliseconds)
  * `authorization` Authorization token for this request.  Note: As of
     this writing, the API does not support authorization being passed
     as a header.

## API Return

The API returns a JSON object with three keys:
  * `summary` The summary of the video range
  * `title` A short title for the summary
  * `hashtags` A list of hashtags for the video range

```yaml
{
  "summary": "The video discusses the performance of NFL quarterbacks Josh Allen and Anthony Richardson. Colin Cowherd and Jason McIntyre analyze their stats and games, noting that Allen's numbers increased as he played more, while Richardson's performance has been disappointing despite having a good coach and team. They also discuss the Jets' draft prospects and whether they will take a quarterback.",
  "title": "Colin Cowherd and Jason McIntyre Discuss NFL Quarterbacks",
  "hashtags": [
    "#NFL",
    "#JoshAllen",
    "#AnthonyRichardson",
    "#Jets"
  ]
}
```
