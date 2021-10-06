/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
    
  const renderTweets = function(tweets) {
    
    tweets.forEach((tweetElement) => {
      let $tweet = createTweetElement(tweetElement);
      $('#tweets-container').append($tweet);

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
      renderTweets(tweets);
    })
  };
  loadTweets();
  
  //renderTweets(tweetData);

  $('form').on('submit', function(event) {
    event.preventDefault();
    let $output = $('#tweet-text').serialize();

    $.ajax({
        url: "/tweets/",
        method: "POST",
        data: $output
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  });

});