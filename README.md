
# Usman Khan — Video Editing Portfolio (static site)

This is a multi-page, dark-mode static portfolio built for easy upload to **GitHub Pages**.

Folder structure (already ready to upload):
```
index.html
cinematic.html
documentary.html
commercial.html
shorts.html
assets/
  css/style.css
  js/main.js
  images/*.svg   (placeholders -- replace with your optimized images)
  videos/        (add hero.mp4 or project videos here)
```

How to publish on GitHub Pages:
1. Create a new repository on GitHub (e.g. `usman-portfolio`).
2. Upload the contents of this ZIP to the repository root (all files and the `assets/` folder).
3. In the repo settings → Pages: choose **main** branch and **/ (root)** as the source. Save.
4. Wait a couple minutes — your site will be live at `https://<your-username>.github.io/<repo-name>/`

Notes & tips:
- Replace the SVG placeholders in `assets/images/` with your optimized `.webp` / `.avif` images (same filenames or update the HTML).
- Drop your reel into `assets/videos/hero.mp4` and update `index.html` if you want autoplay preview for the reel.
- This site uses GSAP via CDN for subtle entrance animations. You can remove GSAP if you prefer pure CSS animations.
- For best performance: convert images to WebP/AVIF, compress video with `ffmpeg`, and enable `brotli`/`gzip` on the server (GitHub Pages already serves compressed assets).
- If you'd like, I can replace the placeholder images with actual images you upload and produce a final ZIP with your media embedded.

Enjoy — and tell me which images/videos you'd like me to replace next!
