(function(root){
'use strict';
const B=typeof module==='object'&&module.exports?require('./bank.js'):root.EvoCourseBank;
const definitions={
 'class':'a group of people learning together','student':'a person who is learning','teacher':'a person who helps students learn','friendly':'kind and pleasant to other people','country':'a nation, such as Canada','nurse':'a person who cares for sick people',
 'weekday':'a day from Monday to Friday','supermarket':'a large shop that sells food','customer':'a person who buys something','cash desk':'the place where you pay in a shop','colleague':'a person you work with','future':'the time after now',
 'routine':'things you do regularly','café':'a small place to buy coffee and food','wake up':'to stop sleeping','serve':'to give food or drinks to customers','relax':'to rest and feel calm',
 'at the moment':'right now','living room':'a room where people sit together at home','sofa':'a long comfortable seat','notebook':'a small book for writing notes','vegetables':'plants such as carrots and tomatoes that people eat','headphones':'something you wear over your ears to listen',
 'weekend':'Saturday and Sunday','do the laundry':'to wash your clothes','in the afternoon':'between midday and evening','take a walk':'to walk for pleasure','calm':'quiet and peaceful',
 'free time':'time when you are not working or studying','rest':'to stop working and relax','comedy':'a funny film or show','take photos':'to make pictures with a camera or phone',
 'barista':'a person who makes coffee in a café','coffee machine':'a machine used to make coffee','sandwich':'food between two pieces of bread','lunchtime':'the time when people eat lunch','proud':'pleased with something you have done',
 'younger brother':'a male sibling who is younger than you','bus driver':'a person whose job is driving a bus','grandparents':'your parents’ parents','together':'with one another','apartment':'a home in a larger building','laugh':'to make a happy sound when something is funny',
 'bedroom':'a room where you sleep','blanket':'a warm cover for a bed','pillow':'a soft thing you put your head on in bed','wardrobe':'a tall cupboard for clothes','shelf':'a flat place for storing books or things','phone charger':'a device that puts power into a phone',
 'public transport':'buses, trains and other transport everyone can use','bus stop':'a place where a bus picks up passengers','crowded':'full of people','metro':'an underground city train','ticket':'a paper or digital pass for a journey','traffic':'vehicles moving on roads',
 'get dressed':'to put on your clothes','coworker':'a person you work with','series':'a TV story with several episodes','go to bed':'to get into bed to sleep',
 'nationality':'the country a person belongs to','first language':'the language you learned first','useful':'helpful for a purpose','language school':'a place where people learn languages','phrase':'a short group of words','practice':'to do something again to get better',
 'husband':'a married man in relation to his partner','kind':'caring and helpful','office':'a place where people work at desks','safe':'away from danger',
 'third floor':'the level three floors above the ground floor','mirror':'a surface where you can see yourself','balcony':'an outdoor platform attached to a room','cozy':'warm and comfortable',
 'village':'a small community in the countryside','peaceful':'quiet and without disturbance','neighbor':'a person who lives near you','post office':'a place where you send letters and parcels','field':'an open area of land','sunset':'the time when the sun goes down',
 'coat':'a warm outer piece of clothing','scarf':'a long piece of cloth worn around the neck','boots':'shoes that cover the ankles','jacket':'a short outer piece of clothing','hoodie':'a sweatshirt with a hood','sweater':'a warm knitted top',
 'menu':'a list of food and drinks at a restaurant','waiter':'a person who brings food to customers','salad':'a dish of vegetables, often served cold','soup':'a liquid food eaten from a bowl','fries':'thin pieces of fried potato',
 'market':'a place where people buy and sell food or other goods','seller':'a person who sells things','pharmacy':'a shop that sells medicine','try on':'to put on clothes to see how they fit','second-hand':'owned or used before by someone else','compare prices':'to look at two or more prices before buying'
};
const key=word=>String(word||'').normalize('NFKC').trim().toLocaleLowerCase('en');
function catalogue(lessons=B.lessons){const found=new Map();for(const lesson of lessons)for(const [word] of lesson.vocabulary||[]){const id=key(word);if(id&&!found.has(id))found.set(id,{id,word,clue:definitions[id]||'',source:'course',lesson:lesson.id});}return [...found.values()];}
function merge(course,saved){const out=new Map(course.map(card=>[card.id,{...card}]));for(const row of saved||[]){const word=String(row?.word||'').trim(),id=key(word);if(!id||id.length>80)continue;const prior=out.get(id);out.set(id,{id,word:prior?.word||word,clue:prior?.clue||'',translation:String(row.translation||'').trim().slice(0,160),source:prior?'course+saved':'saved',lesson:prior?.lesson||null});}return [...out.values()];}
function initial(){return {version:1,words:{},days:{}};}
function restore(raw){try{const x=typeof raw==='string'?JSON.parse(raw):raw;if(x?.version===1&&x.words&&typeof x.words==='object'&&x.days&&typeof x.days==='object')return x;}catch(_){}return initial();}
function due(cards,progress,today,limit=5){return [...cards].sort((a,b)=>{const x=progress.words[a.id],y=progress.words[b.id],xd=x?.due||'0000-00-00',yd=y?.due||'0000-00-00';return xd.localeCompare(yd)||((x?.seen||0)-(y?.seen||0))||a.id.localeCompare(b.id);}).filter(card=>(progress.words[card.id]?.due||'0000-00-00')<=today).slice(0,limit);}
const intervals=[1,3,7,14,30];
function grade(progress,id,ok,today){const next=JSON.parse(JSON.stringify(progress)),old=next.words[id]||{stage:0,seen:0};const stage=ok?Math.min(old.stage+1,intervals.length):0;const date=new Date(today+'T12:00:00');date.setDate(date.getDate()+(ok?intervals[stage-1]:1));next.words[id]={stage,seen:old.seen+1,due:`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`};if(ok){const words=new Set(next.days[today]||[]);words.add(id);next.days[today]=[...words];}return next;}
function answer(card,input){return key(input).replace(/[.!?]+$/,'')===key(card.word).replace(/[.!?]+$/,'');}
const api={definitions,key,catalogue,merge,initial,restore,due,grade,answer};if(typeof module==='object'&&module.exports)module.exports=api;else root.EvoCourseReview=api;
})(typeof globalThis==='object'?globalThis:this);
