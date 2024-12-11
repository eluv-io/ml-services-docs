# Retreive image tags

### API Host & Base path

Currently for this API the URL prefix is: `https://ai.contentfabric.io/search/`

This may be subject to change in the future as different environments
are created, and API endpoints are standardized across services.

### Authorization token

This API requires an authorization token.  There are many types of
tokens, and generating the token is beyond the scope of this
particular document. See the [sample code](../sample/retrieve_tag_image.js)
for one way of generating a token locally.


## API

The endpoint is: `<base>/q/{iq}/image_tags`

The HTTP operation is `GET`

Where:

  * `<base>` is the API Host Base path
  * `{iq}` is the id of the content object containing the image assets

The call takes the following query parameters:

  * `path` a URL encoded path to the asset, typically `%2Fassets%2F<filename>`
  * `authorization` Authorization token for this request.  Note: As of
     this writing, the API does not support authorization being passed
     as a header.

## Image tag format:

The returned tags are a JSON-formatted object.  The keys of the object
are the different types of tags, and the value for each key is an
array of tag objects (possibly empty).

The following types of tags are typically provided, though there may
be additional tags beyond these, and all tags may not be present on
all assets:

   * `celebrity_detection` Celebrities (or other notable people) from our ground truth pool who are present in the image.
   * `logo_detection` Logos from our ground truth pool which are present in the image
   * `landmark_recognition` Landmarks from our ground truth pool which are present in the image
   * `object_detection` This tag is slightly misnamed, it is typically a short sentence fragment caption of the image.
   * `optical_character_recognition` Any text that is detected in the image
   * `llava_caption` This is a longer more detailed caption of the image

Each tag in the lists for all of the tag types have the following fields:

   * `box` This describes the corners of the bounding box (proportional to the image size) where the given tag was detected. There are three possibilities here:
     * for tag types covering the entire image, this this will be a static bounding box covering 90% of the height & width of the image.
     * some tag types, this will be the two corners of a rectangular bounding box (x1,y1) and (x2,y2)
     * for other tag types, this will be the four corners of a quadrilateral bounding box (x1,y1) (x2,y2) (x3,y3) (x4,y4)        
   * `confidence`: How confident the model is that the given tag is correct; some models may simply insert 1 here
   * `text`: Text value of the tag

#### sample return

`https://ai.contentfabric.io/search/q/iq__2g4MHjXgoM2r14YJZfyVJzo6cwtW/image_tags?path=%2Fassets%2F19313048.jpg&authorization=<token>`

```yaml
{
  "celebrity_detection": [
    {
      "box": {
        "x1": 0.3778,
        "x2": 0.5005,
        "y1": 0.2601,
        "y2": 0.5053
      },
      "confidence": 0.9037,
      "text": "Jessica Berman"
    }
  ],
  "landmark_recognition": [],
  "llava_caption": [
    {
      "box": {
        "x1": 0.05,
        "x2": 0.95,
        "y1": 0.05,
        "y2": 0.95
      },
      "confidence": 1,
      "text": "The image depicts a woman sitting at a table, likely participating in an interview or press conference. She is dressed in a white turtleneck sweater and has long brown hair with blonde highlights.\n\n*   **Woman's Appearance**\n    *   The woman wears a white turtleneck sweater.\n    *   Her hair is long, brown, and has blonde highlights.\n*   **Table Setup**\n    *   A black tablecloth covers the table.\n    *   On the left side of the table, there is a clear plastic water bottle with a gray cap.\n    *   Microphones are positioned on either side of her face.\n    *   An Apple logo can be seen on the laptop screen in front of her.\n*   **Background**\n    *   The background features a black backdrop with various logos, including Mastercard, Nike, and Delta.\n\nThe overall atmosphere suggests that the woman is engaged in an official event or presentation, possibly related to sports or business.\n\n"
    }
  ],
  "logo_detection": [
    {
      "box": {
        "x1": 0.8657,
        "x2": 0.9443,
        "y1": 0.0579,
        "y2": 0.1168
      },
      "confidence": 0.9909999966621399,
      "text": "Nike",
      "true_box": {
        "x1": 1212,
        "x2": 1322,
        "y1": 54,
        "y2": 109
      }
    },
    {
      "box": {
        "x1": 0.0107,
        "x2": 0.1164,
        "y1": 0.6774,
        "y2": 0.7138
      },
      "confidence": 0.9660000205039978,
      "text": "CarMax",
      "true_box": {
        "x1": 15,
        "x2": 163,
        "y1": 632,
        "y2": 666
      }
    },
    {
      "box": {
        "x1": 0.2393,
        "x2": 0.3257,
        "y1": 0.2658,
        "y2": 0.328
      },
      "confidence": 0.9950000047683716,
      "text": "Nike",
      "true_box": {
        "x1": 335,
        "x2": 456,
        "y1": 248,
        "y2": 306
      }
    }
  ],
  "object_detection": [
    {
      "box": {
        "x1": 0.05,
        "x2": 0.95,
        "y1": 0.05,
        "y2": 0.95
      },
      "confidence": 1,
      "text": "a woman is speaking into a microphone in front of a sign ."
    }
  ],
  "optical_character_recognition": [
    {
      "box": {
        "x1": 0.4458,
        "x2": 0.5458,
        "x3": 0.5458,
        "x4": 0.4458,
        "y1": 0.0782,
        "y2": 0.0782,
        "y3": 0.1219,
        "y4": 0.1219
      },
      "confidence": 0.8884,
      "polygon": {
        "x1": 0.4458,
        "x2": 0.5458,
        "x3": 0.5458,
        "x4": 0.4458,
        "y1": 0.0782,
        "y2": 0.0782,
        "y3": 0.1219,
        "y4": 0.1219
      },
      "text": "Deloitte"
    },
    {
      "box": {
        "x1": 0.2521,
        "x2": 0.3417,
        "x3": 0.3417,
        "x4": 0.2521,
        "y1": 0.0813,
        "y2": 0.0813,
        "y3": 0.1188,
        "y4": 0.1188
      },
      "confidence": 0.8445,
      "polygon": {
        "x1": 0.2521,
        "x2": 0.3417,
        "x3": 0.3417,
        "x4": 0.2521,
        "y1": 0.0813,
        "y2": 0.0813,
        "y3": 0.1188,
        "y4": 0.1188
      },
      "text": "DELTA"
    },
    {
      "box": {
        "x1": 0.0271,
        "x2": 0.1021,
        "x3": 0.1021,
        "x4": 0.0271,
        "y1": 0.347,
        "y2": 0.347,
        "y3": 0.372,
        "y4": 0.372
      },
      "confidence": 0.9879,
      "polygon": {
        "x1": 0.0271,
        "x2": 0.1021,
        "x3": 0.1021,
        "x4": 0.0271,
        "y1": 0.347,
        "y2": 0.347,
        "y3": 0.372,
        "y4": 0.372
      },
      "text": "Nationwide"
    }
  ],
  "real_llava_caption": [
    {
      "box": {
        "x1": 0.05,
        "x2": 0.95,
        "y1": 0.05,
        "y2": 0.95
      },
      "confidence": 1,
      "text": "The photograph is a color image featuring a woman seated at a table with a microphone in front of her. She appears to be speaking or about to speak, as she is looking slightly to her right with a focused expression. The woman has long, wavy hair and is wearing glasses. She is dressed in a white, long-sleeved top with a high neckline.\n\nBehind her, there is a backdrop with various logos and text, including \"DELTA,\" \"DELITTE,\" \"NATIONWIDE,\" \"UKG,\" \"CARMAXX,\" and \"Budweiser.\" The logos suggest that the event is sponsored or associated with these brands. The backdrop is black with the logos and text in white and yellow.\n\nOn the table in front of her, there is a bottle of water and a laptop with an Apple logo on the lid. The laptop is open and appears to be in use. The setting suggests a formal event or press conference, indicated by the presence of the microphone and the professional attire of the woman.\n"
    }
  ]
}
```
