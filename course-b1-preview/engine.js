(function(root){'use strict';
function normalize(s){return String(s??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/\bcan't\b/g,'can not').replace(/\bcannot\b/g,'can not').replace(/\b(is|are|was|were|do|does|did|have|has|had|would|will|should|could|can|must)n['’]t\b/g,(_,v)=>v+' not').replace(/\bwon't\b/g,'will not').replace(/[.,?!;:]/g,'').replace(/\s+/g,' ').trim();}
function correct(q,answer){if(q.type==='sequence')return Array.isArray(answer)&&answer.join('|')===q.answer.join('|');return q.answer.split('|').some(x=>normalize(x)===normalize(answer));}
function shuffle(a,seed){const out=a.slice();let s=seed||17;for(let i=out.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[out[i],out[j]]=[out[j],out[i]];}return out;}
function tokens(q){return shuffle(q.answer.split('|')[0].split(' '),q.id.split('').reduce((a,c)=>a+c.charCodeAt(0),1));}
function record(state,q,answer,now=Date.now()){const prev=state.answers[q.id]||{attempts:0};const ok=correct(q,answer);state.answers[q.id]={answer,correct:ok,attempts:prev.attempts+1,firstCorrect:prev.firstCorrect??(prev.attempts===0?ok:false),updatedAt:now};if(!ok)state.review[q.id]={due:now,streak:0};else if(state.review[q.id]){const streak=state.review[q.id].streak+1;state.review[q.id]={streak,due:now+[1,3,7,14][Math.min(streak-1,3)]*86400000};}return ok;}
function initial(){return {version:1,current:1,phase:'theory',answers:{},drafts:{},spoken:{},self:{},review:{},completed:[],moduleAttempts:{}};}
function due(state,questions,now=Date.now()){return questions.filter(q=>state.review[q.id]&&state.review[q.id].due<=now);}
const engine={normalize,correct,shuffle,tokens,record,initial,due};root.B1_ENGINE=engine;if(typeof module==='object'&&module.exports)module.exports=engine;
})(globalThis);
