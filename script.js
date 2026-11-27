// renders ENTRIES from entries.js — you shouldn't need to touch this file

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number); // manual parse avoids timezone day-shift
    return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

function buildEntry(e) {
    const article = make("article", "entry");

    const time = make("time", "", formatDate(e.date));
    time.dateTime = e.date;

    const body = make("div", "body");
    if (e.title) body.appendChild(make("h2", "", e.title));
    (e.text || "").trim().split(/\n\s*\n/).forEach(p => {
        if (p.trim()) body.appendChild(make("p", "", p.trim()));
    });

    if (e.image) {
        const img = make("img");
        img.src = e.image;
        img.alt = e.title || "";
        img.loading = "lazy";
        img.decoding = "async";
        body.appendChild(img);
    }

    if (e.video) {
        const vid = make("video");
        vid.src = e.video;
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = "metadata";
        body.appendChild(vid);
    }

    article.append(time, body);
    return article;
}

// newest first
const list = document.getElementById("entries");
const frag = document.createDocumentFragment();
ENTRIES
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach(e => frag.appendChild(buildEntry(e)));
list.appendChild(frag);

// pop in once, then stop watching
const observer = new IntersectionObserver(hits => {
    hits.forEach(hit => {
        if (hit.isIntersecting) {
            hit.target.classList.add("in");
            observer.unobserve(hit.target);
        }
    });
}, { threshold: 0.1 });

list.querySelectorAll(".entry").forEach(el => observer.observe(el));
