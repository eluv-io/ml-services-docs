# External Tags Format for Image Tags

This document exists to provide a simple format for providing
tags to Eluvio in order to be loaded into image asset metadata.
    
## Description of file

The file will be json, and the file will be a json object.  All tag
data exists under the key "asset_tags".  Under this, the next level
will indicate the content object, and the second level will indicate
the specific asset, like so:

```yaml
{
  "asset_tags": {
    "iq_12345": {
      "assets/12345.jpg": {
        ...tag_data
      },
      "assets/5678.jpg": {
        ...tag_data
      }
    },
    "iq_9999": {
      "assets/2468jpg": {
        ...tag_data
      },
      "assets/super_asset.jpg": {
        ...tag_data
      }
    }
  }
}
```

### Metadata tags per asset (main data)

Each asset key has an object with all of the tags for that asset:

```yaml
{
  "asset_tags": {
    "iq_8675309": {
      "assets/jammy.jpg": {
        "celebrity_detection": [
          {
            "box": {
              "x1": 0.4705, "x2": 0.5404, "y1": 0.1962, "y2": 0.2614
            },
            "confidence": 0.9352,
            "text": "Paul Dirac"
          }
        ],
        "landmark_recognition": [],
        "llava_caption": [
          {
            "box": {
              "x1": 0.05, "x2": 0.95, "y1": 0.05, "y2": 0.95
            },
            "confidence": 1,
            "text": "The image depicts a scientist at a blackboard with unreadable equations.  The image is not in color, suggesting it may be older.\n\n"
          }
        ],
        "logo_detection": []
      },
      ...other_assets
    },
    ...other_content_objects
  }    
}
```

The `box` describes the bounding box of the tag in terms of percentage
of the video dimensions.   Bounding boxes may have 2 or 4 points.

### Additional properties (user data)

One toplevel key, `additional_properties` is a freeform hash that will
not be processed by the tag aggregation software, and can be used to
hold information such as the source file information, version of the
transformation software, etc.

## Sample JSON

This is a full sample json showing 3 assets across 2 different content
objects which have been tagged with some of the standard taggers.

```yaml
{
  "asset_tags": {
    "iq_12345": {
      "assets/12345.jpg": {
        "celebrity_detection": [],
        "landmark_recognition": [],
        "llava_caption": [],
        "logo_detection": [
          {
            "box": {
              "x1": 0.5864, "x2": 0.9407, "y1": 0.5263, "y2": 0.6999
            },
            "confidence": 0.953000009059906,
            "text": "Eluvio"
          }
        ],
        "object_detection": []
      },
      "assets/another_asset.jpg": {
        "celebrity_detection": [
          {
            "box": {
              "x1": 0.3778, "x2": 0.5005, "y1": 0.2601, "y2": 0.5053
            },
            "confidence": 0.9037,
            "text": "King George III"
          }
        ],
        "landmark_recognition": [],
        "logo_detection": [
          {
            "box": {
              "x1": 0.8657, "x2": 0.9443, "y1": 0.0579, "y2": 0.1168
            },
            "confidence": 0.9909999966621399,
            "text": "Nike"
          },
          {
            "box": {
              "x1": 0.0107, "x2": 0.1164, "y1": 0.6774, "y2": 0.7138
            },
            "confidence": 0.9660000205039978,
            "text": "Pepsi"
          }
        ],
        "object_detection": []
      }
    },
    "iq_9999": {
      "assets/super_asset.jpg": {       
        "celebrity_detection": [
          {
            "box": {
              "x1": 0.4705, "x2": 0.5404, "y1": 0.1962, "y2": 0.2614
            },
            "confidence": 0.9352,
            "text": "Isaac Newton"
          },
          {
            "box": {
              "x1": 0.0957, "x2": 0.1417, "y1": 0.4612, "y2": 0.5064
            },
            "confidence": 0.4705,
            "text": "Albert Einsten"
          }
        ],
        "landmark_recognition": [],
        "llava_caption": [
          {
            "box": {
              "x1": 0.05, "x2": 0.95, "y1": 0.05, "y2": 0.95
            },
            "confidence": 1,
            "text": "The image depicts two scientists playing soccer in the foreground. The player on the left is attired in a light purple uniform and burnt orange cleats, while his opponent wears a magenta jersey and shorts. The player on the left is attempting to block the other player's header.  The image captures a fantastical soccer match, with rainbows and sparkles in the background.\n\n"
          }
        ],
        "logo_detection": [
          {
            "box": {
              "x1": 0.3073, "x2": 0.6215, "y1": 0.7421, "y2": 0.9007
            },
            "confidence": 0.9850000143051147,
            "text": "Caterpillar"
          }
        ],
        "object_detection": [
          {
            "box": {
              "x1": 0.05, "x2": 0.95, "y1": 0.05, "y2": 0.95
            },
            "confidence": 1,
            "text": "a soccer player jumps in the air to get the ball."
          }
        ],
        "optical_character_recognition": []
      }
    }
  },    
  "additional_properties": {
    "freeform": "properties go here",
    "for": "example", 
    "vendor_name": "Fabulous Vendor",
    "date": "2021-10-31",
    "time": "20:00:00"
  }
}
```
