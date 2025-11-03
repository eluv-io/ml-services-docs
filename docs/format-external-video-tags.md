# External Tags Format

This document exists to provide a simple format for providing
external tags (such as sporting game event metadata) to Eluvio 
so that they can be applied as tag "tracks" to a video in the Content Fabric.
    
## Description of file

The file will be json, and the file will be a json object.  The object
will have up to four toplevel keys:
  * version
  * metadata_tags
  * overlay_tags
  * additional_properties

Of these, at least one of metadata_tags or overlay_tags must be present.

[//]: # (NOTE: the "yaml" specifier is used to get colorized json output in code blocks)
[//]: # (      the files are expected to be json.)

The file *must* have a "`version": 1` key/value pair for it to work propertly with eluvio's systems.

```yaml
{
    "version": 1,
    ...metadata_tags,
    ...additional_propperties
}
```

### Additional properties (user data)

One toplevel key, `additional_properties` is a freeform object that will
not be processed by the tag aggregation software, and can be used to
hold information such as the source file information, version of the
transformation software, etc.

```yaml
{
    ...metadata_tags,
    ...overlay_tags,
    "additional_properties": {
        "vendor_name": "Fabulous Vendor",
        "source_file": "file-deadc0de0001.bin"
    }
}
```

### Metadata tags (main data)

The toplevel key `metadata_tags` is also a json object.

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
        "custom_track_key_2": { 
            ...track_key_2_data_as_above
        },
        ...other_tracks
     },
     ...overlay_tags,
     ...additional_properties
}
```

There is a `custom_track_key` which is the internal name for the
track, which will remain constant, even if the display name is
changed.  The `label` is the display name used in the
Eluvio Video Intelligence Editor (EVIE) and other UI locations.

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

### Overlay tags 

**NOTE!** As of the time that this documentation was written, external overlay tags are not processed by Eluvio software,
though support is planned.  If you are providing these tags please discuss with your technical
contact to be sure that external overlay tags are supported.

The toplevel key `overlay_tags` is another json object, which defines "overlay" tags, 
which are frame-level tags that include a bounding box.   The toplevel format of this object is shown
here.

```yaml
{
    ...metadata_tags,
    "overlay_tags": {
        "frame_level_tags": {
            "###": {
                "custom_track_key": {
                    "tags": [
                        ...tag_data_see_below
                    ]
                },
                "custom_track_key_2": { 
                    ...track_key_2_data_as_above
                },
                ...other_tracks_for_this_frame
            },
            ...other_frames_as_above
        }
    }
    ...additional_properties
}
```
Under the `overlay_tags` key is the `frame_level_tags` key which is an object.

The `frame_level_tags` object has a key for each frame containing overlay tags.  `"###"` 
above represents the frame number in which the overlay tags are found; 
note the key is a string, which represents a number, as is typical of `JSON.stringify`.

There is one or more `custom_track_key`s which are the internal name for the
track, and will remain constant, even if the display name is
changed.   Note this should match the `custom_track_key` in the
`metadata_tags` object described earlier in this document if the overlay data is for 
the same "track".  

Under the custom_track_key is the `tags` key which is an array of one or more overlay tags, as below

```yaml
            {
                "text": "a man in a suit with a cross on it.",
                "confidence": 1.0,
                "box": {
                    "x1": 0.05,
                    "y1": 0.05,
                    "x2": 0.95,
                    "y2": 0.95
                }
            }
```

The `text` is the label for this region of the given frame

The `box` describes the bounding polygon.  Coordinates are in terms of the 
percentage of the frame width and height.   There are two possibilities.  

 * If the box contains `x1`, `y1`, `x2`, `y2` then these are the corners of a rectangle.
 * If the box contains at least `x3`, `y3` then the points are the verticies of a polygon. 
     (For example, a pentagon would have `x1`, `y1`, `x2`, `y2`,`x3`, `y3`,`x4`, `y4`,`x5`, and `y5`)
 
`confidence` is optional and describes the confidence in the labeling, with 1.0 being "completely confident"

## Sample json

This sample json file has two tracks, one of which also contains sample overlay information.

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
        },
        "custom_track_key_2": {
            "label": "Custom Label 2",
            "tags": [
                {
                    "start_time": 13801800,
                    "end_time": 13801820,
                    "text": "neat data also has ith overlay"
                },
                {
                    "start_time": 13801900,
                    "end_time": 13801920,
                    "text": "another neat data point"
                }
            ]
        },
        "custom_track_key_3": {
            "label": "Custom Label 3"
        }
    },
    "overlay_tags": {
        "frame_level_tags": {
            "413639": {
                "custom_tag_track_key_2": {
                    "tags": [
                        {
                            "text": "on-screen-object",
                            "box": {
                                "x1": 0.881,
                                "x2": 0.9128,
                                "y1": 0.2653,
                                "y2": 0.3399
                            }
                        }
                    ]
                }
            },
            "413640": {
                "custom_tag_track_key_2": {
                    "tags": [
                        {
                            "text": "rectangular sign",
                            "box": {          
                                "x1": 0.881,
                                "y1": 0.2653,
                                "x2": 0.9128,
                                "y2": 0.3399
                            }
                        }
                    ]
                },
                "custom_tag_track_key_3": {
                    "tags": [
                        {
                            "text": "triangluar tile",
                            "box": {          
                                "x1": 0.881,
                                "y1": 0.2653,
                                "x2": 0.9128,
                                "y2": 0.3399,
                                "x3": 0.0700,
                                "y3": 0.2020
                            }
                        },
                        {
                            "text": "pentagonal building",
                            "box": {          
                                "x1": 0.3205,
                                "y1": 0.1066,
                                "x2": 0.5343,
                                "y2": 0.3101,
                                "x3": 0.4033,
                                "y3": 0.5533,
                                "x4": 0.2222,
                                "y4": 0.5019,
                                "x5": 0.1099,
                                "y5": 0.3123
                            }
                        }
                    ]                
                }
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


## Metadata link & file location

Files for a given vendor (source) will be located on the content object at:

`./files/video_tags/source_tags/external/<vendor>.json`

In the content object metadata, a link will be created each external tags file.
The link key will be of the form:

`video_tags/metadata_tags/<name>` or `video_tags/overlay_tags/<name>`
