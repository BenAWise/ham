// --- X/O BACKGROUND ---
const canvas = document.getElementById('xo-bg');
const ctx = canvas.getContext('2d');

function drawXO() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth * 1.2;
    const h = window.innerHeight * 1.2;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const spacing = 50;
    const size = 7;
    const isDark = document.body.classList.contains('dark');
    const color = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)';

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;

    let col = 0;
    for (let x = spacing / 2; x < w; x += spacing) {
        let row = 0;
        for (let y = spacing / 2; y < h; y += spacing) {
            if ((col + row) % 2 === 0) {
                ctx.beginPath();
                ctx.moveTo(x - size, y - size);
                ctx.lineTo(x + size, y + size);
                ctx.moveTo(x + size, y - size);
                ctx.lineTo(x - size, y + size);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.stroke();
            }
            row++;
        }
        col++;
    }
}

window.addEventListener('resize', drawXO);

// --- QUOTE OF THE DAY ---
const quotes = [
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["Life is what happens when you're busy making other plans.", "John Lennon"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["It is during our darkest moments that we must focus to see the light.", "Aristotle"],
    ["The best time to plant a tree was 20 years ago. The second best time is now.", "Chinese Proverb"],
    ["An unexamined life is not worth living.", "Socrates"],
    ["Turn your wounds into wisdom.", "Oprah Winfrey"],
    ["Be yourself; everyone else is already taken.", "Oscar Wilde"],
    ["Two things are infinite: the universe and human stupidity.", "Albert Einstein"],
    ["In three words I can sum up everything I learned about life: it goes on.", "Robert Frost"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky"],
    ["Whether you think you can or you think you can't, you're right.", "Henry Ford"],
    ["The mind is everything. What you think you become.", "Buddha"],
    ["Strive not to be a success, but rather to be of value.", "Albert Einstein"],
    ["I have not failed. I've just found 10,000 ways that won't work.", "Thomas Edison"],
    ["The only impossible journey is the one you never begin.", "Tony Robbins"],
    ["Everything you've ever wanted is on the other side of fear.", "George Addair"],
    ["What we achieve inwardly will change outer reality.", "Plutarch"],
    ["Creativity is intelligence having fun.", "Albert Einstein"],
    ["Do what you can, with what you have, where you are.", "Theodore Roosevelt"],
    ["It always seems impossible until it's done.", "Nelson Mandela"],
    ["The best revenge is massive success.", "Frank Sinatra"],
    ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
    ["Life is really simple, but we insist on making it complicated.", "Confucius"],
    ["The purpose of our lives is to be happy.", "Dalai Lama"],
    ["You only live once, but if you do it right, once is enough.", "Mae West"],
    ["If you want to lift yourself up, lift up someone else.", "Booker T. Washington"],
    ["Don't count the days, make the days count.", "Muhammad Ali"],
    ["Everything has beauty, but not everyone sees it.", "Confucius"],
    ["The secret of getting ahead is getting started.", "Mark Twain"],
    ["It does not matter how slowly you go as long as you do not stop.", "Confucius"],
    ["Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"],
    ["Happiness is not something readymade. It comes from your own actions.", "Dalai Lama"],
    ["Well done is better than well said.", "Benjamin Franklin"],
    ["If you look at what you have in life, you'll always have more.", "Oprah Winfrey"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["What lies behind us and what lies before us are tiny matters compared to what lies within us.", "Ralph Waldo Emerson"],
    ["Simplicity is the ultimate sophistication.", "Leonardo da Vinci"],
    ["The way to get started is to quit talking and begin doing.", "Walt Disney"],
    ["If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", "James Cameron"],
    ["A person who never made a mistake never tried anything new.", "Albert Einstein"],
    ["We may encounter defeats but we must not be defeated.", "Maya Angelou"],
    ["Knowing is not enough; we must apply. Wishing is not enough; we must do.", "Johann Wolfgang von Goethe"],
    ["We become what we think about.", "Earl Nightingale"],
    ["The best way to predict the future is to invent it.", "Alan Kay"],
    ["I think, therefore I am.", "Rene Descartes"],
    ["If you want something you've never had, you must do something you've never done.", "Thomas Jefferson"],
    ["Dream big and dare to fail.", "Norman Vaughan"],
    ["What you do speaks so loudly that I cannot hear what you say.", "Ralph Waldo Emerson"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ["Go confidently in the direction of your dreams. Live the life you have imagined.", "Henry David Thoreau"],
    ["When I let go of what I am, I become what I might be.", "Lao Tzu"],
    ["Life is 10% what happens to me and 90% of how I react to it.", "Charles Swindoll"],
    ["The most common way people give up their power is by thinking they don't have any.", "Alice Walker"],
    ["Imagination is more important than knowledge.", "Albert Einstein"],
    ["A journey of a thousand miles begins with a single step.", "Lao Tzu"],
    ["Don't judge each day by the harvest you reap but by the seeds that you plant.", "Robert Louis Stevenson"],
    ["The only way to have a friend is to be one.", "Ralph Waldo Emerson"],
    ["Not how long, but how well you have lived is the main thing.", "Seneca"],
    ["You must be the change you wish to see in the world.", "Mahatma Gandhi"],
    ["In the middle of every difficulty lies opportunity.", "Albert Einstein"],
    ["Whoever is happy will make others happy too.", "Anne Frank"],
    ["Keep your face always toward the sunshine and shadows will fall behind you.", "Walt Whitman"],
    ["Nothing is impossible, the word itself says I'm possible.", "Audrey Hepburn"],
    ["The only true wisdom is in knowing you know nothing.", "Socrates"],
    ["I can't change the direction of the wind, but I can adjust my sails.", "Jimmy Dean"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
    ["Act as if what you do makes a difference. It does.", "William James"],
    ["Success usually comes to those who are too busy to be looking for it.", "Henry David Thoreau"],
    ["Don't be afraid to give up the good to go for the great.", "John D. Rockefeller"],
    ["I find that the harder I work, the more luck I seem to have.", "Thomas Jefferson"],
    ["If you cannot do great things, do small things in a great way.", "Napoleon Hill"],
    ["The question isn't who is going to let me; it's who is going to stop me.", "Ayn Rand"],
    ["The meaning of life is to find your gift. The purpose of life is to give it away.", "Pablo Picasso"],
    ["Tough times never last, but tough people do.", "Robert H. Schuller"],
    ["Every moment is a fresh beginning.", "T.S. Eliot"],
    ["Never let the fear of striking out keep you from playing the game.", "Babe Ruth"],
    ["We are what we repeatedly do. Excellence, then, is not an act, but a habit.", "Aristotle"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela"],
    ["Many of life's failures are people who did not realize how close they were to success when they gave up.", "Thomas Edison"],
    ["If you really look closely, most overnight successes took a long time.", "Steve Jobs"],
    ["The difference between ordinary and extraordinary is that little extra.", "Jimmy Johnson"],
    ["Champions keep playing until they get it right.", "Billie Jean King"],
    ["Hardships often prepare ordinary people for an extraordinary destiny.", "C.S. Lewis"],
    ["The man who has confidence in himself gains the confidence of others.", "Hasidic Proverb"],
    ["What we fear doing most is usually what we most need to do.", "Tim Ferriss"],
    ["One day or day one. You decide.", "Paulo Coelho"],
    ["Stay hungry, stay foolish.", "Steve Jobs"],
    ["You don't have to be great to start, but you have to start to be great.", "Zig Ziglar"],
    ["People who are crazy enough to think they can change the world are the ones who do.", "Rob Siltanen"],
    ["The harder the conflict, the greater the triumph.", "George Washington"],
    ["Doubt kills more dreams than failure ever will.", "Suzy Kassem"],
    ["Don't wait. The time will never be just right.", "Napoleon Hill"],
    ["Small daily improvements over time lead to stunning results.", "Robin Sharma"],
    ["Your time is limited, don't waste it living someone else's life.", "Steve Jobs"],
    ["Fall seven times, stand up eight.", "Japanese Proverb"],
    ["The energy of the mind is the essence of life.", "Aristotle"],
    ["He who opens a school door, closes a prison.", "Victor Hugo"],
    ["The greatest wealth is to live content with little.", "Plato"],
    ["No pressure, no diamonds.", "Thomas Carlyle"],
    ["Work hard in silence, let your success be your noise.", "Frank Ocean"]
];

function getDailyQuote() {
    const now = new Date();
    const dayIndex = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000) % quotes.length;
    return quotes[dayIndex];
}

// --- PAGE LOAD ---
window.addEventListener('DOMContentLoaded', () => {
    const curtain = document.getElementById('curtain');
    requestAnimationFrame(() => { curtain.classList.add('fade-out'); });
    setTimeout(() => curtain.remove(), 600);

    drawXO();

    // Typed tagline
    const tagline = document.querySelector('.tagline');
    tagline.classList.add('typing');
    setTimeout(() => { tagline.classList.add('done'); }, 2500);

    // Quote fade-in
    const q = getDailyQuote();
    const qText = document.getElementById('qotd-text');
    const qAuthor = document.getElementById('qotd-author');
    qText.textContent = '\u201C' + q[0] + '\u201D';
    qAuthor.textContent = '\u2014 ' + q[1];
    setTimeout(() => {
        qText.classList.add('fade-in');
        qAuthor.classList.add('fade-in');
    }, 800);

    initQuiz();
    initScrollAnimations();
});

// --- QUIZ ENGINE ---
const questions = [
    { q: "What engine does Ham use?", o: ["Unity", "Godot", "Unreal"], a: 1 },
    { q: "When did Ham start Godot?", o: ["Late 2025", "2023", "2026"], a: 0 },
    { q: "Ham's best jam rank?", o: ["Top 10", "4th Place", "1st Place"], a: 2 },
    { q: "What is Ham's favorite palette?", o: ["Pear36", "ENDESGA 32", "Sweetie 16"], a: 0 },
    { q: "Which jam did Ham win 1st place?", o: ["Chili Code Jam", "Micro Jam 050", "One More Run III"], a: 1 },
    { q: "What sport does Ham NOT list as a hobby?", o: ["Wrestling", "Tennis", "Basketball"], a: 1 },
    { q: "What is the name of Ham's game jam?", o: ["The Ham Jam", "Pixel Pork Jam", "Game & Ham"], a: 0 },
    { q: "Which game has a winter theme?", o: ["bilunar", "Sky High", "FROSTBOUND"], a: 2 },
    { q: "Where can you find Ham's games?", o: ["Steam", "itch.io", "Epic Games"], a: 1 },
    { q: "How many 3rd place finishes does Ham have?", o: ["4", "2", "3"], a: 1 }
];

let qIdx = 0;
let qScore = 0;

function initQuiz() {
    const fb = document.getElementById('q-fb');
    fb.innerText = "";
    if (qIdx >= questions.length) {
        const pct = Math.round((qScore / questions.length) * 100);
        let msg = pct === 100 ? 'PERFECT SCORE!' : pct >= 70 ? 'GREAT JOB!' : pct >= 40 ? 'NOT BAD!' : 'BETTER LUCK NEXT TIME!';
        document.getElementById('quiz-box').innerHTML =
            "<p style='text-align:center; font-size:1.3rem; margin-bottom:10px;'>" + msg + "</p>" +
            "<p style='text-align:center; font-size:1.1rem; margin-bottom:15px;'>Score: <strong style=\"color:var(--accent)\">" + qScore + " / " + questions.length + "</strong> (" + pct + "%)</p>" +
            "<button class='pixel-btn' style='width:100%; margin-top:10px;' onclick='resetQuiz()'>Play Again</button>";
        document.getElementById('p-bar').style.width = "100%";
        return;
    }

    const q = questions[qIdx];
    document.getElementById('q-txt').innerText = (qIdx + 1) + '/' + questions.length + ' — ' + q.q;
    document.getElementById('p-bar').style.width = `${(qIdx / questions.length) * 100}%`;
    const opts = document.getElementById('q-opts');
    opts.innerHTML = '';
    q.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option pixel-btn';
        btn.style.width = "100%";
        btn.style.margin = "5px 0";
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === q.a) {
                qScore++;
                fb.classList.remove('incorrect');
                fb.classList.add('correct');
                fb.innerText = "\u2713 CORRECT (" + qScore + "/" + (qIdx + 1) + ")";
                qIdx++;
                setTimeout(initQuiz, 700);
            } else {
                fb.classList.remove('correct');
                fb.classList.add('incorrect');
                fb.innerText = "\u00d7 INCORRECT (" + qScore + "/" + (qIdx + 1) + ")";
                qIdx++;
                setTimeout(initQuiz, 700);
            }
        };
        opts.appendChild(btn);
    });
}

function resetQuiz() {
    qIdx = 0;
    qScore = 0;
    document.getElementById('quiz-box').innerHTML =
        '<p id="q-txt" style="font-weight:bold; margin-bottom:15px;"></p>' +
        '<div id="q-opts"></div>' +
        '<p id="q-fb" style="margin-top:15px; font-weight:bold; text-align:center; height:1.5em;"></p>';
    document.getElementById('p-bar').style.width = '0%';
    initQuiz();
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const cards = Array.from(document.querySelectorAll('.card'));
    let initialLoad = true;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const index = cards.indexOf(card);

            if (entry.isIntersecting) {
                const delay = initialLoad ? (index * 180) : 0;
                setTimeout(() => { card.classList.add('reveal'); }, delay);
            } else {
                card.classList.remove('reveal');
            }
        });
        if (initialLoad) setTimeout(() => { initialLoad = false; }, 1200);
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));
}

// --- THEME TOGGLE ---
const toggleBtn = document.getElementById('theme-toggle');
const swText = document.getElementById('sw-text');

function updateToggleLabel() {
    swText.textContent = document.body.classList.contains('dark') ? 'DARK' : 'LIGHT';
}

toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark');
    updateToggleLabel();
    drawXO();
});
updateToggleLabel();

// --- TICKER ---
(function() {
    const track = document.getElementById('ticker-track');
    const staticItems = ['ham.software', 'godot enthusiast', 'check out my games on itch.io'];

    function makeSegmentHTML(id) {
        const parts = [
            '<span class="t-item t-date" data-seg="' + id + '"></span>',
            '<span class="ticker-dot"> \u00b7 </span>',
            '<span class="t-item t-time" data-seg="' + id + '"></span>',
        ];
        staticItems.forEach(text => {
            parts.push('<span class="ticker-dot"> \u00b7 </span>');
            parts.push('<span class="t-item">' + text + '</span>');
        });
        parts.push('<span class="ticker-dot"> \u00b7 </span>');
        return '<span class="ticker-segment">' + parts.join('') + '</span>';
    }

    let html = '';
    for (let i = 0; i < 6; i++) html += makeSegmentHTML(i);
    track.innerHTML = html;

    function updateTimes() {
        const now = new Date();
        const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        track.querySelectorAll('.t-date').forEach(el => { el.textContent = dateStr; });
        track.querySelectorAll('.t-time').forEach(el => { el.textContent = timeStr; });
    }
    updateTimes();

    let segWidth = 0;
    function measureSegment() {
        const seg = track.querySelector('.ticker-segment');
        if (seg) segWidth = seg.offsetWidth;
    }
    requestAnimationFrame(measureSegment);

    let pos = 0;
    const speed = 0.5;

    function animate() {
        if (segWidth > 0) {
            pos -= speed;
            if (pos <= -segWidth) pos += segWidth;
            track.style.transform = 'translateX(' + pos + 'px)';
        }
        requestAnimationFrame(animate);
    }

    setInterval(updateTimes, 1000);
    window.addEventListener('resize', () => { requestAnimationFrame(measureSegment); });
    animate();
})();

// --- PARALLAX ---
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) * 20;
    my = (e.clientY / window.innerHeight) * 20;
});

function smoothParallax() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    canvas.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(smoothParallax);
}
smoothParallax();
