

## Change Favicon

Replace the current favicon with the uploaded ML logo image.

### Steps

1. Copy the uploaded image `user-uploads://image-33.png` to `public/favicon.png`
2. Update `index.html` to reference the new favicon with a `<link rel="icon">` tag pointing to `/favicon.png`

### Technical Details

- The new favicon will be a PNG file copied to the `public/` directory
- The `index.html` `<head>` section will get a new `<link rel="icon" href="/favicon.png" type="image/png">` entry
- The old `public/favicon.ico` will remain but won't be referenced

