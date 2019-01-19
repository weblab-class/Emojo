// import EmojiIndex API
// source: https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
// API: http://developer.emojidex.com/?javascript#http-requests
 

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://www.emojidex.com/api/v1', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
      console.log(data);
    // data.forEach(movie => {
    //   console.log(movie.title);
    // });
  } else {
    console.log('error');
  }
}

request.send();