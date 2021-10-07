/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    
  const renderTweets = function(tweets) {
    
    tweets.forEach((tweetElement) => {
      let $tweet = createTweetElement(tweetElement);
      $('#tweets-container').prepend($tweet);

    });
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    let $tweetElement = $(`
    <section class='tweet'>
      <article>
        <header class='article-header'>
          <div>
            <img alt='avatar'src=${escape(tweetData.user.avatars)}></img>
            <span>${escape(tweetData.user.name)}</span>
          </div>
          <span class='handle'>${escape(tweetData.user.handle)}</span>
        </header>
        <div class=articlebody>
          <div class="main">
            <div class="article-tweet">${escape(tweetData.content.text)}</div>
          </div>
        </div>
        <footer class='article-footer'>
          <span>${timeago.format(tweetData.created_at)}</span>
          <span class='icons'>
            <i id="flag" class="fas fa-flag"></i>
            <i id="retweet" class="fas fa-retweet"></i>
            <i id="heart" class="fas fa-heart"></i>
          </span> 
        </footer>
      </article>
    </section>`);
    return $tweetElement;
  };

  const loadTweets = function() {
    $.ajax({
      url:"/tweets/",
      method: "GET"
    })
    .then(function(tweets) {
      return $(renderTweets(tweets));
    })
    
  };
  loadTweets();
  
  const activateError = function(id) {
    if ( $(id).is( ":hidden" ) ) {
      $(id).slideDown( "slow" );
      return;
    } else {
      $(id).slideUp("slow");
      $(id).slideDown( "slow" );
      return;
    }
  };

  $('form').on('submit', function(event) {
    event.preventDefault();

    //throw an error if certain conditions are not met
    let $tweetText = $('#tweet-text').val();
    if(!$tweetText) {
      activateError("#too-short");  
      return;
    } else if ($tweetText.length > 140) {
      activateError("#too-long");
      return;
    } else if ($tweetText && $tweetText.length <= 140 && $( ".error" ).is( ":visible" )) {
      $( ".error" ).slideUp("slow");
    }

    let $output = $('#tweet-text').serialize();
    $.ajax({
        url: "/tweets/",
        method: "POST",
        data: $output
      })
      .then(function(data) {
        loadTweets();
        $("#tweet-text").val("");
        $("#counter").text("140");
      })
      .catch(function(error) {
        console.log("error:", error);
      });

  });

});