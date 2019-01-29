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

  const cardTags = document.createElement('div');
  cardTags.innerText+="Tags: ";
  cardTags.innerHTML+= "&nbsp;";


  for (let i=0; i<storyJSON.tags.length; i++) {
      let tagName = document.createElement('hgroup');
      tagName.className="speech-bubble";
      let paragraph = document.createElement('p');
      paragraph.className="tags";
      paragraph.innerHTML = storyJSON.tags[i];
      tagName.prepend(paragraph);
      cardTags.appendChild(tagName);
  }

  cardContent.prepend(cardTags);
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
	get('/api/stories', {}, function(storiesArr) {
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      storiesDiv.insertChildAtIndex(storyDOMObject(currentStory), 1);
    }
   });
	//Create div elements like the template
	//add them as children in the container with ID "post-table"
}

main();