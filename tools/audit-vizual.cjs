// Visual audit: contrast (with layered backgrounds), text under 14px, lines over ~90 characters,
// heading sizes, tap targets under 44px, horizontal overflow, section padding, full-page screenshots.
// Run against a running preview: node tools/audit-vizual.cjs <output folder>  (needs playwright-core + Chrome)
const { chromium } = require('playwright-core');
const fs=require('fs'); const out=process.argv[2];
const pages=['/','/utilaje/','/utilaje/masini-slefuit-beton/','/utilaje/masini-sablat-pardoseli/','/utilaje/masini-slefuit-beton/exemplu-masina-slefuit-3-discuri/','/utilaje/aspiratoare-industriale/exemplu-aspirator-industrial/','/lucrari/','/inchiriere/','/vanzare/','/contact/','/despre/','/termeni-inchiriere/','/confidentialitate/','/nu-exista/'];
const AUDIT = () => {
  const lum=(c)=>{const [r,g,b]=c.slice(0,3).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b};
  const parse=(s)=>{const m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return [p[0],p[1],p[2],p[3]===undefined?1:p[3]]};
  const bgOf=(el)=>{let stack=[];let img=false;for(let e=el;e;e=e.parentElement){const cs=getComputedStyle(e);if(cs.backgroundImage&&cs.backgroundImage!=='none'&&!cs.backgroundImage.includes('gradient'))img=true; if(e.tagName==='PICTURE'||e.tagName==='IMG')img=true; const c=parse(cs.backgroundColor);if(c&&c[3]>0){stack.push(c);if(c[3]>=1)break;}}
    let base=[255,255,255];for(let i=stack.length-1;i>=0;i--){const c=stack[i];base=[0,1,2].map(k=>c[k]*c[3]+base[k]*(1-c[3]));} return {bg:base,img};};
  const res={contrast:[],small:[],long:[],headings:[],targets:[],overflow:document.documentElement.scrollWidth>innerWidth};
  const seen=new Set();
  for (const el of document.querySelectorAll('body *')) {
    if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')continue;
    const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1); if(!own)continue;
    const cs=getComputedStyle(el); if(cs.visibility==='hidden'||+cs.opacity===0)continue;
    const r=el.getBoundingClientRect(); if(r.width<2||r.height<2)continue;
    const fg=parse(cs.color); const {bg,img}=bgOf(el); const fgc=[0,1,2].map(k=>fg[k]*fg[3]+bg[k]*(1-fg[3]));
    const L1=lum(fgc),L2=lum(bg); const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    const fs=parseFloat(cs.fontSize), fw=+cs.fontWeight; const large=fs>=24||(fs>=18.66&&fw>=700);
    const txt=el.textContent.trim().slice(0,40);
    if(!img && ratio<(large?3:4.5)) res.contrast.push(`${ratio.toFixed(2)} ${fs}px "${txt}"`);
    if(fs<14 && !seen.has('s'+txt)){seen.add('s'+txt);res.small.push(`${fs}px "${txt}"`);}
    if(['P','LI','DD','SPAN'].includes(el.tagName)&&cs.display!=='inline'){const cpl=r.width/(fs*0.5);if(cpl>90&&el.textContent.length>120)res.long.push(`${Math.round(cpl)}cpl ${fs}px "${txt}"`);}
  }
  for(const h of document.querySelectorAll('h1,h2,h3')){const cs=getComputedStyle(h);if(!h.offsetParent)continue;res.headings.push(`${h.tagName} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} "${h.textContent.trim().slice(0,38)}"`);}
  for(const a of document.querySelectorAll('a,button,summary,input,textarea')){const r=a.getBoundingClientRect();if(r.width===0||r.height===0)continue;if(a.closest('p,li,td,th,.cale,.subsol')&&getComputedStyle(a).display==='inline')continue;if(a.type==='hidden'||a.closest('.ascuns'))continue;if(r.height<44||r.width<44)res.targets.push(`${Math.round(r.width)}x${Math.round(r.height)} ${a.tagName} "${(a.textContent||a.name||'').trim().slice(0,30)}"`);}
  const secs=[...document.querySelectorAll('main > section, main > div')].map(s=>{const cs=getComputedStyle(s);return `${parseInt(cs.paddingTop)}/${parseInt(cs.paddingBottom)} ${s.className.split(' ').slice(0,2).join('.')}`});
  res.sections=secs; return res; };
(async()=>{const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}); const all={};
for (const w of [1440,390]) { const c=await b.newContext({viewport:{width:w,height:900},isMobile:w<500}); await c.route(/tiktok\.com/,r=>r.abort());
 for (const pg of pages) { const p=await c.newPage(); await p.goto('http://localhost:4321'+pg,{waitUntil:'networkidle'});
  for(let y=0;y<12000;y+=800){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);} await p.evaluate(()=>scrollTo(0,0));
  all[w+' '+pg]=await p.evaluate(AUDIT);
  await p.screenshot({path:`${out}/${w}${pg.replace(/\//g,'_')}.png`,fullPage:true}); await p.close(); }
 await c.close(); }
fs.writeFileSync(out+'/audit.json',JSON.stringify(all,null,1)); await b.close();})();
