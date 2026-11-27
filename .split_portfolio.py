import re
import shutil
from pathlib import Path

root = Path(__file__).resolve().parent
p = root / "index.html"
backup = root / "index-backup.html"
s = p.read_text(encoding="utf-8")

style = re.search(r"<style>(.*?)</style>", s, re.S)
script = re.search(r"<script>(.*?)</script>", s, re.S)
if not style or not script:
    raise SystemExit("Expected inline style and script blocks in index.html; no files changed.")
if backup.exists():
    raise SystemExit(f"Refusing to overwrite existing backup: {backup}")

shutil.copyfile(p, backup)

css = style.group(1)
js = script.group(1)
open(root / "style.css", "w", encoding="utf-8", newline="").write(css)
open(root / "script.js", "w", encoding="utf-8", newline="").write(js)

def remove_sections(text, ids):
    for idv in ids:
        pat = re.compile(r'<section\b[^>]*\bid=["\']' + re.escape(idv) + r'["\'][^>]*>.*?</section>', re.S | re.I)
        text, n = pat.subn("", text)
        print("removed", idv, n)
    return text

# Home page
index = remove_sections(s, ["lab", "terminal", "security", "skills", "estimate", "process", "ctf", "faq"])
index = index.replace('<a href="#lab">Tech lab</a>', '<a href="lab.html#lab">Lab</a>', 1)
index = index.replace(
    "<title>Joseph – Web developer at webforgestudio</title>",
    "<title>Joseph | Web Developer at webforgestudio</title>",
    1,
)
index = index.replace(
    '<meta name="description" content="Joseph builds fast, secure websites and web apps for businesses. Founder of webforgestudio Pvt. Ltd.">',
    '<meta name="description" content="Joseph builds fast, secure websites and web apps for businesses. Explore work, services and project plans.">',
    1,
)
index = re.sub(r"<style>.*?</style>", '<link rel="stylesheet" href="style.css">', index, count=1, flags=re.S)
index = re.sub(r"<script>.*?</script>", '<script src="script.js" defer></script>', index, count=1, flags=re.S)
open(p, "w", encoding="utf-8", newline="").write(index)

# Lab page
lab = s
lab = remove_sections(lab, ["work", "services", "why", "about", "experience", "plans"])
lab = re.sub(r'<div class="hero">.*?<div class="mq"', '<div class="mq"', lab, count=1, flags=re.S)
lab = re.sub(r'<div class="mq"[^>]*>.*?</div>\s*</div>', "", lab, count=1, flags=re.S)
lab = lab.replace("<title>Joseph – Web developer at webforgestudio</title>", "<title>Joseph Lab | Technical Projects and Tools</title>", 1)
lab = lab.replace(
    '<meta name="description" content="Joseph builds fast, secure websites and web apps for businesses. Founder of webforgestudio Pvt. Ltd.">',
    '<meta name="description" content="Explore Joseph\'s technical lab, security checklist, terminal, estimator and coding puzzles.">',
    1,
)
lab = lab.replace('<a class="brand" href="#top">', '<a class="brand" href="index.html">', 1)
lab = lab.replace('<nav id="nav" aria-label="Main">', '<nav id="nav" aria-label="Main">\n      <a href="index.html">Home</a>', 1)
lab = lab.replace('<a href="#work">Work</a>', '<a href="index.html#work">Work</a>')
lab = lab.replace('<a href="#services">Services</a>', '<a href="index.html#services">Services</a>')
lab = lab.replace('<a href="#lab">Tech lab</a>', '<a href="#lab">Lab</a>')
lab = lab.replace('<a href="#plans">Plans</a>', '<a href="index.html#plans">Plans</a>')
lab = lab.replace('<a href="#about">About</a>', '<a href="index.html#about">About</a>')
lab = lab.replace('<a href="#experience">Experience</a>', '<a href="index.html#experience">Experience</a>')
lab = lab.replace('<main id="top">', '<main id="top">\n<section class="lab-title"><div class="wrap"><h1>Lab</h1><p>Technical projects, tools and experiments.</p></div></section>', 1)
lab = re.sub(r"<style>.*?</style>", '<link rel="stylesheet" href="style.css">', lab, count=1, flags=re.S)
lab = re.sub(r"<script>.*?</script>", '<script src="script.js" defer></script>', lab, count=1, flags=re.S)
open(root / "lab.html", "w", encoding="utf-8", newline="").write(lab)

print("Created index-backup.html, index.html, lab.html, style.css and script.js")
