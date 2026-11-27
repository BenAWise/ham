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

// ---------- full-size image view (one shared overlay) ----------
const lightbox = make("div", "lightbox");
const lightboxImg = make("img");
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", ev => { if (ev.key === "Escape") closeLightbox(); });

// ---------- entries ----------
function buildEntry(e) {
    const article = make("article", "entry reveal");

    const body = make("div", "body");
    if (e.title) body.appendChild(make("h2", "", e.title));
    (e.text || "").trim().split(/\n\s*\n/).forEach(p => {
        if (p.trim()) body.appendChild(make("p", "", p.trim()));
    });

    if (e.image) {
        const frame = make("figure", "frame");
        const crop = make("div", "crop");
        const img = make("img");
        img.src = e.image;
        img.alt = e.title || "";
        img.loading = "lazy";
        img.decoding = "async";
        crop.appendChild(img);
        frame.appendChild(crop);
        frame.addEventListener("click", () => openLightbox(e.image, img.alt));
        body.appendChild(frame);
    }

    if (e.video) {
        const vid = make("video");
        vid.src = e.video;
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = "metadata";
        body.appendChild(vid);
    }

    const time = make("time", "", formatDate(e.date));
    time.dateTime = e.date;

    article.append(body, time); // date sits under the entry
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

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
