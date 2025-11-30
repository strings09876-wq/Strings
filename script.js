// --- Simple dynamic content for stories ---
const storiesEl = document.getElementById('stories');
const storyData = [
  {label: 'YouTube', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=60'},
  {label: 'Pulshawi', img: 'https://images.unsplash.com/photo-1541534401786-5e2f4a4b9d3c?w=800&q=60'},
  {label: 'Crafts', img: 'https://images.unsplash.com/photo-1523380760707-0c5a7b9b2b9e?w=800&q=60'},
  {label: 'Painting', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=60'},
];

for(const s of storyData){
  const div = document.createElement('div');
  div.className = 'story';
  div.innerHTML = `
    <img src="${s.img}" alt="${s.label} story">
    <div class="label">${s.label}</div>
  `;
  storiesEl.appendChild(div);
}

// --- Like button toggle ---
const likeBtn = document.getElementById('likeBtn');
const likesCount = document.getElementById('likesCount');
let liked = false;
likeBtn.addEventListener('click', () => {
  liked = !liked;
  likeBtn.classList.toggle('liked', liked);
  likeBtn.setAttribute('aria-pressed', liked ? 'true':'false');
  // update counter (toy example)
  let count = parseInt(likesCount.textContent || '0', 10);
  likesCount.textContent = liked ? (count + 1) : Math.max(0, count - 1);
});

// --- Composer behaviour: create simple post on Enter ---
const postInput = document.getElementById('postInput');
const feed = document.getElementById('feed');

postInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && postInput.value.trim()){
    e.preventDefault();
    const text = postInput.value.trim();
    const newCard = document.createElement('article');
    newCard.className = 'card';
    newCard.innerHTML = `
      <div class="post-header">
        <div class="avatar" style="width:48px;height:48px;">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=60" alt="you">
        </div>
        <div>
          <div style="font-weight:700;">You <span class="small"> · now</span></div>
          <div class="muted">Friends</div>
        </div>
      </div>
      <div class="post-text">${escapeHtml(text)}</div>
      <div class="post-actions">
        <div class="actions-left">
          <button class="btn like" aria-label="Like new post">
            <span class="small">Like</span>
          </button>
          <button class="btn" aria-label="Comment new post"><span class="small">Comment</span></button>
          <button class="btn" aria-label="Share new post"><span class="small">Share</span></button>
        </div>
        <div class="small muted">0</div>
      </div>
    `;
    feed.prepend(newCard);
    postInput.value = '';
    postInput.blur();
  }
});

// basic escape
function escapeHtml(s){
  return s.replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

// menu button (example)
document.getElementById('menuBtn').addEventListener('click', () => {
  alert('Menu clicked — add navigation here.');
});

// accessibility: ensure story buttons are keyboard focusable
document.querySelectorAll('.story').forEach((el, idx) => {
  el.setAttribute('tabindex','0');
  el.addEventListener('click', ()=> alert('Open story: ' + (el.querySelector('.label')?.textContent || idx)));
  el.addEventListener('keydown', (e) => { if(e.key === 'Enter') el.click(); });
});