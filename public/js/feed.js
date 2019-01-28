Element.prototype.insertChildAtIndex = function(child, index) {
  if (!index) index = 0
  if (index >= this.children.length) {
    this.appendChild(child)
  } else {
    this.insertBefore(child, this.children[index])
  }
}

function main() {
	get('/api/whoami', {}, function(user) {
		updateButton(user);
	});
	console.log("calling posts function");
	placePosts();
}

function updateButton(user) {
	if (user._id !== undefined) {
		document.getElementById('log').innerText="LOGOUT😘";
		document.getElementById('log').href="/logout";
	}
	else {
		document.getElementById('log').innerText="LOGIN📂";
		document.getElementById('log').href="./auth/google";
	}
}

function storyDOMObject(storyJSON) {
  const card = document.createElement('div');
  card.className="row-lg";

  const cardContent = document.createElement('div');
  cardContent.id="post";
  cardContent.className="container";

  const cardHeader = document.createElement('h6');
  cardHeader.innerHTML+= "&nbsp;";
  cardHeader.innerHTML+= storyJSON.timestamp;

  const cardUsername = document.createElement('i');
  cardUsername.id="username";
  cardUsername.innerHTML=storyJSON.username;

  const cardFooter = document.createElement('h5');
  cardFooter.innerHTML=storyJSON.content;

  cardHeader.prepend(cardUsername);
  cardContent.prepend(cardFooter);
  cardContent.prepend(cardHeader);
  card.prepend(cardContent);

  return card;
}

function placePosts() {
	//get posts from Mongo DB
	const storiesDiv = document.getElementById('post-table');
	// while (storiesDiv.childNodes.length > 1) {
    //    storiesDiv.removeChild(storiesDiv.lastChild);
	// }
	console.log("calling stories function");
	get('/api/stories', {}, function(storiesArr) {
		console.log("getting stories");
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      console.log("there is a story");
      storiesDiv.insertChildAtIndex(storyDOMObject(currentStory), 1);
    }
   });
	//Create div elements like the template
	//add them as children in the container with ID "post-table"
}

main();