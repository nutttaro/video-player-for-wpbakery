# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Video Player for WPBakery (v1.2.0) — a WordPress plugin that adds a "Video Player" element to the WPBakery Page Builder. Supports YouTube, Vimeo, and self-hosted HTML5 videos. Published to wordpress.org via SVN.

## Development Environment

No build tools or package.json. Pure PHP + vanilla JS + SCSS (CSS compiled manually). Runs on XAMPP (PHP 8.3). Requires WPBakery Page Builder to be active — the plugin checks for `js_composer/js_composer.php` at runtime and shows an admin notice if missing.

Test by activating the plugin in WordPress (http://localhost:8081), then adding the "Video Player" element in the WPBakery editor on any page/post. When editing `admin-script.js`, manually minify into `admin-script.min.js` (the minified file is what gets enqueued and is tracked in git). When editing `assets/scss/style.scss`, manually compile to `assets/css/style.css`.

## Architecture

Single-file plugin (singleton pattern) in `video-player-for-wpbakery.php` with two template partials:

### Data flow

1. `vc_map()` registers a "Video Player" element with WPBakery, defining all params (type dropdown, video picker, URL field, playback checkboxes, etc.)
2. `vc_load_params()` registers a custom WPBakery param type `attach_video` — rendered by `vc_attach_video_form_field()`, which outputs a hidden input + media library picker UI
3. The admin JS (`admin-script.js`) handles: toggling HTML5 vs embed fields based on the type dropdown, the media library picker (add/remove video), and auto-muting when autoplay is checked. It listens on WPBakery's `vcPanel.shown` event for panel open.
4. When the page renders, the `[video_player_for_wpbakery]` shortcode dispatches to one of two templates:
   - **`templates/video-html5.php`** — `<video>` tag for self-hosted videos (attachment looked up by ID)
   - **`templates/embed.php`** — YouTube/Vimeo via `wp_oembed_get()`, with optional privacy mode (`youtube-nocookie.com` replacement)
5. Both templates wrap output in a responsive container using CSS `aspect-ratio` based on the width/height params.

### `video_id` backward compatibility

The hidden `video_id` param is kept for posts created before v1.1.0. When a video is selected, both `video` and `video_id` are set to the attachment ID. The shortcode handler falls back: `$attachment_id = !empty($video) ? $video : $video_id`. The param is hidden via CSS (`[data-vc-shortcode-param-name="video_id"] { display: none }`).

## Constants

| Constant | Value |
|---|---|
| `WBVP_PATH` | Plugin directory path |
| `WBVP_PLUGIN_URL` | Plugin URL |
| `WBVP_BASENAME` | Plugin basename |
| `WBVP_VERSION` | `'1.2.0'` |

## Key Conventions

- **Prefix**: `WBVP_` for constants, `wbvp-` for CSS classes and asset handles.
- **Text domain**: `video-player-for-wpbakery` — all user-facing strings must use `__()` or `esc_html__()` with this domain.
- **Escaping**: All output must use WordPress escaping functions (`esc_attr`, `esc_url`, `esc_html`, `wp_kses_post`).
- **Version bump**: When releasing, update `WBVP_VERSION` constant, `Version:` in the plugin header, `Stable tag:` in `readme.txt`, and version in `README.md`.

## Deployment to wordpress.org

The `svn/` directory contains the wordpress.org SVN checkout. Deployment steps:

1. Update `Stable tag:` in `readme.txt`, `Version:` in the plugin header, and `WBVP_VERSION` constant
2. Copy changed files into `svn/trunk/`
3. `cd svn && svn cp trunk tags/<version>`
4. `svn commit -m "Tagging version <version>"`

## Files NOT in Version Control

`svn/`, `node_modules/`, `package-lock.json`, `_DEV/`, `.DS_Store`, and common archives are gitignored. The `admin-script.min.js` IS tracked (no build step to regenerate it).
