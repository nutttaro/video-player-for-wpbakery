<div id="<?php echo $el_id; ?>" class="wpbakery-video-player <?php echo $el_class; ?>">
    <div class="wpbakery-video-player-container">
        <video width="<?php echo $width; ?>" height="<?php echo $height; ?>" <?php echo $controls; ?> <?php echo $autoplay; ?> <?php echo $loop; ?> <?php echo $muted; ?>>
            <source src="<?php echo $url; ?>" type="<?php echo $mime_type; ?>">
            <?php _e('Your browser does not support the video tag.', 'wpbakery-video-player'); ?>
        </video>
    </div>
</div>