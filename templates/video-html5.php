<div id="<?php echo esc_attr($el_id); ?>" class="video-player-for-wpbakery <?php echo esc_attr($el_class); ?>">
    <div class="video-player-for-wpbakery-container">
        <video width="<?php echo esc_attr($width); ?>" height="<?php echo esc_attr($height); ?>" <?php echo esc_attr($controls); ?> <?php echo esc_attr($autoplay); ?> <?php echo esc_attr($loop); ?> <?php echo esc_attr($muted); ?>>
            <source src="<?php echo esc_attr($url); ?>" type="<?php echo esc_attr($mime_type); ?>">
            <?php _e('Your browser does not support the video tag.', 'video-player-for-wpbakery'); ?>
        </video>
    </div>
</div>
