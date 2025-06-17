# Video Player for WPBakery

* Contributors: nutttaro
* Donate link: https://www.buymeacoffee.com/nutttaro
* Tags: video-player-for-wpbakery, video-player, html5, self-hosted-video
* Requires at least: 5.7
* Tested up to: 6.8.1
* Requires PHP: 7.4
* License: GPLv2 or later
* License URI: https://www.gnu.org/licenses/gpl-2.0.html

Video Player for WPBakery add-on for WPBakery Page Builder allow add YouTube, Vimeo and Self-Hosted videos (HTML5) to your WordPress website.

## Description

Video Player for WPBakery add-on for WPBakery Page Builder allows add YouTube, Vimeo and Self-Hosted videos (HTML5) to your WordPress website.

__Features:__

* Easy for add video for WPBakery Page Builder
* Support YouTube, Vimeo and Self-Hosted videos (HTML5)
* The plugin is lightweight.

## Installation
1. Upload `video-player-for-wpbakery.zip` to the install plugin page
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Go to page or posts and add video to your content

## Frequently Asked Questions

**How to increase maximum file upload size for Self-Hosted videos?**

Add code below in theme’s `functions.php` file or `wp-config.php` file

```
@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
```

or add code below in `.htaccess` file

```
php_value upload_max_filesize 64M
php_value post_max_size 64M
```

## Changelog

###### 1.0.2
* Fixed XSS
* Tested up to 6.8.1

###### 1.0.1
* Tested up to 6.1.1

###### 1.0.0
* Initial Release

## How to deploy plugin

1. Add latest verion `Stable tag: 1.0.0` to readme.txt
2. Copy changes to `svn/trunk`
3. `cd svn`
4. Copy trunk to tags/new-version
```bash
svn cp trunk tags/1.0.0
svn commit -m "Tagging version 1.0.0"
```
5. `svn stat`
6. `svn commit -m "Commit message"`
