<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
?>
<div id="<?php echo esc_attr($el_id); ?>" class="video-player-for-wpbakery <?php echo esc_attr($el_class); ?>">
    <div class="video-player-for-wpbakery-container">
        <?php echo wp_kses_post($embed_code); ?>
    </div>
</div>
