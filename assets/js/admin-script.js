jQuery(function ($) {
  'use strict';

  // Video type field toggling
  function toggleVideoFields($panel) {
    var $type = $panel.find('.video-player-for-wpbakery-type select');
    if ($type.length) {
      if ($type.val() === 'html5') {
        $panel.find('.video-player-for-wpbakery-video').show();
        $panel.find('.video-player-for-wpbakery-video_url').hide();
      } else {
        $panel.find('.video-player-for-wpbakery-video').hide();
        $panel.find('.video-player-for-wpbakery-video_url').show();
      }
    }
  }

  // When panel is shown
  $(document).on('vcPanel.shown', function (e) {
    var $panel = $(e.target);
    toggleVideoFields($panel);
  });

  // When video type changes
  $(document).on('change', '.video-player-for-wpbakery-type select', function () {
    var $panel = $(this).closest('.vc_ui-panel-window');
    if (!$panel.length) {
      $panel = $('#vc_ui-panel-edit-element');
    }
    toggleVideoFields($panel);
  });

  // Auto-mute when autoplay is enabled
  $(document).on('change', '.video-player-for-wpbakery-autoplay input', function () {
    var $muted = $(this).closest('.vc_ui-panel-window').find('.video-player-for-wpbakery-muted input');
    if (!$muted.length) {
      $muted = $('#vc_ui-panel-edit-element').find('.video-player-for-wpbakery-muted input');
    }
    $muted.prop('checked', this.checked);
  });

  // Add Video button click
  $(document).on('click', '.wbvp-add-video', function (e) {
    e.preventDefault();

    var $button = $(this);
    var paramName = $button.data('param');
    var $editLine = $button.closest('.edit_form_line');
    var $input = $editLine.find('input[name="' + paramName + '"].wpb_vc_param_value');
	var $input_video_id = $editLine.closest('.vc_edit-form-tab ').find('input[name="video_id"].wpb_vc_param_value');

    // Create media frame
    var frame = wp.media({
      title: 'Select or Upload Video',
      button: {
        text: 'Use this video'
      },
      multiple: false,
      library: {
        type: ['video']
      }
    });

    // When a video is selected
    frame.on('select', function () {
      var attachment = frame.state().get('selection').first().toJSON();

      // Update hidden input and trigger change
      $input.val(attachment.id).trigger('change');
	  $input_video_id.val(attachment.id).trigger('change'); // Store filename in video_id for backward compatibility

      // Update UI
      var filenameText = '<strong>Selected:</strong> ' + attachment.filename;
      $editLine.find('.wbvp-video-filename').html(filenameText).removeClass('wbvp-no-video');
      $editLine.find('.wbvp-add-video').addClass('wbvp-hidden');
      $editLine.find('.wbvp-remove-video').removeClass('wbvp-hidden');
    });

    frame.open();
  });

  // Remove Video button click
  $(document).on('click', '.wbvp-remove-video', function (e) {
    e.preventDefault();

    var $button = $(this);
    var paramName = $button.data('param');
    var $editLine = $button.closest('.edit_form_line');
    var $input = $editLine.find('input[name="' + paramName + '"].wpb_vc_param_value');
	var $input_video_id = $editLine.closest('.vc_edit-form-tab').find('input[name="video_id"].wpb_vc_param_value');

    // Clear input value
    $input.val('').trigger('change');
	$input_video_id.val('').trigger('change'); // Clear video_id as well

    // Update UI
    $editLine.find('.wbvp-video-filename').html('No video selected').addClass('wbvp-no-video');
    $editLine.find('.wbvp-add-video').removeClass('wbvp-hidden');
    $editLine.find('.wbvp-remove-video').addClass('wbvp-hidden');
  });

});
