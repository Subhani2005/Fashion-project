const queries = ['male model studio portrait fashion','man in beige suit','mens fashion editorial coat','minimal clothing flat lay','silk dress fashion','trench coat fashion woman','wool trousers fashion','sunglasses fashion product'];
const headers={'Secret-Key':'H2jk9uKnhRmL6WPwh89zBezWvr','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',Accept:'*/*'};
const seen=new Set(); const rows=[];
for (const q of queries){const url=`https://www.pexels.com/en-us/api/v3/search/photos?query=${encodeURIComponent(q)}&per_page=14&page=1&orientation=all&size=large&color=all&locale=en-US`;try{const res=await fetch(url,{headers});const j=await res.json();for(const it of j.data||[]){const a=it.attributes;if(!a||seen.has(a.id))continue;seen.add(a.id);rows.push({id:a.id,ratio:+(a.width/a.height).toFixed(2),title:(a.title||'').slice(0,60),q});}}catch(e){console.error('FAIL',q)}}
console.log(JSON.stringify(rows));
