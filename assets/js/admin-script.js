jQuery(function ($) {

  $(document).on('vcPanel.shown', function (e) {
    var $type = $(e.target).find('.video-player-for-wpbakery-type select');
    triggerVideoFields($type, $(e.target));

  });

  $(document).on('change', '.video-player-for-wpbakery-type select', function () {
    var $type = $('#vc_ui-panel-edit-element').find('.video-player-for-wpbakery-type select');
    triggerVideoFields($type, $('#vc_ui-panel-edit-element'));
  });

  function triggerVideoFields($type, $target) {
    if ($type.length) {
      if ($type.val() === 'html5') {
        $target.find('.video-player-for-wpbakery-video').show();
        $target.find('.video-player-for-wpbakery-video_url').hide();
      } else {
        $target.find('.video-player-for-wpbakery-video').hide();
        $target.find('.video-player-for-wpbakery-video_url').show();
      }
    }
  }

  $(document).on('change', '.video-player-for-wpbakery-autoplay input', function () {
    if (this.checked) {
      $('.video-player-for-wpbakery-muted input').prop('checked', true);
    } else {
      $('.video-player-for-wpbakery-muted input').prop('checked', false);
    }
  });


  // Set all variables to be used in scope
  var frame, $vcUiWindow = $('.vc_ui-panel-window-inner');

  // Add Video
  $(document).on("click", ".gallery_widget_add_video", function (event) {

    event.preventDefault();

    // If the media frame already exists, reopen it.
    if (frame) {
      frame.open();
      return;
    }

    // Create a new media frame
    frame = wp.media({
      title: 'Select or Upload Video',
      button: {
        text: 'Use this video'
      },
      multiple: false,  // Set to true to allow multiple files to be selected,
      library: {
        type: ['video']
      },
    });


    // When an video is selected in the media library
    frame.on('select', function () {

      // Get media attachment details from the frame state
      var attachment = frame.state().get('selection').first().toJSON();

      // Send the attachment id to our hidden input
      $vcUiWindow.find('.widget_attached_video_id').val(attachment.id);
      $vcUiWindow.find('.widget_attached_video_name').html(attachment.filename);

      $vcUiWindow.find('.gallery_widget_add_video').hide();
      $vcUiWindow.find('.gallery_widget_remove_video').show();
    });

    // Finally, open the modal on click
    frame.open();
  });

  $(document).on("click", ".gallery_widget_remove_video", function (event) {

    $vcUiWindow.find('.widget_attached_video_id').val('');
    $vcUiWindow.find('.widget_attached_video_name').html('');

    $vcUiWindow.find('.gallery_widget_add_video').show();
    $vcUiWindow.find('.gallery_widget_remove_video').hide();

  });

});