(function(root){
'use strict';
const B=typeof module==='object'&&module.exports?require('./bank.js'):root.EvoCourseBank;
const clone=x=>JSON.parse(JSON.stringify(x));
function normalize(value){return String(value||'').normalize('NFKC').toLowerCase().replace(/[’‘`]/g,"'").replace(/[.,!?;:]/g,' ').replace(/\s+/g,' ').trim();}
function correct(q,draft){if(q.type==='writing'){const text=normalize(draft);return (q.answers||(q.modelAnswer?[q.modelAnswer]:[])).some(answer=>normalize(answer)===text);}if(q.type==='fields')return q.fields.every((f,i)=>{const value=normalize(draft?.[i]);return value.length>=2&&/[a-z]/i.test(value);});if(q.type==='match')return q.pairs.every((p,i)=>draft?.[i]===p[1]);const response=q.type==='order'&&Array.isArray(draft)&&draft.every(Number.isInteger)?draft.map(i=>q.tokens[i]).join(' '):Array.isArray(draft)?draft.join(' '):draft;return (q.answers||[q.answer]).some(a=>normalize(a)===normalize(response));}
function orderIndexes(q,draft){if(!Array.isArray(draft))return[];if(draft.every(Number.isInteger))return [...new Set(draft)].filter(i=>i>=0&&i<q.tokens.length);const remaining=new Set(q.tokens.map((_,i)=>i)),selected=[];for(const word of draft){const index=[...remaining].find(i=>q.tokens[i]===word);if(index!==undefined){selected.push(index);remaining.delete(index);}}return selected;}
function selectOrderToken(q,draft,index){const selected=orderIndexes(q,draft);if(Number.isInteger(index)&&index>=0&&index<q.tokens.length&&!selected.includes(index))selected.push(index);return selected;}
function removeOrderToken(q,draft,position){return orderIndexes(q,draft).filter((_,i)=>i!==position);}
function ready(q,draft){if(q.type==='fields')return q.fields.every((f,i)=>String(draft?.[i]||'').trim());if(q.type==='match')return q.pairs.every((p,i)=>!!draft?.[i]);if(q.type==='order')return Array.isArray(draft)&&draft.length===q.tokens.length;if(q.type==='writing')return String(draft||'').trim().split(/\s+/).filter(Boolean).length>=3;return !!String(draft||'').trim();}
function initial(){return {version:B.version,completed:{},days:[],xp:0,active:null,lastResult:null};}
function current(state){const a=state.active;if(!a)return null;const listening=a.phase.startsWith('listening');const items=listening?B.lessons[a.lesson].listeningItems:B.lessons[a.lesson].items;const review=a.phase.endsWith('review');return items[review?a.queue[a.position]:a.position];}
function unlocked(s,l){return Number.isInteger(l)&&l>=0&&l<B.lessons.length&&(l===0||!!s.completed[B.lessons[l-1].id]);}
function start(s,l){if(!unlocked(s,l))throw Error('LOCKED');const n=clone(s);n.active={lesson:l,phase:'grammar',position:0,queue:[],unresolved:[],firstCorrect:0,mainAnswered:0,listeningCorrect:0,listeningAnswered:0,listeningQueue:[],listeningUnresolved:[],helped:[],seed:Math.floor(Math.random()*0xffffffff),draft:null,feedback:null};return n;}
function enterListening(s){const n=clone(s),a=n.active;if(!a)return s;a.grammarReviewed=a.queue.length;a.grammarUnresolved=a.unresolved.length;a.phase='listening-intro';a.position=0;a.queue=[];a.unresolved=[];a.draft=null;a.feedback=null;return n;}
function startListening(s){const n=clone(s),a=n.active;if(!a||a.phase!=='listening-intro')return s;a.phase='listening';a.position=0;a.queue=[];a.draft=null;a.feedback=null;return n;}
function enterVocabulary(s){const n=clone(s),a=n.active;if(!a)return s;a.listeningReviewed=a.queue.length;a.listeningUnresolved=a.unresolved.length;a.phase='vocabulary';a.position=0;a.draft=null;a.feedback=null;return n;}
function enterSpeaking(s){const n=clone(s),a=n.active;if(!a)return s;a.phase='speaking';return n;}
function draft(s,value){const n=clone(s);if(n.active&&!n.active.feedback)n.active.draft=value;return n;}
function hint(s){const n=clone(s);const q=current(n);if(q&&!n.active.helped.includes(q.id))n.active.helped.push(q.id);return n;}
function submit(s){const q=current(s);if(!q||s.active.feedback||!ready(q,s.active.draft))return {state:s,event:null};const n=clone(s),a=n.active,ok=correct(q,a.draft),listening=a.phase==='listening';
 if(!a.phase.endsWith('review')){if(listening){a.listeningAnswered++;if(ok&&!a.helped.includes(q.id))a.listeningCorrect++;if(!ok||a.helped.includes(q.id))a.queue.push(a.position);}else{a.mainAnswered++;if(ok&&!a.helped.includes(q.id))a.firstCorrect++;if(!ok||a.helped.includes(q.id))a.queue.push(a.position);}}
 else if(!ok)a.unresolved.push(a.queue[a.position]);
 a.feedback=ok?'correct':'wrong';return {state:n,event:ok?'correct':'error'};
}
function next(s,day){const n=clone(s),a=n.active;if(!a?.feedback)return {state:s,event:null};const listening=a.phase.startsWith('listening'),review=a.phase.endsWith('review'),items=listening?B.lessons[a.lesson].listeningItems:B.lessons[a.lesson].items,count=review?a.queue.length:items.length;
 if(a.position+1<count){a.position++;a.draft=null;a.feedback=null;return {state:n,event:null};}
 if(!review&&a.queue.length){a.phase=listening?'listening-review':'grammar-review';a.position=0;a.draft=null;a.feedback=null;return {state:n,event:null};}
 if(a.phase==='grammar'||a.phase==='grammar-review')return {state:enterListening(n),event:null};
 if(a.phase==='listening'||a.phase==='listening-review')return {state:enterVocabulary(n),event:null};
 return {state:s,event:null};
}
function finish(s,day){const n=clone(s),a=n.active;if(!a||a.phase!=='speaking')return {state:s,event:null};
 const id=B.lessons[a.lesson].id,wasComplete=!!n.completed[id],before=Object.keys(n.completed).length;
 const total=a.mainAnswered+a.listeningAnswered,firstCorrect=a.firstCorrect+a.listeningCorrect;
 const result={lesson:a.lesson,firstCorrect,total,reviewed:(a.grammarReviewed||0)+(a.listeningReviewed||0),unresolved:(a.grammarUnresolved||0)+(a.listeningUnresolved||0),helped:a.helped.length,xp:wasComplete?0:20};
 n.completed[id]=result;n.xp+=result.xp;if(!n.days.includes(day))n.days.push(day);n.lastResult=result;n.active=null;
 return {state:n,event:!wasComplete&&before===2?'module':'lesson'};
}
function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function streak(s,date=new Date()){const d=new Date(date.getFullYear(),date.getMonth(),date.getDate());if(!s.days.includes(localDay(d)))d.setDate(d.getDate()-1);let n=0;while(s.days.includes(localDay(d))){n++;d.setDate(d.getDate()-1);}return n;}
function restore(raw){const s=typeof raw==='string'?JSON.parse(raw):clone(raw);if(!s||![1,2,B.version].includes(s.version)||!s.completed||!Array.isArray(s.days)||!Number.isFinite(s.xp))throw Error('INVALID');if(Object.keys(s.completed).some(k=>!B.lessons.some(l=>l.id===k)))throw Error('INVALID');if(s.version===1&&s.active){const a=s.active;a.phase=a.phase==='main'?'grammar':a.phase==='review'?'grammar-review':a.phase;}s.version=B.version;if(s.active){const a=s.active,allowed=['grammar','grammar-review','listening-intro','listening','listening-review','vocabulary','speaking'],isListening=a.phase.startsWith('listening'),review=a.phase.endsWith('review'),max=isListening?B.lessons[a.lesson]?.listeningItems?.length:B.lessons[a.lesson]?.items?.length;if(!unlocked(s,a.lesson)||!allowed.includes(a.phase)||!Array.isArray(a.queue)||!Array.isArray(a.helped)||!Array.isArray(a.unresolved)||!Number.isInteger(a.position)||a.position<0||a.queue.some(i=>!Number.isInteger(i)||i<0||i>=max)||((a.phase==='grammar'||a.phase==='listening')&&a.position>=max)||(review&&a.position>=a.queue.length))throw Error('INVALID');a.seed||=Math.floor(Math.random()*0xffffffff);a.listeningQueue||=[];a.listeningUnresolved||=[];a.listeningCorrect||=0;a.listeningAnswered||=0;const resumed=current(s);if(resumed&&['1-10','2-9','2-10','3-9','3-10'].includes(resumed.id))a.draft=null;}return clone(s);}
const api={normalize,correct,ready,orderIndexes,selectOrderToken,removeOrderToken,initial,current,unlocked,start,enterListening,startListening,enterVocabulary,enterSpeaking,finish,draft,hint,submit,next,localDay,streak,restore};if(typeof module==='object'&&module.exports)module.exports=api;else root.EvoCourseEngine=api;
})(typeof globalThis==='object'?globalThis:this);
