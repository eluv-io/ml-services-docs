## Eluvio ML Services

This repository documents publically available endpoints and contains
sample code for Eluvio's ML services.

  * search image tag data [API](docs/api-search-asset.md)
  * retrieve image tag data [API](docs/api-image-tags.md)
  * summarize an image [API](docs/api-summarize-image.md)

There is also documentation of the format for providing "external"
third party tags *to* Eluvio to be loaded into the content fabric.

  * external tag format for video [API](docs/format-external-video-tags.md)
  * external tag format for image [API](docs/format-external-image-tags.md)

### Sample code

See sample code [README.md](samples/README.md) for sample code.

### Brief note about general concepts

While the ML services are 'adjunct' to the content fabric itself, a
brief understanding of basic content fabric concepts may be helpful.

There is existing documentation about the content fabric in general
located [here](https://hub.doc.eluv.io/).  This section is an attempt
to _briefly_ summarize the most important concepts for these APIs.

The main entity of the content fabric are "content objects",
identified by a short string starting with `iq__`.  As such content
objects are often called "iq"s for short.  Each content object has a
defined content type.

There are three main content types for purposes of this documentation:

  * index
  * image asset container
  * video

Content objects all have tree-structured metadata, and may have parts
(for videos), or additional files stored "in" a content object (such
as image assets).

An index is a content object which indexes tag data stored on other
content objects.  To perform a search, the iq of an index object is
needed; the search will find content that is indexed on the index
object.

Videos are usually stored in their own content object (which can
represent different streams, for example english or french audio.)

In contrast, image assets are typically stored as "files" on (or in)
another content object; for an image-based index this will be an image
asset container object.  To uniquely identify an image asset one needs
both the "container" content object (iq) and the asset path within
that content object.

Objects are versioned, and a specific version of an object is referred
to by an object hash, which starts with `hq__`. you may see references
to specific versions of objects in API returns.  In most cases `hq__`
are interchangeable with `iq__` where the former references a specific
version of an object, and the latter represents the "latest" version
of the object.

