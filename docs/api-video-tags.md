# Retreive video tags

This API will retreive video tags from a content object, given a
content object id (iq) and a time range.

### API Host & Base path

Currently for this API the URL prefix is: `https://ai.contentfabric.io/search/`

This may be subject to change in the future as different environments
are created, and API endpoints are standardized across services.

### Authorization token

This API requires an authorization token.  There are many types of
tokens, and generating the token is beyond the scope of this
particular document.

There is [sample code](../sample/retrieve_tag_video.js) for this API
which shows [one way](../sample/util.js#L39) of generating a
token locally.


## API

The endpoint is: `<base>/q/{iq}/tags`

The HTTP operation is `GET`

Where:

  * `<base>` is the API Host Base path
  * `{iq}` is the id of the video content object

The call takes the following query parameters:

  * `start_time` The start time at which to retrieve tags from the content object, in milliseconds
  * `end_time` The end time at which to retrieve tags from the content object, in milliseconds
  * `authorization` Authorization token for this request.  Note: As of
     this writing, the API does not support authorization being passed
     as a header.

## Video tag format:

The returned tags are a JSON-formatted object.  The keys of the object
are the different types of tags, and the value for each key is an
array of tag objects (possibly empty).

The following types of tags are typically provided with the indicated
key, though there may be additional tags beyond these, and all tags
may not be present on all videos:

   * `Celebrity Detection` Celebrities (or other notable people) from our ground truth pool who are present in the video during the given time range
   * `Logo Detection` Logos from our ground truth pool which are present in the video during hte given time range
   * `Landmark Recognition` Landmarks from our ground truth pool which are present in the video during the given time range
   * `Object Detection` This tag is slightly misnamed, it is typically a short sentence fragment describing selected frames from the time range
   * `Optical Character Recognition` Any text that is detected in the video during the given time range
   * `LLAVA Caption` This is a longer more detailed caption of a selection of frames from the time range
   * `Speech to Text` Any speech detected in the video during the given time range.

Each element in the arrays (each tag) has the following fields:
   * `text` A list (typically with only one item) that represents the item of the given type (e.g. Celebrity name, short sentence fragment, etc.)
   * `start_time` The start time (in milliseconds) when the given tag is present in the video
   * `end_time` The end time (in milliseconds) when the given tag is present in the video

#### sample return

`https://ai.contentfabric.io/search/q/iq__EXYa2f2BpdJe1FAeWxzoQrjh8wK/tags?start_time=172010&end_time=175999&authorization=<token>`

```yaml
{
  "LLAVA Caption": [
    {
      "start_time": 172150, "end_time": 172191, 
      "text": [ "The image is a still from a video, likely a profile interview. In the foreground, there is a person seated in a chair, facing the camera. The individual appears to be a woman with dark skin, wearing a white jacket over a black top, and she has her hair styled in braids. She is holding a piece of paper and seems to be speaking or reading from it.\n\nIn the background, there is another person partially visible, suggesting that there is an interviewer or another participant in the interview. The setting appears to be an indoor space with a warm, inviting atmosphere, possibly an office or a studio designed for interviews. The lighting is soft and even, contributing to the professional yet comfortable ambiance of the setting." ]
    },
    {
      "start_time": 174150, "end_time": 174191,      
      "text": [
        "The image is a still from a video, likely a profile interview. It features a woman who appears to be the subject of the interview. She has a light complexion, dark hair styled in braids, and is wearing a white jacket with a collar. Her expression is one of concern or worry, and she is looking slightly to her right. She has a red lipstick and is wearing large gold hoop earrings.\n\nThe setting appears to be an indoor environment, possibly a studio or a room with a wooden panel background. There is a blurred image of a painting or artwork in the background, which suggests a creative or artistic setting.\n\nAt the top of the image, there is text that reads \"BOARDROOM COVER STORY,\" indicating that the video is likely related to a business or corporate context. The text is in a bold, sans-serif font, and it is positioned in the upper third of the image, which is a common placement for titles in video content." ]
    },
    {
      "start_time": 175150, "end_time": 175191,
      "text": [ "The image is a still from a video, likely a profile interview. It features a person seated in a modern, well-lit room with a warm ambiance. The individual appears to be a woman with a relaxed posture, sitting on a white chair with her hands clasped together in her lap. She is wearing a white blouse and has her hair styled in a bun. The setting includes a fireplace and a bookshelf in the background, suggesting a comfortable and professional environment. The lighting is soft and even, casting gentle shadows and highlighting the textures of the room. The image is framed by a title graphic at the top that reads \"BOARDROOM COVER STORY,\" indicating the context of the video." ]
    }
  ],
  "Object Detection": [
    {
      "start_time": 173173, "end_time": 173215,
      "text": [ "a woman with braids and a white shirt ." ]
    },
    {
      "start_time": 175634, "end_time": 175676,
      "text": [ "a woman with braids and a white jacket ." ]
    }
  ],
  "Speech to Text": [
    {
      "start_time": 172839, "end_time": 175884,
      "text": [ "from you started off you were eleven years old and you wanted to play basketball mm" ]
    }
  ]
}
```