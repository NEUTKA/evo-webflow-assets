(function(root){
'use strict';
function extend(bank){
 if(!bank||!Array.isArray(bank.lessons))throw Error('Load bank.js before bank-16-18.js');
 if(bank.lessons.some(lesson=>lesson.id==='clothes-now'))return bank;
 bank.lessons.push(
  {id:'clothes-now',title:'l16',goal:'g16',person:'Anna',role:'Anna · at a café',speakingPrompt:'Describe what two people around you are wearing now. Ask: “What are you wearing today?”',audioTitle:'What are they wearing? — Anna',audio:'audio/lesson16-clothes-anna.mp3',transcript:[
   'Hi, I’m Anna. Today I want to talk about what people are wearing.','Right now, I am at a small café. I can see many people.','A woman near the window is wearing a long black coat and a white scarf.','She is also wearing boots because it is cold outside.','A man at the next table is wearing a blue jacket and jeans.','He has a backpack and a black cap.','Two students are sitting together. One student is wearing a hoodie and sneakers.','The other student is wearing a grey sweater and a green skirt.','I like watching people’s clothes. It helps me learn new words.'
  ],vocabulary:[['coat',''],['scarf',''],['boots',''],['jacket',''],['hoodie',''],['sweater','']],examples:['She is wearing a black coat.','He is wearing a blue jacket.','Two students are sitting together.'],rules:['presentContinuous','continuousNow'],items:[
   {id:'16-1',type:'choice',prompt:'Choose the sentence about what the woman is wearing now.',options:['She is wearing a black coat.','She wears a black coat yesterday.','She wearing a black coat.'],answer:'She is wearing a black coat.',rule:'presentContinuous'},
   {id:'16-2',type:'input',prompt:'Complete with the form of be: The woman ___ wearing a scarf.',answers:['is'],modelAnswer:'The woman is wearing a scarf.',rule:'presentContinuous'},
   {id:'16-3',type:'choice',prompt:'Complete: Two students ___ sitting together.',options:['are','is','am'],answer:'are',rule:'presentContinuous'},
   {id:'16-4',type:'order',prompt:'Build a sentence about the man’s clothes.',tokens:['wearing','He','jeans.','is'],answer:'He is wearing jeans.',rule:'presentContinuous'},
   {id:'16-5',type:'input',prompt:'Write the -ing form of wear: She is ___ a scarf.',answers:['wearing'],modelAnswer:'She is wearing a scarf.',rule:'presentContinuous'},
   {id:'16-6',type:'choice',prompt:'Choose the sentence about an action happening now.',options:['The students are sitting together.','The students sits together now.','The students is sitting together.'],answer:'The students are sitting together.',rule:'continuousNow'},
   {id:'16-7',type:'input',prompt:'Complete with the form of be: He ___ wearing a blue jacket.',answers:['is'],modelAnswer:'He is wearing a blue jacket.',rule:'presentContinuous'},
   {id:'16-8',type:'choice',prompt:'Choose the correct question about clothes now.',options:['What is he wearing?','What he is wearing?','What does he wearing?'],answer:'What is he wearing?',rule:'presentContinuous'},
   {id:'16-9',type:'order',prompt:'Build a sentence about the two students.',tokens:['sitting','The students','together.','are'],answer:'The students are sitting together.',rule:'presentContinuous'},
   {id:'16-10',type:'input',prompt:'Complete the negative: The man ___ wearing a black coat. He has a blue jacket.',answers:['is not',"isn't"],modelAnswer:'The man is not wearing a black coat.',rule:'presentContinuous'}
  ],listeningItems:[
   {id:'16-l1',type:'choice',prompt:'Where is Anna?',options:['At a small café.','On a bus.','In a shop.'],answer:'At a small café.',rule:'listen'},
   {id:'16-l2',type:'choice',prompt:'What is the woman near the window wearing?',options:['A long black coat and a white scarf.','A blue jacket and jeans.','A grey sweater and a green skirt.'],answer:'A long black coat and a white scarf.',rule:'listen'},
   {id:'16-l3',type:'choice',prompt:'Why is the woman wearing boots?',options:['Because it is cold outside.','Because she is going to work.','Because it is raining.'],answer:'Because it is cold outside.',rule:'listen'},
   {id:'16-l4',type:'choice',prompt:'What colour is the man’s jacket?',options:['Blue.','Black.','Green.'],answer:'Blue.',rule:'listen'},
   {id:'16-l5',type:'choice',prompt:'What is one of the two students wearing?',options:['A hoodie and sneakers.','A coat and boots.','A suit and a tie.'],answer:'A hoodie and sneakers.',rule:'listen'}],speakingSentences:['She is wearing a black coat.','Two students are sitting together.']},
  {id:'restaurant-offer',title:'l17',goal:'g17',person:'Customer',role:'Customer · restaurant',speakingPrompt:'Order a drink and a meal politely. Ask your partner: “Would you like something to drink?”',audioTitle:'Ordering at the restaurant',audio:'audio/lesson17-restaurant.mp3',transcript:[
   'Waiter: Good evening. Welcome to Sunny Restaurant.','Customer: Good evening. A table for one, please.','Waiter: Of course. Please sit here. Here is the menu.','Customer: Thank you.','Waiter: Would you like something to drink?','Customer: Yes, please. A glass of water. And an orange juice.','Waiter: Sure. Are you ready to order food?','Customer: Yes. I’d like a chicken salad, please.','Waiter: Chicken salad. Would you like bread with that?','Customer: Yes, please.','Waiter: And would you like soup or fries?','Customer: Soup, please. Tomato soup.','Waiter: Great. Anything else?','Customer: No, that’s all. Thank you.','Waiter: OK. I will bring your drinks now.','Customer: Thank you.'
  ],vocabulary:[['menu',''],['waiter',''],['customer',''],['salad',''],['soup',''],['fries','']],examples:['I like orange juice.','I’d like an orange juice, please.','Would you like something to drink?'],rules:['likeGeneral','wouldLikeOffer'],items:[
   {id:'17-1',type:'choice',prompt:'You want water now. Choose the polite request.',options:["I’d like a glass of water, please.",'I like a glass of water, please.','Do you like a glass of water?'],answer:"I’d like a glass of water, please.",rule:'wouldLikeOffer'},
   {id:'17-2',type:'choice',prompt:'Ask about someone’s general opinion of soup.',options:['Do you like soup?','Would you like soup?','I’d like soup.'],answer:'Do you like soup?',rule:'likeGeneral'},
   {id:'17-3',type:'input',prompt:'Offer a drink now: ___ you like something to drink?',answers:['Would'],modelAnswer:'Would you like something to drink?',rule:'wouldLikeOffer'},
   {id:'17-4',type:'order',prompt:'Build a polite request for food.',tokens:['like','a chicken salad,','I’d','please.'],answer:'I’d like a chicken salad, please.',rule:'wouldLikeOffer'},
   {id:'17-5',type:'choice',prompt:'Choose the sentence about a general preference.',options:['I like orange juice.','I’d like an orange juice now.','Would you like an orange juice?'],answer:'I like orange juice.',rule:'likeGeneral'},
   {id:'17-6',type:'input',prompt:'Complete the offer: Would you ___ bread with that?',answers:['like'],modelAnswer:'Would you like bread with that?',rule:'wouldLikeOffer'},
   {id:'17-7',type:'choice',prompt:'The waiter offers two sides. Choose the offer.',options:['Would you like soup or fries?','Do you like soup or fries in general?','I like soup or fries.'],answer:'Would you like soup or fries?',rule:'wouldLikeOffer'},
   {id:'17-8',type:'input',prompt:'Complete the polite order: I’d ___ tomato soup, please.',answers:['like'],modelAnswer:'I’d like tomato soup, please.',rule:'wouldLikeOffer'},
   {id:'17-9',type:'order',prompt:'Build an offer of a drink.',tokens:['you','Would','a drink?','like'],answer:'Would you like a drink?',rule:'wouldLikeOffer'},
   {id:'17-10',type:'choice',prompt:'A friend asks “Do you like salad?” Choose a reply about your general taste.',options:['Yes, I do.','Yes, I would.','Yes, I am.'],answer:'Yes, I do.',rule:'likeGeneral'}
  ],listeningItems:[
   {id:'17-l1',type:'choice',prompt:'How many people need a table?',options:['One.','Two.','Three.'],answer:'One.',rule:'listen'},
   {id:'17-l2',type:'choice',prompt:'What two drinks does the customer request?',options:['Water and orange juice.','Tea and coffee.','Milk and lemonade.'],answer:'Water and orange juice.',rule:'listen'},
   {id:'17-l3',type:'choice',prompt:'What salad does the customer order?',options:['Chicken salad.','Tomato salad.','Fruit salad.'],answer:'Chicken salad.',rule:'listen'},
   {id:'17-l4',type:'choice',prompt:'Which side does the customer choose: soup or fries?',options:['Soup.','Fries.','Neither.'],answer:'Soup.',rule:'listen'},
   {id:'17-l5',type:'choice',prompt:'What kind of soup does the customer request?',options:['Tomato soup.','Chicken soup.','Vegetable soup.'],answer:'Tomato soup.',rule:'listen'}],speakingSentences:["I’d like a chicken salad, please.",'Would you like something to drink?']},
  {id:'shopping-habits',title:'l18',goal:'g18',person:'Maria',role:'Maria · shopping habits',speakingPrompt:'Tell your partner how often you shop for food and clothes. Ask: “How often do you go to the market?”',audioTitle:'Shopping habits — Maria',audio:'audio/lesson18-shopping-maria.mp3',transcript:[
   'Hi, I’m Maria. My shopping habits are very simple.','I go to the market on Wednesday or Thursday to buy fresh fruit and vegetables.','I like talking to the sellers, and the food is very fresh.','I also go to a pharmacy and a small shop near my house when I need things quickly.','I enjoy shopping for clothes, but I don’t do it often. Maybe once a month.','I like to try on clothes and look in the mirror.','Sometimes I buy second-hand clothes because they are cheaper and still good.','I always compare prices before I buy something.'
  ],vocabulary:[['market',''],['seller',''],['pharmacy',''],['try on',''],['second-hand',''],['compare prices','']],examples:['I sometimes buy second-hand clothes.','I always compare prices.','I shop for clothes once a month.'],rules:['frequencyPosition','howOften'],items:[
   {id:'18-1',type:'choice',prompt:'Place the frequency word correctly.',options:['I sometimes buy second-hand clothes.','I buy sometimes second-hand clothes.','I buy second-hand sometimes clothes.'],answer:'I sometimes buy second-hand clothes.',rule:'frequencyPosition'},
   {id:'18-2',type:'input',prompt:'Complete Maria’s habit: I ___ compare prices before I buy.',answers:['always'],modelAnswer:'I always compare prices before I buy.',rule:'frequencyPosition'},
   {id:'18-3',type:'choice',prompt:'Ask about the frequency of shopping for clothes.',options:['How often do you shop for clothes?','How often you shop for clothes?','How often are you shop for clothes?'],answer:'How often do you shop for clothes?',rule:'howOften'},
   {id:'18-4',type:'order',prompt:'Build Maria’s sentence about comparing prices.',tokens:['compare','I','prices.','always'],answer:'I always compare prices.',rule:'frequencyPosition'},
   {id:'18-5',type:'input',prompt:'Complete the time expression: I shop for clothes once ___ month.',answers:['a'],modelAnswer:'I shop for clothes once a month.',rule:'howOften'},
   {id:'18-6',type:'choice',prompt:'Choose the correct answer to “How often do you shop for clothes?”',options:['Once a month.','At the market.','For a sweater.'],answer:'Once a month.',rule:'howOften'},
   {id:'18-7',type:'input',prompt:'Complete the question: How often ___ you go to the market?',answers:['do'],modelAnswer:'How often do you go to the market?',rule:'howOften'},
   {id:'18-8',type:'choice',prompt:'Choose the sentence with always in the right place.',options:['She always compares prices.','She compares always prices.','She compares prices always.'],answer:'She always compares prices.',rule:'frequencyPosition'},
   {id:'18-9',type:'order',prompt:'Build a question about shopping frequency.',tokens:['often','do','shop?','How','you'],answer:'How often do you shop?',rule:'howOften'},
   {id:'18-10',type:'input',prompt:'Complete the frequency phrase: I buy clothes once a ___.',answers:['month'],modelAnswer:'I buy clothes once a month.',rule:'howOften'}
  ],listeningItems:[
   {id:'18-l1',type:'choice',prompt:'On which days does Maria go to the market?',options:['Wednesday or Thursday.','Monday or Tuesday.','Saturday or Sunday.'],answer:'Wednesday or Thursday.',rule:'listen'},
   {id:'18-l2',type:'choice',prompt:'What does Maria buy at the market?',options:['Fresh fruit and vegetables.','Shoes and bags.','Coffee and bread.'],answer:'Fresh fruit and vegetables.',rule:'listen'},
   {id:'18-l3',type:'choice',prompt:'How often does Maria shop for clothes?',options:['About once a month.','Every day.','Twice a week.'],answer:'About once a month.',rule:'listen'},
   {id:'18-l4',type:'choice',prompt:'Why does Maria sometimes buy second-hand clothes?',options:['They are cheaper and still good.','They are always new.','The market sells only used clothes.'],answer:'They are cheaper and still good.',rule:'listen'},
   {id:'18-l5',type:'choice',prompt:'What does Maria always do before buying something?',options:['Compare prices.','Call a friend.','Try on shoes.'],answer:'Compare prices.',rule:'listen'}],speakingSentences:['I sometimes buy second-hand clothes.','I always compare prices.']}
 );
 bank.version=8;
 return bank;
}
if(typeof module==='object'&&module.exports)module.exports=extend;
else extend(root.EvoCourseBank);
})(typeof globalThis==='object'?globalThis:this);
