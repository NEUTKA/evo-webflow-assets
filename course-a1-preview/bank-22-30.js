(function(root){
'use strict';
function extend(bank){
 if(!bank||!Array.isArray(bank.lessons))throw Error('Load bank.js before bank-22-30.js');
 if(bank.lessons.some(lesson=>lesson.id==='last-weekend'))return bank;
 bank.lessons.push(...[
 {
  "id": "last-weekend",
  "person": "Anna",
  "role": "Anna · last weekend",
  "audioTitle": "Last weekend — Anna",
  "vocabulary": [
   [
    "toast",
    ""
   ],
   [
    "laundry",
    ""
   ],
   [
    "cool",
    ""
   ],
   [
    "photo",
    ""
   ],
   [
    "parents",
    ""
   ],
   [
    "prepare",
    ""
   ]
  ],
  "rules": [
   "pastBe",
   "pastForms"
  ],
  "examples": [
   "The weather was cool.",
   "I cleaned my apartment.",
   "I went to the park."
  ],
  "speakingSentences": [
   "I cleaned my apartment yesterday.",
   "The weather was cool but nice."
  ],
  "speakingPrompt": "Tell your partner three things you did last weekend. Say where you were and how you felt.",
  "items": [
   {
    "type": "choice",
    "prompt": "Complete: The weather ___ cool last Sunday.",
    "options": [
     "was",
     "were",
     "is"
    ],
    "answer": "was",
    "rule": "pastBe",
    "id": "22-1"
   },
   {
    "type": "input",
    "prompt": "Use be in the past: We ___ at home yesterday.",
    "answers": [
     "were"
    ],
    "modelAnswer": "We were at home yesterday.",
    "rule": "pastBe",
    "id": "22-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the Past Simple form of clean.",
    "options": [
     "cleaned",
     "cleans",
     "cleaning"
    ],
    "answer": "cleaned",
    "rule": "pastForms",
    "id": "22-3"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about Saturday.",
    "tokens": [
     "my apartment.",
     "I",
     "cleaned"
    ],
    "answer": "I cleaned my apartment.",
    "rule": "pastForms",
    "id": "22-4"
   },
   {
    "type": "input",
    "prompt": "Write the past form of visit: I ___ my parents yesterday.",
    "answers": [
     "visited"
    ],
    "modelAnswer": "I visited my parents yesterday.",
    "rule": "pastForms",
    "id": "22-5"
   },
   {
    "type": "choice",
    "prompt": "Write go in the past: I ___ to the park.",
    "options": [
     "went",
     "goed",
     "goes"
    ],
    "answer": "went",
    "rule": "pastForms",
    "id": "22-6"
   },
   {
    "type": "input",
    "prompt": "Write the past form of have: I ___ toast and tea.",
    "answers": [
     "had"
    ],
    "modelAnswer": "I had toast and tea.",
    "rule": "pastForms",
    "id": "22-7"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct question about the past.",
    "options": [
     "Were you at home yesterday?",
     "Was you at home yesterday?",
     "Are you at home yesterday?"
    ],
    "answer": "Were you at home yesterday?",
    "rule": "pastBe",
    "id": "22-8"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about the weather.",
    "tokens": [
     "cool",
     "The weather",
     "was",
     "but nice."
    ],
    "answer": "The weather was cool but nice.",
    "rule": "pastBe",
    "id": "22-9"
   },
   {
    "type": "input",
    "prompt": "Write the past form of watch: I ___ a movie last night.",
    "answers": [
     "watched"
    ],
    "modelAnswer": "I watched a movie last night.",
    "rule": "pastForms",
    "id": "22-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "What did Anna have for breakfast on Saturday?",
    "options": [
     "Toast and tea.",
     "Eggs and coffee.",
     "Soup and salad."
    ],
    "answer": "Toast and tea.",
    "rule": "listen",
    "id": "22-l1"
   },
   {
    "type": "choice",
    "prompt": "Where did Anna meet her friend?",
    "options": [
     "In a small café.",
     "At the bank.",
     "At the library."
    ],
    "answer": "In a small café.",
    "rule": "listen",
    "id": "22-l2"
   },
   {
    "type": "choice",
    "prompt": "What did Anna do on Saturday evening?",
    "options": [
     "Stayed home and watched a movie.",
     "Went to the theatre.",
     "Worked at a shop."
    ],
    "answer": "Stayed home and watched a movie.",
    "rule": "listen",
    "id": "22-l3"
   },
   {
    "type": "choice",
    "prompt": "What was the weather like on Sunday?",
    "options": [
     "Cool but nice.",
     "Very hot.",
     "Rainy and windy."
    ],
    "answer": "Cool but nice.",
    "rule": "listen",
    "id": "22-l4"
   },
   {
    "type": "choice",
    "prompt": "Who did Anna visit for dinner?",
    "options": [
     "Her parents.",
     "Her teacher.",
     "Her colleague."
    ],
    "answer": "Her parents.",
    "rule": "listen",
    "id": "22-l5"
   }
  ],
  "title": "l22",
  "goal": "g22",
  "audio": "audio/lesson22.mp3",
  "transcript": [
   "Hello. I’m Anna.",
   "Today I want to tell you what I did last weekend.",
   "On Saturday morning, I woke up at about eight o’clock and I made breakfast.",
   "I had toast and tea.",
   "Then I cleaned my apartment and did the laundry.",
   "In the afternoon, I went to the supermarket and bought fruit, vegetables, and bread.",
   "After that, I met my friend in a small café.",
   "We talked and drank coffee.",
   "In the evening, I stayed at home and watched a movie.",
   "On Sunday, I went for a walk in the park.",
   "The weather was cool but nice.",
   "I took some photos and listened to music.",
   "Later, I visited my parents for dinner.",
   "We ate soup and salad, and we talked a lot.",
   "Then I went home and prepared for the new week."
  ],
  "theoryExamples": [
   "The weather was cool.",
   "I cleaned my apartment and went to the park."
  ]
 },
 {
  "id": "last-summer",
  "person": "Anna",
  "role": "Anna · last summer",
  "audioTitle": "Last summer — Anna",
  "vocabulary": [
   [
    "summer",
    ""
   ],
   [
    "vacation",
    ""
   ],
   [
    "sunny",
    ""
   ],
   [
    "recipe",
    ""
   ],
   [
    "August",
    ""
   ],
   [
    "July",
    ""
   ]
  ],
  "rules": [
   "pastDid",
   "connectWords"
  ],
  "examples": [
   "Did you visit your parents?",
   "I didn’t work in July.",
   "I stayed in the city, but I had fun."
  ],
  "speakingSentences": [
   "Did you visit your parents last summer?",
   "I did not work on Sunday."
  ],
  "speakingPrompt": "Ask two questions about your partner’s last summer using Did you…? Answer with Yes, I did or No, I didn’t and a detail.",
  "items": [
   {
    "type": "choice",
    "prompt": "Choose the correct past question.",
    "options": [
     "Did you visit your parents?",
     "Did you visited your parents?",
     "Do you visited your parents?"
    ],
    "answer": "Did you visit your parents?",
    "rule": "pastDid",
    "id": "23-1"
   },
   {
    "type": "input",
    "prompt": "Complete the past question: ___ you work in June?",
    "answers": [
     "Did"
    ],
    "modelAnswer": "Did you work in June?",
    "rule": "pastDid",
    "id": "23-2"
   },
   {
    "type": "choice",
    "prompt": "Complete: I didn’t ___ at home yesterday.",
    "options": [
     "stay",
     "stayed",
     "stays"
    ],
    "answer": "stay",
    "rule": "pastDid",
    "id": "23-3"
   },
   {
    "type": "order",
    "prompt": "Build a past question.",
    "tokens": [
     "visit",
     "your parents?",
     "Did",
     "you"
    ],
    "answer": "Did you visit your parents?",
    "rule": "pastDid",
    "id": "23-4"
   },
   {
    "type": "input",
    "prompt": "Use go in its base form: I didn’t ___ to the cinema.",
    "answers": [
     "go"
    ],
    "modelAnswer": "I didn’t go to the cinema.",
    "rule": "pastDid",
    "id": "23-5"
   },
   {
    "type": "choice",
    "prompt": "Did Anna visit her parents? Choose a positive short answer.",
    "options": [
     "Yes, she did.",
     "Yes, she does.",
     "Yes, she was."
    ],
    "answer": "Yes, she did.",
    "rule": "pastDid",
    "id": "23-6"
   },
   {
    "type": "input",
    "prompt": "Complete the negative short answer: Did you work? No, I ___.",
    "answers": [
     "didn't",
     "did not"
    ],
    "modelAnswer": "No, I didn’t.",
    "rule": "pastDid",
    "id": "23-7"
   },
   {
    "type": "choice",
    "prompt": "Choose the word for a contrast: I stayed in the city, ___ I had fun.",
    "options": [
     "but",
     "because",
     "or"
    ],
    "answer": "but",
    "rule": "connectWords",
    "id": "23-8"
   },
   {
    "type": "order",
    "prompt": "Build a sentence giving a reason.",
    "tokens": [
     "because",
     "I was tired.",
     "I stayed home"
    ],
    "answer": "I stayed home because I was tired.",
    "rule": "connectWords",
    "id": "23-9"
   },
   {
    "type": "input",
    "prompt": "Use and to add an activity: We ate dinner ___ talked.",
    "answers": [
     "and"
    ],
    "modelAnswer": "We ate dinner and talked.",
    "rule": "connectWords",
    "id": "23-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "In which month did Anna work a lot?",
    "options": [
     "June.",
     "July.",
     "August."
    ],
    "answer": "June.",
    "rule": "listen",
    "id": "23-l1"
   },
   {
    "type": "choice",
    "prompt": "How long did Anna visit her parents?",
    "options": [
     "One week.",
     "Three days.",
     "Two months."
    ],
    "answer": "One week.",
    "rule": "listen",
    "id": "23-l2"
   },
   {
    "type": "choice",
    "prompt": "What did Anna do on sunny days?",
    "options": [
     "Walked in the park and took photos.",
     "Worked at a cinema.",
     "Swam in the sea."
    ],
    "answer": "Walked in the park and took photos.",
    "rule": "listen",
    "id": "23-l3"
   },
   {
    "type": "choice",
    "prompt": "What kind of movies did Anna watch in August?",
    "options": [
     "Comedies.",
     "Horror movies.",
     "Documentaries."
    ],
    "answer": "Comedies.",
    "rule": "listen",
    "id": "23-l4"
   },
   {
    "type": "choice",
    "prompt": "What did Anna try when cooking at home?",
    "options": [
     "New simple recipes.",
     "A new language.",
     "New sports."
    ],
    "answer": "New simple recipes.",
    "rule": "listen",
    "id": "23-l5"
   }
  ],
  "title": "l23",
  "goal": "g23",
  "audio": "audio/lesson23.mp3",
  "transcript": [
   "Hello. My name is Anna.",
   "Last summer was very nice.",
   "In June, I worked a lot, but in July I had a short vacation.",
   "I visited my parents for one week.",
   "We ate dinner together every day, and we talked a lot.",
   "On sunny days, I went for walks in the park and took photos.",
   "I also met my friends and we drank coffee in a small café.",
   "In August, I stayed in the city, but I did fun things.",
   "I went to the cinema two times and watched comedy movies.",
   "I also cooked at home and tried new simple recipes.",
   "Last summer was calm and happy for me."
  ],
  "theoryExamples": [
   "Did you visit your parents? I didn’t work.",
   "I stayed in the city, but I had fun."
  ]
 },
 {
  "id": "last-holiday",
  "person": "Anna",
  "role": "Anna · last holiday",
  "audioTitle": "My last holiday — Anna",
  "vocabulary": [
   [
    "holiday",
    ""
   ],
   [
    "mountain",
    ""
   ],
   [
    "lake",
    ""
   ],
   [
    "relaxed",
    ""
   ],
   [
    "email",
    ""
   ],
   [
    "outside",
    ""
   ]
  ],
  "rules": [
   "pastDid",
   "manner"
  ],
  "examples": [
   "I didn’t check emails.",
   "Did you enjoy your holiday?",
   "We walked slowly."
  ],
  "speakingSentences": [
   "I did not check emails on holiday.",
   "We walked slowly near the lake."
  ],
  "speakingPrompt": "Describe your last holiday. Say where you went and who travelled with you. Ask: “Did you enjoy your holiday?”",
  "items": [
   {
    "type": "choice",
    "prompt": "Choose the correct negative in the past.",
    "options": [
     "I didn’t check emails.",
     "I didn’t checked emails.",
     "I don’t checked emails."
    ],
    "answer": "I didn’t check emails.",
    "rule": "pastDid",
    "id": "24-1"
   },
   {
    "type": "input",
    "prompt": "Use buy in its base form: Did you ___ fruit?",
    "answers": [
     "buy"
    ],
    "modelAnswer": "Did you buy fruit?",
    "rule": "pastDid",
    "id": "24-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the question about a past trip.",
    "options": [
     "Where did you go?",
     "Where did you went?",
     "Where do you went?"
    ],
    "answer": "Where did you go?",
    "rule": "pastDid",
    "id": "24-3"
   },
   {
    "type": "order",
    "prompt": "Build a question about a holiday.",
    "tokens": [
     "enjoy",
     "Did",
     "your holiday?",
     "you"
    ],
    "answer": "Did you enjoy your holiday?",
    "rule": "pastDid",
    "id": "24-4"
   },
   {
    "type": "input",
    "prompt": "Write the adverb formed from slow: We walked ___.",
    "answers": [
     "slowly"
    ],
    "modelAnswer": "We walked slowly.",
    "rule": "manner",
    "id": "24-5"
   },
   {
    "type": "choice",
    "prompt": "Complete: She is a careful driver. She drives ___.",
    "options": [
     "carefully",
     "careful",
     "care"
    ],
    "answer": "carefully",
    "rule": "manner",
    "id": "24-6"
   },
   {
    "type": "input",
    "prompt": "Use the adverb formed from quiet: We talked ___.",
    "answers": [
     "quietly"
    ],
    "modelAnswer": "We talked quietly.",
    "rule": "manner",
    "id": "24-7"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct adverb: He is a good cook. He cooks ___.",
    "options": [
     "well",
     "good",
     "goodly"
    ],
    "answer": "well",
    "rule": "manner",
    "id": "24-8"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about walking.",
    "tokens": [
     "slowly",
     "We",
     "walked",
     "near the lake."
    ],
    "answer": "We walked slowly near the lake.",
    "rule": "manner",
    "id": "24-9"
   },
   {
    "type": "input",
    "prompt": "Complete with did: ___ you stay for three days?",
    "answers": [
     "Did"
    ],
    "modelAnswer": "Did you stay for three days?",
    "rule": "pastDid",
    "id": "24-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "When was Anna’s last holiday?",
    "options": [
     "In July.",
     "In June.",
     "In December."
    ],
    "answer": "In July.",
    "rule": "listen",
    "id": "24-l1"
   },
   {
    "type": "choice",
    "prompt": "Who went on holiday with Anna?",
    "options": [
     "Her sister.",
     "Her brother.",
     "Her parents."
    ],
    "answer": "Her sister.",
    "rule": "listen",
    "id": "24-l2"
   },
   {
    "type": "choice",
    "prompt": "How long did they stay?",
    "options": [
     "Three days.",
     "One week.",
     "Two weeks."
    ],
    "answer": "Three days.",
    "rule": "listen",
    "id": "24-l3"
   },
   {
    "type": "choice",
    "prompt": "Where did they go in the afternoon?",
    "options": [
     "To a lake.",
     "To a theatre.",
     "To a bank."
    ],
    "answer": "To a lake.",
    "rule": "listen",
    "id": "24-l4"
   },
   {
    "type": "choice",
    "prompt": "Which activity did Anna NOT do on holiday?",
    "options": [
     "Check emails.",
     "Take photos.",
     "Visit a market."
    ],
    "answer": "Check emails.",
    "rule": "listen",
    "id": "24-l5"
   }
  ],
  "title": "l24",
  "goal": "g24",
  "audio": "audio/lesson24.mp3",
  "transcript": [
   "Hi. My name is Anna.",
   "My last holiday was in July.",
   "I went to a small town near the mountains with my sister.",
   "We stayed there for three days.",
   "The weather was warm and sunny, so we walked a lot.",
   "In the morning, we had breakfast in a little café.",
   "I ate eggs and bread, and I drank coffee.",
   "Then we visited a small market and bought fruit.",
   "In the afternoon, we went to a lake and took many photos.",
   "In the evening, we sat outside and talked.",
   "I felt relaxed and happy.",
   "I didn’t work or check emails.",
   "It was a short holiday, but it was very nice."
  ],
  "theoryExamples": [
   "Did you go to the lake? I didn’t check emails.",
   "We walked slowly. He cooks well."
  ]
 },
 {
  "id": "comparing-cars",
  "person": "Mike",
  "role": "Mike · choosing a car",
  "audioTitle": "Comparing cars — Mike",
  "vocabulary": [
   [
    "reliable",
    ""
   ],
   [
    "petrol",
    ""
   ],
   [
    "expensive",
    ""
   ],
   [
    "cheap",
    ""
   ],
   [
    "repair",
    ""
   ],
   [
    "price",
    ""
   ]
  ],
  "rules": [
   "compareAdj",
   "superlative",
   "willFuture"
  ],
  "examples": [
   "This car is cheaper than that one.",
   "Of three cars, this is the cheapest.",
   "I think I will choose the Toyota."
  ],
  "speakingSentences": [
   "This car is cheaper than that one.",
   "I think I will choose the Toyota."
  ],
  "speakingPrompt": "Compare two cars or other items using cheaper and more expensive. Choose one and say: “I think I will choose…”",
  "items": [
   {
    "type": "choice",
    "prompt": "Complete: Car A costs less. It is ___ than Car B.",
    "options": [
     "cheaper",
     "cheapest",
     "cheap"
    ],
    "answer": "cheaper",
    "rule": "compareAdj",
    "id": "25-1"
   },
   {
    "type": "input",
    "prompt": "Write the comparative of expensive: Car B is ___ than Car A.",
    "answers": [
     "more expensive"
    ],
    "modelAnswer": "Car B is more expensive than Car A.",
    "rule": "compareAdj",
    "id": "25-2"
   },
   {
    "type": "choice",
    "prompt": "Complete: This car is better ___ that car.",
    "options": [
     "than",
     "then",
     "that"
    ],
    "answer": "than",
    "rule": "compareAdj",
    "id": "25-3"
   },
   {
    "type": "order",
    "prompt": "Build a comparison.",
    "tokens": [
     "than",
     "This car",
     "that one.",
     "is cheaper"
    ],
    "answer": "This car is cheaper than that one.",
    "rule": "compareAdj",
    "id": "25-4"
   },
   {
    "type": "input",
    "prompt": "Write the superlative of cheap: Of three cars, this is the ___.",
    "answers": [
     "cheapest"
    ],
    "modelAnswer": "Of three cars, this is the cheapest.",
    "rule": "superlative",
    "id": "25-5"
   },
   {
    "type": "choice",
    "prompt": "A costs $10,000, B $12,000, C $15,000. Choose a true statement.",
    "options": [
     "A is the cheapest car.",
     "B is the cheapest car.",
     "C is the cheapest car."
    ],
    "answer": "A is the cheapest car.",
    "rule": "superlative",
    "id": "25-6"
   },
   {
    "type": "input",
    "prompt": "Write the superlative of good: Of all these cars, this is the ___.",
    "answers": [
     "best"
    ],
    "modelAnswer": "Of all these cars, this is the best.",
    "rule": "superlative",
    "id": "25-7"
   },
   {
    "type": "choice",
    "prompt": "Complete the prediction: I think this car ___ last for years.",
    "options": [
     "will",
     "does",
     "did"
    ],
    "answer": "will",
    "rule": "willFuture",
    "id": "25-8"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about a decision.",
    "tokens": [
     "choose",
     "I will",
     "the Toyota."
    ],
    "answer": "I will choose the Toyota.",
    "rule": "willFuture",
    "id": "25-9"
   },
   {
    "type": "input",
    "prompt": "Complete with will: I think I ___ choose the Toyota.",
    "answers": [
     "will"
    ],
    "modelAnswer": "I think I will choose the Toyota.",
    "rule": "willFuture",
    "id": "25-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "What does Mike want to buy?",
    "options": [
     "A car.",
     "A bicycle.",
     "A phone."
    ],
    "answer": "A car.",
    "rule": "listen",
    "id": "25-l1"
   },
   {
    "type": "choice",
    "prompt": "Which two brands does Mike compare?",
    "options": [
     "Toyota and Nissan.",
     "Ford and Honda.",
     "BMW and Audi."
    ],
    "answer": "Toyota and Nissan.",
    "rule": "listen",
    "id": "25-l2"
   },
   {
    "type": "choice",
    "prompt": "What does Mike say about Toyota cars?",
    "options": [
     "They are usually reliable.",
     "They always break.",
     "They use no petrol."
    ],
    "answer": "They are usually reliable.",
    "rule": "listen",
    "id": "25-l3"
   },
   {
    "type": "choice",
    "prompt": "What price advantage can Nissan have?",
    "options": [
     "It can be cheaper.",
     "It is always free.",
     "It is always more expensive."
    ],
    "answer": "It can be cheaper.",
    "rule": "listen",
    "id": "25-l4"
   },
   {
    "type": "choice",
    "prompt": "Which car does Mike think he will choose?",
    "options": [
     "The Toyota.",
     "The Nissan.",
     "Neither car."
    ],
    "answer": "The Toyota.",
    "rule": "listen",
    "id": "25-l5"
   }
  ],
  "title": "l25",
  "goal": "g25",
  "audio": "audio/lesson25.mp3",
  "transcript": [
   "Hello. My name is Mike, and I want to buy a car.",
   "Now I am choosing between a Toyota and a Nissan.",
   "First, I think about Toyota.",
   "Toyota cars are usually very reliable. They don’t break often.",
   "The fuel economy is good, so I can save money on petrol.",
   "Also, many people say Toyota is easy to sell later.",
   "But Toyota can be more expensive, and some models feel a little simple inside.",
   "Now I think about Nissan.",
   "Nissan can be cheaper, and I can get more options for the same price.",
   "Some Nissan cars are comfortable, and the design looks modern.",
   "But I hear that some Nissan models can have more repairs.",
   "I also worry about higher service costs.",
   "So I ask myself: what is more important—price or reliability?",
   "I think I will choose the Toyota, because I want a car that works well for many years."
  ],
  "theoryExamples": [
   "This car is cheaper than that one.",
   "Of three cars, this is the cheapest.",
   "I think I will choose the Toyota."
  ]
 },
 {
  "id": "favourite-kitchen",
  "person": "Anna",
  "role": "Anna · favourite room",
  "audioTitle": "My favourite room — Anna",
  "vocabulary": [
   [
    "kitchen",
    ""
   ],
   [
    "fridge",
    ""
   ],
   [
    "cooker",
    ""
   ],
   [
    "microwave",
    ""
   ],
   [
    "cupboard",
    ""
   ],
   [
    "counter",
    ""
   ]
  ],
  "rules": [
   "haveGot",
   "thisIt",
   "ownerS"
  ],
  "examples": [
   "Anna has got a small kitchen.",
   "This is my kitchen. It is bright.",
   "Anna’s kitchen is clean."
  ],
  "speakingSentences": [
   "This is my kitchen. It is bright.",
   "Anna has got a small kitchen."
  ],
  "speakingPrompt": "Introduce a nearby object with This is… Then describe it with It is… Say what you have got in your favourite room.",
  "items": [
   {
    "type": "choice",
    "prompt": "Complete: Anna ___ got a small kitchen.",
    "options": [
     "has",
     "have",
     "is"
    ],
    "answer": "has",
    "rule": "haveGot",
    "id": "26-1"
   },
   {
    "type": "input",
    "prompt": "Complete with have: I ___ got a fridge.",
    "answers": [
     "have"
    ],
    "modelAnswer": "I have got a fridge.",
    "rule": "haveGot",
    "id": "26-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct question with have got.",
    "options": [
     "Has Anna got a microwave?",
     "Have Anna got a microwave?",
     "Does Anna has got a microwave?"
    ],
    "answer": "Has Anna got a microwave?",
    "rule": "haveGot",
    "id": "26-3"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about Anna’s kitchen.",
    "tokens": [
     "got",
     "Anna",
     "a kitchen.",
     "has"
    ],
    "answer": "Anna has got a kitchen.",
    "rule": "haveGot",
    "id": "26-4"
   },
   {
    "type": "input",
    "prompt": "Use this to introduce a nearby object: ___ is my fridge.",
    "answers": [
     "This"
    ],
    "modelAnswer": "This is my fridge.",
    "rule": "thisIt",
    "id": "26-5"
   },
   {
    "type": "choice",
    "prompt": "Refer back to the kitchen: This is my kitchen. ___ is bright.",
    "options": [
     "It",
     "He",
     "They"
    ],
    "answer": "It",
    "rule": "thisIt",
    "id": "26-6"
   },
   {
    "type": "input",
    "prompt": "Show ownership with ’s: This is ___ kitchen. (Anna)",
    "answers": [
     "Anna's",
     "Anna’s"
    ],
    "modelAnswer": "This is Anna’s kitchen.",
    "rule": "ownerS",
    "id": "26-7"
   },
   {
    "type": "choice",
    "prompt": "Choose the sentence showing that the kitchen belongs to Anna.",
    "options": [
     "Anna’s kitchen is clean.",
     "Anna kitchen is clean.",
     "Annas kitchen is clean."
    ],
    "answer": "Anna’s kitchen is clean.",
    "rule": "ownerS",
    "id": "26-8"
   },
   {
    "type": "order",
    "prompt": "Build two sentences introducing a room.",
    "tokens": [
     "It is bright.",
     "my kitchen.",
     "This is"
    ],
    "answer": "This is my kitchen. It is bright.",
    "rule": "thisIt",
    "id": "26-9"
   },
   {
    "type": "input",
    "prompt": "Complete the negative with not: She has ___ got a dishwasher.",
    "answers": [
     "not"
    ],
    "modelAnswer": "She has not got a dishwasher.",
    "rule": "haveGot",
    "id": "26-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "What is Anna’s favourite room?",
    "options": [
     "Her kitchen.",
     "Her bedroom.",
     "Her bathroom."
    ],
    "answer": "Her kitchen.",
    "rule": "listen",
    "id": "26-l1"
   },
   {
    "type": "choice",
    "prompt": "Where is the little table?",
    "options": [
     "Near the window.",
     "Behind the fridge.",
     "Outside the house."
    ],
    "answer": "Near the window.",
    "rule": "listen",
    "id": "26-l2"
   },
   {
    "type": "choice",
    "prompt": "Which appliances does Anna mention?",
    "options": [
     "A fridge, a cooker and a microwave.",
     "A TV, a printer and a computer.",
     "A dishwasher and a washing machine."
    ],
    "answer": "A fridge, a cooker and a microwave.",
    "rule": "listen",
    "id": "26-l3"
   },
   {
    "type": "choice",
    "prompt": "Where are Anna’s dishes?",
    "options": [
     "In a white cupboard.",
     "On the floor.",
     "Under the table."
    ],
    "answer": "In a white cupboard.",
    "rule": "listen",
    "id": "26-l4"
   },
   {
    "type": "choice",
    "prompt": "What do Anna and her friends drink in the kitchen?",
    "options": [
     "Tea.",
     "Lemonade.",
     "Milk."
    ],
    "answer": "Tea.",
    "rule": "listen",
    "id": "26-l5"
   }
  ],
  "title": "l26",
  "goal": "g26",
  "audio": "audio/lesson26.mp3",
  "transcript": [
   "Hello. My name is Anna.",
   "My favourite room is my kitchen.",
   "It is small, but it is bright and clean.",
   "In the morning, I make coffee there and eat breakfast.",
   "I have a little table near the window, and I like to sit there.",
   "I also cook simple food in my kitchen, like pasta, soup, and eggs.",
   "I have a fridge, a cooker, and a microwave.",
   "My dishes are in a white cupboard.",
   "I keep fruit on the counter, so the kitchen looks nice.",
   "When I have free time, I listen to music and cook slowly.",
   "Sometimes my friends visit, and we drink tea in the kitchen.",
   "It is a warm room, and I feel relaxed there."
  ],
  "theoryExamples": [
   "Anna has got a small kitchen.",
   "This is my kitchen. It is bright.",
   "Anna’s kitchen is clean."
  ]
 },
 {
  "id": "trainer-job",
  "person": "Maria",
  "role": "Maria · fitness trainer",
  "audioTitle": "A fitness trainer’s job — Maria",
  "vocabulary": [
   [
    "trainer",
    ""
   ],
   [
    "gym",
    ""
   ],
   [
    "client",
    ""
   ],
   [
    "stretching",
    ""
   ],
   [
    "repetition",
    ""
   ],
   [
    "progress",
    ""
   ]
  ],
  "rules": [
   "canAbility",
   "imperatives",
   "objectPronouns"
  ],
  "examples": [
   "I can help you.",
   "Drink water. Don’t run here.",
   "Let’s stretch. The trainer helps us."
  ],
  "speakingSentences": [
   "I can help you with this exercise.",
   "Please drink water after your workout."
  ],
  "speakingPrompt": "Play the trainer. Give two short instructions and suggest an activity with Let’s… Ask your partner: “Can you do this exercise?”",
  "items": [
   {
    "type": "choice",
    "prompt": "Complete: Maria can ___ people.",
    "options": [
     "help",
     "helps",
     "to help"
    ],
    "answer": "help",
    "rule": "canAbility",
    "id": "27-1"
   },
   {
    "type": "input",
    "prompt": "Complete a question about ability: ___ you swim?",
    "answers": [
     "Can"
    ],
    "modelAnswer": "Can you swim?",
    "rule": "canAbility",
    "id": "27-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct negative about ability.",
    "options": [
     "I can’t run fast.",
     "I don’t can run fast.",
     "I can’t to run fast."
    ],
    "answer": "I can’t run fast.",
    "rule": "canAbility",
    "id": "27-3"
   },
   {
    "type": "order",
    "prompt": "Build a request for help.",
    "tokens": [
     "help",
     "Can",
     "me?",
     "you"
    ],
    "answer": "Can you help me?",
    "rule": "canAbility",
    "id": "27-4"
   },
   {
    "type": "input",
    "prompt": "Use drink to give an instruction: ___ water after exercise.",
    "answers": [
     "Drink"
    ],
    "modelAnswer": "Drink water after exercise.",
    "rule": "imperatives",
    "id": "27-5"
   },
   {
    "type": "choice",
    "prompt": "Give a negative instruction: ___ run here.",
    "options": [
     "Don’t",
     "Doesn’t",
     "Not to"
    ],
    "answer": "Don’t",
    "rule": "imperatives",
    "id": "27-6"
   },
   {
    "type": "input",
    "prompt": "Complete a suggestion: Let’s ___ a break. (take)",
    "answers": [
     "take"
    ],
    "modelAnswer": "Let’s take a break.",
    "rule": "imperatives",
    "id": "27-7"
   },
   {
    "type": "choice",
    "prompt": "Replace the students with an object pronoun: Maria helps ___.",
    "options": [
     "them",
     "they",
     "their"
    ],
    "answer": "them",
    "rule": "objectPronouns",
    "id": "27-8"
   },
   {
    "type": "order",
    "prompt": "Build a sentence with an object pronoun.",
    "tokens": [
     "helps",
     "The trainer",
     "us."
    ],
    "answer": "The trainer helps us.",
    "rule": "objectPronouns",
    "id": "27-9"
   },
   {
    "type": "input",
    "prompt": "Use the object form of I: Can you help ___?",
    "answers": [
     "me"
    ],
    "modelAnswer": "Can you help me?",
    "rule": "objectPronouns",
    "id": "27-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "What is Maria’s job?",
    "options": [
     "Fitness trainer.",
     "Nurse.",
     "Shop assistant."
    ],
    "answer": "Fitness trainer.",
    "rule": "listen",
    "id": "27-l1"
   },
   {
    "type": "choice",
    "prompt": "What time does Maria start work?",
    "options": [
     "At eight in the morning.",
     "At six in the evening.",
     "At noon."
    ],
    "answer": "At eight in the morning.",
    "rule": "listen",
    "id": "27-l2"
   },
   {
    "type": "choice",
    "prompt": "How many people does Maria usually train before lunch?",
    "options": [
     "Two or three.",
     "Ten or twelve.",
     "Only one each week."
    ],
    "answer": "Two or three.",
    "rule": "listen",
    "id": "27-l3"
   },
   {
    "type": "choice",
    "prompt": "What does Maria teach in the afternoon?",
    "options": [
     "A group class.",
     "A cooking class.",
     "A language class."
    ],
    "answer": "A group class.",
    "rule": "listen",
    "id": "27-l4"
   },
   {
    "type": "choice",
    "prompt": "What time does Maria finish work?",
    "options": [
     "At six in the evening.",
     "At eight in the morning.",
     "At midnight."
    ],
    "answer": "At six in the evening.",
    "rule": "listen",
    "id": "27-l5"
   }
  ],
  "title": "l27",
  "goal": "g27",
  "audio": "audio/lesson27.mp3",
  "transcript": [
   "Hi. My name is Maria. I am a fitness trainer. I work at a gym in my city. I like my job because I help people feel strong and healthy.",
   "I start work at eight o’clock in the morning. First, I open the training room and turn on the music. Then I check the schedule and get ready for my first client. I usually train two or three people before lunch.",
   "In my job, I show exercises and I watch people carefully. I tell them how to stand and how to move. I also count the repetitions: one, two, three. Sometimes my clients feel tired, so I say, “Good job! One more!” I always try to be friendly and positive.",
   "In the afternoon, I teach a group class. It is usually a simple class, like stretching or cardio. After the class, I answer questions and give small advice. For example, I tell people to drink water, sleep well, and eat healthy food.",
   "In the evening, I finish work at six. I feel tired, but I feel happy. I love my job because I see progress every week."
  ],
  "theoryExamples": [
   "I can help you.",
   "Drink water. Don’t run here. Let’s stretch.",
   "The trainer helps us."
  ]
 },
 {
  "id": "activity-habits",
  "person": "Mark",
  "role": "Mark · activities and habits",
  "audioTitle": "How often I do activities — Mark",
  "vocabulary": [
   [
    "rarely",
    ""
   ],
   [
    "shopping center",
    ""
   ],
   [
    "running",
    ""
   ],
   [
    "cup",
    ""
   ],
   [
    "eat out",
    ""
   ],
   [
    "Italian",
    ""
   ]
  ],
  "rules": [
   "verbTo",
   "simpleOrNow"
  ],
  "examples": [
   "I want to stay active.",
   "I enjoy running.",
   "I exercise every week. I am running now."
  ],
  "speakingSentences": [
   "I want to stay active every day.",
   "I am running in the park now."
  ],
  "speakingPrompt": "Describe a regular activity and an activity happening now. Say one thing you want to do and one thing you enjoy doing.",
  "items": [
   {
    "type": "choice",
    "prompt": "Complete: I want ___ active.",
    "options": [
     "to stay",
     "staying",
     "stay"
    ],
    "answer": "to stay",
    "rule": "verbTo",
    "id": "28-1"
   },
   {
    "type": "input",
    "prompt": "Complete with to: I need ___ buy food.",
    "answers": [
     "to"
    ],
    "modelAnswer": "I need to buy food.",
    "rule": "verbTo",
    "id": "28-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct sentence.",
    "options": [
     "I enjoy trying different food.",
     "I enjoy to try different food.",
     "I enjoy try different food."
    ],
    "answer": "I enjoy trying different food.",
    "rule": "enjoyIng",
    "id": "28-3"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about a wish.",
    "tokens": [
     "stay active.",
     "want",
     "I",
     "to"
    ],
    "answer": "I want to stay active.",
    "rule": "verbTo",
    "id": "28-4"
   },
   {
    "type": "input",
    "prompt": "Use drink in the Present Simple: I ___ coffee every day.",
    "answers": [
     "drink"
    ],
    "modelAnswer": "I drink coffee every day.",
    "rule": "simpleOrNow",
    "id": "28-5"
   },
   {
    "type": "choice",
    "prompt": "Choose the sentence about something happening right now.",
    "options": [
     "I am drinking coffee now.",
     "I drink coffee every day.",
     "I drank coffee yesterday."
    ],
    "answer": "I am drinking coffee now.",
    "rule": "simpleOrNow",
    "id": "28-6"
   },
   {
    "type": "input",
    "prompt": "Use run in the Present Continuous: I ___ in the park now.",
    "answers": [
     "am running",
     "'m running"
    ],
    "modelAnswer": "I am running in the park now.",
    "rule": "simpleOrNow",
    "id": "28-7"
   },
   {
    "type": "choice",
    "prompt": "Complete: She usually ___ tea on weekends.",
    "options": [
     "drinks",
     "is drinking",
     "drink"
    ],
    "answer": "drinks",
    "rule": "simpleOrNow",
    "id": "28-8"
   },
   {
    "type": "order",
    "prompt": "Build a sentence about an action now.",
    "tokens": [
     "coffee",
     "I am",
     "drinking",
     "now."
    ],
    "answer": "I am drinking coffee now.",
    "rule": "simpleOrNow",
    "id": "28-9"
   },
   {
    "type": "input",
    "prompt": "Complete with to: I’d like ___ try Italian food.",
    "answers": [
     "to"
    ],
    "modelAnswer": "I’d like to try Italian food.",
    "rule": "verbTo",
    "id": "28-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "How often does Mark usually go shopping?",
    "options": [
     "Once a week.",
     "Every day.",
     "Once a year."
    ],
    "answer": "Once a week.",
    "rule": "listen",
    "id": "28-l1"
   },
   {
    "type": "choice",
    "prompt": "When does Mark often go to the supermarket?",
    "options": [
     "Monday evening.",
     "Sunday morning.",
     "Friday afternoon."
    ],
    "answer": "Monday evening.",
    "rule": "listen",
    "id": "28-l2"
   },
   {
    "type": "choice",
    "prompt": "How often does Mark usually exercise?",
    "options": [
     "Two or three times a week.",
     "Once a month.",
     "Never."
    ],
    "answer": "Two or three times a week.",
    "rule": "listen",
    "id": "28-l3"
   },
   {
    "type": "choice",
    "prompt": "How long does Mark run?",
    "options": [
     "About forty minutes.",
     "About ten minutes.",
     "About two hours."
    ],
    "answer": "About forty minutes.",
    "rule": "listen",
    "id": "28-l4"
   },
   {
    "type": "choice",
    "prompt": "How often does Mark drink coffee?",
    "options": [
     "Every day.",
     "Only on weekends.",
     "Never."
    ],
    "answer": "Every day.",
    "rule": "listen",
    "id": "28-l5"
   }
  ],
  "title": "l28",
  "goal": "g28",
  "audio": "audio/lesson28.mp3",
  "transcript": [
   "Hello.",
   "My name is Mark.",
   "Today I want to talk about my daily life and how often I do some activities.",
   "First, shopping.",
   "I usually go shopping once a week.",
   "I often go to the supermarket on Monday evening.",
   "I buy food for the next few days.",
   "I rarely go shopping on weekends because the shops are very busy.",
   "I don’t buy clothes very often.",
   "When I need new clothes, I sometimes go to a shopping center near my home.",
   "Now, exercise.",
   "I like to stay active.",
   "I usually exercise two or three times a week.",
   "I often go running in the park near my house.",
   "I run for about forty minutes and listen to music while I run.",
   "On Fridays, I sometimes play football with my friends.",
   "We meet after work in the evening.",
   "It is fun and helps me relax.",
   "Let me talk about drinks.",
   "I drink coffee every day.",
   "I always have one cup in the morning.",
   "Sometimes I drink another coffee at work.",
   "I like tea too, but I don’t drink it very often.",
   "I usually drink tea on weekends.",
   "I also want to talk about my family.",
   "I talk to my mum very often.",
   "She usually calls me first.",
   "Sometimes we speak every day, and sometimes only a few times a week.",
   "Finally, eating out.",
   "I don’t eat out every day.",
   "I usually eat at home during the week.",
   "On weekends, I often go to a café or restaurant.",
   "I like trying different food, especially Italian and Asian food.",
   "That’s a little about my life and how often I do different things.",
   "Thank you for listening."
  ],
  "theoryExamples": [
   "I want to stay active. I enjoy running.",
   "I run every week. I am running now."
  ]
 },
 {
  "id": "schools",
  "person": "Anna",
  "role": "Anna · schools in the U.S.",
  "audioTitle": "Schools in the United States — Anna",
  "vocabulary": [
   [
    "public school",
    ""
   ],
   [
    "elementary school",
    ""
   ],
   [
    "math",
    ""
   ],
   [
    "science",
    ""
   ],
   [
    "art",
    ""
   ],
   [
    "club",
    ""
   ]
  ],
  "rules": [
   "someAny",
   "quantity"
  ],
  "examples": [
   "There are some books.",
   "There isn’t any homework today.",
   "How many students are there?"
  ],
  "speakingSentences": [
   "There are some books on the desk.",
   "How many students are in your class?"
  ],
  "speakingPrompt": "Talk about a school or class you know. Ask a How many question about students or books and a How much question about homework.",
  "items": [
   {
    "type": "choice",
    "prompt": "Complete an affirmative sentence: There are ___ books on the desk.",
    "options": [
     "some",
     "any",
     "a"
    ],
    "answer": "some",
    "rule": "someAny",
    "id": "29-1"
   },
   {
    "type": "input",
    "prompt": "Use any in this negative: There isn’t ___ homework today.",
    "answers": [
     "any"
    ],
    "modelAnswer": "There isn’t any homework today.",
    "rule": "someAny",
    "id": "29-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the question with the correct noun form.",
    "options": [
     "How much homework do you have?",
     "How many homework do you have?",
     "How much homeworks do you have?"
    ],
    "answer": "How much homework do you have?",
    "rule": "quantity",
    "id": "29-3"
   },
   {
    "type": "order",
    "prompt": "Build a question about the number of students.",
    "tokens": [
     "students",
     "How many",
     "are there?"
    ],
    "answer": "How many students are there?",
    "rule": "quantity",
    "id": "29-4"
   },
   {
    "type": "input",
    "prompt": "Use many for countable books: How ___ books have you got?",
    "answers": [
     "many"
    ],
    "modelAnswer": "How many books have you got?",
    "rule": "quantity",
    "id": "29-5"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct phrase for uncountable water.",
    "options": [
     "a little water",
     "a few water",
     "a water"
    ],
    "answer": "a little water",
    "rule": "quantity",
    "id": "29-6"
   },
   {
    "type": "input",
    "prompt": "Use some in the affirmative: We have ___ water.",
    "answers": [
     "some"
    ],
    "modelAnswer": "We have some water.",
    "rule": "someAny",
    "id": "29-7"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct phrase for countable pencils.",
    "options": [
     "a few pencils",
     "a little pencils",
     "much pencils"
    ],
    "answer": "a few pencils",
    "rule": "quantity",
    "id": "29-8"
   },
   {
    "type": "order",
    "prompt": "Build a negative sentence about homework.",
    "tokens": [
     "any homework.",
     "We",
     "don’t have"
    ],
    "answer": "We don’t have any homework.",
    "rule": "someAny",
    "id": "29-9"
   },
   {
    "type": "input",
    "prompt": "Complete with a: I have ___ book in my bag.",
    "answers": [
     "a"
    ],
    "modelAnswer": "I have a book in my bag.",
    "rule": "someAny",
    "id": "29-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "What does Anna say about public schools?",
    "options": [
     "They are free.",
     "They are only for adults.",
     "They open only at night."
    ],
    "answer": "They are free.",
    "rule": "listen",
    "id": "29-l1"
   },
   {
    "type": "choice",
    "prompt": "At about what age do children usually start school?",
    "options": [
     "Five.",
     "Ten.",
     "Fifteen."
    ],
    "answer": "Five.",
    "rule": "listen",
    "id": "29-l2"
   },
   {
    "type": "choice",
    "prompt": "Which school do children go to first?",
    "options": [
     "Elementary school.",
     "University.",
     "High school."
    ],
    "answer": "Elementary school.",
    "rule": "listen",
    "id": "29-l3"
   },
   {
    "type": "choice",
    "prompt": "Which subjects does Anna mention?",
    "options": [
     "Reading, writing, math and science.",
     "Only sports and cooking.",
     "Only driving and business."
    ],
    "answer": "Reading, writing, math and science.",
    "rule": "listen",
    "id": "29-l4"
   },
   {
    "type": "choice",
    "prompt": "What do some children do after school?",
    "options": [
     "Sports or clubs.",
     "Work at a bank.",
     "Teach at university."
    ],
    "answer": "Sports or clubs.",
    "rule": "listen",
    "id": "29-l5"
   }
  ],
  "title": "l29",
  "goal": "g29",
  "audio": "audio/lesson29.mp3",
  "transcript": [
   "Hi, I’m Anna. In the United States, many children go to public school.",
   "Public schools are free. Children usually start school at about five years old.",
   "They go to elementary school first.",
   "In elementary school, students learn reading, writing, math, and science.",
   "They also have art and music.",
   "School usually starts in the morning, around 8:00, and finishes in the afternoon.",
   "Many students eat lunch at school.",
   "After school, some children do sports or join clubs.",
   "I think schools in the U.S. are busy, but they can be fun and friendly too."
  ],
  "theoryExamples": [
   "There are some books. There isn’t any homework.",
   "How many books? How much water?"
  ]
 },
 {
  "id": "cinema-finale",
  "person": "Anna",
  "role": "Anna · cinema in New York",
  "audioTitle": "Cinema in New York — Anna",
  "vocabulary": [
   [
    "cinema",
    ""
   ],
   [
    "theatre",
    ""
   ],
   [
    "screen",
    ""
   ],
   [
    "seat",
    ""
   ],
   [
    "popcorn",
    ""
   ],
   [
    "scene",
    ""
   ]
  ],
  "rules": [
   "willFuture",
   "connectWords",
   "compareAdj"
  ],
  "examples": [
   "I’ll buy the tickets.",
   "Shall we watch a comedy?",
   "The tickets are cheaper in the afternoon."
  ],
  "speakingSentences": [
   "I will buy the tickets for us.",
   "Shall we watch a comedy tonight?"
  ],
  "speakingPrompt": "Plan a cinema visit with your partner. Offer to buy the tickets with I’ll… Suggest a movie with Shall we…? Explain your choice with because.",
  "items": [
   {
    "type": "choice",
    "prompt": "You decide now to buy the tickets. Choose the sentence.",
    "options": [
     "I’ll buy the tickets.",
     "I’ll buying the tickets.",
     "I’ll to buy the tickets."
    ],
    "answer": "I’ll buy the tickets.",
    "rule": "willFuture",
    "id": "30-1"
   },
   {
    "type": "input",
    "prompt": "Use buy in its base form: I will ___ the tickets.",
    "answers": [
     "buy"
    ],
    "modelAnswer": "I will buy the tickets.",
    "rule": "willFuture",
    "id": "30-2"
   },
   {
    "type": "choice",
    "prompt": "Choose the correct future negative.",
    "options": [
     "I won’t be late.",
     "I won’t to be late.",
     "I don’t will be late."
    ],
    "answer": "I won’t be late.",
    "rule": "willFuture",
    "id": "30-3"
   },
   {
    "type": "order",
    "prompt": "Build an offer to buy tickets.",
    "tokens": [
     "the tickets.",
     "I will",
     "buy"
    ],
    "answer": "I will buy the tickets.",
    "rule": "willFuture",
    "id": "30-4"
   },
   {
    "type": "input",
    "prompt": "Complete a suggestion: ___ we watch a comedy?",
    "answers": [
     "Shall"
    ],
    "modelAnswer": "Shall we watch a comedy?",
    "rule": "willFuture",
    "id": "30-5"
   },
   {
    "type": "choice",
    "prompt": "Complete the reason: I like comedies ___ they are funny.",
    "options": [
     "because",
     "but",
     "or"
    ],
    "answer": "because",
    "rule": "connectWords",
    "id": "30-6"
   },
   {
    "type": "input",
    "prompt": "Write the comparative of cheap: Afternoon tickets are ___.",
    "answers": [
     "cheaper"
    ],
    "modelAnswer": "Afternoon tickets are cheaper.",
    "rule": "compareAdj",
    "id": "30-7"
   },
   {
    "type": "choice",
    "prompt": "Two seats: A costs $5, B costs $10. Choose the true comparison.",
    "options": [
     "Seat A is cheaper than seat B.",
     "Seat B is cheaper than seat A.",
     "Seat A is more expensive than seat B."
    ],
    "answer": "Seat A is cheaper than seat B.",
    "rule": "compareAdj",
    "id": "30-8"
   },
   {
    "type": "order",
    "prompt": "Build a suggestion for tonight.",
    "tokens": [
     "a comedy",
     "Shall we",
     "watch",
     "tonight?"
    ],
    "answer": "Shall we watch a comedy tonight?",
    "rule": "willFuture",
    "id": "30-9"
   },
   {
    "type": "input",
    "prompt": "Complete the short answer: Will you come? Yes, I ___.",
    "answers": [
     "will"
    ],
    "modelAnswer": "Yes, I will.",
    "rule": "willFuture",
    "id": "30-10"
   }
  ],
  "listeningItems": [
   {
    "type": "choice",
    "prompt": "Who does Anna often go to the cinema with?",
    "options": [
     "Her friends.",
     "Her parents.",
     "Her teacher."
    ],
    "answer": "Her friends.",
    "rule": "listen",
    "id": "30-l1"
   },
   {
    "type": "choice",
    "prompt": "What does Anna usually buy at the cinema?",
    "options": [
     "Popcorn and a drink.",
     "Soup and bread.",
     "Fruit and vegetables."
    ],
    "answer": "Popcorn and a drink.",
    "rule": "listen",
    "id": "30-l2"
   },
   {
    "type": "choice",
    "prompt": "Which movies does Anna like?",
    "options": [
     "Comedy and family movies.",
     "Horror movies only.",
     "War movies only."
    ],
    "answer": "Comedy and family movies.",
    "rule": "listen",
    "id": "30-l3"
   },
   {
    "type": "choice",
    "prompt": "Why does Anna sometimes watch a movie in the afternoon?",
    "options": [
     "Tickets can be cheaper.",
     "There are no evening movies.",
     "She works at night."
    ],
    "answer": "Tickets can be cheaper.",
    "rule": "listen",
    "id": "30-l4"
   },
   {
    "type": "choice",
    "prompt": "What do Anna and her friends do after the movie?",
    "options": [
     "Walk and discuss their favourite scenes.",
     "Go straight to work.",
     "Play football at school."
    ],
    "answer": "Walk and discuss their favourite scenes.",
    "rule": "listen",
    "id": "30-l5"
   }
  ],
  "title": "l30",
  "goal": "g30",
  "audio": "audio/lesson30.mp3",
  "transcript": [
   "Hi, I’m Anna. New York is a great city for cinema and theatre.",
   "I often go to the cinema with my friends.",
   "There are many big cinemas with comfortable seats and big screens.",
   "I usually buy popcorn and a drink.",
   "I like comedy and family movies because they are easy to understand.",
   "Sometimes I watch a movie in the afternoon, because tickets can be cheaper then.",
   "After the movie, we walk around the city and talk about our favorite scenes.",
   "In New York, going to the cinema is a fun way to spend free time."
  ],
  "theoryExamples": [
   "I’ll buy the tickets. Shall we watch a comedy?",
   "I like comedies because they are funny.",
   "The tickets are cheaper in the afternoon."
  ]
 }
]);
 bank.version=10;
 return bank;
}
if(typeof module==='object'&&module.exports)module.exports=extend;
else extend(root.EvoCourseBank);
})(typeof globalThis==='object'?globalThis:this);
