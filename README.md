[![Build Status](https://travis-ci.org/apuravchauhan/html-base64-image.svg?branch=master)](https://travis-ci.org/apuravchauhan/html-base64-image)

# html-inline-image-lqip
A npm package to convert your local image references in any dom element with inline base 64 data uri. This technique is beneficial for saving extra image requests and rendering lightning fast images.

#Support for LQIP (Low Quality Image Placeholder) @bbansal
For LQIP we need to add two data-attributes
- Need to set lqip true 
- Need to padd lqip-parent-url to high resolution url path

It will add two child divs under main div. You can add styling or animation on high resolution image load on basis of class 'aspectRatioPlaceholder-fill' of child div added.