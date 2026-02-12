document.getElementById('forumForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    message: e.target.message.value,
    timestamp: new Date().toLocaleString()
  };

  // Try server first, fallback to local storage for presentation
  fetch('http://localhost:5000/forum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error('Server unavailable');
      return res.json();
    })
    .then(() => {
      loadPosts();
      e.target.reset();
    })
    .catch(error => {
      console.log('Server unavailable, using local storage for demo');
      // Fallback: Store locally for presentation
      let localPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
      localPosts.unshift(data);
      localStorage.setItem('forumPosts', JSON.stringify(localPosts));
      displayLocalPosts();
      e.target.reset();
    });
});

function loadPosts() {
  fetch('http://localhost:5000/forum')
    .then(res => {
      if (!res.ok) throw new Error('Server unavailable');
      return res.json();
    })
    .then(posts => {
      const container = document.getElementById('forumPosts');
      container.innerHTML = '';
      posts.forEach(post => {
        const el = document.createElement('div');
        el.className = 'forum-post';
        el.innerHTML = `<strong>${post.name}</strong>: ${post.message} <small>(${post.timestamp || 'Recently'})</small>`;
        container.appendChild(el);
      });
    })
    .catch(error => {
      console.log('Server unavailable, loading local posts for demo');
      displayLocalPosts();
    });
}

function displayLocalPosts() {
  const localPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
  const container = document.getElementById('forumPosts');
  container.innerHTML = '';
  
  if (localPosts.length === 0) {
    // Add some demo posts for presentation
    const demoPosts = [
      { name: 'Rajesh Kumar', message: 'Great harvest this season! The new irrigation system really helped.', timestamp: '2025-01-01 10:30 AM' },
      { name: 'Priya Sharma', message: 'Looking for organic fertilizer suppliers in Punjab. Any recommendations?', timestamp: '2025-01-01 09:15 AM' },
      { name: 'Amit Singh', message: 'Weather forecast shows rain next week. Perfect timing for sowing!', timestamp: '2025-01-01 08:45 AM' }
    ];
    localStorage.setItem('forumPosts', JSON.stringify(demoPosts));
    localPosts.push(...demoPosts);
  }
  
  localPosts.forEach(post => {
    const el = document.createElement('div');
    el.className = 'forum-post';
    el.innerHTML = `<strong>${post.name}</strong>: ${post.message} <small>(${post.timestamp})</small>`;
    container.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', loadPosts);



