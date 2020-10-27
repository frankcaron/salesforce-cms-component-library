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

## Deploy

Use SFDX, once connected to your Dev org's Dev Hub to deploy the source. The packaged LWCs are built entirely with vanilla JS, HTML, and CSS powered by the static resources included in the repo. The paired Apex classes will be deployed alongside these LWC.

# Etc.

Created with love by Frank Caron and Joe Morse.
