# movx

`movx` is a small CLI that reorganizes files in the current directory into folders based on a chosen strategy.

It scans recursively and moves matching files into generated directories while skipping `.git`, `node_modules`, `src`, and `dist`.

## Install

```bash
npm install
npm run build
```

To run it locally:

```bash
node dist/index.js -t ext
```

If you want to use the CLI command directly:

```bash
npm link
movx -t ext
```

## Usage

```bash
movx -t <strategy> [-ub|-uk|-um]
```

Show help:

```bash
movx --help
```

## Strategies

- `ext`: organize by file extension like `jpg` or `mp4`
- `size`: organize by file size rounded to `100kb`
- `width`: organize images by width like `1920`, `2`, or `0`
- `height`: organize images by height like `1080`, `1`, or `0`
- `dims`: organize images by dimensions like `1920x1080` or `2x1`
- `fwidth`: organize videos by width like `1920`, `2`, or `0`
- `fheight`: organize videos by height like `1080`, `1`, or `0`
- `fdims`: organize videos by dimensions like `1920x1080` or `2x1`
- `duration`: organize audio or video by duration in seconds like `120`
- `ini`: organize by initial letter of filename, skipping articles like "The", "El", "La", "Los", "Las"

Dimension unit flags for `width`, `height`, `dims`, `fwidth`, `fheight`, and `fdims`:

- `-ub`: pixels, the default
- `-uk`: kilopixels
- `-um`: megapixels

## Examples

```bash
movx -t ext
movx -t dims
movx -t fdims -uk
movx -t duration
```

## Notes

- Image-based strategies use the `image-size` package.
- Video and audio metadata strategies rely on `ffprobe` being available in your `PATH`.
- If a file does not match the selected strategy, it is left in place.
- If a destination filename already exists, `movx` appends `_1`, `_2`, and so on.
