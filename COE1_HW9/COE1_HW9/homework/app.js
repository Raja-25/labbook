

const root = document.getElementById('root');
const listPage = document.getElementById('tweetItems');
const addTweetButton = document.querySelector('.addTweet');
const listContainer = document.getElementById('list');
const alertMessage = document.getElementById('alertMessage');
const alertMessageText = document.getElementById('alertMessageText');
const modifyItem = document.getElementById('modifyItem');
const modifyItemHeader = document.getElementById('modifyItemHeader');
const modifyItemInput = document.getElementById('modifyItemInput');
const cancelModificationButton = document.getElementById('cancelModification');
const saveModifiedItemButton = document.getElementById('saveModifiedItem');
const navigationButtons = document.getElementById('navigationButtons');

let tweets = [];
let likedTweets = [];

// Utility function to display alerts
function showAlert(message) {
  alertMessageText.textContent = message;
  alertMessage.classList.remove('hidden');
  setTimeout(() => {
    alertMessage.classList.add('hidden');
  }, 2000);
}

// Function to render tweets on the main page
function renderTweets() {
  listContainer.innerHTML = '';
  tweets.forEach(tweet => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="${likedTweets.includes(tweet.id) ? 'liked' : ''}" data-id="${tweet.id}">${tweet.text}</span>
      <button class="editTweet">Edit</button>
      <button class="removeTweet">Remove</button>
      <button class="likeTweet">${likedTweets.includes(tweet.id) ? 'Unlike' : 'Like'}</button>
    `;
    listContainer.appendChild(listItem);
  });
}

// Function to render liked tweets on the liked page
function renderLikedTweets() {
  listContainer.innerHTML = '';
  likedTweets.forEach(id => {
    const tweet = tweets.find(t => t.id === id);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="liked" data-id="${tweet.id}">${tweet.text}</span>
    `;
    listContainer.appendChild(listItem);
  });
}

// Event listener for the "Add tweet" button
addTweetButton.addEventListener('click', () => {
  // Redirect to the Add Tweet page or modify the UI accordingly
  // based on your application structure (you might use a router or similar).
  // For simplicity, let's assume direct UI modification.
  listPage.classList.add('hidden');
  modifyItem.classList.remove('hidden');
  modifyItemHeader.textContent = 'Add tweet';
  modifyItemInput.value = '';
});

// Event listener for canceling modification (both add and edit)
cancelModificationButton.addEventListener('click', () => {
  // Redirect to the main page or modify the UI accordingly
  // based on your application structure.
  // For simplicity, let's assume direct UI modification.
  listPage.classList.remove('hidden');
  modifyItem.classList.add('hidden');
});

// Event listener for saving a new or edited tweet
saveModifiedItemButton.addEventListener('click', () => {
  const newText = modifyItemInput.value.trim();
  if (newText.length === 0) {
    showAlert('Error! Tweet text cannot be empty.');
    return;
  }

  const existingTweet = tweets.find(t => t.text === newText);
  if (existingTweet) {
    showAlert('Error! You can\'t tweet about that.');
    return;
  }

  // Assuming you have a function to generate a unique tweet ID
  const newTweet = { id: generateUniqueId(), text: newText };
  tweets.push(newTweet);

  // Redirect to the main page or modify the UI accordingly
  // based on your application structure.
  // For simplicity, let's assume direct UI modification.
  listPage.classList.remove('hidden');
  modifyItem.classList.add('hidden');
  showAlert('Tweet added successfully!');
  renderTweets();
});

// Event delegation for handling like/unlike, edit, and remove buttons
listContainer.addEventListener('click', (event) => {
  const target = event.target;
  const listItem = target.closest('li');
  if (!listItem) return;

  const tweetId = listItem.querySelector('span').dataset.id;
  const tweetIndex = tweets.findIndex(t => t.id === tweetId);

  if (target.classList.contains('likeTweet')) {
    // Handle like/unlike button click
    if (likedTweets.includes(tweetId)) {
      // Unlike
      likedTweets = likedTweets.filter(id => id !== tweetId);
      showAlert(`Sorry you no longer like tweet with id ${tweetId}`);
    } else {
      // Like
      likedTweets.push(tweetId);
      showAlert(`Hooray! You liked tweet with id ${tweetId}!`);
    }

    renderTweets();
  } else if (target.classList.contains('editTweet')) {
    // Handle edit button click
    listPage.classList.add('hidden');
    modifyItem.classList.remove('hidden');
    modifyItemHeader.textContent = 'Edit tweet';
    modifyItemInput.value = tweets[tweetIndex].text;
  } else if (target.classList.contains('removeTweet')) {
    // Handle remove button click
    tweets.splice(tweetIndex, 1);
    likedTweets = likedTweets.filter(id => id !== tweetId);
    showAlert('Tweet removed successfully!');
    renderTweets();
  }
});

// Event listener for the "Go to liked" button
navigationButtons.addEventListener('click', (event) => {
  if (event.target.classList.contains('goToLiked')) {
    // Redirect to the Liked Tweets page or modify the UI accordingly
    // based on your application structure.
    // For simplicity, let's assume direct UI modification.
    listPage.classList.remove('hidden');
    modifyItem.classList.add('hidden');
    renderLikedTweets();
  }
});

// Function to generate a unique ID (you might use a more sophisticated approach)
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Initial render of tweets on page load
renderTweets();
