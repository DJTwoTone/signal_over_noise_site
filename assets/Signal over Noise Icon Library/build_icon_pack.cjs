const fs=require('fs'),path=require('path');
const sharp=require('C:\\Users\\Benjamin Slater\\Documents\\Signal over Noise - Site\\node_modules\\sharp');
const root='C:\\Users\\Benjamin Slater\\Downloads\\Signal over Noise Icon Library';
const iconsDir=path.join(root,'individual SVG icons');
fs.mkdirSync(root,{recursive:true}); fs.mkdirSync(iconsDir,{recursive:true});
const navy='#132033',blue='#0B2D53',mid='#193B64',gold='#8A641F',pale='#F2E5C8',paper='#F5F0E8',white='#FAF7F2';
const defs=[
['01 Core symbols',[
['email','Email','<rect x="11" y="16" width="42" height="32" rx="4"/><path d="m13 19 19 15 19-15M13 45l13-11m25 11L38 34"/>'],
['document','Document','<path d="M18 10h19l10 10v34H18zM37 10v11h10M25 30h15M25 37h15M25 44h10"/>'],
['approval','Approval','<circle cx="32" cy="32" r="21"/><path d="m21 32 8 8 15-17" stroke="#8A641F"/>'],
['featured','Featured','<path d="m32 10 6.4 13 14.3 2.1-10.3 10 2.4 14.2L32 42.6l-12.8 6.7 2.4-14.2-10.3-10L25.6 23z"/>'],
['globe','Globe','<circle cx="32" cy="32" r="21"/><path d="M11 32h42M32 11c7 6 10 13 10 21s-3 15-10 21m0-42c-7 6-10 13-10 21s3 15 10 21"/>'],
['clarity-focus','Clarity / focus','<circle cx="32" cy="32" r="21"/><circle cx="32" cy="32" r="11"/><circle cx="32" cy="32" r="3" fill="#8A641F" stroke="#8A641F"/><path d="M32 6v6m0 40v6M6 32h6m40 0h6" stroke="#8A641F"/>'],
['send','Send','<path d="m10 29 43-19-15 44-8-18zM30 36l13-14m-33 7 20 7" stroke="#0B2D53"/><path d="m10 29 20 7" stroke="#8A641F"/>'],
['search','Search','<circle cx="27" cy="27" r="16"/><path d="m39 39 13 13"/><circle cx="27" cy="27" r="5" stroke="#8A641F"/>']
]],
['02 Communication & audience',[
['message','Message','<path d="M12 15h40v29H29L17 52v-8h-5zM20 25h24M20 32h18"/>'],
['conversation','Conversation','<path d="M10 14h31v23H25l-9 7v-7h-6zM25 42h15l8 7v-7h5V25h-8"/><path d="M17 23h18m-18 7h12" stroke="#8A641F"/>'],
['script','Script','<path d="M18 9h20l9 9v37H18zM38 9v10h9M25 28h14M25 35h14M25 42h8M37 48h11" />'],
['story-structure','Story structure','<rect x="9" y="13" width="12" height="12" rx="2"/><rect x="43" y="13" width="12" height="12" rx="2"/><rect x="26" y="39" width="12" height="12" rx="2"/><path d="M21 19h22M49 25v7H32v7M15 25v7h17m0 0v7" stroke="#8A641F"/>'],
['key-message','Key message','<path d="M11 18h42v28H11zM19 26h24M19 33h15"/><path d="m43 39 3 3 6-7" stroke="#8A641F"/>'],
['translation','Translation','<path d="M10 14h30v24H25l-9 7v-7h-6zM36 44h15m-13 5 5-12 5 12m-8-4h6"/><path d="M23 21c2 7 7 11 13 13m-1-13c-2 7-7 11-13 13M21 26h13" stroke="#8A641F"/>'],
['audience','Audience','<circle cx="32" cy="19" r="7"/><circle cx="15" cy="24" r="5"/><circle cx="49" cy="24" r="5"/><path d="M18 52c1-10 5-16 14-16s13 6 14 16zM5 49c1-8 4-12 10-12 3 0 5 1 7 3m37 9c-1-8-4-12-10-12-3 0-5 1-7 3"/>'],
['stakeholders','Stakeholders','<circle cx="32" cy="31" r="8"/><circle cx="13" cy="15" r="5"/><circle cx="51" cy="15" r="5"/><circle cx="13" cy="49" r="5"/><circle cx="51" cy="49" r="5"/><path d="m18 19 8 7m20-7-8 7m-20 20 8-7m20 7-8-7" stroke="#8A641F"/>']
]],
['03 Slides & evidence',[
['slide-deck','Slide deck','<rect x="17" y="14" width="36" height="28" rx="2"/><path d="M25 50h20m-10-8v8M24 22h22M24 29h15M10 20v27h7"/>'],
['single-slide','Single slide','<rect x="9" y="13" width="46" height="35" rx="3"/><path d="M16 22h20M16 28h13m-13 7h7M25 54h14m-7-6v6"/><rect x="38" y="25" width="10" height="15" rx="1" stroke="#8A641F"/>'],
['layout','Layout','<rect x="10" y="11" width="44" height="42" rx="2"/><path d="M10 23h44M27 23v30M40 23v30M15 17h14" stroke="#8A641F"/>'],
['chart','Chart','<path d="M12 51h42M15 49V33h9v16m7 0V23h9v26m7 0V14h9v35m-40-21 12-8 10 3 12-12" stroke="#0B2D53"/><circle cx="50" cy="11" r="3" fill="#8A641F" stroke="#8A641F"/>'],
['metric','Metric','<path d="M12 48a20 20 0 1 1 40 0M32 31l12-10M17 47h30"/><circle cx="32" cy="31" r="3" fill="#8A641F" stroke="#8A641F"/><path d="M16 38h5m22 0h5M32 12v5" stroke="#8A641F"/>'],
['source-citation','Source / citation','<path d="M17 10h21l10 10v34H17zM38 10v11h10M24 30h16m-16 7h16"/><path d="M25 46c0-3 5-3 5 0s-5 3-5 0m10 0c0-3 5-3 5 0s-5 3-5 0" stroke="#8A641F"/>'],
['comparison','Comparison','<rect x="9" y="16" width="18" height="32" rx="2"/><rect x="37" y="16" width="18" height="32" rx="2"/><path d="M14 24h8m-8 7h8m-8 7h5M42 24h8m-8 7h8m-8 7h5M27 32h10m-4-4 4 4-4 4" stroke="#8A641F"/>'],
['hierarchy','Hierarchy','<rect x="25" y="10" width="14" height="10" rx="2"/><rect x="8" y="44" width="14" height="10" rx="2"/><rect x="25" y="44" width="14" height="10" rx="2"/><rect x="42" y="44" width="14" height="10" rx="2"/><path d="M32 20v12H15v12m17-12v12m0-12h17v12" stroke="#8A641F"/>']
]],
['04 Review & decisions',[
['review','Review','<path d="M12 10h28l9 9v35H12zM40 10v10h9M19 29h19m-19 7h14"/><circle cx="41" cy="43" r="8"/><path d="m47 49 6 6m-16-12 3 3 5-6" stroke="#8A641F"/>'],
['markup','Markup / annotation','<path d="M13 10h29l9 9v18M42 10v10h9M20 29h15m-15 7h10"/><path d="m29 50 16-16 7 7-16 16-9 2zM42 37l7 7" stroke="#8A641F"/>'],
['priority','Priority','<path d="M15 14h34M15 25h27M15 36h20M15 47h13"/><path d="m48 34 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#F2E5C8" stroke="#8A641F"/>'],
['signal','Signal','<path d="M8 33h9l5-12 9 24 7-18 5 6h13"/><circle cx="31" cy="45" r="3" fill="#8A641F" stroke="#8A641F"/><path d="M11 14h13m16 0h13M11 52h11m20 0h11" stroke="#8A641F"/>'],
['filter-noise','Filter / noise','<path d="M10 14h44L38 32v15l-12 7V32zM17 21h30m-23 7h16"/><path d="m23 16 18 18" stroke="#8A641F"/>'],
['interpretation','Interpretation','<circle cx="15" cy="17" r="4"/><circle cx="15" cy="32" r="4"/><circle cx="15" cy="47" r="4"/><path d="M19 17h10l8 15h12m-30 0h18m-18 15h10l8-15m6-6 7 6-7 6" stroke="#8A641F"/>'],
['recommendation','Recommendation','<path d="M12 16h18m-18 16h12m-12 16h18M31 32h20m-8-8 8 8-8 8"/><circle cx="15" cy="16" r="2" fill="#8A641F" stroke="#8A641F"/><circle cx="15" cy="48" r="2" fill="#8A641F" stroke="#8A641F"/>'],
['decision','Decision','<path d="M12 14h15m-15 18h12m-12 18h15M27 32h5m0 0 13-13m-13 13 13 13"/><circle cx="50" cy="19" r="6"/><circle cx="50" cy="45" r="6"/><path d="m47 19 2 2 4-5" stroke="#8A641F"/>']
]],
['05 Delivery & rehearsal',[
['presenter','Presenter','<rect x="34" y="13" width="20" height="18" rx="2"/><path d="M38 19h12m-12 6h8m-2 6v6m-7 0h14"/><circle cx="17" cy="22" r="6"/><path d="M7 50c1-12 4-18 10-18s9 6 10 18zM27 28h5" stroke="#8A641F"/>'],
['microphone','Microphone','<rect x="24" y="10" width="16" height="29" rx="8"/><path d="M17 29v3a15 15 0 0 0 30 0v-3M32 47v8m-9 0h18"/><path d="M28 17v12" stroke="#8A641F"/>'],
['recording','Recording','<rect x="9" y="17" width="34" height="30" rx="4"/><path d="m43 27 12-7v24l-12-7"/><circle cx="26" cy="32" r="8"/><circle cx="26" cy="32" r="3" fill="#8A641F" stroke="#8A641F"/>'],
['pace','Pace','<path d="M14 51h36M32 51V16M32 18c11 0 18 7 18 18H32zM32 36l10-9"/><circle cx="32" cy="36" r="3" fill="#8A641F" stroke="#8A641F"/><path d="M19 21 13 15m30 6 6-6" stroke="#8A641F"/>'],
['pause','Pause','<circle cx="32" cy="32" r="22"/><path d="M25 22v20m14-20v20" stroke-width="4" stroke="#8A641F"/>'],
['transition','Transition','<rect x="9" y="15" width="17" height="31" rx="2"/><rect x="38" y="15" width="17" height="31" rx="2"/><path d="M23 25h18m-6-6 6 6-6 6m4 10H21m6-6-6 6 6 6" stroke="#8A641F"/>'],
['emphasis','Emphasis','<circle cx="29" cy="29" r="17"/><path d="m41 41 12 12m-24-35 2.4 7.6L39 28l-7.6 2.4L29 38l-2.4-7.6L19 28l7.6-2.4z" fill="#F2E5C8" stroke="#8A641F"/>'],
['confidence','Confidence','<circle cx="32" cy="19" r="7"/><path d="M18 53c1-13 5-20 14-20s13 7 14 20m-8-39-2 2-4-5m-27 31 6-5m18 5 6-5"/><path d="m38 14 2 2 4-5" stroke="#8A641F"/>']
]],
['06 Services & routes',[
['coaching','One-to-one coaching','<circle cx="20" cy="22" r="7"/><path d="M8 53c1-12 4-18 12-18 5 0 9 4 11 10M34 15h20v18H43l-7 6v-6h-2zM40 22h9m-9 6h6" /><path d="M40 22h9m-9 6h6" stroke="#8A641F"/>'],
['workshop','Workshop','<circle cx="16" cy="18" r="5"/><circle cx="32" cy="15" r="5"/><circle cx="48" cy="18" r="5"/><path d="M7 37h50M12 37v11m40-11v11M19 53h26M9 31c1-6 3-9 7-9m32 0c4 0 6 3 7 9M25 28c1-8 3-11 7-11s6 3 7 11"/><path d="M7 37h50" stroke="#8A641F"/>'],
['partner-class','Partner class','<path d="M10 16h19v28H10zm25 0h19v28H35zM14 23h11m-11 6h8m16-6h11m-11 6h9"/><path d="m28 51 4-5 4 5m-4-5v10" stroke="#8A641F"/>'],
['online-session','Online session','<rect x="8" y="12" width="48" height="34" rx="4"/><path d="M8 21h48m-27 25v8m-10 0h20"/><circle cx="22" cy="33" r="5"/><path d="M14 42c1-4 3-6 8-6m15-6h12m-12 7h8" stroke="#8A641F"/>'],
['individual','Individual','<circle cx="32" cy="20" r="8"/><path d="M15 53c1-14 6-22 17-22s16 8 17 22zM32 31v22"/><path d="M25 42h14" stroke="#8A641F"/>'],
['team','Team','<circle cx="32" cy="18" r="6"/><circle cx="15" cy="24" r="5"/><circle cx="49" cy="24" r="5"/><path d="M20 53c1-12 4-19 12-19s11 7 12 19M4 50c1-9 4-13 11-13 3 0 5 1 7 3m38 10c-1-9-4-13-11-13-3 0-5 1-7 3M32 38v12" stroke="#8A641F"/>'],
['calendar','Calendar','<rect x="10" y="15" width="44" height="39" rx="3"/><path d="M10 25h44M21 10v10m22-10v10"/><path d="M19 33h6m7 0h6m7 0h3m-29 9h6m7 0h6" stroke="#8A641F"/>'],
['timeline','Timeline','<path d="M11 33h42"/><circle cx="15" cy="33" r="5"/><circle cx="32" cy="33" r="5"/><circle cx="49" cy="33" r="5"/><path d="M15 28V16h17v12m0 10v11h17V38"/><circle cx="32" cy="16" r="2" fill="#8A641F" stroke="#8A641F"/>']
]],
['07 Toolkit & workflow',[
['checklist','Checklist','<rect x="15" y="10" width="34" height="44" rx="3"/><path d="m21 23 3 3 5-6m4 4h10m-22 9 3 3 5-6m4 4h10m-22 9 3 3 5-6m4 4h10" stroke="#8A641F"/>'],
['worksheet','Worksheet','<path d="M13 10h30l8 8v36H13zM43 10v9h8M20 27h23M20 34h12M20 43h8"/><rect x="36" y="37" width="7" height="8" rx="1" stroke="#8A641F"/>'],
['cue-sheet','Cue sheet','<path d="M15 10h34v44H15zM22 20h20M22 29h20M22 38h20M22 47h11"/><circle cx="23" cy="20" r="2" fill="#8A641F" stroke="#8A641F"/><circle cx="23" cy="29" r="2" fill="#8A641F" stroke="#8A641F"/><circle cx="23" cy="38" r="2" fill="#8A641F" stroke="#8A641F"/>'],
['report','Report','<path d="M14 10h29l8 8v36H14zM43 10v9h8M20 27h24"/><path d="M22 45V35h6v10m5 0V31h6v14m5 0V38h5v7" stroke="#8A641F"/>'],
['download','Download','<path d="M32 10v29M13 42v11h38V42M23 53v-5h18v5"/><path d="m21 28 11 11 11-11" stroke="#8A641F"/>'],
['upload','Upload','<path d="M32 43V14M13 42v11h38V42m-28 6h28"/><path d="m21 25 11-11 11 11" stroke="#8A641F"/>'],
['notes','Notes','<path d="M14 10h36v44H14zM21 20h21m-21 8h21m-21 8h13"/><path d="m37 47 11-11 4 4-11 11-7 2z" stroke="#8A641F"/>'],
['next-step','Next step','<circle cx="15" cy="17" r="4"/><circle cx="15" cy="47" r="4"/><path d="M19 17h10l10 15h9m-29 15h10l10-15m5-6 7 6-7 6" stroke="#8A641F"/>']
]],
['08 Interface & context',[
['location-context','Location / context','<path d="M32 54s18-18 18-31a18 18 0 1 0-36 0c0 13 18 31 18 31z"/><circle cx="32" cy="23" r="6"/><path d="M32 17v12" stroke="#8A641F"/>'],
['notification','Notification','<path d="M15 43h34l-4-6V27a13 13 0 0 0-26 0v10zM27 49c1 5 9 5 10 0"/><path d="M32 8v5" stroke="#8A641F"/>'],
['external-link','External link','<path d="M35 12h17v17M52 12 31 33M47 35v14H12V14h14"/><path d="M41 12h11v11" stroke="#8A641F"/>'],
['menu','Menu','<path d="M12 18h40M12 32h40M12 46h40"/><circle cx="19" cy="18" r="2" fill="#8A641F" stroke="#8A641F"/>'],
['plus','Add','<circle cx="32" cy="32" r="21"/><path d="M32 20v24M20 32h24" stroke="#8A641F"/>'],
['close','Close','<circle cx="32" cy="32" r="21"/><path d="m23 23 18 18m0-18L23 41" stroke="#8A641F"/>'],
['arrow-right','Continue','<path d="M10 32h42m-17-17 17 17-17 17"/><path d="M40 32h12" stroke="#8A641F"/>'],
['help','Help / information','<circle cx="32" cy="32" r="21"/><path d="M26 25a6 6 0 1 1 10 4c-3 2-4 3-4 7"/><circle cx="32" cy="44" r="1.8" fill="#8A641F" stroke="#8A641F"/>']
]]
];

function xml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function safe(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function glyph(body,x,y,size){
return '<svg x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" viewBox="0 0 64 64"><g fill="none" stroke="'+blue+'" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">'+body+'</g></svg>';
}
function single(body,label){
return '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="'+label+'"><g fill="none" stroke="'+blue+'" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">'+body+'</g></svg>';
}
function board(group){
let out='<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="570" viewBox="0 0 1320 570"><rect width="1320" height="570" fill="'+white+'"/><text x="56" y="62" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="'+navy+'">'+xml(group[0])+'</text><text x="56" y="95" font-family="Arial,sans-serif" font-size="16" fill="'+mid+'">Signal over Noise · Core icon family</text>';
group[1].forEach((item,i)=>{let col=i%4,row=Math.floor(i/4),x=56+col*302,y=128+row*196;
out+='<rect x="'+x+'" y="'+y+'" width="274" height="176" rx="14" fill="'+paper+'"/>'+glyph(item[2],x+102,y+20,70)+'<text x="'+(x+137)+'" y="'+(y+127)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="600" fill="'+navy+'">'+item[1]+'</text><text x="'+(x+137)+'" y="'+(y+151)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="'+mid+'">'+safe(item[0])+'</text>';});
return out+'</svg>';
}
function coreBoard(){
let out='<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="620" viewBox="0 0 1320 620"><rect width="1320" height="620" fill="'+white+'"/><text x="44" y="57" font-family="Arial,sans-serif" font-size="31" font-weight="700" fill="'+navy+'">Core symbols</text><text x="44" y="87" font-family="Arial,sans-serif" font-size="16" fill="'+mid+'">Simple, consistent marks. Add a circular frame only where it improves grouping.</text>';
const coreItems=defs[0][1].concat([defs[7][1].find(x=>x[0]==='location-context'),defs[7][1].find(x=>x[0]==='notification')]); coreItems.forEach((item,i)=>{let row=Math.floor(i/5),col=i%5,x=35+col*254,y=112+row*260,cx=x+127,cy=y+85;
out+='<circle cx="'+cx+'" cy="'+cy+'" r="48" fill="none" stroke="'+blue+'" stroke-width="2"/>'+glyph(item[2],cx-31,cy-31,62)+'<text x="'+cx+'" y="'+(y+163)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="600" fill="'+navy+'">'+item[1]+'</text>';});
return out+'</svg>';
}
async function main(){
const flat=[];let count=0;
for(let c=0;c<defs.length;c++){
const group=defs[c],dir=path.join(iconsDir,safe(group[0]));fs.mkdirSync(dir,{recursive:true});
for(const item of group[1]){fs.writeFileSync(path.join(dir,'son-icon-'+safe(item[0])+'.svg'),single(item[2],item[1]),'utf8');flat.push({cat:group[0],slug:item[0],label:item[1],body:item[2]});count++;}
const b=board(group),stem=String(c+1).padStart(2,'0')+'-'+safe(group[0]);
fs.writeFileSync(path.join(root,stem+'.svg'),b,'utf8');await sharp(Buffer.from(b)).png().toFile(path.join(root,stem+'.png'));
}
const core=coreBoard();fs.writeFileSync(path.join(root,'00-core-symbols-canva.svg'),core,'utf8');await sharp(Buffer.from(core)).png().toFile(path.join(root,'00-core-symbols-canva.png'));
let index='<svg xmlns="http://www.w3.org/2000/svg" width="1760" height="1840" viewBox="0 0 1760 1840"><rect width="1760" height="1840" fill="'+white+'"/><text x="50" y="56" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="'+navy+'">Signal over Noise · 64-icon library</text>';
flat.forEach((it,i)=>{let col=i%8,row=Math.floor(i/8),x=col*220,y=90+row*220;
index+='<rect x="'+(x+8)+'" y="'+(y+8)+'" width="204" height="204" rx="14" fill="'+paper+'"/>'+glyph(it.body,x+78,y+22,64)+'<text x="'+(x+110)+'" y="'+(y+117)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="600" fill="'+navy+'">'+it.label+'</text><text x="'+(x+110)+'" y="'+(y+148)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="9.5" fill="'+mid+'">'+safe(it.slug)+'</text>';});
index+='</svg>';fs.writeFileSync(path.join(root,'Signal-over-Noise-64-Icon-Index.svg'),index,'utf8');await sharp(Buffer.from(index)).png().toFile(path.join(root,'Signal-over-Noise-64-Icon-Index.png'));
const readme='SIGNAL OVER NOISE — ICON LIBRARY\n\n64 original reusable SVG icons, organized into eight categories. Each SVG has a transparent background, a 64×64 viewBox, a consistent 2.8 px rounded outline, and a restrained warm-gold detail on selected marks.\n\nPALETTE\nDeep navy #132033 · Brand blue #0B2D53 · Mid blue #193B64 · Warm gold #8A641F · Light gold #F2E5C8 · Warm paper #F5F0E8 · Soft white #FAF7F2.\n\nUSE\nImport individual SVGs into Canva for clean scaling. Start at 20–24 px in compact UI, 32–40 px in cards, and 48–64 px for larger callouts. The circular frame on the core-symbols reference is optional; the reusable source icons have no baked-in background or badge. Keep a clear margin around each mark; pair unfamiliar symbols with a short label. Use one icon to clarify a choice or action, not as decoration. Gold is an accent only, never the sole indicator of meaning. On dark navy, use a soft-white outline variant and keep any gold detail.\n\nSTYLE\nUse one simple, geometric outline family with rounded caps and joins. Keep stroke weight, optical size, and internal space consistent. Avoid gradients, shadows, 3D effects, filled circles behind every glyph, tiny internal detail, and mixing unrelated stock icons. Keep icons static by default; if motion is needed, use one brief purposeful reveal and respect reduced-motion settings. Provide an accessible label when an icon conveys meaning; hide it from assistive technology when purely decorative.\n\nWEBSITE AUDIT\nThe current site contains six older SVGs in img/icons: message, deck, delivery, high-stakes, skill-building, and team-training. Message, deck, and delivery repeat across contact, thanks, and toolkit content; skill-building and team-training are present in the files but not referenced. Three newer, cleaner service icons cover individual presentation support, team workshops, and partner classes. The free diagnostic route currently reuses the message icon. Four richer request/context/review/recommendation drawings in img/process are step illustrations, so they should remain separate from the small UI icon family. Navigation uses CSS-drawn menu bars, FAQ uses plus/minus characters, and several lists use CSS bullets/checks rather than a shared icon set.\n\nGAPS TO FILL FIRST\nGive the free diagnostic a review/clarity icon. Create distinct, labeled symbols for deck, script, and video diagnostics; evidence/source; feedback/markup; recommendation; coaching; rehearsal; and each toolkit resource. Replace repeated message/delivery reuse only where a different symbol makes the item easier to scan. Keep the four process illustrations as their own illustration style.\n\nCATEGORIES\n01 Core symbols: email, document, approval, featured, globe, clarity/focus, send, search.\n02 Communication and audience: message, conversation, script, story structure, key message, translation, audience, stakeholders.\n03 Slides and evidence: deck, slide, layout, chart, metric, source/citation, comparison, hierarchy.\n04 Review and decisions: review, markup, priority, signal, noise filter, interpretation, recommendation, decision.\n05 Delivery and rehearsal: presenter, microphone, recording, pace, pause, transition, emphasis, confidence.\n06 Services and routes: coaching, workshop, partner class, online session, individual, team, calendar, timeline.\n07 Toolkit and workflow: checklist, worksheet, cue sheet, report, download, upload, notes, next step.\n08 Interface and context: location/context, notification, external link, menu, add, close, continue, help/information.\n';
fs.writeFileSync(path.join(root,'README-and-usage.txt'),readme,'utf8');
console.log(JSON.stringify({root,individualIcons:count,categories:defs.length,preview:'00-core-symbols-canva.png'}));
}
main().catch(e=>{console.error(e);process.exit(1);});






