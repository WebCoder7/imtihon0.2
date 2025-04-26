const postsContainer = document.getElementById('container');
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');

function showSkeletons(count) {
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    postsContainer.appendChild(skeleton);
  }
}

function removeSkeletons() {
  const skeletons = document.querySelectorAll('.skeleton');
  skeletons.forEach((skeleton) => skeleton.remove());
}

async function fetchPosts() {
  try {
    showSkeletons(5);
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=10' // apidan 10doma malumot olish uchin qoydim
    );
    const posts = await response.json();
    removeSkeletons();
    renderPosts(posts);
  } catch (error) {
    console.error('Xatolik:', error);
  }
}

function renderPosts(posts) {
  posts.forEach((post) => {
    createPost(post, false);
  });
}

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
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(deleteBtn);

  if (fromForm) {
    postsContainer.prepend(card);
  } else {
    postsContainer.appendChild(card);
  }
}

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPost = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
  };

  if (newPost.title && newPost.body) {
    createPost(newPost);
    titleInput.value = '';
    bodyInput.value = '';
  }
});

fetchPosts();
