# Summarize an image

### API Host & Base path

Currently for this API the URL prefix is: `https://ai-03.contentfabric.io/summary/`

This may be subject to change in the future as different environments
are created, and API endpoints are standardized across services.

### Authorization token

This API requires an authorization token.  There are many types of
tokens, and generating the token is beyond the scope of this
particular document.   See the [sample code](sample/summary_image.js)
for one way of generating a token locally.


## API

The endpoint is: `<base>/q/{iq}/rep/image_summarizei`

The HTTP operation is `GET`

Where:

  * `<base>` is the API Host Base path
  * `{iq}` is the id of the content object containing the image assets

The call takes the following query parameters:

  * `path` a URL encoded path to the asset, typically `%2Fassets%2F<filename>`
  * `authorization` Authorization token for this request.  Note: As of
     this writing, the API does not support authorization being passed
     as a header.

## API Return

The API returns a JSON object with three keys:
  * `summary` The summary of the image
  * `title` A short title for the summary
  * `hashtags` A list of (usually three) hashtags for the image

```yaml
{
  "summary": "Jessica Berman participates in an interview or press conference, sitting at a table with a black backdrop featuring various logos including Mastercard, Nike, and Delta.",
  "title": "Jessica Berman Speaks at Official Event",
  "hashtags": ["#Interview", "#PressConference", "#BusinessEvent"]}
```
