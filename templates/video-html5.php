<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
?>
<div id="<?php echo esc_attr($el_id); ?>" class="video-player-for-wpbakery <?php echo esc_attr($el_class); ?>">
    <div class="video-player-for-wpbakery-container">
        <video
            width="<?php echo esc_attr($width); ?>"
            height="<?php echo esc_attr($height); ?>"
            <?php if (!empty($controls)) : ?>controls<?php endif; ?>
            <?php if (!empty($autoplay)) : ?>autoplay<?php endif; ?>
            <?php if (!empty($loop)) : ?>loop<?php endif; ?>
            <?php if (!empty($muted)) : ?>muted<?php endif; ?>
            <?php if (!empty($playsinline)) : ?>playsinline<?php endif; ?>
            <?php if (!empty($preload)) : ?>preload="<?php echo esc_attr($preload); ?>"<?php endif; ?>
            <?php if (!empty($poster_url)) : ?>poster="<?php echo esc_url($poster_url); ?>"<?php endif; ?>
            crossorigin="anonymous"
            disablepictureinpicture="false">
            <source src="<?php echo esc_url($url); ?>" type="<?php echo esc_attr($mime_type); ?>">
            <?php esc_html_e('Your browser does not support the video tag.', 'video-player-for-wpbakery'); ?>
        </video>
    </div>
</div>
