const queries = [
  'minimal fashion editorial studio',
  'beige coat fashion woman',
  'editorial fashion model portrait',
  'menswear tailoring suit',
  'fashion model neutral background',
  'knitwear fashion editorial',
  'fashion accessories leather bag',
  'linen clothing fashion',
];

const headers = {
  'Secret-Key': 'H2jk9uKnhRmL6WPwh89zBezWvr',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
  Accept: '*/*',
};

const seen = new Set();
const rows = [];

for (const q of queries) {
  const url = `https://www.pexels.com/en-us/api/v3/search/photos?query=${encodeURIComponent(q)}&per_page=14&page=1&orientation=all&size=large&color=all&locale=en-US`;
  try {
    const res = await fetch(url, { headers });
    const json = await res.json();
    for (const item of json.data || []) {
      const a = item.attributes;
      if (!a || seen.has(a.id)) continue;
      seen.add(a.id);
      rows.push({
        id: a.id,
        ratio: +(a.width / a.height).toFixed(2),
        title: (a.title || a.slug || '').slice(0, 70),
        q,
      });
    }
  } catch (e) {
    console.error('FAIL', q, e.message);
  }
}

console.log(JSON.stringify(rows, null, 0));
