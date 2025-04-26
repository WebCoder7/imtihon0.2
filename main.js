const postsContainer = document.getElementById('container');
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');

// Skeletonlarni korinishi ////////////////
function showSkeletons(count) {
  postsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement('div');
    skeletonCard.className = 'card skeleton-card';

    const skeletonTitle = document.createElement('div');
    skeletonTitle.className = 'skeleton skeleton-title';
    skeletonCard.appendChild(skeletonTitle);

    const skeletonBody = document.createElement('div');
    skeletonBody.className = 'skeleton skeleton-body';
    skeletonCard.appendChild(skeletonBody);

    const skeletonButton = document.createElement('div');
    skeletonButton.className = 'skeleton skeleton-button';
    skeletonCard.appendChild(skeletonButton);

    postsContainer.appendChild(skeletonCard);
  }
}

// Skeletonlarini oxhirishh /////////////
function removeSkeletons() {
  const skeletonCards = document.querySelectorAll('.skeleton-card');
  skeletonCards.forEach((card) => card.remove());
}

async function fetchPosts() {
  try {
    showSkeletons(5);
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=10' // apidan faqat 10ta malumotni olish //////
    );
    if (!response.ok) throw new Error('Serverda xatolik');
    const posts = await response.json();
    removeSkeletons();
    renderPosts(posts);
  } catch (error) {
    removeSkeletons();
    console.error('Xatolik:', error);
    alert('Postlarni yuklab bo‘lmadi');
  }
}

function renderPosts(posts) {
  posts.forEach((post) => {
    createPost(post, false);
  });
}

// Yagi malumotlar qoshish inputorqali ///////////////////
function createPost(post, fromForm = true) {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'title';
  title.textContent = post.title;

  const body = document.createElement('p');
  body.className = 'body';
  body.textContent = post.body;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'button';
  deleteBtn.textContent = 'Ochirib tashlash';
  deleteBtn.addEventListener('click', () => card.remove());

  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(deleteBtn);

  fromForm ? postsContainer.prepend(card) : postsContainer.appendChild(card);
}

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPost = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
  };

  if (!newPost.title || !newPost.body) {
    alert('Iltimos, barcha maydonlarni to‘ldiring!');
    return;
  }

  createPost(newPost);
  titleInput.value = '';
  bodyInput.value = '';
});

fetchPosts();
