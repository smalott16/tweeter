$(document).ready(function() {

  $( "#tweet-text" ).on("input", function() {
    //on every key stroke, get the length of this text field
    const tweetLength = $(this).val().length;
    if(tweetLength > 140) {
      $('.counter').css('color','red');
    } else {
      console.log(tweetLength);
      $('.counter').css('color','#545149');
    }
    $("#counter").val(140-tweetLength)
  });

});