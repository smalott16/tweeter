$(document).ready(function() {
  
  //event handler to open the compose tweet box on click
  $("#compose-button").on("click", function() {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow");
      $("#tweet-text").focus();
    } else {
      $(".new-tweet").slideUp("slow");
    }
  });

  //event handler to detect keyboard input in the text area
  $("#tweet-text").on("input", function() {
    //on every key stroke, get the length of this text field
    const tweetLength = $(this).val().length;
    if (tweetLength > 140) {
      $('.counter').css('color','red');
    } else {
      $('.counter').css('color','#545149');
    }
    $("#counter").val(140 - tweetLength);
  });

  $('.scroll-top').on("click", () => {
    $(document.documentElement).scrollTop(0).toggleClass('');
  });

  $(window).scroll(() => {
    if ($(document.documentElement).scrollTop() === 0) {
      $('.scroll-top').css("display", "none");
    } else {
      $('.scroll-top').css("display", "block");

    }
  })
  
});
