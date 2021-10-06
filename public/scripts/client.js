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

  const createTweetElement = function(tweetData) {
    let $tweetElement = $(`
    <section class='tweet'>
      <article>
        <header class='article-header'>
          <div>
            <img alt='avatar'src=${tweetData.user.avatars}></img>
            <span>${tweetData.user.name}</span>
          </div>
          <span class='handle'>${tweetData.user.handle}</span>
        </header>
        <div class=articlebody>
          <div class="main">
            <div class="article-tweet">${tweetData.content.text}</div>
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
  
  //renderTweets(tweetData);

  $('form').on('submit', function(event) {
    event.preventDefault();

    //throw an error if certain conditions are not met
    let $tweetText = $('#tweet-text').val();
    if(!$tweetText) {
      alert("Your tweet has no content! Please add some text and try again.")
      return;
    } else if ($tweetText.length > 140) {
      alert("Your tweet exceeds 140 characters. Please reduce the length and try again.");
      return;
    }

    let $output = $('#tweet-text').serialize();
    $.ajax({
        url: "/tweets/",
        method: "POST",
        data: $output
      })
      .then(function(data) {
        loadTweets();
        $("#tweet-text").replaceWith($('<textarea class="tweet-box" name="text" id="tweet-text"></textarea>'))
        $("#counter").replaceWith($('<output id="counter" name="counter" class="counter" for="tweet-text">140</output>'))
      })
      .catch(function(error) {
        console.log("error:", error);
      });

  });

});