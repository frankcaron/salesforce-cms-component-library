# CMS Component Library

![Status](https://img.shields.io/badge/status-Beta-yellowgreen)
![Geography](https://img.shields.io/badge/Geography-US-blue)

This Salesforce DX (SFDX) repository contains a collection of extended Salesforce CMS components for use with Salesforce Experience Cloud. Salesforce CMS provides editorial content for Experience Cloud, as well as for other Salesforce products and for headless targets. These components allow a user to select and surface CMS content on both topic detail and record detail pages, complementing the standard CMS Collection and CMS Single Item components already available.

# CMS Content by Topic
Designed to be placed on the Topic Detail page in a community. Surfaces CMS content tagged with the topic, alongside other topic detail components like discussions and knowledge articles.

# CMS Content for this Record
Designed to be placed on any record detail page in a community. Displays CMS Content of a particular content type that is tagged with one or more of the same community topics that the record being displayed is tagged with.

# Prereqs

In order to use this app, you'll need to ensure that you have...

* A Salesforce dev org
* Experience Cloud turned ON (with or without user licenses)
* Knowledge of SFDX
* Some JavaScript skills

NOTE: These components are for experience cloud/community only, and will not work in Lightning Experience. This is due to the way topics and CMS content are community-scoped.

# Setup

## Sample Payload
The following payload provides a reference point for how the Managed Content Delivery API returns data from the Apex controller:

    {
        "currentPageUrl": "/services/data/v50.0/connect/communities/0DB6g000000fxT4GAI/managed-content/delivery?language=en_US&managedContentType=news&page=0&pageSize=10&topics=Customer%20Success%2CKits",
        "items": [{
            "associations": {
                "topics": [{
                    "id": "0TO6g0000008PsVGAU",
                    "name": "Customer Success"
                }]
            },
            "contentNodes": {
                "bannerImage": {
                    "altText": "6.community",
                    "fileName": "X6community.jpg",
                    "mediaType": "Image",
                    "mimeType": "image/jpeg",
                    "nodeType": "Media",
                    "resourceUrl": "/services/data/v50.0/connect/communities/0DB6g000000fxT4GAI/file-assets/cmsutils__X6community/content",
                    "thumbnailUrl": null,
                    "title": null,
                    "unauthenticatedUrl": null,
                    "url": "/file-asset/cmsutils__X6community"
                },
                "body": {
                    "nodeType": "RichText",
                    "value": "&lt;p&gt;Community is at the heart of what we do. Our adventure community members are at the forefront of knowledge for trail running, cycling, climbing, and other sports. And our guides are there to help. Sign up for the community today!&lt;/p&gt;"
                },
                "excerpt": {
                    "nodeType": "MultilineText",
                    "value": "Come for the gear, stay for the community. Join our community to meet like-minded adventurers, get gear advice, and learn!"
                },
                "title": {
                    "nodeType": "NameField",
                    "value": "The Adventure Community"
                }
            },
            "contentUrlName": "the-adventure-community",
            "language": "en_US",
            "managedContentId": "20Y6g0000005TJLEA2",
            "publishedDate": "2020-02-17T01:02:53.000Z",
            "title": "The Adventure Community",
            "type": "news",
            "typeLabel": "News",
            "unauthenticatedUrl": "/cms/delivery/v50.0/0DB6g000000fxT4GAI/contents/20Y6g0000005TJLEA2?oid=00D6g000000DB5dEAG"
        }, {
            "associations": {
                "topics": [{
                    "id": "0TO6g0000008PszGAE",
                    "name": "Kits"
                }, {
                    "id": "0TO6g0000008PsVGAU",
                    "name": "Customer Success"
                }]
            },
            "contentNodes": {
                "excerpt": {
                    "nodeType": "MultilineText",
                    "value": "See how renewable energy powers this soccer stadium."
                },
                "title": {
                    "nodeType": "NameField",
                    "value": "Wind Turbines Power an Entire Stadium!"
                },
                "bannerImage": {
                    "altText": "photo-1565811376012-e838183b97af",
                    "fileName": "photo1565811376012e838183b97af.jpeg",
                    "mediaType": "Image",
                    "mimeType": "image/jpeg",
                    "nodeType": "Media",
                    "resourceUrl": "/services/data/v50.0/connect/communities/0DB6g000000fxT4GAI/file-assets/cmsutils__photo1565811376012e838183b97af/content",
                    "thumbnailUrl": null,
                    "title": null,
                    "unauthenticatedUrl": null,
                    "url": "/file-asset/cmsutils__photo1565811376012e838183b97af"
                }
            },
            "contentUrlName": "wind-turbines-power-an-entire-stadium",
            "language": "en_US",
            "managedContentId": "20Y6g0000005T6sEAE",
            "publishedDate": "2020-02-14T21:55:50.000Z",
            "title": "Wind Turbines Power an Entire Stadium!",
            "type": "news",
            "typeLabel": "News",
            "unauthenticatedUrl": "/cms/delivery/v50.0/0DB6g000000fxT4GAI/contents/20Y6g0000005T6sEAE?oid=00D6g000000DB5dEAG"
        }],
        "managedContentTypes": {
            "news": {
                "label": "News",
                "name": "news",
                "nodeTypes": {
                    "bannerImage": {
                        "label": "Banner Image",
                        "name": "bannerImage",
                        "nodeType": "Media"
                    },
                    "body": {
                        "label": "Body",
                        "name": "body",
                        "nodeType": "RichText"
                    },
                    "excerpt": {
                        "label": "Excerpt",
                        "name": "excerpt",
                        "nodeType": "MultilineText"
                    },
                    "title": {
                        "label": "Title",
                        "name": "title",
                        "nodeType": "NameField"
                    }
                }
            }
        },
        "total": 2,
        "totalTypes": 1
    }

## Deploy

Use SFDX, once connected to your Dev org's Dev Hub to deploy the source. The packaged LWCs are built entirely with vanilla JS, HTML, and CSS powered by the static resources included in the repo. The paired Apex classes will be deployed alongside these LWC.

# Etc.

Created with love by Frank Caron and Joe Morse.
