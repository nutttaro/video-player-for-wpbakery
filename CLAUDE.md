# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Video Player for WPBakery (v1.1.0) — a WordPress plugin that adds a "Video Player" element to the WPBakery Page Builder. Supports YouTube, Vimeo, and self-hosted HTML5 videos. Published to wordpress.org via SVN.

## Development Environment

No build tools or package.json. The plugin is pure PHP + vanilla JS + SCSS (CSS compiled manually). Runs on XAMPP (PHP 8.3). Requires WPBakery Page Builder to be active — the plugin checks for `js_composer/js_composer.php` at runtime and shows an admin notice if missing.

Test by activating the plugin in WordPress (http://localhost), then adding the "Video Player" element in the WPBakery editor on any page/post.

## Architecture

Single-file plugin pattern centered on `video-player-for-wpbakery.php`:

- **`Video_Player_For_WPBakery`** — singleton class that handles everything: WPBakery element registration (`vc_map`), a custom param type (`attach_video` for media library video selection), the `[video_player_for_wpbakery]` shortcode, and asset enqueueing.
- **`templates/video-html5.php`** — renders the `<video>` tag for self-hosted videos. Uses variables extracted from shortcode atts (`$url`, `$mime_type`, `$width`, `$height`, `$controls`, `$autoplay`, `$muted`, `$loop`, `$playsinline`, `$preload`, `$poster_url`, `$el_id`, `$el_class`).
- **`templates/embed.php`** — renders YouTube/Vimeo embeds via `wp_oembed_get()`.
- **`assets/js/admin-script.js`** — admin-side jQuery: toggles HTML5 vs embed fields, handles media library picker (add/remove video), auto-mutes when autoplay is checked. The minified version (`admin-script.min.js`) is what gets enqueued.
- **`assets/css/admin-style.css`** — styles for the custom video field in the WPBakery modal. Also hides the `video_id` param (used only for backward compatibility).
- **`assets/scss/style.scss`** → `assets/css/style.css` — minimal frontend styles (centering the player).

## Constants

| Constant | Value |
|---|---|
| `WBVP_PATH` | Plugin directory path |
| `WBVP_PLUGIN_URL` | Plugin URL |
| `WBVP_BASENAME` | Plugin basename |
| `WBVP_VERSION` | `'1.1.0'` |

## Key Conventions

- **Prefix**: `WBVP_` for constants, `wbvp-` for CSS classes and asset handles.
- **Text domain**: `video-player-for-wpbakery` — all user-facing strings must use `__()` or `esc_html__()` with this domain.
- **Escaping**: All output must use WordPress escaping functions (`esc_attr`, `esc_url`, `esc_html`, `wp_kses_post`).
- **`video_id` param**: Hidden field kept for backward compatibility — when a video is selected via the media library, both `video` and `video_id` are set to the attachment ID.

## Deployment to wordpress.org

The `svn/` directory contains the wordpress.org SVN checkout. Deployment steps:

1. Update `Stable tag:` in `readme.txt` and `Version:` in the plugin header
2. Copy changed files into `svn/trunk/`
3. `cd svn && svn cp trunk tags/<version>`
4. `svn commit -m "Tagging version <version>"`

## Files NOT in Version Control

`svn/`, `node_modules/`, `package-lock.json`, `_DEV/`, `.DS_Store`, and common archives are gitignored. The `admin-script.min.js` IS tracked (no build step to regenerate it).
