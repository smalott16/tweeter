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

  //hover to change icon colour
  // $("#flag")
  // .mouseover(function() {
  //   $("#flag").css('color', 'gold')
  // })
  // .mouseleave(function() {
  //   $("#flag").css('color', '#4056A1')
  // })

  // $("#retweet")
  // .mouseover(function() {
  //   $("#retweet").css('color', 'gold');
  // })
  // .mouseleave(function() {
  //   $("#retweet").css('color', '#4056A1')
  // })

  // $("#heart")
  // .mouseover(function() {
  //   $("#heart").css('color', 'gold');
  // })
  // .mouseleave(function() {
  //   $("#heart").css('color', '#4056A1')
  // })

});