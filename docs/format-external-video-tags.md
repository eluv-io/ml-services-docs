# External Tags Format for Video

This document exists to provide a simple format for providing
tags to Eluvio in order to be loaded into the track metadata.
    
## Description of file

The file will be json, and the file will be a json object.  The object
will have two toplevel keys.

[//]: # (NOTE: the "yaml" specifier is just used to get colorized json output)
[//]: # (      in code blocks.  the files are expected to be json!)

### Additional properties (user data)

One toplevel key, `additional_properties` is a freeform hash that will
not be processed by the tag aggregation software, and can be used to
hold information such as the source file information, version of the
transformation software, etc.

```yaml
{
    ...metadata_tags,
    "additional_properties": {
        "vendor_name": "Fabulous Vendor",
        "source_file": "file-deadc0de0001.bin"
    }
}
```

### Metadata tags (main data)

The other toplevel key `metadata_tags` is also a json object.

This object contains one or more user-defined tracks, each represented
by a key-to-object mapping, as below:


```yaml
{
    "metadata_tags": {
         "custom_track_key": {
             "label": "Custom Label",
             "tags": [
                 ...tag_data_see_below
             ]
         },
         ...other_tracks
     },
     ...additional_properties
}
```

There is a `custom_track_key` which is the internal name for the
track, which will remain constant, even if the display name is
changed.  The `label` is the display name used in the Video Editor and
other UI locations.

The `tags` key inside of each custom track contains a list of the
individual tags, which represent the timecoded tag data for that track.  Each
tag is a json object as:

```yaml
                {
                    "start_time": 13813800,
                    "end_time": 13813817,
                    "text": "a promo for a tv series called the final season."
                }
```

  * `start_time` is the start time of the tag, in milliseconds
  * `end_time` is the end time of the tag in milliseconds
  * `text` is the text of the tag

Note that other fields may be present, but will be ignored.

#### Bounding box data (future)

Should the need for bounding box tags arise, this is the format that
would be used (but the merging tools will need to be updated to use
this format).

```yaml
                {
                    "start_time": 13801800,
                    "end_time": 13801820,
                    "bounding_boxes": [
                        {
                            "frame_num": 413639,
                            "x1": 0.881,
                            "x2": 0.9128,
                            "y1": 0.2653,
                            "y2": 0.3399
                        },
                        {
                            "frame_num": 413640,
                            "x1": 0.881,
                            "x2": 0.9128,
                            "y1": 0.2653,
                            "y2": 0.3399
                        }
                    ],
                    "text": "some text goes here"
                }
```

The `bounding_boxes` describe the bounding box in terms of percentage
of the video dimensions, but also need to include the frame number (as
`frame_num`) so that they may be merged to the overlay files.

## Sample json

This sample json file has two tracks, one of which contains sample
bounding box information.

```yaml
{
    "metadata_tags": {
        "custom_track_key_1": {
            "label": "Custom Label 1",
            "tags": [
                {
                    "start_time": 13813800,
                    "end_time": 13813817,
                    "text": "a promo for a tv series called the final season."
                },
                {
                    "start_time": 13814751,
                    "end_time": 13814768,
                    "text": "a blue and black sign ."
                },
                {
                    "start_time": 13815318,
                    "end_time": 13815335,
                    "text": "a blue background ."
                }
            ]
        }
        "custom_track_key_2": {
            "label": "Custom Label 2",
            "tags": [
                {
                    "start_time": 13801800,
                    "end_time": 13801820,
                    "bounding_boxes": [
                        {
                            "frame_num": 413639,
                            "x1": 0.881,
                            "x2": 0.9128,
                            "y1": 0.2653,
                            "y2": 0.3399
                        },
                        {
                            "frame_num": 413640,
                            "x1": 0.881,
                            "x2": 0.9128,
                            "y1": 0.2653,
                            "y2": 0.3399
                        }
                    ],
                    "text": "neat on-screen object"
                },
                {
                    "start_time": 13801900,
                    "end_time": 13801920,
                    "bounding_boxes": [
                        {
                            "frame_num": 413642,
                            "x1": 0.881,
                            "x2": 0.9128,
                            "y1": 0.2653,
                            "y2": 0.3399
                        },
                        {
                            "frame_num": 413643,
                            "x1": 0.881,
                            "x2": 0.9128,
                            "y1": 0.2653,
                            "y2": 0.3399
                        }
                    ],
                    "text": "another neat on-screen object"
                }
            ]
        },
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
