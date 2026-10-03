(function(root){
'use strict';
function extend(bank){
 if(!bank||!Array.isArray(bank.lessons))throw Error('Load bank.js before bank-19-21.js');
 if(bank.lessons.some(lesson=>lesson.id==='sports-exercise'))return bank;
 bank.lessons.push(
 {id:'sports-exercise',title:'l19',goal:'g19',person:'Anna',role:'Anna · sports and exercise',audioTitle:'Sports and exercise — Anna',audio:'audio/lesson19-sports-anna.mp3',speakingPrompt:'Talk about exercise you like and activities you enjoy. Ask your partner: “What do you enjoy doing?”',transcript:[
 'Hi, I’m Anna. I like sports, but I’m not a professional.',
 'I try to move every day.',
 'On weekdays, I usually walk after work for about thirty minutes.',
 'Sometimes I do yoga at home. I follow a simple video, and it helps me relax.',
 'On Saturdays, I often go to the park with my friend. We jog slowly, and we talk while we run.',
 'I don’t like very hard exercise, but I like to feel active.',
 'In winter, I don’t go outside a lot, so I do short workouts in my room.',
 'I feel better when I exercise, and I sleep well at night.'
 ],vocabulary:[['exercise',''],['yoga',''],['jog',''],['active',''],['workout',''],['weekday','']],examples:['I like walking after work.','I enjoy doing yoga.','I don’t mind exercising at home.'],rules:['likeIng','enjoyIng'],items:[
 {id:'19-1',type:'choice',prompt:'Choose the correct sentence with enjoy.',options:['I enjoy walking after work.','I enjoy to walk after work.','I enjoy walk after work.'],answer:'I enjoy walking after work.',rule:'enjoyIng'},
 {id:'19-2',type:'input',prompt:'Use walk in the -ing form: I enjoy ___ after work.',answers:['walking'],modelAnswer:'I enjoy walking after work.',rule:'enjoyIng'},
 {id:'19-3',type:'choice',prompt:'Complete: We don’t mind ___ at home.',options:['exercising','to exercise','exercise'],answer:'exercising',rule:'enjoyIng'},
 {id:'19-4',type:'order',prompt:'Build the sentence about yoga.',tokens:['yoga.','doing','I','enjoy'],answer:'I enjoy doing yoga.',rule:'enjoyIng'},
 {id:'19-5',type:'input',prompt:'Use jog in the -ing form: I like ___ in the park.',answers:['jogging'],modelAnswer:'I like jogging in the park.',rule:'likeIng'},
 {id:'19-6',type:'choice',prompt:'Choose the correct sentence with don’t mind.',options:['I don’t mind walking slowly.','I don’t mind to walk slowly.','I don’t mind walk slowly.'],answer:'I don’t mind walking slowly.',rule:'enjoyIng'},
 {id:'19-7',type:'input',prompt:'Use do in the -ing form: She enjoys ___ short workouts.',answers:['doing'],modelAnswer:'She enjoys doing short workouts.',rule:'enjoyIng'},
 {id:'19-8',type:'choice',prompt:'Complete: They enjoy ___ together.',options:['running','to run','run'],answer:'running',rule:'enjoyIng'},
 {id:'19-9',type:'order',prompt:'Build a sentence about exercising at home.',tokens:['at home.','exercising','We','enjoy'],answer:'We enjoy exercising at home.',rule:'enjoyIng'},
 {id:'19-10',type:'input',prompt:'Use swim in the -ing form: I enjoy ___ in summer.',answers:['swimming'],modelAnswer:'I enjoy swimming in summer.',rule:'enjoyIng'}
 ],listeningItems:[
 {id:'19-l1',type:'choice',prompt:'When does Anna usually walk on weekdays?',options:['After work.','Before breakfast.','At midnight.'],answer:'After work.',rule:'listen'},
 {id:'19-l2',type:'choice',prompt:'How long does Anna usually walk?',options:['About thirty minutes.','About ten minutes.','About two hours.'],answer:'About thirty minutes.',rule:'listen'},
 {id:'19-l3',type:'choice',prompt:'Where does Anna sometimes do yoga?',options:['At home.','At the gym.','At the beach.'],answer:'At home.',rule:'listen'},
 {id:'19-l4',type:'choice',prompt:'Who goes to the park with Anna on Saturdays?',options:['Her friend.','Her sister.','Her teacher.'],answer:'Her friend.',rule:'listen'},
 {id:'19-l5',type:'choice',prompt:'What exercise does Anna do in winter?',options:['Short workouts in her room.','Swimming in the sea.','Long runs outside every day.'],answer:'Short workouts in her room.',rule:'listen'}
 ],speakingSentences:['I enjoy walking after work.','We enjoy doing yoga at home.']},
 {id:'invitations',title:'l20',goal:'g20',person:'Anna',role:'Anna · invitations',audioTitle:'Invitations — Anna',audio:'audio/lesson20-invitations-anna.mp3',speakingPrompt:'Invite your partner for a walk or coffee with “Would you like to…?” Accept one invitation and politely decline another.',transcript:[
 'Hello. My name is Anna.',
 'Today I want to talk about what I would and wouldn’t like to do.',
 'When someone asks me, “Would you like to…?”, I think about my day and my mood.',
 'Would you like to go for a walk after work? Yes, I would.',
 'I like fresh air and I like to relax.',
 'Would you like to have coffee in a café? Yes, I would.',
 'I enjoy coffee and a quiet place.',
 'Would you like to go shopping for clothes? No, I wouldn’t.',
 'I don’t like crowded shops.',
 'Would you like to stay up late and watch a long movie? No, I wouldn’t, because I get tired.',
 'Would you like to have dinner at my place? Yes, I would, if it’s not too late.'
 ],vocabulary:[['invitation',''],['fresh air',''],['quiet',''],['stay up late',''],['tired',''],['mood','']],examples:['Would you like to go for a walk?','Yes, I’d love to.','No, thank you. I’m tired.'],rules:['inviteTo','inviteReply'],items:[
 {id:'20-1',type:'choice',prompt:'Choose a polite invitation to do an activity.',options:['Would you like to go for a walk?','Would you like go for a walk?','Would you like going for a walk?'],answer:'Would you like to go for a walk?',rule:'inviteTo'},
 {id:'20-2',type:'input',prompt:'Complete the invitation: Would you like ___ have coffee?',answers:['to'],modelAnswer:'Would you like to have coffee?',rule:'inviteTo'},
 {id:'20-3',type:'choice',prompt:'You want to accept an invitation. Choose the reply.',options:['Yes, I’d love to.','No, thank you.','Sorry, I’m busy.'],answer:'Yes, I’d love to.',rule:'inviteReply'},
 {id:'20-4',type:'order',prompt:'Build an invitation for coffee.',tokens:['have coffee?','to','you like','Would'],answer:'Would you like to have coffee?',rule:'inviteTo'},
 {id:'20-5',type:'input',prompt:'Complete with go: Would you like to ___ shopping?',answers:['go'],modelAnswer:'Would you like to go shopping?',rule:'inviteTo'},
 {id:'20-6',type:'choice',prompt:'You cannot accept. Choose a polite refusal.',options:['No, thank you. I’m tired.','Yes, I’d love to.','Yes, please.'],answer:'No, thank you. I’m tired.',rule:'inviteReply'},
 {id:'20-7',type:'input',prompt:'Complete the invitation: ___ you like to watch a movie?',answers:['Would'],modelAnswer:'Would you like to watch a movie?',rule:'inviteTo'},
 {id:'20-8',type:'choice',prompt:'Complete: I’d like ___ at home tonight.',options:['to relax','relaxing','relax'],answer:'to relax',rule:'inviteTo'},
 {id:'20-9',type:'order',prompt:'Build a polite refusal.',tokens:['I’m tired.','thank you.','No,'],answer:'No, thank you. I’m tired.',rule:'inviteReply'},
 {id:'20-10',type:'input',prompt:'Complete with to: Yes, I’d love ___!',answers:['to'],modelAnswer:'Yes, I’d love to!',rule:'inviteReply'}
 ],listeningItems:[
 {id:'20-l1',type:'choice',prompt:'Does Anna accept a walk after work?',options:['Yes, she does.','No, she does not.','Only on Sunday.'],answer:'Yes, she does.',rule:'listen'},
 {id:'20-l2',type:'choice',prompt:'What does Anna like about a walk?',options:['Fresh air and relaxing.','Crowded shops.','Loud music.'],answer:'Fresh air and relaxing.',rule:'listen'},
 {id:'20-l3',type:'choice',prompt:'Why does Anna refuse shopping for clothes?',options:['She dislikes crowded shops.','She has no money.','The shops are closed.'],answer:'She dislikes crowded shops.',rule:'listen'},
 {id:'20-l4',type:'choice',prompt:'Why does Anna refuse a late, long movie?',options:['She gets tired.','She dislikes all movies.','She works at a cinema.'],answer:'She gets tired.',rule:'listen'},
 {id:'20-l5',type:'choice',prompt:'When would Anna accept dinner at someone’s place?',options:['If it is not too late.','Only at midnight.','Only on her birthday.'],answer:'If it is not too late.',rule:'listen'}
 ],speakingSentences:['Would you like to have coffee?','No, thank you. I am tired.']},
 {id:'busy-tomorrow',title:'l21',goal:'g21',person:'Alex',role:'Alex · plans for tomorrow',audioTitle:'A busy day tomorrow — Alex',audio:'audio/lesson21-tomorrow-alex.mp3',speakingPrompt:'Describe three plans for tomorrow using be going to. Ask your partner: “What are you going to do tomorrow?”',transcript:[
 'Hello.','My name is Alex.','Tomorrow is going to be a busy day for me.',
 'I am going to wake up at seven o’clock.','First, I am going to take a shower and get dressed.','Then I am going to have breakfast.','I am going to drink tea and eat some toast.',
 'After breakfast, I am going to go to the bank.','I need to take some money and pay a bill.','Then I am going to go to the supermarket.','I am going to buy bread, fruit, and chicken.','I am also going to buy some water.',
 'At noon, I am going to meet my friend near the café.','We are going to have lunch together.','I am going to eat a salad, and he is going to have a sandwich.',
 'After lunch, I am going to go to the library.','I am going to return two books and get a new one.',
 'In the afternoon, I am going to clean my room.','I am going to wash the dishes and tidy my desk.','Then I am going to do my English homework.','I am going to listen to an audio and write a few answers.',
 'In the evening, I am going to cook dinner at home.','I am going to make pasta with vegetables.','After dinner, I am going to call my sister.','We are going to talk for a few minutes.',
 'Before I go to bed, I am going to prepare my clothes for the next day.','I am going to set my alarm at eleven o’clock.','Tomorrow is going to be full, but it is going to be a good day.','Thank you for listening.'
 ],vocabulary:[['bank',''],['bill',''],['noon',''],['library',''],['return',''],['alarm','']],examples:['I am going to go to the bank.','We are going to have lunch together.','What are you going to do tomorrow?'],rules:['goingTo','goingToPlans'],items:[
 {id:'21-1',type:'choice',prompt:'Choose the sentence about a plan for tomorrow.',options:['I am going to go to the bank.','I going to go to the bank.','I am going go to the bank.'],answer:'I am going to go to the bank.',rule:'goingTo'},
 {id:'21-2',type:'input',prompt:'Complete with the form of be: Alex ___ going to buy food.',answers:['is'],modelAnswer:'Alex is going to buy food.',rule:'goingTo'},
 {id:'21-3',type:'choice',prompt:'Complete: We ___ going to have lunch together.',options:['are','is','am'],answer:'are',rule:'goingTo'},
 {id:'21-4',type:'order',prompt:'Build Alex’s plan for tomorrow.',tokens:['to','the bank.','I am','going','go to'],answer:'I am going to go to the bank.',rule:'goingTo'},
 {id:'21-5',type:'input',prompt:'Use return in its base form: I am going to ___ two books.',answers:['return'],modelAnswer:'I am going to return two books.',rule:'goingTo'},
 {id:'21-6',type:'choice',prompt:'Choose the correct question about a plan.',options:['What are you going to do tomorrow?','What you are going to do tomorrow?','What do you going to do tomorrow?'],answer:'What are you going to do tomorrow?',rule:'goingTo'},
 {id:'21-7',type:'input',prompt:'Complete the negative with not: I am ___ going to eat a sandwich.',answers:['not'],modelAnswer:'I am not going to eat a sandwich.',rule:'goingTo'},
 {id:'21-8',type:'choice',prompt:'Alex decided his plans earlier. Choose the correct form.',options:['He is going to cook dinner tomorrow.','He cooks dinner yesterday.','He cooking dinner tomorrow.'],answer:'He is going to cook dinner tomorrow.',rule:'goingToPlans'},
 {id:'21-9',type:'order',prompt:'Build a question about tomorrow.',tokens:['tomorrow?','going to','Are','you','cook'],answer:'Are you going to cook tomorrow?',rule:'goingTo'},
 {id:'21-10',type:'input',prompt:'Complete the short answer: Are you going to cook? Yes, I ___.',answers:['am'],modelAnswer:'Yes, I am.',rule:'goingTo'}
 ],listeningItems:[
 {id:'21-l1',type:'choice',prompt:'What time is Alex going to wake up?',options:['At seven o’clock.','At six o’clock.','At eleven o’clock.'],answer:'At seven o’clock.',rule:'listen'},
 {id:'21-l2',type:'choice',prompt:'Where is Alex going after breakfast, before the supermarket?',options:['To the bank.','To the library.','To the park.'],answer:'To the bank.',rule:'listen'},
 {id:'21-l3',type:'choice',prompt:'Who is Alex going to meet at noon?',options:['His friend.','His sister.','His teacher.'],answer:'His friend.',rule:'listen'},
 {id:'21-l4',type:'choice',prompt:'How many books is Alex going to return?',options:['Two.','One.','Three.'],answer:'Two.',rule:'listen'},
 {id:'21-l5',type:'choice',prompt:'Who is Alex going to call after dinner?',options:['His sister.','His friend.','His mother.'],answer:'His sister.',rule:'listen'}
 ],speakingSentences:['I am going to go to the bank.','We are going to have lunch together.']}
 );
 bank.version=9;
 return bank;
}
if(typeof module==='object'&&module.exports)module.exports=extend;
else extend(root.EvoCourseBank);
})(typeof globalThis==='object'?globalThis:this);
