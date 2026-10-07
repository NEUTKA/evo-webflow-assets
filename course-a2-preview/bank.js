(function(root){'use strict';const data={
  "version": 10,
  "level": "A2",
  "preview": true,
  "plannedLessonCount": 30,
  "lessons": [
    {
      "id": "a2-roommates",
      "title": "a2l1",
      "goal": "a2g1",
      "person": "Mum",
      "role": "What are your roommates like?",
      "audioTitle": "What are your roommates like?",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/69611447d512487d1a96e0cd_Listening%20A2%20Pre-Intermediate.%20What%20are%20your%20roommates%20like.mp3",
      "transcript": [
        "Mum: Hi, sweetheart! How is dorm life going?",
        "Daughter: Hi, Mum! It’s going well. It’s busy, but I like it.",
        "Mum: Good. Tell me about your roommates. Are they nice?",
        "Daughter: Yes, they are nice, but they are very different. I live with two girls in one room.",
        "Mum: Two girls in one room? That’s a lot. What are they like?",
        "Daughter: The first one is Chloe. She is very friendly and very talkative. She always says hello to everyone. She likes meeting new people, and she often invites friends to our room.",
        "Mum: That sounds fun… but also noisy.",
        "Daughter: Yes, sometimes it is noisy. The second roommate is Mia. She is quiet and very organized. Her desk is always clean, and her books are in perfect order. She studies every evening.",
        "Mum: And what about you? Where do you fit in?",
        "Daughter: I’m in the middle. I like talking, but I also need quiet time. So we made some simple rules.",
        "Mum: What rules?",
        "Daughter: We keep the room clean, and we don’t play loud music after 10 p.m. If Chloe wants to invite friends, she tells us first. And if Mia is studying, we try to be quiet.",
        "Mum: That sounds very mature. Do you get along?",
        "Daughter: Yes, most of the time. Sometimes we disagree about small things, like the window or the lights, but we talk and fix it.",
        "Mum: I’m proud of you. Dorm life teaches you a lot.",
        "Daughter: It does! And it’s helping me become more independent."
      ],
      "sourceNumber": 1,
      "sourceId": "roommates",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 1,
          "sourceFile": "grammar/01-asking-questions.md"
        },
        {
          "number": 4,
          "sourceFile": "grammar/04-present-simple-vs-continuous.md"
        }
      ],
      "rules": [
        "a2rule1_1",
        "a2rule1_2",
        "a2rule1_3"
      ],
      "theoryExamples": [
        "Are they friendly? Where does Mia study?",
        "What is Chloe like? She is talkative.",
        "Mia studies every evening. She is studying now."
      ],
      "examples": [
        "Are they friendly? Where does Mia study?",
        "What is Chloe like? She is talkative.",
        "Mia studies every evening. She is studying now."
      ],
      "vocabulary": [
        [
          "roommate",
          ""
        ],
        [
          "talkative",
          ""
        ],
        [
          "organized",
          ""
        ],
        [
          "independent",
          ""
        ],
        [
          "disagree",
          ""
        ]
      ],
      "speakingSentences": [
        "What is your roommate like?",
        "She studies every evening at home."
      ],
      "speakingPrompt": "Describe someone you live with. Ask two questions about their routine.",
      "items": [
        {
          "type": "choice",
          "prompt": "___ they friendly?",
          "answer": "Are",
          "options": [
            "Are",
            "Do",
            "Does"
          ],
          "explanation": "Invert be: Are they friendly?",
          "id": "a2-1-g1",
          "rule": "a2feedback1_1",
          "source": "Adapted grammar task",
          "modelAnswer": "Are"
        },
        {
          "type": "choice",
          "prompt": "What ___ Mia do every evening?",
          "answer": "does",
          "options": [
            "does",
            "is",
            "do"
          ],
          "explanation": "Mia is singular: does + base verb.",
          "id": "a2-1-g2",
          "rule": "a2feedback1_2",
          "source": "Adapted grammar task",
          "modelAnswer": "does"
        },
        {
          "type": "choice",
          "prompt": "Ask about Chloe’s personality.",
          "answer": "What is Chloe like?",
          "options": [
            "What is Chloe like?",
            "What does Chloe like?",
            "What Chloe is like?"
          ],
          "explanation": "Be like asks about personality; does like asks about preferences.",
          "id": "a2-1-g3",
          "rule": "a2feedback1_3",
          "source": "Adapted grammar task",
          "modelAnswer": "What is Chloe like?"
        },
        {
          "type": "input",
          "prompt": "Mia ___ every evening. Use study.",
          "answers": [
            "studies"
          ],
          "explanation": "A routine with she needs studies.",
          "id": "a2-1-g4",
          "rule": "a2feedback1_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Mia studies every evening. Use study."
        },
        {
          "type": "input",
          "prompt": "Right now Mia ___ studying.",
          "answers": [
            "is"
          ],
          "explanation": "Present Continuous uses is + -ing.",
          "id": "a2-1-g5",
          "rule": "a2feedback1_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Right now Mia is studying."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Where",
            "does",
            "your",
            "roommate",
            "study?"
          ],
          "answer": "Where does your roommate study?",
          "explanation": "Question word + does + subject + base verb.",
          "id": "a2-1-g6",
          "rule": "a2feedback1_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Where does your roommate study?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "How many girls does the daughter share her room with?",
          "answer": "Two",
          "options": [
            "Two",
            "One",
            "Three"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-1-l1",
          "rule": "a2listen",
          "source": "What are your roommates like?"
        },
        {
          "type": "choice",
          "prompt": "Who is talkative?",
          "answer": "Chloe",
          "options": [
            "Chloe",
            "Mia",
            "Mum"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-1-l2",
          "rule": "a2listen",
          "source": "What are your roommates like?"
        },
        {
          "type": "choice",
          "prompt": "Who has an organized desk?",
          "answer": "Mia",
          "options": [
            "Mia",
            "Chloe",
            "Mum"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-1-l3",
          "rule": "a2listen",
          "source": "What are your roommates like?"
        },
        {
          "type": "choice",
          "prompt": "When do they stop playing loud music?",
          "answer": "After 10 p.m.",
          "options": [
            "After 10 p.m.",
            "After 7 p.m.",
            "After midnight"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-1-l4",
          "rule": "a2listen",
          "source": "What are your roommates like?"
        },
        {
          "type": "choice",
          "prompt": "How do they fix disagreements?",
          "answer": "They talk about them.",
          "options": [
            "They talk about them.",
            "They change rooms.",
            "They call Mum."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-1-l5",
          "rule": "a2listen",
          "source": "What are your roommates like?"
        }
      ]
    },
    {
      "id": "a2-friends-anna",
      "title": "a2l2",
      "goal": "a2g2",
      "person": "Anna",
      "role": "My friends",
      "audioTitle": "My friends",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/6964b0a00df3312feb927635_Listening%20A2.%20My%20friends%20%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna, and I want to tell you about my friends. I have a small group of close friends, and we know each other from work. My best friend is Lisa. She is very warm and patient, and she always listens when I have a problem. She works in an office, but she loves art, so on weekends she often goes to museums or small exhibitions. When we meet, we usually walk around the city and talk about everything.",
        "Anna: I also have a friend called Nina. She is the opposite of Lisa—she is very energetic and funny. Nina loves sports and outdoor activities. Sometimes she invites me to join her, like going for a bike ride or doing yoga in the park. I don’t always have the energy, but when I go, I feel better.",
        "Anna: I like my friends because they are different, but they support me. With them, I can relax, laugh, and feel like myself."
      ],
      "sourceNumber": 2,
      "sourceId": "friends-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 2,
          "sourceFile": "grammar/02-subject-object-preposition-questions.md"
        }
      ],
      "rules": [
        "a2rule2_1",
        "a2rule2_2",
        "a2rule2_3"
      ],
      "theoryExamples": [
        "Who listens to Anna?",
        "Who does Anna meet?",
        "Who do you go cycling with?"
      ],
      "examples": [
        "Who listens to Anna?",
        "Who does Anna meet?",
        "Who do you go cycling with?"
      ],
      "vocabulary": [
        [
          "patient",
          ""
        ],
        [
          "support",
          ""
        ],
        [
          "energetic",
          ""
        ],
        [
          "exhibition",
          ""
        ],
        [
          "outdoor",
          ""
        ]
      ],
      "speakingSentences": [
        "Who supports you when you need help?",
        "Who do you spend weekends with?"
      ],
      "speakingPrompt": "Ask a partner one subject question and one object question about friends.",
      "items": [
        {
          "type": "choice",
          "prompt": "Lisa listens to Anna. Ask about Lisa.",
          "answer": "Who listens to Anna?",
          "options": [
            "Who listens to Anna?",
            "Who does listens to Anna?",
            "Who Anna listens?"
          ],
          "explanation": "Who is the subject, so use listens without does.",
          "id": "a2-2-g1",
          "rule": "a2feedback2_1",
          "source": "Adapted grammar task",
          "modelAnswer": "Who listens to Anna?"
        },
        {
          "type": "choice",
          "prompt": "Lisa listens to Anna. Ask about Anna.",
          "answer": "Who does Lisa listen to?",
          "options": [
            "Who does Lisa listen to?",
            "Who listens Lisa to?",
            "Who does Lisa listens to?"
          ],
          "explanation": "Lisa remains the subject; does takes listen.",
          "id": "a2-2-g2",
          "rule": "a2feedback2_2",
          "source": "Adapted grammar task",
          "modelAnswer": "Who does Lisa listen to?"
        },
        {
          "type": "choice",
          "prompt": "Complete: Who do you go cycling ___?",
          "answer": "with",
          "options": [
            "with",
            "at",
            "of"
          ],
          "explanation": "Go cycling with someone: put with at the end.",
          "id": "a2-2-g3",
          "rule": "a2feedback2_3",
          "source": "Adapted grammar task",
          "modelAnswer": "with"
        },
        {
          "type": "input",
          "prompt": "Who ___ sports? Use love in the present.",
          "answers": [
            "loves"
          ],
          "explanation": "Who is the subject and takes the singular form loves.",
          "id": "a2-2-g4",
          "rule": "a2feedback2_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Who loves sports? Use love in the present."
        },
        {
          "type": "input",
          "prompt": "Who did Anna ___ yesterday? Use meet.",
          "answers": [
            "meet"
          ],
          "explanation": "After did use the base verb meet.",
          "id": "a2-2-g5",
          "rule": "a2feedback2_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Who did Anna meet yesterday? Use meet."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "What",
            "did",
            "you",
            "talk",
            "about?"
          ],
          "answer": "What did you talk about?",
          "explanation": "Keep about at the end of the object question.",
          "id": "a2-2-g6",
          "rule": "a2feedback2_6",
          "source": "Adapted grammar task",
          "modelAnswer": "What did you talk about?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "How does Anna know these friends?",
          "answer": "From work",
          "options": [
            "From work",
            "From school",
            "From a sports club"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-2-l1",
          "rule": "a2listen",
          "source": "My friends"
        },
        {
          "type": "choice",
          "prompt": "Who is Anna’s best friend?",
          "answer": "Lisa",
          "options": [
            "Lisa",
            "Nina",
            "Elena"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-2-l2",
          "rule": "a2listen",
          "source": "My friends"
        },
        {
          "type": "choice",
          "prompt": "What does Lisa enjoy?",
          "answer": "Art",
          "options": [
            "Art",
            "Football",
            "Cooking"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-2-l3",
          "rule": "a2listen",
          "source": "My friends"
        },
        {
          "type": "choice",
          "prompt": "What activity does Nina sometimes suggest?",
          "answer": "A bike ride",
          "options": [
            "A bike ride",
            "A museum visit",
            "A film night"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-2-l4",
          "rule": "a2listen",
          "source": "My friends"
        },
        {
          "type": "choice",
          "prompt": "Why does Anna value her friends?",
          "answer": "They support her.",
          "options": [
            "They support her.",
            "They have the same hobbies.",
            "They live with her."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-2-l5",
          "rule": "a2listen",
          "source": "My friends"
        }
      ]
    },
    {
      "id": "a2-family-elena",
      "title": "a2l3",
      "goal": "a2g3",
      "person": "Elena",
      "role": "My family",
      "audioTitle": "My family",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696ba5489133757963b4ad6d_Listening%20A2.%20family%20(Elena).mp3",
      "transcript": [
        "Elena: Hi, I’m Elena. I have a small but close family. I live with my husband and our little son. My parents live in the same city, so we see them often, usually on weekends. My mum is very warm and talkative, and she always cooks a big meal when we visit. My dad is quieter, but he likes helping around the house and fixing small things.",
        "Elena: During the week, life is busy. My husband works long hours, so I do most of the everyday tasks, like cooking and shopping. Our son goes to kindergarten, and he is very active. In the evening, we try to have a calm routine. We eat dinner together, then we read a short story to our son before he goes to bed.",
        "Elena: I also have one older sister. She lives in another city, so we don’t meet often, but we call each other and send voice messages. I feel lucky because my family supports me. When I have a problem, I can talk to them, and they always try to help."
      ],
      "sourceNumber": 3,
      "sourceId": "family-elena",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 3,
          "sourceFile": "grammar/03-pronouns-and-possessives.md"
        }
      ],
      "rules": [
        "a2rule3_1",
        "a2rule3_2",
        "a2rule3_3"
      ],
      "theoryExamples": [
        "They help me. I talk to them.",
        "This is her book. The book is hers.",
        "Whose bag is this? It is mine."
      ],
      "examples": [
        "They help me. I talk to them.",
        "This is her book. The book is hers.",
        "Whose bag is this? It is mine."
      ],
      "vocabulary": [
        [
          "kindergarten",
          ""
        ],
        [
          "routine",
          ""
        ],
        [
          "voice message",
          ""
        ],
        [
          "close family",
          ""
        ],
        [
          "task",
          ""
        ]
      ],
      "speakingSentences": [
        "My family helps me when I need support.",
        "This notebook is mine and that one is hers."
      ],
      "speakingPrompt": "Describe your family. Use two object pronouns and one possessive pronoun.",
      "items": [
        {
          "type": "choice",
          "prompt": "My parents help ___.",
          "answer": "me",
          "options": [
            "me",
            "I",
            "my"
          ],
          "explanation": "The person receiving help uses the object form me.",
          "id": "a2-3-g1",
          "rule": "a2feedback3_1",
          "source": "Adapted grammar task",
          "modelAnswer": "me"
        },
        {
          "type": "choice",
          "prompt": "This is ___ notebook.",
          "answer": "her",
          "options": [
            "her",
            "hers",
            "she"
          ],
          "explanation": "Her goes before the noun notebook.",
          "id": "a2-3-g2",
          "rule": "a2feedback3_2",
          "source": "Adapted grammar task",
          "modelAnswer": "her"
        },
        {
          "type": "choice",
          "prompt": "This notebook belongs to me. It is ___.",
          "answer": "mine",
          "options": [
            "mine",
            "my",
            "me"
          ],
          "explanation": "Mine replaces my notebook.",
          "id": "a2-3-g3",
          "rule": "a2feedback3_3",
          "source": "Adapted grammar task",
          "modelAnswer": "mine"
        },
        {
          "type": "input",
          "prompt": "I talk to my parents. I talk to ___.",
          "answers": [
            "them"
          ],
          "explanation": "After to use the object form them.",
          "id": "a2-3-g4",
          "rule": "a2feedback3_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I talk to my parents. I talk to them."
        },
        {
          "type": "input",
          "prompt": "The robot has a battery. ___ battery is new.",
          "answers": [
            "Its"
          ],
          "explanation": "Possessive its has no apostrophe.",
          "id": "a2-3-g5",
          "rule": "a2feedback3_5",
          "source": "Adapted grammar task",
          "modelAnswer": "The robot has a battery. Its battery is new."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Whose",
            "phone",
            "is",
            "this?"
          ],
          "answer": "Whose phone is this?",
          "explanation": "Whose asks who owns the phone.",
          "id": "a2-3-g6",
          "rule": "a2feedback3_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Whose phone is this?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Who lives with Elena?",
          "answer": "Her husband and son",
          "options": [
            "Her husband and son",
            "Her parents and sister",
            "Her sister and son"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-3-l1",
          "rule": "a2listen",
          "source": "My family"
        },
        {
          "type": "choice",
          "prompt": "Where do her parents live?",
          "answer": "In the same city",
          "options": [
            "In the same city",
            "In another country",
            "In another city"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-3-l2",
          "rule": "a2listen",
          "source": "My family"
        },
        {
          "type": "choice",
          "prompt": "Who cooks a big meal when they visit?",
          "answer": "Her mum",
          "options": [
            "Her mum",
            "Her dad",
            "Her sister"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-3-l3",
          "rule": "a2listen",
          "source": "My family"
        },
        {
          "type": "choice",
          "prompt": "What do they do before their son goes to bed?",
          "answer": "Read a short story",
          "options": [
            "Read a short story",
            "Watch a long film",
            "Go shopping"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-3-l4",
          "rule": "a2listen",
          "source": "My family"
        },
        {
          "type": "choice",
          "prompt": "How does Elena keep in touch with her sister?",
          "answer": "Calls and voice messages",
          "options": [
            "Calls and voice messages",
            "Only visits",
            "Letters only"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-3-l5",
          "rule": "a2listen",
          "source": "My family"
        }
      ]
    },
    {
      "id": "a2-household-chores",
      "title": "a2l4",
      "goal": "a2g4",
      "person": "Lena",
      "role": "Do your kids help with household chores?",
      "audioTitle": "Do your kids help with household chores?",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696271cc3642c8fd6a9e0b1a_Listening%20A2%20Pre-Intermediate.%20Do%20your%20kids%20help%20with%20household%20chores.mp3",
      "transcript": [
        "Lena: Hey, Nadia! You look tired today. Everything okay?",
        "Nadia: Hi, Lena. I’m okay, just busy. The house is a mess again, and the kids say they “help”… but I’m not sure they really do.",
        "Lena: Oh, I know that feeling. Do your kids help with household chores?",
        "Nadia: They help sometimes, but I have to ask them three times. My son can take out the trash, but he forgets. And my daughter can tidy her room, but she does it very slowly.",
        "Lena: Same here! My kids help, but only when I make it a rule. For example, they must do one small chore before they play on their phones.",
        "Nadia: That sounds smart. What chores do they usually do?",
        "Lena: My older one washes the dishes after dinner. Not perfectly, but it’s okay. And my younger one feeds the cat and puts toys away.",
        "Nadia: Washing dishes is a big help. My kids hate it. They say the water is “too hot” or “too cold.”",
        "Lena: Classic excuses. Do you pay them for chores?",
        "Nadia: I tried that once. It worked for one week, then they asked for more money. So I stopped. Now I tell them, “You live here, so you help here.”",
        "Lena: Exactly! I don’t pay them either. But I do give small rewards sometimes—like choosing a movie on Friday night.",
        "Nadia: I like that idea. Maybe a reward is better than money. My son loves screen time, so I can use that.",
        "Lena: Yes, and it helps if the chores are clear. I made a simple list on the fridge: Monday—set the table. Tuesday—take out the trash. Wednesday—vacuum the living room.",
        "Nadia: Vacuuming? That’s advanced!",
        "Lena: He’s learning. It’s not perfect, but it’s getting better. And I don’t redo everything, because then he thinks it doesn’t matter.",
        "Nadia: That’s true. I often redo their work, and then they get lazy.",
        "Lena: Maybe start small. Like, “Make your bed” and “Put your dirty clothes in the basket.”",
        "Nadia: Yes. I will start with easy chores and a simple schedule. I really want them to be more responsible.",
        "Lena: They will. It just takes time and patience.",
        "Nadia: Thanks, Lena. Talking to you helps. Now I feel more motivated.",
        "Lena: Anytime. And if you want, we can share ideas next week—what works and what doesn’t.",
        "Nadia: Deal. Let’s do that."
      ],
      "sourceNumber": 4,
      "sourceId": "household-chores",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 25,
          "sourceFile": "grammar/25-must-and-have-to.md"
        },
        {
          "number": 21,
          "sourceFile": "grammar/21-do-vs-make.md"
        }
      ],
      "rules": [
        "a2rule4_1",
        "a2rule4_2",
        "a2rule4_3"
      ],
      "theoryExamples": [
        "They must do a chore. I have to ask them.",
        "You mustn’t shout. You don’t have to pay.",
        "I do the dishes and make the bed."
      ],
      "examples": [
        "They must do a chore. I have to ask them.",
        "You mustn’t shout. You don’t have to pay.",
        "I do the dishes and make the bed."
      ],
      "vocabulary": [
        [
          "chore",
          ""
        ],
        [
          "reward",
          ""
        ],
        [
          "excuse",
          ""
        ],
        [
          "responsible",
          ""
        ],
        [
          "vacuum",
          ""
        ]
      ],
      "speakingSentences": [
        "I have to do one small chore every day.",
        "I make my bed before I leave home."
      ],
      "speakingPrompt": "Suggest three household rules. Include a forbidden action and an optional task.",
      "items": [
        {
          "type": "choice",
          "prompt": "Talking is forbidden during this test. You ___ talk.",
          "answer": "mustn’t",
          "options": [
            "mustn’t",
            "don’t have to",
            "must to"
          ],
          "explanation": "Mustn’t expresses prohibition.",
          "id": "a2-4-g1",
          "rule": "a2feedback4_1",
          "source": "Adapted grammar task",
          "modelAnswer": "mustn’t"
        },
        {
          "type": "choice",
          "prompt": "The extra chore is optional. You ___ do it.",
          "answer": "don’t have to",
          "options": [
            "don’t have to",
            "mustn’t",
            "have not"
          ],
          "explanation": "Don’t have to means it is not necessary.",
          "id": "a2-4-g2",
          "rule": "a2feedback4_2",
          "source": "Adapted grammar task",
          "modelAnswer": "don’t have to"
        },
        {
          "type": "choice",
          "prompt": "Choose the usual combination: ___ the bed.",
          "answer": "make",
          "options": [
            "make",
            "do",
            "have"
          ],
          "explanation": "Make the bed is the fixed combination.",
          "id": "a2-4-g3",
          "rule": "a2feedback4_3",
          "source": "Adapted grammar task",
          "modelAnswer": "make"
        },
        {
          "type": "input",
          "prompt": "Yesterday I ___ to clean the kitchen. Use have.",
          "answers": [
            "had"
          ],
          "explanation": "Past obligation uses had to.",
          "id": "a2-4-g4",
          "rule": "a2feedback4_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Yesterday I had to clean the kitchen. Use have."
        },
        {
          "type": "input",
          "prompt": "She ___ to feed the cat every day. Use have.",
          "answers": [
            "has"
          ],
          "explanation": "With she use has to.",
          "id": "a2-4-g5",
          "rule": "a2feedback4_5",
          "source": "Adapted grammar task",
          "modelAnswer": "She has to feed the cat every day. Use have."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Do",
            "you",
            "have",
            "to",
            "do",
            "the",
            "dishes?"
          ],
          "answer": "Do you have to do the dishes?",
          "explanation": "Questions with have to use do + subject + have to.",
          "id": "a2-4-g6",
          "rule": "a2feedback4_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Do you have to do the dishes?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What can Nadia’s son do?",
          "answer": "Take out the trash",
          "options": [
            "Take out the trash",
            "Wash the windows",
            "Cook dinner"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-4-l1",
          "rule": "a2listen",
          "source": "Do your kids help with household chores?"
        },
        {
          "type": "choice",
          "prompt": "What rule does Lena use before phone time?",
          "answer": "One small chore",
          "options": [
            "One small chore",
            "All the shopping",
            "Two hours of cleaning"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-4-l2",
          "rule": "a2listen",
          "source": "Do your kids help with household chores?"
        },
        {
          "type": "choice",
          "prompt": "What does Lena’s younger child do?",
          "answer": "Feeds the cat and puts toys away",
          "options": [
            "Feeds the cat and puts toys away",
            "Washes dishes only",
            "Vacuums every day"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-4-l3",
          "rule": "a2listen",
          "source": "Do your kids help with household chores?"
        },
        {
          "type": "choice",
          "prompt": "How long did Nadia’s payment idea work?",
          "answer": "One week",
          "options": [
            "One week",
            "One month",
            "One year"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-4-l4",
          "rule": "a2listen",
          "source": "Do your kids help with household chores?"
        },
        {
          "type": "choice",
          "prompt": "Where is Lena’s chore list?",
          "answer": "On the fridge",
          "options": [
            "On the fridge",
            "On the door",
            "On her phone"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-4-l5",
          "rule": "a2listen",
          "source": "Do your kids help with household chores?"
        }
      ]
    },
    {
      "id": "a2-riverside-anna",
      "title": "a2l5",
      "goal": "a2g5",
      "person": "Anna",
      "role": "The city where I live",
      "audioTitle": "The city where I live",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/6964a219e149bf423c8a4e3c_Listening%20A2.%20The%20city%20where%20I%20live%20%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna, and I live in a city called Riverside. It’s a medium-sized city, so it’s busy, but not too crowded. I like living here because everything is close. There are supermarkets, cafés, and small parks near my apartment. In the center, there is a big square with shops and a nice walking street. On weekends, people sit outside, drink coffee, and listen to street music.",
        "Anna: Riverside also has good public transport. I usually take a bus or the metro, and it’s not expensive. The traffic can be heavy in the morning, but it’s better in the evening.",
        "Anna: My favorite place is the river area. There is a long path where people walk, run, and ride bikes. In summer, it’s really beautiful, and the sunsets are amazing. The only thing I don’t like is the weather in winter. It can be cold and grey. But overall, I feel comfortable here, and I can’t imagine living in a very small town."
      ],
      "sourceNumber": 5,
      "sourceId": "riverside-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 31,
          "sourceFile": "grammar/31-defining-relative-clauses.md"
        },
        {
          "number": 13,
          "sourceFile": "grammar/13-quantifiers.md"
        }
      ],
      "rules": [
        "a2rule5_1",
        "a2rule5_2",
        "a2rule5_3"
      ],
      "theoryExamples": [
        "This is a bus that stops near my home.",
        "There is a path where people ride bikes.",
        "There are many cafés. There isn’t much traffic."
      ],
      "examples": [
        "This is a bus that stops near my home.",
        "There is a path where people ride bikes.",
        "There are many cafés. There isn’t much traffic."
      ],
      "vocabulary": [
        [
          "crowded",
          ""
        ],
        [
          "square",
          ""
        ],
        [
          "public transport",
          ""
        ],
        [
          "path",
          ""
        ],
        [
          "sunset",
          ""
        ]
      ],
      "speakingSentences": [
        "There is a park where people ride bikes.",
        "This is the bus that stops near my home."
      ],
      "speakingPrompt": "Describe your city using who, that and where. Mention how much traffic there is.",
      "items": [
        {
          "type": "choice",
          "prompt": "This is the park ___ I run.",
          "answer": "where",
          "options": [
            "where",
            "who",
            "what"
          ],
          "explanation": "Where gives the location of running.",
          "id": "a2-5-g1",
          "rule": "a2feedback5_1",
          "source": "Adapted grammar task",
          "modelAnswer": "where"
        },
        {
          "type": "choice",
          "prompt": "A driver is a person ___ drives a vehicle.",
          "answer": "who",
          "options": [
            "who",
            "where",
            "what"
          ],
          "explanation": "Who identifies a person and is the clause subject.",
          "id": "a2-5-g2",
          "rule": "a2feedback5_2",
          "source": "Adapted grammar task",
          "modelAnswer": "who"
        },
        {
          "type": "choice",
          "prompt": "There isn’t ___ traffic tonight.",
          "answer": "much",
          "options": [
            "much",
            "many",
            "a few"
          ],
          "explanation": "Traffic is uncountable: much.",
          "id": "a2-5-g3",
          "rule": "a2feedback5_3",
          "source": "Adapted grammar task",
          "modelAnswer": "much"
        },
        {
          "type": "input",
          "prompt": "The app ___ I use is helpful. Use that or which.",
          "answers": [
            "that",
            "which"
          ],
          "explanation": "Both that and which are valid object relative pronouns here.",
          "id": "a2-5-g4",
          "rule": "a2feedback5_4",
          "source": "Adapted grammar task",
          "modelAnswer": "The app that I use is helpful. Use that or which."
        },
        {
          "type": "input",
          "prompt": "How ___ parks are near your home?",
          "answers": [
            "many"
          ],
          "explanation": "Parks is plural and countable.",
          "id": "a2-5-g5",
          "rule": "a2feedback5_5",
          "source": "Adapted grammar task",
          "modelAnswer": "How many parks are near your home?"
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "This",
            "is",
            "a",
            "café",
            "where",
            "people",
            "meet."
          ],
          "answer": "This is a café where people meet.",
          "explanation": "Where introduces a location, with no defining-clause comma.",
          "id": "a2-5-g6",
          "rule": "a2feedback5_6",
          "source": "Adapted grammar task",
          "modelAnswer": "This is a café where people meet."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What is Anna’s city called?",
          "answer": "Riverside",
          "options": [
            "Riverside",
            "Blue Sky",
            "Green Pages"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-5-l1",
          "rule": "a2listen",
          "source": "The city where I live"
        },
        {
          "type": "choice",
          "prompt": "How does she describe its size?",
          "answer": "Medium-sized",
          "options": [
            "Medium-sized",
            "Very small",
            "Very large"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-5-l2",
          "rule": "a2listen",
          "source": "The city where I live"
        },
        {
          "type": "choice",
          "prompt": "What is in the center?",
          "answer": "A big square",
          "options": [
            "A big square",
            "An airport",
            "A beach"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-5-l3",
          "rule": "a2listen",
          "source": "The city where I live"
        },
        {
          "type": "choice",
          "prompt": "What is her favorite place?",
          "answer": "The river area",
          "options": [
            "The river area",
            "The shopping center",
            "The metro station"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-5-l4",
          "rule": "a2listen",
          "source": "The city where I live"
        },
        {
          "type": "choice",
          "prompt": "What does she dislike?",
          "answer": "Winter weather",
          "options": [
            "Winter weather",
            "Expensive transport",
            "No nearby shops"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-5-l5",
          "rule": "a2listen",
          "source": "The city where I live"
        }
      ]
    },
    {
      "id": "a2-giving-directions",
      "title": "a2l6",
      "goal": "a2g6",
      "person": "Woman",
      "role": "Giving directions",
      "audioTitle": "Giving directions",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/69625bf8ee3e6e37d12b4635_Listening%20A2%20Pre-Intermediate.%20Giving%20directions.mp3",
      "transcript": [
        "Woman: Excuse me, can you help me, please? I think I’m lost.",
        "Man: Sure. Where do you need to go?",
        "Woman: I need to get to the City Art Museum. I’m staying at the Blue Star Hotel, and I walked for ten minutes, but now I’m not sure.",
        "Man: No problem. You’re quite close. Are you walking or taking a bus?",
        "Woman: I prefer walking if it’s not too far.",
        "Man: It’s about fifteen minutes on foot. First, go straight along this street.",
        "Woman: Okay, straight.",
        "Man: Yes. Walk past the supermarket on your left and the small bakery on your right.",
        "Woman: Supermarket left, bakery right.",
        "Man: Right. After that, you will see traffic lights. At the traffic lights, turn left.",
        "Woman: Turn left at the traffic lights. Got it.",
        "Man: Then walk straight for about five minutes. You’ll pass a park.",
        "Woman: Is the park on the left or the right?",
        "Man: The park will be on your right. Keep walking until you come to a big roundabout.",
        "Woman: A roundabout… okay.",
        "Man: At the roundabout, take the second exit. That means you go almost straight.",
        "Woman: Second exit, almost straight.",
        "Man: Exactly. After you take the second exit, you’ll see a long street with cafés.",
        "Woman: That sounds nice.",
        "Man: Yes, it’s a busy area. Walk for two more minutes and look for a tall grey building with a glass entrance. That’s the museum.",
        "Woman: Great! Is it across from something?",
        "Man: Yes, it’s across from a bookshop called “Green Pages.” You can’t miss it.",
        "Woman: Perfect. Let me check: straight, left at the traffic lights, past the park, second exit at the roundabout, and then the museum across from the bookshop.",
        "Man: That’s right. If you want, you can also take bus number 12 from the hotel, but walking is easier today.",
        "Woman: Thank you so much. You explained it very clearly.",
        "Man: You’re welcome. Enjoy the museum!",
        "Woman: Thanks! Have a nice day.",
        "Man: You too"
      ],
      "sourceNumber": 6,
      "sourceId": "giving-directions",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 17,
          "sourceFile": "grammar/17-prepositions-of-movement.md"
        },
        {
          "number": 22,
          "sourceFile": "grammar/22-uses-of-go.md"
        }
      ],
      "rules": [
        "a2rule6_1",
        "a2rule6_2",
        "a2rule6_3"
      ],
      "theoryExamples": [
        "Walk along the street and through the park.",
        "Go to the museum. Go into the building.",
        "We go cycling. Let’s go for a walk."
      ],
      "examples": [
        "Walk along the street and through the park.",
        "Go to the museum. Go into the building.",
        "We go cycling. Let’s go for a walk."
      ],
      "vocabulary": [
        [
          "roundabout",
          ""
        ],
        [
          "exit",
          ""
        ],
        [
          "entrance",
          ""
        ],
        [
          "across from",
          ""
        ],
        [
          "on foot",
          ""
        ]
      ],
      "speakingSentences": [
        "Turn left at the traffic lights.",
        "Walk along the street and past the park."
      ],
      "speakingPrompt": "Give a short route from your home to a café. Use three movement prepositions.",
      "items": [
        {
          "type": "choice",
          "prompt": "Follow the length of the street: walk ___ it.",
          "answer": "along",
          "options": [
            "along",
            "into",
            "off"
          ],
          "explanation": "Along follows a line such as a street.",
          "id": "a2-6-g1",
          "rule": "a2feedback6_1",
          "source": "Adapted grammar task",
          "modelAnswer": "along"
        },
        {
          "type": "choice",
          "prompt": "Move from outside to inside: go ___ the museum.",
          "answer": "into",
          "options": [
            "into",
            "past",
            "from"
          ],
          "explanation": "Into emphasizes entering.",
          "id": "a2-6-g2",
          "rule": "a2feedback6_2",
          "source": "Adapted grammar task",
          "modelAnswer": "into"
        },
        {
          "type": "choice",
          "prompt": "Choose the usual activity expression.",
          "answer": "go cycling",
          "options": [
            "go cycling",
            "go to cycling",
            "go for cycling"
          ],
          "explanation": "Go + -ing describes this activity.",
          "id": "a2-6-g3",
          "rule": "a2feedback6_3",
          "source": "Adapted grammar task",
          "modelAnswer": "go cycling"
        },
        {
          "type": "input",
          "prompt": "After the lesson, we go ___. Use home.",
          "answers": [
            "home"
          ],
          "explanation": "Home is an adverb; no to is needed.",
          "id": "a2-6-g4",
          "rule": "a2feedback6_4",
          "source": "Adapted grammar task",
          "modelAnswer": "After the lesson, we go home. Use home."
        },
        {
          "type": "input",
          "prompt": "We travel ___ bus.",
          "answers": [
            "by"
          ],
          "explanation": "Use by bus without an article for the travel method.",
          "id": "a2-6-g5",
          "rule": "a2feedback6_5",
          "source": "Adapted grammar task",
          "modelAnswer": "We travel by bus."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Turn",
            "left",
            "at",
            "the",
            "traffic",
            "lights."
          ],
          "answer": "Turn left at the traffic lights.",
          "explanation": "An imperative starts with the base verb turn.",
          "id": "a2-6-g6",
          "rule": "a2feedback6_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Turn left at the traffic lights."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Where does the woman want to go?",
          "answer": "City Art Museum",
          "options": [
            "City Art Museum",
            "Blue Star Hotel",
            "Green Pages bookshop"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-6-l1",
          "rule": "a2listen",
          "source": "Giving directions"
        },
        {
          "type": "choice",
          "prompt": "How long is the walk?",
          "answer": "About fifteen minutes",
          "options": [
            "About fifteen minutes",
            "About five minutes",
            "About forty minutes"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-6-l2",
          "rule": "a2listen",
          "source": "Giving directions"
        },
        {
          "type": "choice",
          "prompt": "Where should she turn left?",
          "answer": "At the traffic lights",
          "options": [
            "At the traffic lights",
            "At the bakery",
            "At the hotel"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-6-l3",
          "rule": "a2listen",
          "source": "Giving directions"
        },
        {
          "type": "choice",
          "prompt": "Which exit should she take at the roundabout?",
          "answer": "The second",
          "options": [
            "The second",
            "The first",
            "The third"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-6-l4",
          "rule": "a2listen",
          "source": "Giving directions"
        },
        {
          "type": "choice",
          "prompt": "What is opposite the museum?",
          "answer": "Green Pages bookshop",
          "options": [
            "Green Pages bookshop",
            "The supermarket",
            "The hotel"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-6-l5",
          "rule": "a2listen",
          "source": "Giving directions"
        }
      ]
    },
    {
      "id": "a2-shopping-for-clothes",
      "title": "a2l7",
      "goal": "a2g7",
      "person": "SHOP ASSISTANT",
      "role": "Shopping for clothes",
      "audioTitle": "Shopping for clothes",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/69636f1d504f28272af57544_Listening%20A2.%20Shopping%20for%20clothes.mp3",
      "transcript": [
        "SHOP ASSISTANT: Hi! Welcome. Can I help you with anything?",
        "CUSTOMER: Hi! Yes, please. I’m looking for a jacket.",
        "SHOP ASSISTANT: Sure. What kind of jacket do you want—something casual or something more formal?",
        "CUSTOMER: Casual, for everyday. Something warm, but not too heavy.",
        "SHOP ASSISTANT: Great. What size do you usually wear?",
        "CUSTOMER: Usually a medium, but it depends on the brand.",
        "SHOP ASSISTANT: No problem. We have these jackets here. This one is a light puffer jacket, and this one is a denim jacket.",
        "CUSTOMER: I like the puffer jacket. Do you have it in black?",
        "SHOP ASSISTANT: Yes, we do. Here you are.",
        "CUSTOMER: Thank you. Can I try it on?",
        "SHOP ASSISTANT: Of course. The fitting rooms are over there on the right.",
        "CUSTOMER: Great, thanks.",
        "(A moment later.)",
        "CUSTOMER: Hi, I tried it on. It feels comfortable, but the sleeves are a little long.",
        "SHOP ASSISTANT: Let me see. Yes, it’s slightly long. Would you like to try a smaller size?",
        "CUSTOMER: Yes, please. Can I try a small?",
        "SHOP ASSISTANT: Sure. One second… Here’s a small in black.",
        "(She tries it on.)",
        "CUSTOMER: This size is better, but now it feels tight when I move my arms.",
        "SHOP ASSISTANT: I understand. Some jackets are like that. Would you like a different model? This one has more space in the shoulders.",
        "CUSTOMER: Yes, I’d like to try it.",
        "SHOP ASSISTANT: Here you go. It’s also water-resistant, so it’s good for rainy days.",
        "(She tries it on.)",
        "CUSTOMER: Oh, I like this one! It fits well, and it’s not too heavy. How much is it?",
        "SHOP ASSISTANT: It’s 65 dollars. And today we have a 10% discount if you buy two items.",
        "CUSTOMER: That’s nice. I also need a scarf.",
        "SHOP ASSISTANT: Perfect. Scarves are right next to the jackets. Do you prefer something plain or with a pattern?",
        "CUSTOMER: Something plain, maybe grey.",
        "SHOP ASSISTANT: Great choice. This grey scarf is soft and warm.",
        "CUSTOMER: I’ll take the jacket and the scarf, please.",
        "SHOP ASSISTANT: Lovely. Please come to the checkout, and I’ll ring it up for you."
      ],
      "sourceNumber": 7,
      "sourceId": "shopping-for-clothes",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 12,
          "sourceFile": "grammar/12-indefinite-pronouns.md"
        },
        {
          "number": 14,
          "sourceFile": "grammar/14-too-and-enough.md"
        },
        {
          "number": 24,
          "sourceFile": "grammar/24-phrasal-verbs-word-order.md"
        }
      ],
      "rules": [
        "a2rule7_1",
        "a2rule7_2",
        "a2rule7_3"
      ],
      "theoryExamples": [
        "I want something warm. Is there anything cheaper?",
        "It is too tight. It isn’t big enough.",
        "Try the jacket on. Try it on."
      ],
      "examples": [
        "I want something warm. Is there anything cheaper?",
        "It is too tight. It isn’t big enough.",
        "Try the jacket on. Try it on."
      ],
      "vocabulary": [
        [
          "sleeve",
          ""
        ],
        [
          "tight",
          ""
        ],
        [
          "plain",
          ""
        ],
        [
          "discount",
          ""
        ],
        [
          "checkout",
          ""
        ]
      ],
      "speakingSentences": [
        "Can I try this jacket on?",
        "It feels comfortable but the sleeves are too long."
      ],
      "speakingPrompt": "Role-play shopping. Ask to try something on and explain a problem with the fit.",
      "items": [
        {
          "type": "choice",
          "prompt": "I want ___ warm.",
          "answer": "something",
          "options": [
            "something",
            "somewhere",
            "someone"
          ],
          "explanation": "A thing is something; the adjective warm follows it.",
          "id": "a2-7-g1",
          "rule": "a2feedback7_1",
          "source": "Adapted grammar task",
          "modelAnswer": "something"
        },
        {
          "type": "choice",
          "prompt": "This jacket is ___ tight to wear comfortably.",
          "answer": "too",
          "options": [
            "too",
            "enough",
            "too much"
          ],
          "explanation": "Before an adjective use too.",
          "id": "a2-7-g2",
          "rule": "a2feedback7_2",
          "source": "Adapted grammar task",
          "modelAnswer": "too"
        },
        {
          "type": "choice",
          "prompt": "Replace the jacket with it.",
          "answer": "Try it on.",
          "options": [
            "Try it on.",
            "Try on it.",
            "Try it to on."
          ],
          "explanation": "With a separable phrasal verb, put it in the middle.",
          "id": "a2-7-g3",
          "rule": "a2feedback7_3",
          "source": "Adapted grammar task",
          "modelAnswer": "Try it on."
        },
        {
          "type": "input",
          "prompt": "The jacket isn’t big ___ for me.",
          "answers": [
            "enough"
          ],
          "explanation": "Enough follows the adjective big.",
          "id": "a2-7-g4",
          "rule": "a2feedback7_4",
          "source": "Adapted grammar task",
          "modelAnswer": "The jacket isn’t big enough for me."
        },
        {
          "type": "input",
          "prompt": "I didn’t find ___. Use anything or nothing.",
          "answers": [
            "anything"
          ],
          "explanation": "After didn’t use anything, avoiding a standard-English double negative.",
          "id": "a2-7-g5",
          "rule": "a2feedback7_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I didn’t find anything. Use anything or nothing."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Do",
            "you",
            "have",
            "anything",
            "cheaper?"
          ],
          "answer": "Do you have anything cheaper?",
          "explanation": "Anything takes its adjective after it.",
          "id": "a2-7-g6",
          "rule": "a2feedback7_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Do you have anything cheaper?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What does the customer first want?",
          "answer": "A jacket",
          "options": [
            "A jacket",
            "A dress",
            "A pair of shoes"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-7-l1",
          "rule": "a2listen",
          "source": "Shopping for clothes"
        },
        {
          "type": "choice",
          "prompt": "What color jacket does she ask for?",
          "answer": "Black",
          "options": [
            "Black",
            "Blue",
            "Green"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-7-l2",
          "rule": "a2listen",
          "source": "Shopping for clothes"
        },
        {
          "type": "choice",
          "prompt": "What is wrong with the first jacket?",
          "answer": "Its sleeves are a little long.",
          "options": [
            "Its sleeves are a little long.",
            "It is too heavy.",
            "It is too short."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-7-l3",
          "rule": "a2listen",
          "source": "Shopping for clothes"
        },
        {
          "type": "choice",
          "prompt": "How much is the jacket she likes?",
          "answer": "65 dollars",
          "options": [
            "65 dollars",
            "15 dollars",
            "100 dollars"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-7-l4",
          "rule": "a2listen",
          "source": "Shopping for clothes"
        },
        {
          "type": "choice",
          "prompt": "What kind of scarf does she ask for?",
          "answer": "Plain, maybe grey",
          "options": [
            "Plain, maybe grey",
            "Patterned and blue",
            "Plain and red"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-7-l5",
          "rule": "a2listen",
          "source": "Shopping for clothes"
        }
      ]
    },
    {
      "id": "a2-hobbies-anna",
      "title": "a2l8",
      "goal": "a2g8",
      "person": "Anna",
      "role": "What are your hobbies?",
      "audioTitle": "What are your hobbies?",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696358f220ca87fc15112eb4_Listening%20A2.%20What%20are%20your%20hobbies_%20%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. I have a few hobbies that help me relax after a busy day. My main hobby is cooking. I like trying simple new recipes, especially pasta dishes and soups. On weekends I often cook for my family, and I enjoy choosing fresh vegetables at the market. I also like reading, but I don’t read very difficult books. I prefer short stories and easy novels in English because I want to improve my language. In the evenings, I sometimes do yoga at home with a video. It helps me feel calm and sleep better. When I have more time, I take photos of the city—small streets, cafés, and sunsets. I’m not a professional, but it makes me happy."
      ],
      "sourceNumber": 8,
      "sourceId": "hobbies-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 19,
          "sourceFile": "grammar/19-infinitives-and-gerunds.md"
        }
      ],
      "rules": [
        "a2rule8_1",
        "a2rule8_2",
        "a2rule8_3"
      ],
      "theoryExamples": [
        "I enjoy cooking. I’m interested in reading.",
        "I want to improve. I read to learn new words.",
        "I can cook. Cooking helps me relax."
      ],
      "examples": [
        "I enjoy cooking. I’m interested in reading.",
        "I want to improve. I read to learn new words.",
        "I can cook. Cooking helps me relax."
      ],
      "vocabulary": [
        [
          "recipe",
          ""
        ],
        [
          "novel",
          ""
        ],
        [
          "improve",
          ""
        ],
        [
          "professional",
          ""
        ],
        [
          "fresh",
          ""
        ]
      ],
      "speakingSentences": [
        "I enjoy trying new recipes at home.",
        "I read short stories to improve my English."
      ],
      "speakingPrompt": "Describe three hobbies. Use enjoy + -ing, want + to and an infinitive of purpose.",
      "items": [
        {
          "type": "choice",
          "prompt": "I enjoy ___ new recipes.",
          "answer": "trying",
          "options": [
            "trying",
            "to try",
            "try"
          ],
          "explanation": "Enjoy takes an -ing form.",
          "id": "a2-8-g1",
          "rule": "a2feedback8_1",
          "source": "Adapted grammar task",
          "modelAnswer": "trying"
        },
        {
          "type": "choice",
          "prompt": "I want ___ my English.",
          "answer": "to improve",
          "options": [
            "to improve",
            "improving",
            "improve"
          ],
          "explanation": "Want takes a to-infinitive.",
          "id": "a2-8-g2",
          "rule": "a2feedback8_2",
          "source": "Adapted grammar task",
          "modelAnswer": "to improve"
        },
        {
          "type": "choice",
          "prompt": "I can ___ pasta.",
          "answer": "cook",
          "options": [
            "cook",
            "to cook",
            "cooking"
          ],
          "explanation": "After can use the base verb.",
          "id": "a2-8-g3",
          "rule": "a2feedback8_3",
          "source": "Adapted grammar task",
          "modelAnswer": "cook"
        },
        {
          "type": "input",
          "prompt": "I’m interested in ___. Use read.",
          "answers": [
            "reading"
          ],
          "explanation": "After the preposition in use -ing.",
          "id": "a2-8-g4",
          "rule": "a2feedback8_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I’m interested in reading. Use read."
        },
        {
          "type": "input",
          "prompt": "___ helps me relax. Use cook as the subject.",
          "answers": [
            "Cooking"
          ],
          "explanation": "An activity used as a subject can take -ing.",
          "id": "a2-8-g5",
          "rule": "a2feedback8_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Cooking helps me relax. Use cook as the subject."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "read",
            "stories",
            "to",
            "learn",
            "new",
            "words."
          ],
          "answer": "I read stories to learn new words.",
          "explanation": "To learn gives the purpose of reading.",
          "id": "a2-8-g6",
          "rule": "a2feedback8_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I read stories to learn new words."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What is Anna’s main hobby?",
          "answer": "Cooking",
          "options": [
            "Cooking",
            "Cycling",
            "Dancing"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-8-l1",
          "rule": "a2listen",
          "source": "What are your hobbies?"
        },
        {
          "type": "choice",
          "prompt": "What dishes does she especially like making?",
          "answer": "Pasta and soups",
          "options": [
            "Pasta and soups",
            "Cakes and burgers",
            "Fish and chips"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-8-l2",
          "rule": "a2listen",
          "source": "What are your hobbies?"
        },
        {
          "type": "choice",
          "prompt": "What books does she prefer?",
          "answer": "Short stories and easy novels",
          "options": [
            "Short stories and easy novels",
            "Very difficult books",
            "Only recipe books"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-8-l3",
          "rule": "a2listen",
          "source": "What are your hobbies?"
        },
        {
          "type": "choice",
          "prompt": "Where does she do yoga?",
          "answer": "At home with a video",
          "options": [
            "At home with a video",
            "At a gym",
            "In a school"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-8-l4",
          "rule": "a2listen",
          "source": "What are your hobbies?"
        },
        {
          "type": "choice",
          "prompt": "What does she photograph?",
          "answer": "The city",
          "options": [
            "The city",
            "Only her family",
            "Only food"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-8-l5",
          "rule": "a2listen",
          "source": "What are your hobbies?"
        }
      ]
    },
    {
      "id": "a2-party-experiences-anna",
      "title": "a2l9",
      "goal": "a2g9",
      "person": "Anna",
      "role": "Party experiences",
      "audioTitle": "Party experiences",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696350bffabbb8e1efd3b945_Listening%20A2.%20Party%20experiences%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. Last month I went to my friend’s birthday party in a small café. It was my first time going to a party with people I didn’t know well, so I felt a little nervous at the beginning. But everyone was friendly. We played a simple game with questions, and it helped me talk to new people. The music was loud, but it was fun. I danced for a while, then I sat and chatted with two girls about work and travel. The food was great—there were sandwiches, cake, and fruit. I didn’t stay very late because I had work the next morning, but I really enjoyed it. Next time, I want to stay longer and dance more."
      ],
      "sourceNumber": 9,
      "sourceId": "party-experiences-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 6,
          "sourceFile": "grammar/06-past-simple.md"
        },
        {
          "number": 8,
          "sourceFile": "grammar/08-connectors.md"
        }
      ],
      "rules": [
        "a2rule9_1",
        "a2rule9_2",
        "a2rule9_3"
      ],
      "theoryExamples": [
        "I went to a party. Did you go? I didn’t stay late.",
        "I left because I had work. I was tired, so I went home.",
        "Although I was nervous, I enjoyed the party."
      ],
      "examples": [
        "I went to a party. Did you go? I didn’t stay late.",
        "I left because I had work. I was tired, so I went home.",
        "Although I was nervous, I enjoyed the party."
      ],
      "vocabulary": [
        [
          "nervous",
          ""
        ],
        [
          "chat",
          ""
        ],
        [
          "sandwich",
          ""
        ],
        [
          "at the beginning",
          ""
        ],
        [
          "for a while",
          ""
        ]
      ],
      "speakingSentences": [
        "I went to a birthday party last month.",
        "Although I felt nervous, I enjoyed meeting new people."
      ],
      "speakingPrompt": "Tell a short story about a social event. Include a reason and a contrast.",
      "items": [
        {
          "type": "choice",
          "prompt": "Last month I ___ to a party.",
          "answer": "went",
          "options": [
            "went",
            "go",
            "have gone"
          ],
          "explanation": "Last month is a finished past time: went.",
          "id": "a2-9-g1",
          "rule": "a2feedback9_1",
          "source": "Adapted grammar task",
          "modelAnswer": "went"
        },
        {
          "type": "choice",
          "prompt": "I didn’t ___ very late.",
          "answer": "stay",
          "options": [
            "stay",
            "stayed",
            "staying"
          ],
          "explanation": "After didn’t use stay.",
          "id": "a2-9-g2",
          "rule": "a2feedback9_2",
          "source": "Adapted grammar task",
          "modelAnswer": "stay"
        },
        {
          "type": "choice",
          "prompt": "I was late ___ the traffic.",
          "answer": "because of",
          "options": [
            "because of",
            "because",
            "so"
          ],
          "explanation": "The traffic is a noun phrase, so use because of.",
          "id": "a2-9-g3",
          "rule": "a2feedback9_3",
          "source": "Adapted grammar task",
          "modelAnswer": "because of"
        },
        {
          "type": "input",
          "prompt": "___ I was nervous, I enjoyed it. Use although.",
          "answers": [
            "Although"
          ],
          "explanation": "Although introduces the contrast clause.",
          "id": "a2-9-g4",
          "rule": "a2feedback9_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Although I was nervous, I enjoyed it. Use although."
        },
        {
          "type": "input",
          "prompt": "Did you ___ at the party? Use dance.",
          "answers": [
            "dance"
          ],
          "explanation": "After did use the base verb.",
          "id": "a2-9-g5",
          "rule": "a2feedback9_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Did you dance at the party? Use dance."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "was",
            "tired,",
            "so",
            "I",
            "went",
            "home."
          ],
          "answer": "I was tired, so I went home.",
          "explanation": "So connects a cause to its result. A comma before so separates these clauses.",
          "id": "a2-9-g6",
          "rule": "a2feedback9_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I was tired, so I went home."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "When was the party?",
          "answer": "Last month",
          "options": [
            "Last month",
            "Yesterday",
            "Last year"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-9-l1",
          "rule": "a2listen",
          "source": "Party experiences"
        },
        {
          "type": "choice",
          "prompt": "Where was it?",
          "answer": "In a small café",
          "options": [
            "In a small café",
            "At Anna’s home",
            "In a large hotel"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-9-l2",
          "rule": "a2listen",
          "source": "Party experiences"
        },
        {
          "type": "choice",
          "prompt": "How did Anna feel at first?",
          "answer": "A little nervous",
          "options": [
            "A little nervous",
            "Angry",
            "Bored"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-9-l3",
          "rule": "a2listen",
          "source": "Party experiences"
        },
        {
          "type": "choice",
          "prompt": "What helped her talk to new people?",
          "answer": "A question game",
          "options": [
            "A question game",
            "A work meeting",
            "A dance lesson"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-9-l4",
          "rule": "a2listen",
          "source": "Party experiences"
        },
        {
          "type": "choice",
          "prompt": "Why did she leave without staying very late?",
          "answer": "She had work the next morning.",
          "options": [
            "She had work the next morning.",
            "The food was bad.",
            "Nobody was friendly."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-9-l5",
          "rule": "a2listen",
          "source": "Party experiences"
        }
      ]
    },
    {
      "id": "a2-films-anna",
      "title": "a2l10",
      "goal": "a2g10",
      "person": "Anna",
      "role": "Talking about films",
      "audioTitle": "Talking about films",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696389bd9e97a11aa46a1e22_Listening%20A2.%20Talking%20about%20films%20%20%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. I love watching different kinds of movies, but my favorite is romantic comedy. I like them because they are light and easy to understand. After a long day, I don’t want a very serious story. I also enjoy animated films. They are not only for kids—some of them are really funny and have a good message. I don’t like horror movies, because I get scared easily and I can’t sleep well after. Sometimes I watch dramas, but only when I’m in the right mood. If the film is too sad, it can stay in my head for a long time. On weekends, I usually watch a movie at home with snacks and a warm drink."
      ],
      "sourceNumber": 10,
      "sourceId": "films-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 5,
          "sourceFile": "grammar/05-stative-vs-dynamic-verbs.md"
        }
      ],
      "rules": [
        "a2rule10_1",
        "a2rule10_2",
        "a2rule10_3"
      ],
      "theoryExamples": [
        "I like comedies. I don’t need a serious film tonight.",
        "I think it is funny. I am thinking about what to watch.",
        "I have a film collection. We are having a snack."
      ],
      "examples": [
        "I like comedies. I don’t need a serious film tonight.",
        "I think it is funny. I am thinking about what to watch.",
        "I have a film collection. We are having a snack."
      ],
      "vocabulary": [
        [
          "romantic comedy",
          ""
        ],
        [
          "animated",
          ""
        ],
        [
          "horror",
          ""
        ],
        [
          "mood",
          ""
        ],
        [
          "snack",
          ""
        ]
      ],
      "speakingSentences": [
        "I prefer watching comedies after a busy day.",
        "I am thinking about which film to watch tonight."
      ],
      "speakingPrompt": "Recommend a film. Describe your preferences and what you are considering watching tonight.",
      "items": [
        {
          "type": "choice",
          "prompt": "Choose the ordinary expression of an opinion.",
          "answer": "I think this film is funny.",
          "options": [
            "I think this film is funny.",
            "I am thinking this film is funny.",
            "I thinking this film is funny."
          ],
          "explanation": "Opinion think normally takes the simple form.",
          "id": "a2-10-g1",
          "rule": "a2feedback10_1",
          "source": "Adapted grammar task",
          "modelAnswer": "I think this film is funny."
        },
        {
          "type": "choice",
          "prompt": "Right now we ___ a snack.",
          "answer": "are having",
          "options": [
            "are having",
            "are have",
            "having"
          ],
          "explanation": "Have as an activity can be continuous.",
          "id": "a2-10-g2",
          "rule": "a2feedback10_2",
          "source": "Adapted grammar task",
          "modelAnswer": "are having"
        },
        {
          "type": "choice",
          "prompt": "She ___ horror films.",
          "answer": "doesn’t like",
          "options": [
            "doesn’t like",
            "isn’t liking",
            "don’t like"
          ],
          "explanation": "Stative like uses Present Simple; she takes doesn’t.",
          "id": "a2-10-g3",
          "rule": "a2feedback10_3",
          "source": "Adapted grammar task",
          "modelAnswer": "doesn’t like"
        },
        {
          "type": "input",
          "prompt": "I ___ the actor’s name. Use know in its ordinary stative meaning.",
          "answers": [
            "know"
          ],
          "explanation": "Knowledge is a state: I know.",
          "id": "a2-10-g4",
          "rule": "a2feedback10_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I know the actor’s name. Use know in its ordinary stative meaning."
        },
        {
          "type": "input",
          "prompt": "I’m ___ about which film to choose. Use think.",
          "answers": [
            "thinking"
          ],
          "explanation": "Considering a choice is an activity: thinking about.",
          "id": "a2-10-g5",
          "rule": "a2feedback10_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I’m thinking about which film to choose. Use think."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "prefer",
            "comedies",
            "to",
            "horror",
            "films."
          ],
          "answer": "I prefer comedies to horror films.",
          "explanation": "Prefer expresses a preference and normally uses the simple form.",
          "id": "a2-10-g6",
          "rule": "a2feedback10_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I prefer comedies to horror films."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What is Anna’s favorite kind of film?",
          "answer": "Romantic comedy",
          "options": [
            "Romantic comedy",
            "Horror",
            "Drama"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-10-l1",
          "rule": "a2listen",
          "source": "Talking about films"
        },
        {
          "type": "choice",
          "prompt": "Why does she like romantic comedies?",
          "answer": "They are light and easy to understand.",
          "options": [
            "They are light and easy to understand.",
            "They are always serious.",
            "They are very frightening."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-10-l2",
          "rule": "a2listen",
          "source": "Talking about films"
        },
        {
          "type": "choice",
          "prompt": "What does she say about animated films?",
          "answer": "They are not only for kids.",
          "options": [
            "They are not only for kids.",
            "They are only for children.",
            "They never have a message."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-10-l3",
          "rule": "a2listen",
          "source": "Talking about films"
        },
        {
          "type": "choice",
          "prompt": "Why doesn’t she like horror films?",
          "answer": "She gets scared and sleeps badly.",
          "options": [
            "She gets scared and sleeps badly.",
            "They are too short.",
            "They are always sad."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-10-l4",
          "rule": "a2listen",
          "source": "Talking about films"
        },
        {
          "type": "choice",
          "prompt": "Where does she usually watch a film at weekends?",
          "answer": "At home",
          "options": [
            "At home",
            "At a cinema",
            "At work"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-10-l5",
          "rule": "a2listen",
          "source": "Talking about films"
        }
      ]
    },
    {
      "id": "a2-hotel-check-in",
      "title": "a2l11",
      "goal": "a2g11",
      "person": "Receptionist",
      "role": "Checking into a hotel",
      "audioTitle": "Checking into a hotel",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/695fc9deac22aa7ecdc937f2_Listening%20A2%20Pre-Intermediate.%20Checking%20into%20a%20hotel.mp3",
      "transcript": [
        "Receptionist: Good evening. Welcome to Blue Sky Hotel. How can I help you?",
        "Guest: Good evening. I have a reservation. My name is Daniel Smith.",
        "Receptionist: Thank you, Mr Smith. Let me check… Yes, I can see it here. You booked a double room for two nights, right?",
        "Guest: Yes, that’s correct. My wife is with me. She is waiting in the lobby with the luggage.",
        "Receptionist: Great. Could I see your passport or ID, please?",
        "Guest: Sure. Here you are.",
        "Receptionist: Thank you. And could you also confirm your phone number and email address?",
        "Guest: Yes. My phone number is +1 202 555 0184, and my email is daniel.smith94@gmail.com.",
        "Receptionist: Perfect. Thank you. Would you like one key card or two?",
        "Guest: Two, please.",
        "Receptionist: No problem. Also, would you like a room with one double bed, or two single beds?",
        "Guest: One double bed, please.",
        "Receptionist: Great. Your room is on the sixth floor, room 612. The elevator is on your left.",
        "Guest: Thank you. Before we go up, can I ask a few questions?",
        "Receptionist: Of course.",
        "Guest: What time is breakfast?",
        "Receptionist: Breakfast is from 7:00 to 10:30 in the restaurant on the ground floor.",
        "Guest: Is breakfast included in our booking?",
        "Receptionist: Let me see… Yes, it is included. You don’t need to pay extra.",
        "Guest: Great. And is there free Wi-Fi?",
        "Receptionist: Yes, there is. The Wi-Fi name is BlueSkyGuest, and the password is StayHappy2026.",
        "Guest: Perfect. Thank you. Also, we arrived by car. Do you have parking?",
        "Receptionist: Yes, we do. We have an underground parking garage. It’s $12 per day.",
        "Guest: Okay. Can I pay now, or later?",
        "Receptionist: You can pay at check-out, or we can add it to your room now. Whatever is easier.",
        "Guest: Let’s add it to the room, please.",
        "Receptionist: Sure. And just to confirm, would you like to pay for the room now or at check-out?",
        "Guest: At check-out, please.",
        "Receptionist: No problem. We will just take a card for a security deposit. It’s standard.",
        "Guest: That’s fine. Here is my card.",
        "Receptionist: Thank you. The deposit is $100, and it will be released after you check out.",
        "Guest: Okay, thanks for explaining.",
        "Receptionist: You’re welcome. One more thing: would you like a wake-up call in the morning?",
        "Guest: Hmm, yes, please. At 7:30 a.m.",
        "Receptionist: 7:30 a.m. Great. And do you need help with your luggage?",
        "Guest: Yes, please. That would be helpful.",
        "Receptionist: Of course. I’ll call the bell staff now.",
        "Guest: Thank you.",
        "Receptionist: Here are your two key cards. Room 612. Enjoy your stay, Mr Smith.",
        "Guest: Thank you very much. Have a nice evening.",
        "Receptionist: You too. Welcome to Blue Sky Hotel!"
      ],
      "sourceNumber": 11,
      "sourceId": "hotel-check-in",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 1,
          "sourceFile": "grammar/01-asking-questions.md"
        },
        {
          "number": 20,
          "sourceFile": "grammar/20-verbs-with-two-objects.md"
        },
        {
          "number": 19,
          "sourceFile": "grammar/19-infinitives-and-gerunds.md"
        }
      ],
      "rules": [
        "a2rule11_1",
        "a2rule11_2",
        "a2rule11_3"
      ],
      "theoryExamples": [
        "Could I see your passport? I’d like to check in.",
        "Give me the key. Give it to me.",
        "Explain the rule to me. Buy a snack for her."
      ],
      "examples": [
        "Could I see your passport? I’d like to check in.",
        "Give me the key. Give it to me.",
        "Explain the rule to me. Buy a snack for her."
      ],
      "vocabulary": [
        [
          "reservation",
          ""
        ],
        [
          "luggage",
          ""
        ],
        [
          "included",
          ""
        ],
        [
          "key card",
          ""
        ],
        [
          "wake-up call",
          ""
        ]
      ],
      "speakingSentences": [
        "Could you show me the room, please?",
        "I would like to check in and collect my key."
      ],
      "speakingPrompt": "Role-play hotel check-in. Make a polite request and ask about breakfast. Use give/show with a receiver.",
      "items": [
        {
          "type": "choice",
          "prompt": "Make a polite request.",
          "answer": "Could you help me, please?",
          "options": [
            "Could you help me, please?",
            "Do you could help me, please?",
            "Could you to help me, please?"
          ],
          "explanation": "Could takes subject + base verb, without do or to.",
          "id": "a2-11-g1",
          "rule": "a2feedback11_1",
          "source": "Adapted grammar task",
          "modelAnswer": "Could you help me, please?"
        },
        {
          "type": "choice",
          "prompt": "Both objects are pronouns. Choose the neutral order.",
          "answer": "Give it to me.",
          "options": [
            "Give it to me.",
            "Give to me it.",
            "Give me to it."
          ],
          "explanation": "Put the thing pronoun it before to + receiver me.",
          "id": "a2-11-g2",
          "rule": "a2feedback11_2",
          "source": "Adapted grammar task",
          "modelAnswer": "Give it to me."
        },
        {
          "type": "choice",
          "prompt": "Choose the standard explain pattern.",
          "answer": "Explain the rule to me.",
          "options": [
            "Explain the rule to me.",
            "Explain me the rule.",
            "Explain to the rule me."
          ],
          "explanation": "Explain does not use the ordinary double-object pattern.",
          "id": "a2-11-g3",
          "rule": "a2feedback11_3",
          "source": "Adapted grammar task",
          "modelAnswer": "Explain the rule to me."
        },
        {
          "type": "input",
          "prompt": "I’d like ___ check in.",
          "answers": [
            "to"
          ],
          "explanation": "Would like + to-infinitive describes what you want to do.",
          "id": "a2-11-g4",
          "rule": "a2feedback11_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I’d like to check in."
        },
        {
          "type": "input",
          "prompt": "I bought a snack ___ my sister.",
          "answers": [
            "for"
          ],
          "explanation": "Buy uses for for the person who benefits.",
          "id": "a2-11-g5",
          "rule": "a2feedback11_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I bought a snack for my sister."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Could",
            "you",
            "show",
            "me",
            "the",
            "room?"
          ],
          "answer": "Could you show me the room?",
          "explanation": "Show allows receiver me before the thing the room.",
          "id": "a2-11-g6",
          "rule": "a2feedback11_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Could you show me the room?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "How many nights did Daniel book?",
          "answer": "Two",
          "options": [
            "Two",
            "Three",
            "One"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-11-l1",
          "rule": "a2listen",
          "source": "Checking into a hotel"
        },
        {
          "type": "choice",
          "prompt": "What is his room number?",
          "answer": "612",
          "options": [
            "612",
            "216",
            "620"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-11-l2",
          "rule": "a2listen",
          "source": "Checking into a hotel"
        },
        {
          "type": "choice",
          "prompt": "When is breakfast served?",
          "answer": "From 7:00 to 10:30",
          "options": [
            "From 7:00 to 10:30",
            "From 7:30 to 9:00",
            "From 8:00 to 11:30"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-11-l3",
          "rule": "a2listen",
          "source": "Checking into a hotel"
        },
        {
          "type": "choice",
          "prompt": "Does he need to pay extra for breakfast?",
          "answer": "No, it is included.",
          "options": [
            "No, it is included.",
            "Yes, 12 dollars per day.",
            "Yes, 100 dollars."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-11-l4",
          "rule": "a2listen",
          "source": "Checking into a hotel"
        },
        {
          "type": "choice",
          "prompt": "What time does he request a wake-up call?",
          "answer": "7:30 a.m.",
          "options": [
            "7:30 a.m.",
            "6:30 a.m.",
            "10:30 a.m."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-11-l5",
          "rule": "a2listen",
          "source": "Checking into a hotel"
        }
      ]
    },
    {
      "id": "a2-renting-a-car",
      "title": "a2l12",
      "goal": "a2g12",
      "person": "Woman",
      "role": "Renting a car",
      "audioTitle": "Renting a car",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/69634992e4c07135f1c724c8_Listening%20A2%20Pre-Intermediate.%20Renting%20a%20car.mp3",
      "transcript": [
        "Woman: Hello. I’d like to rent a car, please.",
        "Man: Hello! Sure. Do you have a reservation?",
        "Woman: Yes, I do. My name is Anna Petrova.",
        "Man: Thank you. One moment… Yes, I see it. You booked a small car for three days, right?",
        "Woman: Yes, that’s right. From Friday to Monday.",
        "Man: Great. Can I see your driver’s license and your passport, please?",
        "Woman: Sure. Here you are.",
        "Man: Thank you. And will you pay by card?",
        "Woman: Yes, by card. How much is the deposit?",
        "Man: The deposit is 200 dollars. We block it on your card and return it after you bring the car back.",
        "Woman: Okay. Is insurance included?",
        "Man: Basic insurance is included. It covers damage to the other car, but it has an excess.",
        "Woman: Sorry, what does “excess” mean?",
        "Man: It means if there is damage, you pay the first 500 dollars. After that, insurance pays the rest.",
        "Woman: Oh, I see. Is there an option with full insurance?",
        "Man: Yes. Full insurance is 15 dollars per day, and then the excess is zero.",
        "Woman: Hmm… I think I want full insurance. I’m not used to driving in this city.",
        "Man: No problem. I’ll add it. Do you need a GPS?",
        "Woman: I can use my phone, but… is there a phone holder in the car?",
        "Man: Yes, there is. Also, the car has Bluetooth.",
        "Woman: Perfect. And what about fuel?",
        "Man: It’s a full-to-full policy. The tank is full now, and you return it full.",
        "Woman: Okay. Where do I pick up the car?",
        "Man: It’s in parking lot B, space 17. I’ll give you the key card.",
        "Woman: Great. Can I ask one more thing?",
        "Man: Of course.",
        "Woman: I’m driving to the countryside tomorrow. Is this car okay for that?",
        "Man: Yes, it’s fine for normal roads. But if you plan to drive on rough mountain roads, I recommend an SUV.",
        "Woman: No, just normal roads.",
        "Man: Then you’re fine. Also, please return the car by 10 a.m. on Monday.",
        "Woman: 10 a.m., got it. And if I’m late?",
        "Man: If you’re late more than one hour, we charge an extra day.",
        "Woman: Okay, I’ll be on time.",
        "Man: Great. Here is your contract. Please sign here and here.",
        "Woman: Done. Thank you.",
        "Man: You’re welcome! Enjoy your trip, and drive safely.",
        "Woman: Thank you. Bye!"
      ],
      "sourceNumber": 12,
      "sourceId": "renting-a-car",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 30,
          "sourceFile": "grammar/30-present-continuous-future-vs-going-to.md"
        },
        {
          "number": 37,
          "sourceFile": "grammar/37-time-and-end-expressions.md"
        }
      ],
      "rules": [
        "a2rule12_1",
        "a2rule12_2",
        "a2rule12_3"
      ],
      "theoryExamples": [
        "I’m driving tomorrow. I’m going to explore the city.",
        "Return the car by ten. Meet me at nine.",
        "I’ll be on time. We arrived in time to catch the bus."
      ],
      "examples": [
        "I’m driving tomorrow. I’m going to explore the city.",
        "Return the car by ten. Meet me at nine.",
        "I’ll be on time. We arrived in time to catch the bus."
      ],
      "vocabulary": [
        [
          "deposit",
          ""
        ],
        [
          "insurance",
          ""
        ],
        [
          "fuel",
          ""
        ],
        [
          "countryside",
          ""
        ],
        [
          "contract",
          ""
        ]
      ],
      "speakingSentences": [
        "I am driving to the countryside tomorrow.",
        "We arrived in time to catch the bus."
      ],
      "speakingPrompt": "Describe a planned trip. Give a deadline with by and explain on time versus in time.",
      "items": [
        {
          "type": "choice",
          "prompt": "Use meet in the Present Continuous: I ___ my instructor at nine tomorrow.",
          "answer": "am meeting",
          "options": [
            "am meeting",
            "meeting",
            "am meet"
          ],
          "explanation": "Present Continuous uses am + meeting; tomorrow gives future context.",
          "id": "a2-12-g1",
          "rule": "a2feedback12_1",
          "source": "Adapted grammar task",
          "modelAnswer": "am meeting"
        },
        {
          "type": "choice",
          "prompt": "No later than ten: return the car ___ ten.",
          "answer": "by",
          "options": [
            "by",
            "at",
            "until"
          ],
          "explanation": "By gives the latest allowed time, not an exact appointment.",
          "id": "a2-12-g2",
          "rule": "a2feedback12_2",
          "source": "Adapted grammar task",
          "modelAnswer": "by"
        },
        {
          "type": "choice",
          "prompt": "Which expression specifically means early enough?",
          "answer": "in time",
          "options": [
            "in time",
            "on time",
            "at the end"
          ],
          "explanation": "In time means soon enough; on time means punctual.",
          "id": "a2-12-g3",
          "rule": "a2feedback12_3",
          "source": "Adapted grammar task",
          "modelAnswer": "in time"
        },
        {
          "type": "input",
          "prompt": "I ___ going to explore the countryside. Use be.",
          "answers": [
            "am"
          ],
          "explanation": "With I use am going to + base verb.",
          "id": "a2-12-g4",
          "rule": "a2feedback12_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I am going to explore the countryside. Use be."
        },
        {
          "type": "input",
          "prompt": "We ___ driving to the countryside tomorrow. Use be.",
          "answers": [
            "are"
          ],
          "explanation": "With we use are + driving for this future plan.",
          "id": "a2-12-g5",
          "rule": "a2feedback12_5",
          "source": "Adapted grammar task",
          "modelAnswer": "We are driving to the countryside tomorrow. Use be."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "We",
            "arrived",
            "in",
            "time",
            "to",
            "catch",
            "the",
            "bus."
          ],
          "answer": "We arrived in time to catch the bus.",
          "explanation": "In time to + verb means early enough to do the action.",
          "id": "a2-12-g6",
          "rule": "a2feedback12_6",
          "source": "Adapted grammar task",
          "modelAnswer": "We arrived in time to catch the bus."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "For how long did Anna book the car?",
          "answer": "Three days",
          "options": [
            "Three days",
            "Two days",
            "Five days"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-12-l1",
          "rule": "a2listen",
          "source": "Renting a car"
        },
        {
          "type": "choice",
          "prompt": "How much is the deposit?",
          "answer": "200 dollars",
          "options": [
            "200 dollars",
            "500 dollars",
            "15 dollars"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-12-l2",
          "rule": "a2listen",
          "source": "Renting a car"
        },
        {
          "type": "choice",
          "prompt": "How much is full insurance per day in this dialogue?",
          "answer": "15 dollars",
          "options": [
            "15 dollars",
            "12 dollars",
            "200 dollars"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-12-l3",
          "rule": "a2listen",
          "source": "Renting a car"
        },
        {
          "type": "choice",
          "prompt": "What should the fuel tank be like when she returns the car?",
          "answer": "Full",
          "options": [
            "Full",
            "Empty",
            "Half full"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-12-l4",
          "rule": "a2listen",
          "source": "Renting a car"
        },
        {
          "type": "choice",
          "prompt": "When must she return the car?",
          "answer": "By 10 a.m. on Monday",
          "options": [
            "By 10 a.m. on Monday",
            "By 10 a.m. on Friday",
            "By noon on Monday"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-12-l5",
          "rule": "a2listen",
          "source": "Renting a car"
        }
      ]
    },
    {
      "id": "a2-new-york-transport",
      "title": "a2l13",
      "goal": "a2g13",
      "person": "MILY",
      "role": "New York Transport",
      "audioTitle": "New York Transport",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696e05617f80afd6f8028839_New%20York%20Transport.mp3",
      "transcript": [
        "MILY: Hi, Alex. You know New York well, right? I’m going there next month, and I’m worried about transport.",
        "ALEX: Don’t worry. New York is busy, but it’s easy to move around if you know a few things.",
        "EMILY: Great. First question: is the subway the best option?",
        "ALEX: Most of the time, yes. The subway is fast and it runs 24/7. It’s usually cheaper than taxis, and you can reach almost every part of the city.",
        "EMILY: Is it hard to understand the lines?",
        "ALEX: At first, it can be confusing. There are many lines, and some trains are local and some are express. Local trains stop at every station. Express trains skip some stations, so they are quicker.",
        "EMILY: That sounds useful, but also risky. What if I take the wrong train?",
        "ALEX: It happens. The good news is you can just get off and go back. Also, use a map app on your phone. It tells you which train to take and which exit to use.",
        "EMILY: What about paying? Do I need a special card?",
        "ALEX: You can use OMNY, which is contactless. You just tap your phone or bank card at the gate. Some people still use a MetroCard, but OMNY is simpler.",
        "EMILY: Nice. And buses—are they good?",
        "ALEX: Buses are good when you want to see the city. They are slower because of traffic, but they’re helpful if you don’t want stairs in the subway. The same payment works for buses, too.",
        "EMILY: Okay. Now taxis. Are yellow taxis safe?",
        "ALEX: Yes, they’re safe, but they can be expensive, especially in traffic. In Manhattan during rush hour, a taxi can be much slower than the subway.",
        "EMILY: What about ride-sharing apps?",
        "ALEX: They’re common, but prices change a lot. Sometimes it’s cheap, sometimes it’s very expensive, especially late at night or when it’s raining.",
        "EMILY: Good tip. Do people bike in New York?",
        "ALEX: Yes, more and more. There are bike lanes in many areas, and there’s a bike-sharing system. But you need to be careful—traffic is intense, and some drivers don’t pay attention.",
        "EMILY: So what’s your best advice for a visitor?",
        "ALEX: Use the subway for longer trips, walk for short distances, and take a bus if you want a nicer view. Avoid taxis when the streets are packed. And always give yourself extra time—New York is full of surprises.",
        "EMILY: That’s exactly what I needed. Thanks, Alex. Now I feel much calmer.",
        "ALEX: You’re welcome! You’ll be fine. New York is busy, but once you try the subway, it starts to feel normal."
      ],
      "sourceNumber": 13,
      "sourceId": "new-york-transport",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 16,
          "sourceFile": "grammar/16-comparatives-and-superlatives.md"
        },
        {
          "number": 15,
          "sourceFile": "grammar/15-most-most-of-the-most.md"
        }
      ],
      "rules": [
        "a2rule13_1",
        "a2rule13_2",
        "a2rule13_3"
      ],
      "theoryExamples": [
        "The subway is cheaper than a taxi.",
        "This is the fastest route in the city.",
        "Most buses are slow. Most of these buses are full."
      ],
      "examples": [
        "The subway is cheaper than a taxi.",
        "This is the fastest route in the city.",
        "Most buses are slow. Most of these buses are full."
      ],
      "vocabulary": [
        [
          "subway",
          ""
        ],
        [
          "express train",
          ""
        ],
        [
          "contactless",
          ""
        ],
        [
          "rush hour",
          ""
        ],
        [
          "bike lane",
          ""
        ]
      ],
      "speakingSentences": [
        "The subway is cheaper than a taxi.",
        "Most of these buses are full."
      ],
      "speakingPrompt": "Compare two ways of travelling in your city. Describe the best option for you and use most or most of.",
      "items": [
        {
          "type": "choice",
          "prompt": "A taxi costs more. The subway is ___ than a taxi.",
          "answer": "cheaper",
          "options": [
            "cheaper",
            "cheapest",
            "more cheaper"
          ],
          "explanation": "Use the comparative cheaper with than.",
          "id": "a2-13-g1",
          "rule": "a2feedback13_1",
          "source": "Adapted grammar task",
          "modelAnswer": "cheaper"
        },
        {
          "type": "choice",
          "prompt": "Choose the superlative of good: This is ___ route of all.",
          "answer": "the best",
          "options": [
            "the best",
            "better",
            "the most good"
          ],
          "explanation": "Good has the irregular superlative the best.",
          "id": "a2-13-g2",
          "rule": "a2feedback13_2",
          "source": "Adapted grammar task",
          "modelAnswer": "the best"
        },
        {
          "type": "choice",
          "prompt": "___ these buses are full.",
          "answer": "Most of",
          "options": [
            "Most of",
            "Most",
            "The most of"
          ],
          "explanation": "These identifies a specific group, so use most of.",
          "id": "a2-13-g3",
          "rule": "a2feedback13_3",
          "source": "Adapted grammar task",
          "modelAnswer": "Most of"
        },
        {
          "type": "input",
          "prompt": "Use the comparative of bad: The traffic is ___ than yesterday.",
          "answers": [
            "worse"
          ],
          "explanation": "Bad becomes worse in the comparative.",
          "id": "a2-13-g4",
          "rule": "a2feedback13_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Use the comparative of bad: The traffic is worse than yesterday."
        },
        {
          "type": "input",
          "prompt": "Use of or no word: Most ___ us travel by subway.",
          "answers": [
            "of"
          ],
          "explanation": "Before an object pronoun use most of us.",
          "id": "a2-13-g5",
          "rule": "a2feedback13_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Use of or no word: Most of us travel by subway."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "The",
            "subway",
            "is",
            "cheaper",
            "than",
            "a",
            "taxi."
          ],
          "answer": "The subway is cheaper than a taxi.",
          "explanation": "Comparative adjective + than introduces the second option.",
          "id": "a2-13-g6",
          "rule": "a2feedback13_6",
          "source": "Adapted grammar task",
          "modelAnswer": "The subway is cheaper than a taxi."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "According to Alex, what should visitors use for longer trips?",
          "answer": "The subway",
          "options": [
            "The subway",
            "A bicycle only",
            "A taxi every time"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-13-l1",
          "rule": "a2listen",
          "source": "New York Transport"
        },
        {
          "type": "choice",
          "prompt": "Which trains stop at every station?",
          "answer": "Local trains",
          "options": [
            "Local trains",
            "Express trains",
            "Only night trains"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-13-l2",
          "rule": "a2listen",
          "source": "New York Transport"
        },
        {
          "type": "choice",
          "prompt": "Why are express trains quicker?",
          "answer": "They skip some stations.",
          "options": [
            "They skip some stations.",
            "They have no passengers.",
            "They run only at night."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-13-l3",
          "rule": "a2listen",
          "source": "New York Transport"
        },
        {
          "type": "choice",
          "prompt": "What does Alex say you can tap at the gate?",
          "answer": "A phone or bank card",
          "options": [
            "A phone or bank card",
            "A passport",
            "A paper map"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-13-l4",
          "rule": "a2listen",
          "source": "New York Transport"
        },
        {
          "type": "choice",
          "prompt": "Why are buses slower in Alex’s description?",
          "answer": "Because of traffic",
          "options": [
            "Because of traffic",
            "Because they stop operating at noon",
            "Because payment takes an hour"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-13-l5",
          "rule": "a2listen",
          "source": "New York Transport"
        }
      ]
    },
    {
      "id": "a2-americans-in-paris",
      "title": "a2l14",
      "goal": "a2g14",
      "person": "EMMA",
      "role": "Two Americans living in Paris",
      "audioTitle": "Two Americans living in Paris",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696baee42938f204fd0eabb6_Two%20Americans%20living%20in%20Paris.mp3",
      "transcript": [
        "EMMA: Hey, Jake. How was your day in Paris?",
        "JAKE: Busy, but good. I had French class in the morning, then I went to work.",
        "EMMA: Are you still working at that small design studio?",
        "JAKE: Yes. The team is nice, but meetings are hard. They speak fast, and I miss some words.",
        "EMMA: Same. At my café, customers talk quickly, and they use slang. Sometimes I just smile.",
        "JAKE: At least your French is improving. Mine is slow.",
        "EMMA: It’s getting better. I practice every day. I write new words in my phone.",
        "JAKE: Do you feel more at home now?",
        "EMMA: A little. At first, I felt lonely. I missed my family and my friends. But now I have a routine.",
        "JAKE: Me too. I like walking by the river after work. It helps me relax.",
        "EMMA: I love that. Paris is beautiful, but it can be stressful. The metro is always crowded.",
        "JAKE: Yeah, and the rent is expensive. Our apartment is small, but the location is great.",
        "EMMA: True. And I really enjoy the food here. The bread and cheese are amazing.",
        "JAKE: Also, weekends are fun. Museums, parks, little markets… It feels like a movie sometimes.",
        "EMMA: Do you think you will stay another year?",
        "JAKE: Maybe. If my job goes well, I’d like to stay. What about you?",
        "EMMA: I want to stay too, but I need a better job. I’m looking for something in tourism.",
        "JAKE: You’ll find it. Your French is strong, and you’re good with people.",
        "EMMA: Thanks. Let’s keep trying. Paris is hard, but it’s worth it."
      ],
      "sourceNumber": 14,
      "sourceId": "americans-in-paris",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 4,
          "sourceFile": "grammar/04-present-simple-vs-continuous.md"
        },
        {
          "number": 11,
          "sourceFile": "grammar/11-no-longer-any-longer-anymore.md"
        },
        {
          "number": 23,
          "sourceFile": "grammar/23-uses-of-get.md"
        }
      ],
      "rules": [
        "a2rule14_1",
        "a2rule14_2",
        "a2rule14_3"
      ],
      "theoryExamples": [
        "I practise every day. I’m looking for a new job.",
        "My French is getting better.",
        "I no longer feel lonely. I don’t feel lonely anymore."
      ],
      "examples": [
        "I practise every day. I’m looking for a new job.",
        "My French is getting better.",
        "I no longer feel lonely. I don’t feel lonely anymore."
      ],
      "vocabulary": [
        [
          "slang",
          ""
        ],
        [
          "lonely",
          ""
        ],
        [
          "rent",
          ""
        ],
        [
          "tourism",
          ""
        ],
        [
          "worth it",
          ""
        ]
      ],
      "speakingSentences": [
        "My French is getting better every day.",
        "I no longer feel lonely in this city."
      ],
      "speakingPrompt": "Describe life in a new city. Mention a routine, a current change and something you do not do anymore.",
      "items": [
        {
          "type": "choice",
          "prompt": "Every day Emma ___ new words in her phone.",
          "answer": "writes",
          "options": [
            "writes",
            "is write",
            "writing"
          ],
          "explanation": "A routine uses Present Simple; Emma takes writes.",
          "id": "a2-14-g1",
          "rule": "a2feedback14_1",
          "source": "Adapted grammar task",
          "modelAnswer": "writes"
        },
        {
          "type": "choice",
          "prompt": "Use look in the Present Continuous: Emma ___ for a job now.",
          "answer": "is looking",
          "options": [
            "is looking",
            "looks looking",
            "is look"
          ],
          "explanation": "Present Continuous uses is + looking.",
          "id": "a2-14-g2",
          "rule": "a2feedback14_2",
          "source": "Adapted grammar task",
          "modelAnswer": "is looking"
        },
        {
          "type": "choice",
          "prompt": "Choose the correct position of no longer.",
          "answer": "I no longer feel lonely.",
          "options": [
            "I no longer feel lonely.",
            "I don’t no longer feel lonely.",
            "I feel no longer lonely."
          ],
          "explanation": "No longer goes before feel and already gives negative meaning.",
          "id": "a2-14-g3",
          "rule": "a2feedback14_3",
          "source": "Adapted grammar task",
          "modelAnswer": "I no longer feel lonely."
        },
        {
          "type": "input",
          "prompt": "My French is ___ better. Use get in the -ing form.",
          "answers": [
            "getting"
          ],
          "explanation": "Get + adjective describes a change; double the t in getting.",
          "id": "a2-14-g4",
          "rule": "a2feedback14_4",
          "source": "Adapted grammar task",
          "modelAnswer": "My French is getting better. Use get in the -ing form."
        },
        {
          "type": "input",
          "prompt": "I don’t feel lonely ___. Use anymore or any longer.",
          "answers": [
            "anymore",
            "any more",
            "any longer"
          ],
          "explanation": "These end-position expressions mean the situation has stopped; temporal any more is also valid.",
          "id": "a2-14-g5",
          "rule": "a2feedback14_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I don’t feel lonely anymore. Use anymore or any longer."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "My",
            "French",
            "is",
            "getting",
            "better",
            "every",
            "day."
          ],
          "answer": "My French is getting better every day.",
          "explanation": "Is getting + comparative describes an ongoing improvement.",
          "id": "a2-14-g6",
          "rule": "a2feedback14_6",
          "source": "Adapted grammar task",
          "modelAnswer": "My French is getting better every day."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Where does Jake work?",
          "answer": "At a small design studio",
          "options": [
            "At a small design studio",
            "At a large hotel",
            "At a museum"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-14-l1",
          "rule": "a2listen",
          "source": "Two Americans living in Paris"
        },
        {
          "type": "choice",
          "prompt": "Where does Emma work?",
          "answer": "At a café",
          "options": [
            "At a café",
            "At a school",
            "At an airport"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-14-l2",
          "rule": "a2listen",
          "source": "Two Americans living in Paris"
        },
        {
          "type": "choice",
          "prompt": "How does Emma record new words?",
          "answer": "In her phone",
          "options": [
            "In her phone",
            "On the kitchen wall",
            "In letters to Jake"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-14-l3",
          "rule": "a2listen",
          "source": "Two Americans living in Paris"
        },
        {
          "type": "choice",
          "prompt": "What does Jake like doing after work?",
          "answer": "Walking by the river",
          "options": [
            "Walking by the river",
            "Driving to the airport",
            "Playing basketball"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-14-l4",
          "rule": "a2listen",
          "source": "Two Americans living in Paris"
        },
        {
          "type": "choice",
          "prompt": "What kind of job is Emma looking for?",
          "answer": "Something in tourism",
          "options": [
            "Something in tourism",
            "Something in medicine",
            "Something in construction"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-14-l5",
          "rule": "a2listen",
          "source": "Two Americans living in Paris"
        }
      ]
    },
    {
      "id": "a2-paris-cheaper-than-new-york",
      "title": "a2l15",
      "goal": "a2g15",
      "person": "SOPHIE",
      "role": "Is Paris Cheaper Than New York?",
      "audioTitle": "Is Paris Cheaper Than New York?",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696dce985df4787f9f1d0eea_Is%20Paris%20Cheaper%20Than%20New%20York.mp3",
      "transcript": [
        "SOPHIE: Hey, Alex, you lived in New York, right? I have a question. Is Paris cheaper than New York?",
        "ALEX: Yes, I lived in New York for three years. And now I’ve been in Paris for six months. So… it depends. Some things are cheaper in Paris, but not everything.",
        "SOPHIE: Like what? Let’s start with rent.",
        "ALEX: Rent is still expensive in Paris, but New York was worse for me. In New York, I paid a lot for a small studio. In Paris, my apartment is small too, but the price is a bit lower.",
        "SOPHIE: What about transport?",
        "ALEX: Paris is cheaper for transport. The метро is good, and I use it every day. In New York, I also used the subway, but I spent more on transport overall, especially when I used taxis sometimes.",
        "SOPHIE: Okay. And food? Groceries and restaurants?",
        "ALEX: Groceries feel a little cheaper in Paris. I buy bread, cheese, fruit, and vegetables, and it’s not too bad. In New York, I often paid more for the same basket.",
        "SOPHIE: And eating out?",
        "ALEX: Restaurants in Paris can be cheaper, especially if you choose a simple place. You can get a set lunch, like a main dish and a coffee. In New York, even a basic meal could be very expensive, and tips add a lot.",
        "SOPHIE: Ah yes, tips! In the U.S. you always tip, right?",
        "ALEX: Exactly. In New York, I had to think about tips all the time. In Paris, service is usually included, so I feel less stress.",
        "SOPHIE: What about coffee? I hear New York coffee is expensive.",
        "ALEX: In Paris, espresso is often cheap, especially at the bar. In New York, a coffee to go can cost a lot, and you buy it every day, so it adds up.",
        "SOPHIE: Sounds like Paris is cheaper then.",
        "ALEX: In daily life, yes, often. But some things in Paris are not cheap. Clothes can be expensive, and some apartments have extra costs like heating or building fees.",
        "SOPHIE: And salaries? Are they the same?",
        "ALEX: That’s the big point. New York salaries can be higher. So even if things cost more, people sometimes earn more too.",
        "SOPHIE: So your final answer: Is Paris cheaper than New York?",
        "ALEX: For me, yes—Paris is cheaper in many ways, especially transport, eating out, and coffee. But rent is still high, and it really depends on your lifestyle.",
        "SOPHIE: Good to know. I want to visit Paris, but I don’t want to spend all my money.",
        "ALEX: Don’t worry. If you plan well, Paris can be very manageable."
      ],
      "sourceNumber": 15,
      "sourceId": "paris-cheaper-than-new-york",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 9,
          "sourceFile": "grammar/09-present-perfect.md"
        },
        {
          "number": 10,
          "sourceFile": "grammar/10-present-perfect-vs-past-simple.md"
        },
        {
          "number": 16,
          "sourceFile": "grammar/16-comparatives-and-superlatives.md"
        }
      ],
      "rules": [
        "a2rule15_1",
        "a2rule15_2",
        "a2rule15_3"
      ],
      "theoryExamples": [
        "I have lived here for six months, and I still live here.",
        "I lived in New York for three years. Now I have been in Paris for six months.",
        "I have lived here since January. This flat is much cheaper than my old one."
      ],
      "examples": [
        "I have lived here for six months, and I still live here.",
        "I lived in New York for three years. Now I have been in Paris for six months.",
        "I have lived here since January. This flat is much cheaper than my old one."
      ],
      "vocabulary": [
        [
          "groceries",
          ""
        ],
        [
          "salary",
          ""
        ],
        [
          "heating",
          ""
        ],
        [
          "lifestyle",
          ""
        ],
        [
          "tip",
          ""
        ]
      ],
      "speakingSentences": [
        "I have lived here for six months.",
        "My new apartment is much cheaper than my old one."
      ],
      "speakingPrompt": "Compare places you have lived. Say how long you lived in a former home and how long you have lived in your current home.",
      "items": [
        {
          "type": "choice",
          "prompt": "I moved here six months ago and still live here: I ___ here for six months.",
          "answer": "have lived",
          "options": [
            "have lived",
            "lived yesterday",
            "am live"
          ],
          "explanation": "The situation continues now: have lived.",
          "id": "a2-15-g1",
          "rule": "a2feedback15_1",
          "source": "Adapted grammar task",
          "modelAnswer": "have lived"
        },
        {
          "type": "choice",
          "prompt": "I left New York last year: I ___ there for three years before moving.",
          "answer": "lived",
          "options": [
            "lived",
            "have lived",
            "live"
          ],
          "explanation": "This period is finished, so use Past Simple.",
          "id": "a2-15-g2",
          "rule": "a2feedback15_2",
          "source": "Adapted grammar task",
          "modelAnswer": "lived"
        },
        {
          "type": "choice",
          "prompt": "This apartment is ___ cheaper than my old one.",
          "answer": "much",
          "options": [
            "much",
            "very",
            "more"
          ],
          "explanation": "Much can strengthen a comparative; do not add more to cheaper.",
          "id": "a2-15-g3",
          "rule": "a2feedback15_3",
          "source": "Adapted grammar task",
          "modelAnswer": "much"
        },
        {
          "type": "input",
          "prompt": "I have lived here ___ six months. Use for or since.",
          "answers": [
            "for"
          ],
          "explanation": "Six months is a duration: for.",
          "id": "a2-15-g4",
          "rule": "a2feedback15_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I have lived here for six months. Use for or since."
        },
        {
          "type": "input",
          "prompt": "I have worked here ___ Monday. Use for or since.",
          "answers": [
            "since"
          ],
          "explanation": "Monday is a starting point: since.",
          "id": "a2-15-g5",
          "rule": "a2feedback15_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I have worked here since Monday. Use for or since."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "have",
            "lived",
            "here",
            "for",
            "six",
            "months."
          ],
          "answer": "I have lived here for six months.",
          "explanation": "Have + past participle lived forms Present Perfect; for introduces a duration.",
          "id": "a2-15-g6",
          "rule": "a2feedback15_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I have lived here for six months."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "How long did Alex live in New York?",
          "answer": "Three years",
          "options": [
            "Three years",
            "Six months",
            "One year"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-15-l1",
          "rule": "a2listen",
          "source": "Is Paris Cheaper Than New York?"
        },
        {
          "type": "choice",
          "prompt": "How long has he been in Paris?",
          "answer": "Six months",
          "options": [
            "Six months",
            "Three years",
            "Six years"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-15-l2",
          "rule": "a2listen",
          "source": "Is Paris Cheaper Than New York?"
        },
        {
          "type": "choice",
          "prompt": "According to Alex, which city is cheaper for transport?",
          "answer": "Paris",
          "options": [
            "Paris",
            "New York",
            "He says they cost the same."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-15-l3",
          "rule": "a2listen",
          "source": "Is Paris Cheaper Than New York?"
        },
        {
          "type": "choice",
          "prompt": "What does Alex say about New York salaries?",
          "answer": "They can be higher.",
          "options": [
            "They can be higher.",
            "They are always lower.",
            "He does not mention salaries."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-15-l4",
          "rule": "a2listen",
          "source": "Is Paris Cheaper Than New York?"
        },
        {
          "type": "choice",
          "prompt": "What does Alex say the overall comparison depends on?",
          "answer": "Your lifestyle",
          "options": [
            "Your lifestyle",
            "Only the weather",
            "Only the size of the city"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-15-l5",
          "rule": "a2listen",
          "source": "Is Paris Cheaper Than New York?"
        }
      ]
    },
    {
      "id": "a2-paris-sightseeing",
      "title": "a2l16",
      "goal": "a2g16",
      "person": "EMMA",
      "role": "Paris sightseeing",
      "audioTitle": "Paris sightseeing",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696dde5eed9005f847ac78ea_Paris%20sightseeing.mp3",
      "transcript": [
        "EMMA: Hi, Leo! You’ve been to Paris, right? I’m going next week, and I want a simple sightseeing plan. What are the main places I should see?",
        "LEO: Yes, I went last spring. Paris is amazing. First, you should see the Eiffel Tower. It’s the classic one.",
        "EMMA: Of course! Is it better in the day or at night?",
        "LEO: Both, but at night it’s special because the lights sparkle. If you have time, go up to the second floor. The view is great.",
        "EMMA: Nice. What’s next?",
        "LEO: The Louvre Museum. Even if you don’t love museums, it’s worth it. You can see the Mona Lisa, but it’s usually crowded.",
        "EMMA: I’m not sure I want to spend the whole day inside.",
        "LEO: You don’t need a whole day. You can choose a few sections and walk around for two or three hours. Also, the building is beautiful.",
        "EMMA: Good idea. What about churches? I like old buildings.",
        "LEO: Then go to Notre-Dame. You can’t always go inside because of the restoration, but the area is still great. Walk around the river near it.",
        "EMMA: The river is the Seine, right?",
        "LEO: Yes, the Seine. You should do a boat cruise. It’s relaxing, and you see many famous bridges and buildings from the water.",
        "EMMA: That sounds perfect. Any other “must-see” places?",
        "LEO: Montmartre and Sacré-Cœur. It’s a hill with a big white church at the top. The views are amazing, and the streets are very charming.",
        "EMMA: Is it far from the center?",
        "LEO: Not too far. You can take the metro. Just wear comfortable shoes because there are many stairs.",
        "EMMA: Okay! And what about shopping or walking areas?",
        "LEO: Walk on the Champs-Élysées and visit the Arc de Triomphe. You can go up to the top of the Arc too. It’s a nice view of the city streets.",
        "EMMA: Great. I also want some green parks.",
        "LEO: Go to the Luxembourg Gardens. It’s calm, clean, and very Parisian. People sit, read, and drink coffee nearby.",
        "EMMA: Wow, that’s a lot. How many days do I need?",
        "LEO: If you have two or three days, you can see the main attractions without rushing. My advice: don’t plan too much. Paris is also about walking, small cafés, and enjoying the atmosphere.",
        "EMMA: I love that. Thank you, Leo! Now I feel ready.",
        "LEO: You’re welcome! Take lots of photos—and eat a croissant for me!"
      ],
      "sourceNumber": 16,
      "sourceId": "paris-sightseeing",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 26,
          "sourceFile": "grammar/26-should.md"
        },
        {
          "number": 32,
          "sourceFile": "grammar/32-first-conditional-time-clauses.md"
        }
      ],
      "rules": [
        "a2rule16_1",
        "a2rule16_2",
        "a2rule16_3"
      ],
      "theoryExamples": [
        "You should wear comfortable shoes. You shouldn’t rush.",
        "Should we visit the museum? I don’t think you should plan too much.",
        "If you have time, visit the gardens. If you have two days, you can see the main sights."
      ],
      "examples": [
        "You should wear comfortable shoes. You shouldn’t rush.",
        "Should we visit the museum? I don’t think you should plan too much.",
        "If you have time, visit the gardens. If you have two days, you can see the main sights."
      ],
      "vocabulary": [
        [
          "attraction",
          ""
        ],
        [
          "cruise",
          ""
        ],
        [
          "bridge",
          ""
        ],
        [
          "charming",
          ""
        ],
        [
          "atmosphere",
          ""
        ]
      ],
      "speakingSentences": [
        "You should wear comfortable shoes.",
        "If you have time, visit the gardens."
      ],
      "speakingPrompt": "Recommend three places in your city. Use should, shouldn’t and one suggestion beginning with if.",
      "items": [
        {
          "type": "choice",
          "prompt": "You should ___ comfortable shoes.",
          "answer": "wear",
          "options": [
            "wear",
            "to wear",
            "wearing"
          ],
          "explanation": "After should use the base verb wear.",
          "id": "a2-16-g1",
          "rule": "a2feedback16_1",
          "source": "Adapted grammar task",
          "modelAnswer": "wear"
        },
        {
          "type": "choice",
          "prompt": "Choose the correct advice question.",
          "answer": "Should we visit the museum?",
          "options": [
            "Should we visit the museum?",
            "Do we should visit the museum?",
            "Should we to visit the museum?"
          ],
          "explanation": "Should comes before the subject without do or to.",
          "id": "a2-16-g2",
          "rule": "a2feedback16_2",
          "source": "Adapted grammar task",
          "modelAnswer": "Should we visit the museum?"
        },
        {
          "type": "choice",
          "prompt": "If you ___ time tomorrow, visit the gardens.",
          "answer": "have",
          "options": [
            "have",
            "will have",
            "having"
          ],
          "explanation": "This real future condition uses Present Simple after if.",
          "id": "a2-16-g3",
          "rule": "a2feedback16_3",
          "source": "Adapted grammar task",
          "modelAnswer": "have"
        },
        {
          "type": "input",
          "prompt": "You ___ rush. Use the negative form of should.",
          "answers": [
            "shouldn’t",
            "should not",
            "shouldn't"
          ],
          "explanation": "Shouldn’t or should not gives advice against rushing.",
          "id": "a2-16-g4",
          "rule": "a2feedback16_4",
          "source": "Adapted grammar task",
          "modelAnswer": "You shouldn’t rush. Use the negative form of should."
        },
        {
          "type": "input",
          "prompt": "If you have two days, you ___ see the main sights. Use can.",
          "answers": [
            "can"
          ],
          "explanation": "Can + base verb expresses what is possible under this condition.",
          "id": "a2-16-g5",
          "rule": "a2feedback16_5",
          "source": "Adapted grammar task",
          "modelAnswer": "If you have two days, you can see the main sights. Use can."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "You",
            "should",
            "visit",
            "the",
            "museum."
          ],
          "answer": "You should visit the museum.",
          "explanation": "Advice uses subject + should + base verb.",
          "id": "a2-16-g6",
          "rule": "a2feedback16_6",
          "source": "Adapted grammar task",
          "modelAnswer": "You should visit the museum."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Which landmark does Leo recommend first?",
          "answer": "The Eiffel Tower",
          "options": [
            "The Eiffel Tower",
            "The Arc de Triomphe",
            "The Luxembourg Gardens"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-16-l1",
          "rule": "a2listen",
          "source": "Paris sightseeing"
        },
        {
          "type": "choice",
          "prompt": "How much time does Leo suggest for selected Louvre sections?",
          "answer": "Two or three hours",
          "options": [
            "Two or three hours",
            "Two or three days",
            "Only ten minutes"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-16-l2",
          "rule": "a2listen",
          "source": "Paris sightseeing"
        },
        {
          "type": "choice",
          "prompt": "What does Leo suggest doing on the Seine?",
          "answer": "A boat cruise",
          "options": [
            "A boat cruise",
            "A cycling race",
            "A swimming lesson"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-16-l3",
          "rule": "a2listen",
          "source": "Paris sightseeing"
        },
        {
          "type": "choice",
          "prompt": "Why does Leo recommend comfortable shoes for Montmartre?",
          "answer": "There are many stairs.",
          "options": [
            "There are many stairs.",
            "The streets are always flooded.",
            "Visitors must run."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-16-l4",
          "rule": "a2listen",
          "source": "Paris sightseeing"
        },
        {
          "type": "choice",
          "prompt": "How many days does Leo suggest for the main attractions?",
          "answer": "Two or three days",
          "options": [
            "Two or three days",
            "Two or three hours",
            "At least two weeks"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-16-l5",
          "rule": "a2listen",
          "source": "Paris sightseeing"
        }
      ]
    },
    {
      "id": "a2-american-bars",
      "title": "a2l17",
      "goal": "a2g17",
      "person": "SOPHIE",
      "role": "American Bars",
      "audioTitle": "American Bars",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696dfbc4e25676fd5539d0c4_American%20Bars.mp3",
      "transcript": [
        "SOPHIE: Hey, Mike. You lived in the US for two years, right?",
        "MIKE: Yes, I did. Why?",
        "SOPHIE: I’m curious about American bars. Are they very different from bars here?",
        "MIKE: Some things are different, yes. In many American bars, people go after work to relax, watch sports, and talk. It’s not only about drinking.",
        "SOPHIE: So it’s more like a social place?",
        "MIKE: Exactly. Many bars have big TV screens, especially for basketball, baseball, and American football. On game nights, it can get very loud.",
        "SOPHIE: Sounds fun. What do people usually drink?",
        "MIKE: Beer is very popular. You can also find cocktails, but a lot of people order beer or something simple like a whiskey and soda.",
        "SOPHIE: And what about food? Do bars serve food too?",
        "MIKE: Yes, many of them do. Some bars are also restaurants. People order burgers, fries, chicken wings, or nachos. Wings are really common, especially when there’s a game.",
        "SOPHIE: Nice. I heard American bars check your ID a lot. Is that true?",
        "MIKE: Yes, it’s true. In the US you must be 21 to drink alcohol. Many places check your ID at the door, even if you look older. Sometimes they also put a stamp on your hand.",
        "SOPHIE: Wow. And is it expensive?",
        "MIKE: It depends on the city. In New York or San Francisco, it can be expensive. Also, you usually tip the bartender.",
        "SOPHIE: How much do you tip?",
        "MIKE: Often one dollar per drink, or around 15 to 20 percent if you have a bigger bill.",
        "SOPHIE: Good to know. What about the atmosphere? Is it friendly?",
        "MIKE: Usually, yes. People can be very open. Sometimes a stranger starts talking to you, especially at the bar counter. But it also depends on the place. A sports bar is different from a quiet cocktail bar.",
        "SOPHIE: Did you have a favorite type of bar?",
        "MIKE: I liked neighborhood bars. They are simple and comfortable, and the staff often knows the regular customers. It feels relaxed.",
        "SOPHIE: That sounds great. If I go to an American bar, what should I remember?",
        "MIKE: Bring your ID, be ready to tip, and don’t be surprised if the music is loud. And if you want a quieter place, go early in the evening.",
        "SOPHIE: Perfect. Thanks, Mike. Now I really want to try a sports bar in the US!",
        "MIKE: You should! It’s a fun experience."
      ],
      "sourceNumber": 17,
      "sourceId": "american-bars",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 18,
          "sourceFile": "grammar/18-expressing-purpose-to-vs-for.md"
        },
        {
          "number": 25,
          "sourceFile": "grammar/25-must-and-have-to.md"
        }
      ],
      "rules": [
        "a2rule17_1",
        "a2rule17_2",
        "a2rule17_3"
      ],
      "theoryExamples": [
        "We go out to relax. We meet for a chat. This screen is for watching games.",
        "You must follow the rules. You should choose a quiet place.",
        "You mustn’t block the door. You don’t have to order food."
      ],
      "examples": [
        "We go out to relax. We meet for a chat. This screen is for watching games.",
        "You must follow the rules. You should choose a quiet place.",
        "You mustn’t block the door. You don’t have to order food."
      ],
      "vocabulary": [
        [
          "bartender",
          ""
        ],
        [
          "counter",
          ""
        ],
        [
          "regular customer",
          ""
        ],
        [
          "neighborhood",
          ""
        ],
        [
          "bill",
          ""
        ]
      ],
      "speakingSentences": [
        "We meet after work to relax.",
        "You don’t have to order food."
      ],
      "speakingPrompt": "Describe a café or another social place. Explain why people go there, give one piece of advice and describe an optional activity.",
      "items": [
        {
          "type": "choice",
          "prompt": "Purpose: We meet after work ___ relax.",
          "answer": "to",
          "options": [
            "to",
            "for",
            "for to"
          ],
          "explanation": "Use to + base verb for the purpose of meeting.",
          "id": "a2-17-g1",
          "rule": "a2feedback17_1",
          "source": "Adapted grammar task",
          "modelAnswer": "to"
        },
        {
          "type": "choice",
          "prompt": "Name the activity: Let’s meet ___ a chat.",
          "answer": "for",
          "options": [
            "for",
            "to",
            "for to"
          ],
          "explanation": "For takes the noun phrase a chat.",
          "id": "a2-17-g2",
          "rule": "a2feedback17_2",
          "source": "Adapted grammar task",
          "modelAnswer": "for"
        },
        {
          "type": "choice",
          "prompt": "Food is optional. You ___ order food.",
          "answer": "don’t have to",
          "options": [
            "don’t have to",
            "mustn’t",
            "must"
          ],
          "explanation": "Don’t have to means there is no obligation.",
          "id": "a2-17-g3",
          "rule": "a2feedback17_3",
          "source": "Adapted grammar task",
          "modelAnswer": "don’t have to"
        },
        {
          "type": "input",
          "prompt": "This screen is for ___ games. Use watch.",
          "answers": [
            "watching"
          ],
          "explanation": "For + -ing describes the function of the screen.",
          "id": "a2-17-g4",
          "rule": "a2feedback17_4",
          "source": "Adapted grammar task",
          "modelAnswer": "This screen is for watching games. Use watch."
        },
        {
          "type": "input",
          "prompt": "Do you ___ to book a table? Use have.",
          "answers": [
            "have"
          ],
          "explanation": "Questions with have to use do + subject + have to.",
          "id": "a2-17-g5",
          "rule": "a2feedback17_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Do you have to book a table? Use have."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "You",
            "must",
            "follow",
            "the",
            "rules."
          ],
          "answer": "You must follow the rules.",
          "explanation": "Must takes the base verb without to.",
          "id": "a2-17-g6",
          "rule": "a2feedback17_6",
          "source": "Adapted grammar task",
          "modelAnswer": "You must follow the rules."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "How long did Mike live in the US?",
          "answer": "Two years",
          "options": [
            "Two years",
            "Two months",
            "Ten years"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-17-l1",
          "rule": "a2listen",
          "source": "American Bars"
        },
        {
          "type": "choice",
          "prompt": "What do many bars have for watching sports, according to Mike?",
          "answer": "Big TV screens",
          "options": [
            "Big TV screens",
            "Only small radios",
            "Cinema tickets"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-17-l2",
          "rule": "a2listen",
          "source": "American Bars"
        },
        {
          "type": "choice",
          "prompt": "Which food does Mike say is common on game nights?",
          "answer": "Chicken wings",
          "options": [
            "Chicken wings",
            "Only fruit",
            "Only soup"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-17-l3",
          "rule": "a2listen",
          "source": "American Bars"
        },
        {
          "type": "choice",
          "prompt": "What type of bar did Mike like?",
          "answer": "Neighborhood bars",
          "options": [
            "Neighborhood bars",
            "Only airport bars",
            "Only hotel bars"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-17-l4",
          "rule": "a2listen",
          "source": "American Bars"
        },
        {
          "type": "choice",
          "prompt": "When does Mike suggest going for a quieter experience?",
          "answer": "Early in the evening",
          "options": [
            "Early in the evening",
            "At midnight",
            "Only after a game finishes"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-17-l5",
          "rule": "a2listen",
          "source": "American Bars"
        }
      ]
    },
    {
      "id": "a2-future-plans-anna",
      "title": "a2l18",
      "goal": "a2g18",
      "person": "Anna",
      "role": "Future plans",
      "audioTitle": "Future plans",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/6963952390e73056cbb7e8ac_Anna%20%E2%80%94%20Future%20plans%20(%20A2%20Pre-Intermediate).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. When I think about my future, I feel excited and a little nervous. This year, I’m going to focus on my English. I want to speak more confidently at work and when I travel. Next summer, I’m planning to visit a new country with my sister. We want to see museums, try local food, and take lots of photos. I’m also going to save money every month, because I want to move to a bigger apartment one day. In the future, I’d like to change my job and work in a more creative area. I don’t know exactly when, but I’m taking small steps now, and that feels good."
      ],
      "sourceNumber": 18,
      "sourceId": "future-plans-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 29,
          "sourceFile": "grammar/29-will-vs-going-to.md"
        },
        {
          "number": 30,
          "sourceFile": "grammar/30-present-continuous-future-vs-going-to.md"
        },
        {
          "number": 19,
          "sourceFile": "grammar/19-infinitives-and-gerunds.md"
        }
      ],
      "rules": [
        "a2rule18_1",
        "a2rule18_2",
        "a2rule18_3"
      ],
      "theoryExamples": [
        "I’m going to save money. Are you going to travel?",
        "I’ll help you. I’m going to study tonight. I’m meeting my tutor at six.",
        "I want to travel. I’d like to change my job. I’m planning to visit my sister."
      ],
      "examples": [
        "I’m going to save money. Are you going to travel?",
        "I’ll help you. I’m going to study tonight. I’m meeting my tutor at six.",
        "I want to travel. I’d like to change my job. I’m planning to visit my sister."
      ],
      "vocabulary": [
        [
          "focus",
          ""
        ],
        [
          "confidently",
          ""
        ],
        [
          "creative",
          ""
        ],
        [
          "step",
          ""
        ],
        [
          "save money",
          ""
        ]
      ],
      "speakingSentences": [
        "I am going to focus on my English.",
        "I would like to work in a more creative area."
      ],
      "speakingPrompt": "Describe two intentions for this year and one future wish. Use going to, plan to and would like to.",
      "items": [
        {
          "type": "choice",
          "prompt": "Use going to: I ___ save money every month.",
          "answer": "am going to",
          "options": [
            "am going to",
            "going to",
            "am going"
          ],
          "explanation": "With I use am going to + base verb.",
          "id": "a2-18-g1",
          "rule": "a2feedback18_1",
          "source": "Adapted grammar task",
          "modelAnswer": "am going to"
        },
        {
          "type": "choice",
          "prompt": "In “I’ll help you with that bag,” what does will express?",
          "answer": "An offer made now",
          "options": [
            "An offer made now",
            "A finished past habit",
            "A rule about yesterday"
          ],
          "explanation": "I’ll help you is an offer made at the moment of speaking.",
          "id": "a2-18-g2",
          "rule": "a2feedback18_2",
          "source": "Adapted grammar task",
          "modelAnswer": "An offer made now"
        },
        {
          "type": "choice",
          "prompt": "I would like ___ my job.",
          "answer": "to change",
          "options": [
            "to change",
            "changing",
            "change"
          ],
          "explanation": "Would like takes a to-infinitive.",
          "id": "a2-18-g3",
          "rule": "a2feedback18_3",
          "source": "Adapted grammar task",
          "modelAnswer": "to change"
        },
        {
          "type": "input",
          "prompt": "She ___ going to study tonight. Use be.",
          "answers": [
            "is"
          ],
          "explanation": "With she use is going to.",
          "id": "a2-18-g4",
          "rule": "a2feedback18_4",
          "source": "Adapted grammar task",
          "modelAnswer": "She is going to study tonight. Use be."
        },
        {
          "type": "input",
          "prompt": "I’m planning ___ visit a new country.",
          "answers": [
            "to"
          ],
          "explanation": "Plan takes to + base verb; planning alone does not confirm a booking.",
          "id": "a2-18-g5",
          "rule": "a2feedback18_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I’m planning to visit a new country."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "am",
            "going",
            "to",
            "save",
            "money."
          ],
          "answer": "I am going to save money.",
          "explanation": "Future intention: subject + am + going to + base verb.",
          "id": "a2-18-g6",
          "rule": "a2feedback18_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I am going to save money."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What is Anna going to focus on this year?",
          "answer": "Her English",
          "options": [
            "Her English",
            "Learning to drive",
            "Training for a marathon"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-18-l1",
          "rule": "a2listen",
          "source": "Future plans"
        },
        {
          "type": "choice",
          "prompt": "When is she planning to visit a new country?",
          "answer": "Next summer",
          "options": [
            "Next summer",
            "Tomorrow",
            "Last winter"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-18-l2",
          "rule": "a2listen",
          "source": "Future plans"
        },
        {
          "type": "choice",
          "prompt": "Who is she planning to travel with?",
          "answer": "Her sister",
          "options": [
            "Her sister",
            "Her manager",
            "Her parents"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-18-l3",
          "rule": "a2listen",
          "source": "Future plans"
        },
        {
          "type": "choice",
          "prompt": "Why is she going to save money?",
          "answer": "She wants a bigger apartment.",
          "options": [
            "She wants a bigger apartment.",
            "She wants a new car.",
            "She wants to buy a café."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-18-l4",
          "rule": "a2listen",
          "source": "Future plans"
        },
        {
          "type": "choice",
          "prompt": "What kind of work would she like in the future?",
          "answer": "A more creative area",
          "options": [
            "A more creative area",
            "Only night shifts",
            "The same job with fewer holidays"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-18-l5",
          "rule": "a2listen",
          "source": "Future plans"
        }
      ]
    },
    {
      "id": "a2-new-years-resolutions-anna",
      "title": "a2l19",
      "goal": "a2g19",
      "person": "Anna",
      "role": "New Year’s resolutions",
      "audioTitle": "New Year’s resolutions",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696374aef864bc7fc50f9623_Listening%20A2.%20New%20Year%E2%80%99s%20resolutions%20%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. This year, I’m going to change a few things in my life. First, I’m going to wake up earlier on weekdays, because I often feel rushed in the morning. I’m also going to cook at home more. I usually buy food when I’m tired, but I want to eat healthier and save money. Another plan is to exercise three times a week. I’m not going to do anything extreme—just walking, stretching, and maybe a short workout video. I’m also going to practice English every day for ten minutes. Even a little practice will help me improve. Finally, I’m going to spend less time on my phone at night and read a book before I sleep."
      ],
      "sourceNumber": 19,
      "sourceId": "new-years-resolutions-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 29,
          "sourceFile": "grammar/29-will-vs-going-to.md"
        },
        {
          "number": 13,
          "sourceFile": "grammar/13-quantifiers.md"
        },
        {
          "number": 14,
          "sourceFile": "grammar/14-too-and-enough.md"
        }
      ],
      "rules": [
        "a2rule19_1",
        "a2rule19_2",
        "a2rule19_3"
      ],
      "theoryExamples": [
        "I’m not going to do anything extreme.",
        "I have a few goals and a little time.",
        "I want less screen time and fewer distractions."
      ],
      "examples": [
        "I’m not going to do anything extreme.",
        "I have a few goals and a little time.",
        "I want less screen time and fewer distractions."
      ],
      "vocabulary": [
        [
          "weekday",
          ""
        ],
        [
          "rushed",
          ""
        ],
        [
          "stretching",
          ""
        ],
        [
          "workout",
          ""
        ],
        [
          "extreme",
          ""
        ]
      ],
      "speakingSentences": [
        "I am going to practise English every day.",
        "I want to spend less time on my phone."
      ],
      "speakingPrompt": "Describe three realistic resolutions. Use a negative going to sentence and a few, a little or less.",
      "items": [
        {
          "type": "choice",
          "prompt": "Choose the correct negative intention.",
          "answer": "I am not going to stop.",
          "options": [
            "I am not going to stop.",
            "I am going not to stop.",
            "I not am going to stop."
          ],
          "explanation": "Put not after am, before going to.",
          "id": "a2-19-g1",
          "rule": "a2feedback19_1",
          "source": "Adapted grammar task",
          "modelAnswer": "I am not going to stop."
        },
        {
          "type": "choice",
          "prompt": "I have ___ goals: just two or three.",
          "answer": "a few",
          "options": [
            "a few",
            "a little",
            "much"
          ],
          "explanation": "Goals is a plural countable noun: a few.",
          "id": "a2-19-g2",
          "rule": "a2feedback19_2",
          "source": "Adapted grammar task",
          "modelAnswer": "a few"
        },
        {
          "type": "choice",
          "prompt": "I want to spend ___ time on my phone.",
          "answer": "less",
          "options": [
            "less",
            "fewer",
            "many"
          ],
          "explanation": "Time is uncountable: less.",
          "id": "a2-19-g3",
          "rule": "a2feedback19_3",
          "source": "Adapted grammar task",
          "modelAnswer": "less"
        },
        {
          "type": "input",
          "prompt": "I have a ___ time to practise. Use little or few.",
          "answers": [
            "little"
          ],
          "explanation": "Time is uncountable: a little time.",
          "id": "a2-19-g4",
          "rule": "a2feedback19_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I have a little time to practise. Use little or few."
        },
        {
          "type": "input",
          "prompt": "There are too ___ distractions. Use much or many.",
          "answers": [
            "many"
          ],
          "explanation": "Distractions is plural and countable: too many.",
          "id": "a2-19-g5",
          "rule": "a2feedback19_5",
          "source": "Adapted grammar task",
          "modelAnswer": "There are too many distractions. Use much or many."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "am",
            "not",
            "going",
            "to",
            "stop",
            "practising."
          ],
          "answer": "I am not going to stop practising.",
          "explanation": "Not follows am; going to is followed by the base verb stop.",
          "id": "a2-19-g6",
          "rule": "a2feedback19_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I am not going to stop practising."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "When does Anna plan to wake up earlier?",
          "answer": "On weekdays",
          "options": [
            "On weekdays",
            "Only on Sundays",
            "Only on holidays"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-19-l1",
          "rule": "a2listen",
          "source": "New Year’s resolutions"
        },
        {
          "type": "choice",
          "prompt": "Why does she want to cook at home more?",
          "answer": "To eat healthier and save money",
          "options": [
            "To eat healthier and save money",
            "To open a restaurant",
            "To stop eating vegetables"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-19-l2",
          "rule": "a2listen",
          "source": "New Year’s resolutions"
        },
        {
          "type": "choice",
          "prompt": "How often does she plan to exercise?",
          "answer": "Three times a week",
          "options": [
            "Three times a week",
            "Three times a day",
            "Once a month"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-19-l3",
          "rule": "a2listen",
          "source": "New Year’s resolutions"
        },
        {
          "type": "choice",
          "prompt": "How long is her planned daily English practice?",
          "answer": "Ten minutes",
          "options": [
            "Ten minutes",
            "Thirty minutes",
            "Two hours"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-19-l4",
          "rule": "a2listen",
          "source": "New Year’s resolutions"
        },
        {
          "type": "choice",
          "prompt": "What does she plan to do before sleeping?",
          "answer": "Read a book",
          "options": [
            "Read a book",
            "Watch a long workout video",
            "Check work emails"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-19-l5",
          "rule": "a2listen",
          "source": "New Year’s resolutions"
        }
      ]
    },
    {
      "id": "a2-life-changes-anna",
      "title": "a2l20",
      "goal": "a2g20",
      "person": "Anna",
      "role": "Life changes",
      "audioTitle": "Life changes",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696671ca4f87ead420b2db04_Listening%20A2.%20Life%20changes%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. Recently, my life has changed a lot. About three months ago, I moved to a new apartment. Before that, I lived with my sister, and we shared everything. Now I live alone, and I have my own routine. At first, I felt a little nervous, because the apartment was quiet at night. But now I enjoy it. I can choose my music, my food, and my schedule.",
        "Anna: Another big change is my job. I started working at a small travel company. My old job was simple and calm, but this new job is much busier. I answer emails, speak to customers, and help people plan trips. In the beginning, I made many small mistakes, and I felt embarrassed. But my manager is kind, and my colleagues help me. I’m learning every day.",
        "Anna: I also changed my habits. I cook more often now, and I try to eat healthier food. I even started going for short walks after dinner. These changes are not always easy, but I feel more independent and more confident. I think this new chapter is good for me."
      ],
      "sourceNumber": 20,
      "sourceId": "life-changes-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 10,
          "sourceFile": "grammar/10-present-perfect-vs-past-simple.md"
        },
        {
          "number": 23,
          "sourceFile": "grammar/23-uses-of-get.md"
        },
        {
          "number": 8,
          "sourceFile": "grammar/08-connectors.md"
        }
      ],
      "rules": [
        "a2rule20_1",
        "a2rule20_2",
        "a2rule20_3"
      ],
      "theoryExamples": [
        "My life has changed. I moved three months ago.",
        "I got nervous before the meeting. I am getting more confident now.",
        "At first I was nervous. In the end, I enjoyed it."
      ],
      "examples": [
        "My life has changed. I moved three months ago.",
        "I got nervous before the meeting. I am getting more confident now.",
        "At first I was nervous. In the end, I enjoyed it."
      ],
      "vocabulary": [
        [
          "schedule",
          ""
        ],
        [
          "embarrassed",
          ""
        ],
        [
          "colleague",
          ""
        ],
        [
          "travel company",
          ""
        ],
        [
          "chapter",
          ""
        ]
      ],
      "speakingSentences": [
        "My life has changed a lot recently.",
        "I moved to a new apartment three months ago."
      ],
      "speakingPrompt": "Describe a recent change. Announce it with Present Perfect, then give a finished-time detail in Past Simple.",
      "items": [
        {
          "type": "choice",
          "prompt": "Use Present Perfect: My life ___ a lot recently.",
          "answer": "has changed",
          "options": [
            "has changed",
            "has change",
            "have changed"
          ],
          "explanation": "My life is singular: has + past participle changed.",
          "id": "a2-20-g1",
          "rule": "a2feedback20_1",
          "source": "Adapted grammar task",
          "modelAnswer": "has changed"
        },
        {
          "type": "choice",
          "prompt": "Three months ago, I ___ to a new apartment.",
          "answer": "moved",
          "options": [
            "moved",
            "have moved",
            "move"
          ],
          "explanation": "Ago gives a finished past time: moved.",
          "id": "a2-20-g2",
          "rule": "a2feedback20_2",
          "source": "Adapted grammar task",
          "modelAnswer": "moved"
        },
        {
          "type": "choice",
          "prompt": "Use get in Past Simple: I ___ nervous before yesterday’s meeting.",
          "answer": "got",
          "options": [
            "got",
            "get",
            "getting"
          ],
          "explanation": "The past form of get is got.",
          "id": "a2-20-g3",
          "rule": "a2feedback20_3",
          "source": "Adapted grammar task",
          "modelAnswer": "got"
        },
        {
          "type": "input",
          "prompt": "I ___ getting more confident now. Use be.",
          "answers": [
            "am"
          ],
          "explanation": "With I, the continuous form uses am.",
          "id": "a2-20-g4",
          "rule": "a2feedback20_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I am getting more confident now. Use be."
        },
        {
          "type": "input",
          "prompt": "Finally, I enjoyed it. ___ the end, I enjoyed it.",
          "answers": [
            "In"
          ],
          "explanation": "In the end describes the final outcome.",
          "id": "a2-20-g5",
          "rule": "a2feedback20_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Finally, I enjoyed it. In the end, I enjoyed it."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "moved",
            "three",
            "months",
            "ago."
          ],
          "answer": "I moved three months ago.",
          "explanation": "A finished time with ago takes Past Simple.",
          "id": "a2-20-g6",
          "rule": "a2feedback20_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I moved three months ago."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "When did Anna move to a new apartment?",
          "answer": "About three months ago",
          "options": [
            "About three months ago",
            "Last week",
            "About three years ago"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-20-l1",
          "rule": "a2listen",
          "source": "Life changes"
        },
        {
          "type": "choice",
          "prompt": "Who did she live with before moving?",
          "answer": "Her sister",
          "options": [
            "Her sister",
            "Her manager",
            "Her parents"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-20-l2",
          "rule": "a2listen",
          "source": "Life changes"
        },
        {
          "type": "choice",
          "prompt": "Where did she start working?",
          "answer": "At a small travel company",
          "options": [
            "At a small travel company",
            "At a large hospital",
            "At a school"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-20-l3",
          "rule": "a2listen",
          "source": "Life changes"
        },
        {
          "type": "choice",
          "prompt": "How does her new job compare with her old job?",
          "answer": "It is much busier.",
          "options": [
            "It is much busier.",
            "It is much quieter.",
            "It has no customers."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-20-l4",
          "rule": "a2listen",
          "source": "Life changes"
        },
        {
          "type": "choice",
          "prompt": "What activity has she started after dinner?",
          "answer": "Short walks",
          "options": [
            "Short walks",
            "Swimming lessons",
            "Long work meetings"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-20-l5",
          "rule": "a2listen",
          "source": "Life changes"
        }
      ]
    },
    {
      "id": "a2-working-from-home",
      "title": "a2l21",
      "goal": "a2g21",
      "person": "EMMA",
      "role": "Working from home",
      "audioTitle": "Working from home",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696c6e14dc97d40f575814a5_Working%20from%20home.mp3",
      "transcript": [
        "EMMA: Hey Jake, are you working already?",
        "JAKE: Yeah. I started at eight. I wanted to finish my first tasks early. What about you?",
        "EMMA: I just made coffee. I’m going to check my emails now.",
        "JAKE: How is working from home for you?",
        "EMMA: I like it, but it’s not always easy. My apartment is small, so my “office” is my kitchen table.",
        "JAKE: Same here. I work in the living room. I have a desk, but it’s right next to the sofa, so I get distracted.",
        "EMMA: Exactly! Sometimes I sit down to work, and then I see the TV and think, “Just one episode.”",
        "JAKE: Do you have a normal routine?",
        "EMMA: I try. I wake up, take a shower, and get dressed like I’m going to the office. If I stay in pajamas, I feel lazy.",
        "JAKE: Good idea. I also take a short walk before work. It helps me feel ready.",
        "EMMA: What about breaks?",
        "JAKE: I take a break every hour. I stand up, stretch, and drink water. If I don’t, my back hurts.",
        "EMMA: Same. And I try not to check my phone too much, but it’s hard.",
        "JAKE: Do you miss working in an office?",
        "EMMA: Sometimes, yes. I miss talking to people. At home it can be quiet, and I feel a bit lonely.",
        "JAKE: I understand. I miss small things like lunch with coworkers. Video calls are useful, but they feel different.",
        "EMMA: True. And sometimes meetings online are longer than meetings in real life.",
        "JAKE: What is the best thing about working from home?",
        "EMMA: No commuting. I save time and money. Also, I can cook at home and eat healthier.",
        "JAKE: For me, it’s flexibility. If I finish early, I can go out or do something relaxing.",
        "EMMA: And the worst thing?",
        "JAKE: For me, it’s switching off. When my laptop is near me, I keep thinking about work.",
        "EMMA: Same. Maybe we need a rule: after six, no work messages.",
        "JAKE: Deal. Let’s try it today."
      ],
      "sourceNumber": 21,
      "sourceId": "working-from-home",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 32,
          "sourceFile": "grammar/32-first-conditional-time-clauses.md"
        },
        {
          "number": 27,
          "sourceFile": "grammar/27-might.md"
        },
        {
          "number": 28,
          "sourceFile": "grammar/28-may-vs-might.md"
        }
      ],
      "rules": [
        "a2rule21_1",
        "a2rule21_2",
        "a2rule21_3"
      ],
      "theoryExamples": [
        "If I stay in pajamas, I feel lazy. If I finish early tomorrow, I’ll go out.",
        "I might take a walk later. I might not finish early.",
        "I’ll switch off my laptop when I finish work."
      ],
      "examples": [
        "If I stay in pajamas, I feel lazy. If I finish early tomorrow, I’ll go out.",
        "I might take a walk later. I might not finish early.",
        "I’ll switch off my laptop when I finish work."
      ],
      "vocabulary": [
        [
          "distracted",
          ""
        ],
        [
          "commuting",
          ""
        ],
        [
          "flexibility",
          ""
        ],
        [
          "switch off",
          ""
        ],
        [
          "coworker",
          ""
        ]
      ],
      "speakingSentences": [
        "If I finish early, I will go for a walk.",
        "I might take a break later."
      ],
      "speakingPrompt": "Describe your work or study routine. Give a future if-result, a time clause and one uncertain plan with might.",
      "items": [
        {
          "type": "choice",
          "prompt": "If I finish early tomorrow, I ___ go for a walk. Use will.",
          "answer": "will",
          "options": [
            "will",
            "would",
            "am"
          ],
          "explanation": "Will + base verb gives a real future result here.",
          "id": "a2-21-g1",
          "rule": "a2feedback21_1",
          "source": "Adapted grammar task",
          "modelAnswer": "will"
        },
        {
          "type": "choice",
          "prompt": "Use might: I ___ a break later.",
          "answer": "might take",
          "options": [
            "might take",
            "might to take",
            "might taking"
          ],
          "explanation": "Might takes the base verb take.",
          "id": "a2-21-g2",
          "rule": "a2feedback21_2",
          "source": "Adapted grammar task",
          "modelAnswer": "might take"
        },
        {
          "type": "choice",
          "prompt": "I’ll close my laptop when I ___ work.",
          "answer": "finish",
          "options": [
            "finish",
            "will finish",
            "finishing"
          ],
          "explanation": "This future time clause uses Present Simple after when.",
          "id": "a2-21-g3",
          "rule": "a2feedback21_3",
          "source": "Adapted grammar task",
          "modelAnswer": "finish"
        },
        {
          "type": "input",
          "prompt": "If I ___ early tomorrow, I’ll go out. Use finish.",
          "answers": [
            "finish"
          ],
          "explanation": "Use Present Simple in this real future if-clause.",
          "id": "a2-21-g4",
          "rule": "a2feedback21_4",
          "source": "Adapted grammar task",
          "modelAnswer": "If I finish early tomorrow, I’ll go out. Use finish."
        },
        {
          "type": "input",
          "prompt": "I might ___ finish early. Use not.",
          "answers": [
            "not"
          ],
          "explanation": "Might not expresses a possible negative result.",
          "id": "a2-21-g5",
          "rule": "a2feedback21_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I might not finish early. Use not."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "might",
            "take",
            "a",
            "walk",
            "later."
          ],
          "answer": "I might take a walk later.",
          "explanation": "Possibility uses might + base verb.",
          "id": "a2-21-g6",
          "rule": "a2feedback21_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I might take a walk later."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What time did Jake start working?",
          "answer": "At eight",
          "options": [
            "At eight",
            "At six",
            "At ten"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-21-l1",
          "rule": "a2listen",
          "source": "Working from home"
        },
        {
          "type": "choice",
          "prompt": "Where is Emma’s home office?",
          "answer": "At her kitchen table",
          "options": [
            "At her kitchen table",
            "In a separate garden room",
            "In her bedroom"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-21-l2",
          "rule": "a2listen",
          "source": "Working from home"
        },
        {
          "type": "choice",
          "prompt": "How often does Jake take a break?",
          "answer": "Every hour",
          "options": [
            "Every hour",
            "Once a week",
            "Only at lunchtime"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-21-l3",
          "rule": "a2listen",
          "source": "Working from home"
        },
        {
          "type": "choice",
          "prompt": "What is the best part for Emma?",
          "answer": "No commuting",
          "options": [
            "No commuting",
            "Longer online meetings",
            "Working in pajamas"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-21-l4",
          "rule": "a2listen",
          "source": "Working from home"
        },
        {
          "type": "choice",
          "prompt": "What rule do they decide to try?",
          "answer": "No work messages after six",
          "options": [
            "No work messages after six",
            "No breaks before six",
            "Work all weekend"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-21-l5",
          "rule": "a2listen",
          "source": "Working from home"
        }
      ]
    },
    {
      "id": "a2-learning-a-new-job",
      "title": "a2l22",
      "goal": "a2g22",
      "person": "MARIA",
      "role": "Learning a new job",
      "audioTitle": "Learning a new job",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696c73fb41662fa6f4544054_Learning%20a%20new%20job.mp3",
      "transcript": [
        "MARIA: Hi Daniel. How was your day at the apprenticeship?",
        "DANIEL: Hi Maria. It was busy, but good. I learned a lot today. What about you?",
        "MARIA: Same. I feel tired, but I’m happy. Today my supervisor showed me how to use the new system.",
        "DANIEL: Oh, the computer system? I used it yesterday and I made a few mistakes.",
        "MARIA: Really? What happened?",
        "DANIEL: I entered the wrong number in one form, so the order was incorrect. My mentor noticed it quickly, and we fixed it together.",
        "MARIA: That’s good. My mentor is kind too. She says it’s normal to make mistakes in the beginning.",
        "DANIEL: Yes, exactly. At first I felt nervous, because everything is new. The office is fast, and people talk so quickly.",
        "MARIA: I know! Sometimes I understand, and sometimes I don’t. When I don’t understand, I ask them to repeat.",
        "DANIEL: What tasks did you do today?",
        "MARIA: I answered simple emails, I wrote notes from a meeting, and I prepared some documents. It was not difficult, but I had to be careful.",
        "DANIEL: Sounds useful. I helped in the storage room today. I checked products, I printed labels, and I packed two small boxes.",
        "MARIA: Are you working with many people?",
        "DANIEL: Not many. Mostly with my mentor, Alex, and one other apprentice. They are friendly, but I’m still shy.",
        "MARIA: Don’t worry. It takes time. I was shy last week, but now I talk more.",
        "DANIEL: What is the hardest part for you?",
        "MARIA: Time management. I want to do everything perfectly, so I work slowly. My mentor told me, “First do it correctly, then do it faster.”",
        "DANIEL: That’s a good rule. For me, the hardest part is remembering all the steps. There are so many small details.",
        "MARIA: How do you practice after work?",
        "DANIEL: I write a short list of new words and new actions. Then I read it at home. And you?",
        "MARIA: I watch short videos about the job, and I take notes. I also ask my mentor one question every day.",
        "DANIEL: Nice. Are you enjoying it so far?",
        "MARIA: Yes. I feel more confident than last week. And I like learning something new.",
        "DANIEL: Me too. It’s challenging, but I think we will get better soon.",
        "MARIA: Definitely. Let’s keep going!"
      ],
      "sourceNumber": 22,
      "sourceId": "learning-a-new-job",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 6,
          "sourceFile": "grammar/06-past-simple.md"
        },
        {
          "number": 20,
          "sourceFile": "grammar/20-verbs-with-two-objects.md"
        },
        {
          "number": 21,
          "sourceFile": "grammar/21-do-vs-make.md"
        }
      ],
      "rules": [
        "a2rule22_1",
        "a2rule22_2",
        "a2rule22_3"
      ],
      "theoryExamples": [
        "I wrote notes. What did you do? I wasn’t ready.",
        "She showed me the system. She explained the system to me.",
        "I did the task, then made a list. We checked it at the end of the day."
      ],
      "examples": [
        "I wrote notes. What did you do? I wasn’t ready.",
        "She showed me the system. She explained the system to me.",
        "I did the task, then made a list. We checked it at the end of the day."
      ],
      "vocabulary": [
        [
          "apprenticeship",
          ""
        ],
        [
          "supervisor",
          ""
        ],
        [
          "mentor",
          ""
        ],
        [
          "label",
          ""
        ],
        [
          "time management",
          ""
        ]
      ],
      "speakingSentences": [
        "I wrote notes and prepared some documents.",
        "My supervisor showed me the new system."
      ],
      "speakingPrompt": "Describe three tasks you completed while learning something new. Explain who showed or explained something to you.",
      "items": [
        {
          "type": "choice",
          "prompt": "What did you ___ yesterday?",
          "answer": "do",
          "options": [
            "do",
            "did",
            "doing"
          ],
          "explanation": "After did use the base verb do.",
          "id": "a2-22-g1",
          "rule": "a2feedback22_1",
          "source": "Adapted grammar task",
          "modelAnswer": "do"
        },
        {
          "type": "choice",
          "prompt": "Choose the correct pattern with explain.",
          "answer": "Explain the system to me.",
          "options": [
            "Explain the system to me.",
            "Explain me the system.",
            "Explain to me it."
          ],
          "explanation": "Explain takes the thing, then to + receiver.",
          "id": "a2-22-g2",
          "rule": "a2feedback22_2",
          "source": "Adapted grammar task",
          "modelAnswer": "Explain the system to me."
        },
        {
          "type": "choice",
          "prompt": "I ___ a mistake in the form.",
          "answer": "made",
          "options": [
            "made",
            "did",
            "had made to"
          ],
          "explanation": "Make a mistake is the usual combination.",
          "id": "a2-22-g3",
          "rule": "a2feedback22_3",
          "source": "Adapted grammar task",
          "modelAnswer": "made"
        },
        {
          "type": "input",
          "prompt": "Yesterday I ___ notes. Use write in Past Simple.",
          "answers": [
            "wrote"
          ],
          "explanation": "The past form of write is wrote.",
          "id": "a2-22-g4",
          "rule": "a2feedback22_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Yesterday I wrote notes. Use write in Past Simple."
        },
        {
          "type": "input",
          "prompt": "She sent the file ___ me. Use to or for.",
          "answers": [
            "to"
          ],
          "explanation": "Send uses to for the receiver in this pattern.",
          "id": "a2-22-g5",
          "rule": "a2feedback22_5",
          "source": "Adapted grammar task",
          "modelAnswer": "She sent the file to me. Use to or for."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "She",
            "showed",
            "me",
            "the",
            "new",
            "system."
          ],
          "answer": "She showed me the new system.",
          "explanation": "Show can take receiver me before the thing the new system.",
          "id": "a2-22-g6",
          "rule": "a2feedback22_6",
          "source": "Adapted grammar task",
          "modelAnswer": "She showed me the new system."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What error did Daniel make in the computer system?",
          "answer": "He entered the wrong number.",
          "options": [
            "He entered the wrong number.",
            "He deleted every file.",
            "He forgot his password."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-22-l1",
          "rule": "a2listen",
          "source": "Learning a new job"
        },
        {
          "type": "choice",
          "prompt": "Who helped fix the error?",
          "answer": "His mentor",
          "options": [
            "His mentor",
            "A customer",
            "His sister"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-22-l2",
          "rule": "a2listen",
          "source": "Learning a new job"
        },
        {
          "type": "choice",
          "prompt": "Which task did Maria do?",
          "answer": "Prepared documents",
          "options": [
            "Prepared documents",
            "Packed two boxes",
            "Printed product labels"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-22-l3",
          "rule": "a2listen",
          "source": "Learning a new job"
        },
        {
          "type": "choice",
          "prompt": "How many boxes did Daniel pack?",
          "answer": "Two",
          "options": [
            "Two",
            "Ten",
            "Twenty"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-22-l4",
          "rule": "a2listen",
          "source": "Learning a new job"
        },
        {
          "type": "choice",
          "prompt": "What is the hardest part for Maria?",
          "answer": "Time management",
          "options": [
            "Time management",
            "Remembering every step",
            "Using a phone"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-22-l5",
          "rule": "a2listen",
          "source": "Learning a new job"
        }
      ]
    },
    {
      "id": "a2-job-interview",
      "title": "a2l23",
      "goal": "a2g23",
      "person": "NTERVIEWER",
      "role": "Job interview",
      "audioTitle": "Job interview",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/6966689c0c7308af961b678c_Listening%20A2.%20Job%20interview.mp3",
      "transcript": [
        "NTERVIEWER: Good morning. Please come in and have a seat.",
        "CANDIDATE: Good morning. Thank you.",
        "INTERVIEWER: My name is Emma. I’m the office manager here. What is your name?",
        "CANDIDATE: I’m Daniel. Daniel Smith.",
        "INTERVIEWER: Nice to meet you, Daniel. Are you comfortable?",
        "CANDIDATE: Yes, I am. Thank you.",
        "INTERVIEWER: Great. So, why are you here today?",
        "CANDIDATE: I’m here for the customer service job. I saw your advertisement online, and I want to work here because I like helping people.",
        "INTERVIEWER: Good. Can you tell me a little about yourself?",
        "CANDIDATE: Sure. I’m 27 years old, and I live near the city center. I’m friendly and calm, and I work well with people. I speak English and a little Russian.",
        "INTERVIEWER: Nice. Do you have work experience?",
        "CANDIDATE: Yes. I worked in a small hotel for one year. I answered calls, helped guests, and solved small problems. I also worked in a café on weekends.",
        "INTERVIEWER: What did you like about that hotel job?",
        "CANDIDATE: I liked talking to guests and making them feel comfortable. When someone was angry, I stayed polite and tried to find a solution.",
        "INTERVIEWER: Good. What are your strengths?",
        "CANDIDATE: I’m patient, responsible, and I learn fast. I can work under pressure, and I’m good at organizing my time.",
        "INTERVIEWER: And what is one thing you want to improve?",
        "CANDIDATE: Sometimes I worry too much about small details. Now I try to focus on the most important tasks first.",
        "INTERVIEWER: That’s honest. Can you work shifts, including weekends?",
        "CANDIDATE: Yes, I can. I’m flexible.",
        "INTERVIEWER: Good. This job includes answering emails, chatting with customers, and writing short reports. Are you okay with that?",
        "CANDIDATE: Yes, I am. I can type fast, and I use a computer every day.",
        "INTERVIEWER: Great. Do you have any questions for me?",
        "CANDIDATE: Yes. What time does a normal shift start and finish? And is there training?",
        "INTERVIEWER: A normal shift is from 9 to 6, but we also have evening shifts. Yes, we give training for the first two weeks.",
        "CANDIDATE: That sounds good. Thank you.",
        "INTERVIEWER: Thank you, Daniel. We will contact you soon. Have a nice day.",
        "CANDIDATE: Thank you. Goodbye."
      ],
      "sourceNumber": 23,
      "sourceId": "job-interview",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 1,
          "sourceFile": "grammar/01-asking-questions.md"
        },
        {
          "number": 19,
          "sourceFile": "grammar/19-infinitives-and-gerunds.md"
        }
      ],
      "rules": [
        "a2rule23_1",
        "a2rule23_2",
        "a2rule23_3"
      ],
      "theoryExamples": [
        "What did you like about your job? Can you work weekends?",
        "Can you tell me when the shift starts? Do you know if there is training?",
        "I can type fast. I’m good at organising my time. I want to learn."
      ],
      "examples": [
        "What did you like about your job? Can you work weekends?",
        "Can you tell me when the shift starts? Do you know if there is training?",
        "I can type fast. I’m good at organising my time. I want to learn."
      ],
      "vocabulary": [
        [
          "advertisement",
          ""
        ],
        [
          "strength",
          ""
        ],
        [
          "shift",
          ""
        ],
        [
          "training",
          ""
        ],
        [
          "under pressure",
          ""
        ]
      ],
      "speakingSentences": [
        "I can work well with people.",
        "Can you tell me when the shift starts?"
      ],
      "speakingPrompt": "Role-play an interview. Describe two strengths, ask a direct question and make one polite embedded question.",
      "items": [
        {
          "type": "choice",
          "prompt": "What did you ___ about your old job?",
          "answer": "like",
          "options": [
            "like",
            "liked",
            "liking"
          ],
          "explanation": "After did use the base verb like.",
          "id": "a2-23-g1",
          "rule": "a2feedback23_1",
          "source": "Adapted grammar task",
          "modelAnswer": "like"
        },
        {
          "type": "choice",
          "prompt": "Choose the correct embedded question.",
          "answer": "Can you tell me when the shift starts?",
          "options": [
            "Can you tell me when the shift starts?",
            "Can you tell me when does the shift start?",
            "Can you tell me when starts the shift?"
          ],
          "explanation": "Inside the embedded question use subject + verb.",
          "id": "a2-23-g2",
          "rule": "a2feedback23_2",
          "source": "Adapted grammar task",
          "modelAnswer": "Can you tell me when the shift starts?"
        },
        {
          "type": "choice",
          "prompt": "I can ___ fast.",
          "answer": "type",
          "options": [
            "type",
            "to type",
            "typing"
          ],
          "explanation": "After can use the base verb type.",
          "id": "a2-23-g3",
          "rule": "a2feedback23_3",
          "source": "Adapted grammar task",
          "modelAnswer": "type"
        },
        {
          "type": "input",
          "prompt": "I’m good at ___ my time. Use organise.",
          "answers": [
            "organising",
            "organizing"
          ],
          "explanation": "After at use -ing; both British and American spellings are valid.",
          "id": "a2-23-g4",
          "rule": "a2feedback23_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I’m good at organising my time. Use organise."
        },
        {
          "type": "input",
          "prompt": "I want ___ learn new skills.",
          "answers": [
            "to"
          ],
          "explanation": "Want takes to + base verb.",
          "id": "a2-23-g5",
          "rule": "a2feedback23_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I want to learn new skills."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Do",
            "you",
            "have",
            "work",
            "experience?"
          ],
          "answer": "Do you have work experience?",
          "explanation": "Present Simple question: do + subject + base verb.",
          "id": "a2-23-g6",
          "rule": "a2feedback23_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Do you have work experience?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Which job is Daniel applying for?",
          "answer": "Customer service",
          "options": [
            "Customer service",
            "An English teacher",
            "A taxi driver"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-23-l1",
          "rule": "a2listen",
          "source": "Job interview"
        },
        {
          "type": "choice",
          "prompt": "Where did he work for one year?",
          "answer": "In a small hotel",
          "options": [
            "In a small hotel",
            "In a school",
            "At a travel company"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-23-l2",
          "rule": "a2listen",
          "source": "Job interview"
        },
        {
          "type": "choice",
          "prompt": "What does Daniel say about working weekends?",
          "answer": "He can do it.",
          "options": [
            "He can do it.",
            "He cannot do it.",
            "He only works Sundays."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-23-l3",
          "rule": "a2listen",
          "source": "Job interview"
        },
        {
          "type": "choice",
          "prompt": "What are the hours of a normal shift in this dialogue?",
          "answer": "From 9 to 6",
          "options": [
            "From 9 to 6",
            "From 7 to 3",
            "From 10 to 4"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-23-l4",
          "rule": "a2listen",
          "source": "Job interview"
        },
        {
          "type": "choice",
          "prompt": "How long is the initial training?",
          "answer": "Two weeks",
          "options": [
            "Two weeks",
            "Two days",
            "Two months"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-23-l5",
          "rule": "a2listen",
          "source": "Job interview"
        }
      ]
    },
    {
      "id": "a2-my-studies-anna",
      "title": "a2l24",
      "goal": "a2g24",
      "person": "Anna",
      "role": "My studies",
      "audioTitle": "My studies",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696b9ee0228d9d9e77664ffd_Listening%20A2.%20My%20studies%20(Anna).mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. Right now, I’m studying English, and I try to practice a little every day. I study in the evening after work, usually for about thirty minutes. I use a notebook for new words, and I write short sentences to remember them. I also listen to simple podcasts and repeat the phrases. It helps me with pronunciation.",
        "Anna: I’m studying English because I want to feel more confident at work. Sometimes I need to write emails and talk to customers, and I don’t want to feel nervous. At first, I was afraid of making mistakes, so I didn’t speak much. But my teacher told me that mistakes are normal, so now I try to speak more.",
        "Anna: My biggest problem is time. Some days I’m tired, and I want to watch a film instead of studying. When that happens, I do something small, like five minutes of vocabulary. I also try to review old words, not only learn new ones. Step by step, I feel progress, and it motivates me to continue."
      ],
      "sourceNumber": 24,
      "sourceId": "my-studies-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 24,
          "sourceFile": "grammar/24-phrasal-verbs-word-order.md"
        },
        {
          "number": 19,
          "sourceFile": "grammar/19-infinitives-and-gerunds.md"
        },
        {
          "number": 18,
          "sourceFile": "grammar/18-expressing-purpose-to-vs-for.md"
        }
      ],
      "rules": [
        "a2rule24_1",
        "a2rule24_2",
        "a2rule24_3"
      ],
      "theoryExamples": [
        "Write the words down. Write them down. Look it up.",
        "I listen to it. I look forward to practising.",
        "I write sentences to remember words. I’m afraid of making mistakes."
      ],
      "examples": [
        "Write the words down. Write them down. Look it up.",
        "I listen to it. I look forward to practising.",
        "I write sentences to remember words. I’m afraid of making mistakes."
      ],
      "vocabulary": [
        [
          "pronunciation",
          ""
        ],
        [
          "podcast",
          ""
        ],
        [
          "review",
          ""
        ],
        [
          "motivate",
          ""
        ],
        [
          "instead of",
          ""
        ]
      ],
      "speakingSentences": [
        "I write new words down to remember them.",
        "I look forward to practising English."
      ],
      "speakingPrompt": "Describe your study routine. Use write down or look up with a pronoun, and explain the purpose of one study activity.",
      "items": [
        {
          "type": "choice",
          "prompt": "Replace the words with them.",
          "answer": "Write them down.",
          "options": [
            "Write them down.",
            "Write down them.",
            "Write to them down."
          ],
          "explanation": "A pronoun goes between write and down.",
          "id": "a2-24-g1",
          "rule": "a2feedback24_1",
          "source": "Adapted grammar task",
          "modelAnswer": "Write them down."
        },
        {
          "type": "choice",
          "prompt": "Replace the word with it.",
          "answer": "Look it up.",
          "options": [
            "Look it up.",
            "Look up it.",
            "Look it to up."
          ],
          "explanation": "Look up is separable; put it in the middle.",
          "id": "a2-24-g2",
          "rule": "a2feedback24_2",
          "source": "Adapted grammar task",
          "modelAnswer": "Look it up."
        },
        {
          "type": "choice",
          "prompt": "I’m afraid of ___ mistakes.",
          "answer": "making",
          "options": [
            "making",
            "to make",
            "make"
          ],
          "explanation": "After the preposition of use -ing.",
          "id": "a2-24-g3",
          "rule": "a2feedback24_3",
          "source": "Adapted grammar task",
          "modelAnswer": "making"
        },
        {
          "type": "input",
          "prompt": "I listen ___ podcasts. Use to.",
          "answers": [
            "to"
          ],
          "explanation": "Listen to keeps the preposition before its object.",
          "id": "a2-24-g4",
          "rule": "a2feedback24_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I listen to podcasts. Use to."
        },
        {
          "type": "input",
          "prompt": "I write sentences ___ remember words. Use to or for.",
          "answers": [
            "to"
          ],
          "explanation": "To + base verb gives the purpose of writing.",
          "id": "a2-24-g5",
          "rule": "a2feedback24_5",
          "source": "Adapted grammar task",
          "modelAnswer": "I write sentences to remember words. Use to or for."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "look",
            "forward",
            "to",
            "practising",
            "English."
          ],
          "answer": "I look forward to practising English.",
          "explanation": "The to in look forward to is a preposition, so practising follows it.",
          "id": "a2-24-g6",
          "rule": "a2feedback24_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I look forward to practising English."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "When does Anna usually study?",
          "answer": "In the evening after work",
          "options": [
            "In the evening after work",
            "Before breakfast",
            "Only at weekends"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-24-l1",
          "rule": "a2listen",
          "source": "My studies"
        },
        {
          "type": "choice",
          "prompt": "How long does she usually study?",
          "answer": "About thirty minutes",
          "options": [
            "About thirty minutes",
            "About three hours",
            "About five minutes"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-24-l2",
          "rule": "a2listen",
          "source": "My studies"
        },
        {
          "type": "choice",
          "prompt": "What does she use for new words?",
          "answer": "A notebook",
          "options": [
            "A notebook",
            "A wall calendar",
            "Only voice messages"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-24-l3",
          "rule": "a2listen",
          "source": "My studies"
        },
        {
          "type": "choice",
          "prompt": "Why is she studying English?",
          "answer": "To feel more confident at work",
          "options": [
            "To feel more confident at work",
            "To become a doctor",
            "To stop using email"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-24-l4",
          "rule": "a2listen",
          "source": "My studies"
        },
        {
          "type": "choice",
          "prompt": "What is her biggest problem?",
          "answer": "Time",
          "options": [
            "Time",
            "Finding a notebook",
            "Disliking English"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-24-l5",
          "rule": "a2listen",
          "source": "My studies"
        }
      ]
    },
    {
      "id": "a2-interview-with-an-english-teacher",
      "title": "a2l25",
      "goal": "a2g25",
      "person": "LENA",
      "role": "Interview with an English Teacher",
      "audioTitle": "Interview with an English Teacher",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696dedfd1c09343e090b9e2c_Interview%20with%20an%20English%20Teacher.mp3",
      "transcript": [
        "LENA: Hello, and welcome! Today I’m talking to an English teacher. Hi! Could you introduce yourself?",
        "TOM: Hi, Lena. Sure. My name is Tom Harris, and I’m an English teacher. I teach adults and teenagers.",
        "LENA: Nice to meet you, Tom. First question: why did you become a teacher?",
        "TOM: I became a teacher because I enjoy helping people. I also like languages, and I like meeting students from different countries.",
        "LENA: What do you think is the hardest part of learning English?",
        "TOM: For many students, the hardest part is speaking. They understand English, but they feel nervous. They are afraid of making mistakes.",
        "LENA: Yes, I feel that too. What can students do to speak more confidently?",
        "TOM: Start with small steps. Speak every day for five or ten minutes. You can talk to yourself, record your voice, or speak with a partner. And remember—mistakes are normal. Mistakes help you learn.",
        "LENA: Good advice. What about grammar? Many students worry about grammar rules.",
        "TOM: Grammar is important, but it’s not everything. I tell students: learn grammar, but also learn useful phrases. For example, “Could you repeat that?” or “I’m not sure.” These phrases help you in real conversations.",
        "LENA: That’s true. How do you teach vocabulary?",
        "TOM: I teach vocabulary with examples and stories. I also ask students to use new words in a short sentence. And I recommend reviewing words often—maybe a little every day.",
        "LENA: What mistakes do students make most often?",
        "TOM: A common mistake is using the wrong tense. For example, students mix Past Simple and Present Perfect. Another mistake is word order in questions, like “You are going?” instead of “Are you going?”",
        "LENA: What is the best way to learn listening?",
        "TOM: Listen to easy English first. Choose short audio, and listen twice. The first time, just understand the general idea. The second time, listen for details. And don’t try to understand every word.",
        "LENA: Great. Final question: what is your top tip for A2 learners?",
        "TOM: My top tip is: be consistent. Study a little every day. Even ten minutes is good. And use English in your real life—messages, notes, shopping lists, anything.",
        "LENA: Thank you, Tom. This was very helpful.",
        "TOM: You’re welcome, Lena. Good luck with your English!"
      ],
      "sourceNumber": 25,
      "sourceId": "interview-with-an-english-teacher",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 39,
          "sourceFile": "grammar/39-reported-speech.md"
        },
        {
          "number": 1,
          "sourceFile": "grammar/01-asking-questions.md"
        }
      ],
      "rules": [
        "a2rule25_1",
        "a2rule25_2",
        "a2rule25_3"
      ],
      "theoryExamples": [
        "Tom says that practice helps. Tom told me that practice helps.",
        "She asked where I studied. She asked if I was ready.",
        "He told me to listen twice. He asked me not to rush."
      ],
      "examples": [
        "Tom says that practice helps. Tom told me that practice helps.",
        "She asked where I studied. She asked if I was ready.",
        "He told me to listen twice. He asked me not to rush."
      ],
      "vocabulary": [
        [
          "consistent",
          ""
        ],
        [
          "general idea",
          ""
        ],
        [
          "detail",
          ""
        ],
        [
          "phrase",
          ""
        ],
        [
          "record your voice",
          ""
        ]
      ],
      "speakingSentences": [
        "Tom says that practice helps.",
        "He told me to listen twice."
      ],
      "speakingPrompt": "Report two pieces of the teacher’s advice in your own words. Then report a question using normal statement order.",
      "items": [
        {
          "type": "choice",
          "prompt": "Tom ___ me that practice helps.",
          "answer": "told",
          "options": [
            "told",
            "said",
            "said to told"
          ],
          "explanation": "Tell needs a person: told me.",
          "id": "a2-25-g1",
          "rule": "a2feedback25_1",
          "source": "Adapted grammar task",
          "modelAnswer": "told"
        },
        {
          "type": "choice",
          "prompt": "Report “Where do you study?” in the past.",
          "answer": "She asked where I studied.",
          "options": [
            "She asked where I studied.",
            "She asked where did I study.",
            "She asked where I do studied."
          ],
          "explanation": "Reported questions use statement order and no did.",
          "id": "a2-25-g2",
          "rule": "a2feedback25_2",
          "source": "Adapted grammar task",
          "modelAnswer": "She asked where I studied."
        },
        {
          "type": "choice",
          "prompt": "Report “Listen twice.”",
          "answer": "He told me to listen twice.",
          "options": [
            "He told me to listen twice.",
            "He told me listen twice.",
            "He told to me listening twice."
          ],
          "explanation": "Tell + person + to-infinitive reports an instruction.",
          "id": "a2-25-g3",
          "rule": "a2feedback25_3",
          "source": "Adapted grammar task",
          "modelAnswer": "He told me to listen twice."
        },
        {
          "type": "input",
          "prompt": "She asked ___ I was ready. Use if or whether.",
          "answers": [
            "if",
            "whether"
          ],
          "explanation": "Reported yes/no questions use if or whether.",
          "id": "a2-25-g4",
          "rule": "a2feedback25_4",
          "source": "Adapted grammar task",
          "modelAnswer": "She asked if I was ready. Use if or whether."
        },
        {
          "type": "input",
          "prompt": "He asked me ___ to rush. Use not.",
          "answers": [
            "not"
          ],
          "explanation": "A negative reported instruction uses not to + verb.",
          "id": "a2-25-g5",
          "rule": "a2feedback25_5",
          "source": "Adapted grammar task",
          "modelAnswer": "He asked me not to rush. Use not."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "She",
            "asked",
            "where",
            "I",
            "studied."
          ],
          "answer": "She asked where I studied.",
          "explanation": "Reported questions use subject I before verb studied.",
          "id": "a2-25-g6",
          "rule": "a2feedback25_6",
          "source": "Adapted grammar task",
          "modelAnswer": "She asked where I studied."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Who does Tom teach?",
          "answer": "Adults and teenagers",
          "options": [
            "Adults and teenagers",
            "Only toddlers",
            "Only university professors"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-25-l1",
          "rule": "a2listen",
          "source": "Interview with an English Teacher"
        },
        {
          "type": "choice",
          "prompt": "What is hardest for many students, according to Tom?",
          "answer": "Speaking",
          "options": [
            "Speaking",
            "Writing shopping lists",
            "Reading the alphabet"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-25-l2",
          "rule": "a2listen",
          "source": "Interview with an English Teacher"
        },
        {
          "type": "choice",
          "prompt": "How does Tom teach vocabulary?",
          "answer": "With examples and stories",
          "options": [
            "With examples and stories",
            "Only with translation tests",
            "Only by spelling aloud"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-25-l3",
          "rule": "a2listen",
          "source": "Interview with an English Teacher"
        },
        {
          "type": "choice",
          "prompt": "How many times does he suggest listening to short audio?",
          "answer": "Twice",
          "options": [
            "Twice",
            "Five times",
            "Only once"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-25-l4",
          "rule": "a2listen",
          "source": "Interview with an English Teacher"
        },
        {
          "type": "choice",
          "prompt": "What should learners focus on the first time?",
          "answer": "The general idea",
          "options": [
            "The general idea",
            "Every unfamiliar word",
            "Only grammar endings"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-25-l5",
          "rule": "a2listen",
          "source": "Interview with an English Teacher"
        }
      ]
    },
    {
      "id": "a2-have-you-ever",
      "title": "a2l26",
      "goal": "a2g26",
      "person": "ANNA",
      "role": "Have you ever…?",
      "audioTitle": "Have you ever…?",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696364ff7b44da5cc12e8015_Listening%20A2.%20Have%20you%20ever%E2%80%A6.mp3",
      "transcript": [
        "ANNA: Hey, David. I’m bored. Let’s play “Have you ever…?”",
        "DAVID: Sure! That sounds fun. You start.",
        "ANNA: Okay. David, have you ever missed a flight?",
        "DAVID: Yes, I have. Last year I arrived at the airport late because of traffic. I felt really stressed.",
        "ANNA: Oh no! What did you do?",
        "DAVID: I bought a new ticket and waited for the next flight. It was expensive, so I learned my lesson.",
        "DAVID: Your turn. Anna, have you ever lost your phone?",
        "ANNA: Yes, I have. I left it in a taxi once. I noticed it after five minutes.",
        "DAVID: Did you get it back?",
        "ANNA: Luckily, yes. I called my number from my friend’s phone, and the driver answered. He came back.",
        "ANNA: Have you ever eaten something really strange?",
        "DAVID: Hmm… yes, I have. I tried very spicy noodles in a small restaurant. I thought I was going to cry.",
        "(laughs)",
        "ANNA: Did you finish them?",
        "DAVID: No, I didn’t. I drank a lot of water, but it didn’t help.",
        "DAVID: Anna, have you ever spoken to a stranger in English for a long time?",
        "ANNA: Yes, I have. I talked to a tourist in a café. She asked me for directions, and then we chatted for ten minutes.",
        "DAVID: Nice! Was it easy?",
        "ANNA: At first, no. But after a minute, I felt more confident.",
        "ANNA: Have you ever broken something at work by accident?",
        "DAVID: Yes, I have. I spilled coffee on my keyboard once. It stopped working immediately.",
        "ANNA: That’s painful. What happened after that?",
        "DAVID: My boss wasn’t happy, but it was an accident. I bought a new keyboard the same day.",
        "DAVID: Last question! Anna, have you ever stayed up all night?",
        "ANNA: Yes, I have—many times. Sometimes I stay up late watching a series, and then I regret it in the morning.",
        "DAVID: Same! Okay, we should stop now and go to bed early tonight.",
        "ANNA: Deal. But tomorrow we can play again!"
      ],
      "sourceNumber": 26,
      "sourceId": "have-you-ever",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 9,
          "sourceFile": "grammar/09-present-perfect.md"
        },
        {
          "number": 10,
          "sourceFile": "grammar/10-present-perfect-vs-past-simple.md"
        }
      ],
      "rules": [
        "a2rule26_1",
        "a2rule26_2",
        "a2rule26_3"
      ],
      "theoryExamples": [
        "Have you ever missed a flight? Yes, I have.",
        "I’ve lost my phone before. I left it in a taxi last year.",
        "I have never eaten spicy noodles. Have you ever spoken to a tourist?"
      ],
      "examples": [
        "Have you ever missed a flight? Yes, I have.",
        "I’ve lost my phone before. I left it in a taxi last year.",
        "I have never eaten spicy noodles. Have you ever spoken to a tourist?"
      ],
      "vocabulary": [
        [
          "flight",
          ""
        ],
        [
          "spicy",
          ""
        ],
        [
          "keyboard",
          ""
        ],
        [
          "by accident",
          ""
        ],
        [
          "regret",
          ""
        ]
      ],
      "speakingSentences": [
        "Have you ever missed a flight?",
        "I left my phone in a taxi last year."
      ],
      "speakingPrompt": "Ask three Have you ever questions. Answer one with an experience, then give the past-time details.",
      "items": [
        {
          "type": "choice",
          "prompt": "Have you ever ___ something at work? Use break.",
          "answer": "broken",
          "options": [
            "broken",
            "broke",
            "break"
          ],
          "explanation": "Present Perfect needs the participle broken.",
          "id": "a2-26-g1",
          "rule": "a2feedback26_1",
          "source": "Adapted grammar task",
          "modelAnswer": "broken"
        },
        {
          "type": "choice",
          "prompt": "Last year I ___ my phone in a taxi.",
          "answer": "left",
          "options": [
            "left",
            "have left",
            "leave"
          ],
          "explanation": "Last year is a finished past time: left.",
          "id": "a2-26-g2",
          "rule": "a2feedback26_2",
          "source": "Adapted grammar task",
          "modelAnswer": "left"
        },
        {
          "type": "choice",
          "prompt": "Choose the standard sentence.",
          "answer": "I have never missed a flight.",
          "options": [
            "I have never missed a flight.",
            "I haven’t never missed a flight.",
            "I have never miss a flight."
          ],
          "explanation": "Never has negative meaning; use have + participle.",
          "id": "a2-26-g3",
          "rule": "a2feedback26_3",
          "source": "Adapted grammar task",
          "modelAnswer": "I have never missed a flight."
        },
        {
          "type": "input",
          "prompt": "Have you ever ___ to a tourist? Use speak.",
          "answers": [
            "spoken"
          ],
          "explanation": "Speak has the past participle spoken.",
          "id": "a2-26-g4",
          "rule": "a2feedback26_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Have you ever spoken to a tourist? Use speak."
        },
        {
          "type": "input",
          "prompt": "Have you ever lost a phone? Yes, I ___.",
          "answers": [
            "have"
          ],
          "explanation": "Copy have from the Present Perfect question.",
          "id": "a2-26-g5",
          "rule": "a2feedback26_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Have you ever lost a phone? Yes, I have."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Have",
            "you",
            "ever",
            "missed",
            "a",
            "flight?"
          ],
          "answer": "Have you ever missed a flight?",
          "explanation": "Experience question: have + subject + ever + participle.",
          "id": "a2-26-g6",
          "rule": "a2feedback26_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Have you ever missed a flight?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Why did David miss a flight last year?",
          "answer": "He was late because of traffic.",
          "options": [
            "He was late because of traffic.",
            "He forgot his passport.",
            "He went to the wrong city."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-26-l1",
          "rule": "a2listen",
          "source": "Have you ever…?"
        },
        {
          "type": "choice",
          "prompt": "Where did Anna leave her phone?",
          "answer": "In a taxi",
          "options": [
            "In a taxi",
            "In a hotel room",
            "At work"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-26-l2",
          "rule": "a2listen",
          "source": "Have you ever…?"
        },
        {
          "type": "choice",
          "prompt": "Did David finish the spicy noodles?",
          "answer": "No, he didn’t.",
          "options": [
            "No, he didn’t.",
            "Yes, he finished them all.",
            "He did not try them."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-26-l3",
          "rule": "a2listen",
          "source": "Have you ever…?"
        },
        {
          "type": "choice",
          "prompt": "How long did Anna chat with the tourist?",
          "answer": "Ten minutes",
          "options": [
            "Ten minutes",
            "An hour",
            "Five seconds"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-26-l4",
          "rule": "a2listen",
          "source": "Have you ever…?"
        },
        {
          "type": "choice",
          "prompt": "What damaged David’s keyboard?",
          "answer": "Spilled coffee",
          "options": [
            "Spilled coffee",
            "A broken window",
            "Rain from an open door"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-26-l5",
          "rule": "a2listen",
          "source": "Have you ever…?"
        }
      ]
    },
    {
      "id": "a2-police-station-stolen-phone",
      "title": "a2l27",
      "goal": "a2g27",
      "person": "POLICE OFFICER",
      "role": "At the Police Station: Stolen Phone",
      "audioTitle": "At the Police Station: Stolen Phone",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/6964b8f04c1cfb8a8ac5ef6f_Listening%20A2.%20At%20the%20Police%20Station%20Stolen%20Phone.mp3",
      "transcript": [
        "POLICE OFFICER: Good afternoon, ma’am. Please have a seat. Can you tell me what happened?",
        "WOMAN: Good afternoon. Yes. My phone was stolen this morning.",
        "POLICE OFFICER: I’m sorry to hear that. Where were you when it happened?",
        "WOMAN: I was at the Central Bus Station, near the ticket machines.",
        "POLICE OFFICER: What time was it?",
        "WOMAN: Around 9:20 a.m.",
        "POLICE OFFICER: Okay. What were you doing at that time?",
        "WOMAN: I was buying a ticket and checking the timetable. I was also texting my sister.",
        "POLICE OFFICER: So the phone was in your hand?",
        "WOMAN: Yes, for a moment. Then I put it in my coat pocket.",
        "POLICE OFFICER: When did you notice it was missing?",
        "WOMAN: A few minutes later. I was walking to Platform 3, and I wanted to check my ticket again. I reached into my pocket, but the phone wasn’t there.",
        "POLICE OFFICER: Had you used your phone before you left home?",
        "WOMAN: Yes. I had checked the weather and I had called my boss. After that, I left my apartment quickly because I didn’t want to miss the bus.",
        "POLICE OFFICER: Had you taken your phone out at the station before the ticket machine?",
        "WOMAN: Yes. I had opened a message from my sister while I was standing in the line.",
        "POLICE OFFICER: Did you see anyone suspicious?",
        "WOMAN: I’m not sure. A man bumped into me while I was turning around. He said “Sorry,” and he walked away fast.",
        "POLICE OFFICER: What did he look like?",
        "WOMAN: He was about thirty, maybe. Medium height. He had a dark jacket and a black cap. I didn’t see his face well because people were moving around.",
        "POLICE OFFICER: Were you carrying anything else?",
        "WOMAN: Yes, I was holding a coffee and a small shopping bag. I think I was distracted.",
        "POLICE OFFICER: What did you do after you noticed the phone was gone?",
        "WOMAN: First, I checked all my pockets again. Then I went back to the ticket machine area, but I couldn’t find it. After that, I called my phone from my friend’s number, but no one answered.",
        "POLICE OFFICER: Had you locked your phone with a PIN?",
        "WOMAN: Yes, I had. And I had turned on Face ID.",
        "POLICE OFFICER: That’s good. Do you know the model and color?",
        "WOMAN: Yes. It’s a blue iPhone 13 with a clear case and a small sticker on the back.",
        "POLICE OFFICER: Great. Please give me your full name and a contact number. We will check the station cameras and make a report.",
        "WOMAN: Thank you. I really hope you can find it.",
        "POLICE OFFICER: We’ll do our best. Also, if you haven’t done it yet, please block your SIM card and change your passwords as soon as possible.",
        "WOMAN: I will. Thank you for your help."
      ],
      "sourceNumber": 27,
      "sourceId": "police-station-stolen-phone",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 7,
          "sourceFile": "grammar/07-past-continuous-vs-simple.md"
        },
        {
          "number": 38,
          "sourceFile": "grammar/38-past-perfect.md"
        }
      ],
      "rules": [
        "a2rule27_1",
        "a2rule27_2",
        "a2rule27_3"
      ],
      "theoryExamples": [
        "I was buying a ticket at nine. A man bumped into me.",
        "A man bumped into me while I was turning around.",
        "Before I left home, I had checked the weather."
      ],
      "examples": [
        "I was buying a ticket at nine. A man bumped into me.",
        "A man bumped into me while I was turning around.",
        "Before I left home, I had checked the weather."
      ],
      "vocabulary": [
        [
          "timetable",
          ""
        ],
        [
          "platform",
          ""
        ],
        [
          "suspicious",
          ""
        ],
        [
          "pocket",
          ""
        ],
        [
          "bump into",
          ""
        ]
      ],
      "speakingSentences": [
        "I was buying a ticket when it happened.",
        "Before I left home, I had checked the weather."
      ],
      "speakingPrompt": "Tell a short story about losing an item. Include a background action, an event and something you had done earlier.",
      "items": [
        {
          "type": "choice",
          "prompt": "Use Past Continuous: At nine, I ___ a ticket.",
          "answer": "was buying",
          "options": [
            "was buying",
            "was buy",
            "did buying"
          ],
          "explanation": "Past Continuous uses was + buying.",
          "id": "a2-27-g1",
          "rule": "a2feedback27_1",
          "source": "Adapted grammar task",
          "modelAnswer": "was buying"
        },
        {
          "type": "choice",
          "prompt": "A man ___ into me while I was turning around. Use bump in Past Simple.",
          "answer": "bumped",
          "options": [
            "bumped",
            "was bumped",
            "bumping"
          ],
          "explanation": "The completed event uses bumped.",
          "id": "a2-27-g2",
          "rule": "a2feedback27_2",
          "source": "Adapted grammar task",
          "modelAnswer": "bumped"
        },
        {
          "type": "choice",
          "prompt": "Use Past Perfect: Before I left, I ___ the weather.",
          "answer": "had checked",
          "options": [
            "had checked",
            "had check",
            "have checked"
          ],
          "explanation": "Earlier than left: had + participle checked.",
          "id": "a2-27-g3",
          "rule": "a2feedback27_3",
          "source": "Adapted grammar task",
          "modelAnswer": "had checked"
        },
        {
          "type": "input",
          "prompt": "We ___ waiting when the bus arrived. Use be in Past Continuous.",
          "answers": [
            "were"
          ],
          "explanation": "With we, Past Continuous uses were + waiting.",
          "id": "a2-27-g4",
          "rule": "a2feedback27_4",
          "source": "Adapted grammar task",
          "modelAnswer": "We were waiting when the bus arrived. Use be in Past Continuous."
        },
        {
          "type": "input",
          "prompt": "Had you ___ your phone before leaving? Use lock.",
          "answers": [
            "locked"
          ],
          "explanation": "After had use the participle locked.",
          "id": "a2-27-g5",
          "rule": "a2feedback27_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Had you locked your phone before leaving? Use lock."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "was",
            "walking",
            "when",
            "I",
            "noticed",
            "the",
            "problem."
          ],
          "answer": "I was walking when I noticed the problem.",
          "explanation": "The walk is background; noticed is the event during it.",
          "id": "a2-27-g6",
          "rule": "a2feedback27_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I was walking when I noticed the problem."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Where was the woman when her phone was stolen?",
          "answer": "At the Central Bus Station",
          "options": [
            "At the Central Bus Station",
            "At a café",
            "At the airport"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-27-l1",
          "rule": "a2listen",
          "source": "At the Police Station: Stolen Phone"
        },
        {
          "type": "choice",
          "prompt": "About what time did it happen?",
          "answer": "9:20 a.m.",
          "options": [
            "9:20 a.m.",
            "9:20 p.m.",
            "7:30 a.m."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-27-l2",
          "rule": "a2listen",
          "source": "At the Police Station: Stolen Phone"
        },
        {
          "type": "choice",
          "prompt": "Where did she put her phone?",
          "answer": "In her coat pocket",
          "options": [
            "In her coat pocket",
            "In her suitcase",
            "On the ticket machine"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-27-l3",
          "rule": "a2listen",
          "source": "At the Police Station: Stolen Phone"
        },
        {
          "type": "choice",
          "prompt": "What had she done before leaving home?",
          "answer": "Checked the weather and called her boss",
          "options": [
            "Checked the weather and called her boss",
            "Booked a hotel and bought groceries",
            "Changed her phone case"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-27-l4",
          "rule": "a2listen",
          "source": "At the Police Station: Stolen Phone"
        },
        {
          "type": "choice",
          "prompt": "What phone does she describe?",
          "answer": "A blue iPhone 13",
          "options": [
            "A blue iPhone 13",
            "A black iPhone 15",
            "A grey Android phone"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-27-l5",
          "rule": "a2listen",
          "source": "At the Police Station: Stolen Phone"
        }
      ]
    },
    {
      "id": "a2-if-i-were-a-millionaire-anna",
      "title": "a2l28",
      "goal": "a2g28",
      "person": "Anna",
      "role": "If I were a millionaire",
      "audioTitle": "If I were a millionaire",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/69649cb5537da6a59cf4ec8c_Anna%20%E2%80%94%20If%20I%20were%20a%20millionaire.%20A2%20Pre-Intermediate.mp3",
      "transcript": [
        "Anna: Hi, I’m Anna. If I were a millionaire, I would help my family first. I would buy my parents a comfortable home, so they could relax and enjoy life. I would also travel a lot. I would visit Italy, Japan, and Spain, because I love food, culture, and beautiful cities. If I had that much money, I would study more too. I would take English classes with a great teacher and maybe learn another language. I wouldn’t work every day, but I wouldn’t stop working completely. I would start a small project, like a language-learning website, and I would make it simple and friendly for beginners. If I were a millionaire, I would feel safer, and I would have more time for things I really enjoy."
      ],
      "sourceNumber": 28,
      "sourceId": "if-i-were-a-millionaire-anna",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 33,
          "sourceFile": "grammar/33-second-conditional.md"
        }
      ],
      "rules": [
        "a2rule28_1",
        "a2rule28_2",
        "a2rule28_3"
      ],
      "theoryExamples": [
        "If I had more money, I would travel.",
        "If I were you, I would take an English class.",
        "If I had more time, I could study more. I wouldn’t stop working."
      ],
      "examples": [
        "If I had more money, I would travel.",
        "If I were you, I would take an English class.",
        "If I had more time, I could study more. I wouldn’t stop working."
      ],
      "vocabulary": [
        [
          "millionaire",
          ""
        ],
        [
          "completely",
          ""
        ],
        [
          "beginner",
          ""
        ],
        [
          "safer",
          ""
        ],
        [
          "culture",
          ""
        ]
      ],
      "speakingSentences": [
        "If I had more money, I would travel.",
        "If I were you, I would take an English class."
      ],
      "speakingPrompt": "Imagine you had much more time or money. Describe three things you would do and give one If I were you recommendation.",
      "items": [
        {
          "type": "choice",
          "prompt": "If I ___ more money, I would travel.",
          "answer": "had",
          "options": [
            "had",
            "would have",
            "have will"
          ],
          "explanation": "The unreal condition uses a past form: had.",
          "id": "a2-28-g1",
          "rule": "a2feedback28_1",
          "source": "Adapted grammar task",
          "modelAnswer": "had"
        },
        {
          "type": "choice",
          "prompt": "If I were you, I ___ take a class.",
          "answer": "would",
          "options": [
            "would",
            "will to",
            "am"
          ],
          "explanation": "Advice about an imagined situation uses would + base verb.",
          "id": "a2-28-g2",
          "rule": "a2feedback28_2",
          "source": "Adapted grammar task",
          "modelAnswer": "would"
        },
        {
          "type": "choice",
          "prompt": "I wouldn’t ___ working completely.",
          "answer": "stop",
          "options": [
            "stop",
            "to stop",
            "stopped"
          ],
          "explanation": "After would/wouldn’t use the base verb stop.",
          "id": "a2-28-g3",
          "rule": "a2feedback28_3",
          "source": "Adapted grammar task",
          "modelAnswer": "stop"
        },
        {
          "type": "input",
          "prompt": "Use were in the advice pattern: If I ___ you, I would study.",
          "answers": [
            "were"
          ],
          "explanation": "If I were you is the usual advice expression.",
          "id": "a2-28-g4",
          "rule": "a2feedback28_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Use were in the advice pattern: If I were you, I would study."
        },
        {
          "type": "input",
          "prompt": "If I had more time, I ___ study more. Use could.",
          "answers": [
            "could"
          ],
          "explanation": "Could expresses ability in the imaginary result.",
          "id": "a2-28-g5",
          "rule": "a2feedback28_5",
          "source": "Adapted grammar task",
          "modelAnswer": "If I had more time, I could study more. Use could."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "If",
            "I",
            "had",
            "more",
            "money,",
            "I",
            "would",
            "travel."
          ],
          "answer": "If I had more money, I would travel.",
          "explanation": "Imaginary condition: if + past form, would + base verb.",
          "id": "a2-28-g6",
          "rule": "a2feedback28_6",
          "source": "Adapted grammar task",
          "modelAnswer": "If I had more money, I would travel."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "Who would Anna help first?",
          "answer": "Her family",
          "options": [
            "Her family",
            "Her manager",
            "Only strangers"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-28-l1",
          "rule": "a2listen",
          "source": "If I were a millionaire"
        },
        {
          "type": "choice",
          "prompt": "What would she buy for her parents?",
          "answer": "A comfortable home",
          "options": [
            "A comfortable home",
            "A restaurant",
            "A plane"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-28-l2",
          "rule": "a2listen",
          "source": "If I were a millionaire"
        },
        {
          "type": "choice",
          "prompt": "Which countries would she visit?",
          "answer": "Italy, Japan and Spain",
          "options": [
            "Italy, Japan and Spain",
            "France, Canada and Brazil",
            "Germany, India and Australia"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-28-l3",
          "rule": "a2listen",
          "source": "If I were a millionaire"
        },
        {
          "type": "choice",
          "prompt": "Would she stop working completely?",
          "answer": "No, she wouldn’t.",
          "options": [
            "No, she wouldn’t.",
            "Yes, immediately.",
            "She says she would work every day."
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-28-l4",
          "rule": "a2listen",
          "source": "If I were a millionaire"
        },
        {
          "type": "choice",
          "prompt": "What kind of project would she start?",
          "answer": "A language-learning website",
          "options": [
            "A language-learning website",
            "A mountain hotel",
            "A clothing factory"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-28-l5",
          "rule": "a2listen",
          "source": "If I were a millionaire"
        }
      ]
    },
    {
      "id": "a2-family-life-has-changed",
      "title": "a2l29",
      "goal": "a2g29",
      "person": "EMMA",
      "role": "How Our Family Life Has Changed",
      "audioTitle": "How Our Family Life Has Changed",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696ca1feb5f6aa3cbcc5e4bf_How%20Our%20Family%20Life%20Has%20Changed%20%E2%80%94%20Wife%20%26%20Husband.mp3",
      "transcript": [
        "EMMA: Hey, Jake… do you ever think about how our family life has changed?",
        "JAKE: All the time. If I look back at last year, everything feels different.",
        "EMMA: Yes. Before, we had so much free time. We could go out after work, meet friends, and stay up late.",
        "JAKE: And now we plan everything. Even a simple walk needs a plan.",
        "EMMA: I remember when we could sleep in on Saturdays. Now Lily wakes up at 7 a.m. every weekend.",
        "JAKE: True. And when she wakes up, the whole house wakes up. No quiet mornings anymore.",
        "EMMA: But I like some changes. Our days are busier, but they feel more meaningful.",
        "JAKE: I agree. Before Lily was born, I thought I was tired. Now I know what “tired” really means.",
        "EMMA: What is the biggest change for you?",
        "JAKE: My routine. I used to go to the gym after work. Now I come home, cook dinner, and clean the kitchen. Then it’s bath time, story time, and finally bedtime.",
        "EMMA: Yes, the evenings are full. And our shopping habits changed too. Before, we bought food for two days. Now we buy food for the whole week.",
        "JAKE: And we buy so many small things—diapers, wipes, medicine, snacks. I didn’t think about it before.",
        "EMMA: I also feel different at work. I’m more organized now because I don’t have extra time.",
        "JAKE: Same. I finish tasks faster. If I don’t finish at work, I can’t relax at home.",
        "EMMA: Do you miss our old life?",
        "JAKE: Sometimes. I miss spontaneous trips and quiet evenings. But I don’t want to go back. I just want more sleep.",
        "EMMA: Same! And I miss long conversations. At home we talk in short sentences: “Where is the bottle?” “Did you wash the clothes?”",
        "JAKE: Or “Be careful!” and “Don’t touch that!”",
        "EMMA: Still, I love the little moments. Yesterday Lily laughed when you made that funny face.",
        "JAKE: That was the best part of my day. And when she falls asleep on my shoulder, I forget the stress.",
        "EMMA: I think our relationship has changed too. We don’t go on dates often.",
        "JAKE: It’s okay. We are a team now. And we support each other more.",
        "EMMA: Next month, can we plan one simple date? Maybe coffee and a short walk, just us.",
        "JAKE: Yes. Let’s do it. Our life changed, but we can still make time for each other."
      ],
      "sourceNumber": 29,
      "sourceId": "family-life-has-changed",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 35,
          "sourceFile": "grammar/35-used-to.md"
        },
        {
          "number": 36,
          "sourceFile": "grammar/36-agreement-responses.md"
        },
        {
          "number": 11,
          "sourceFile": "grammar/11-no-longer-any-longer-anymore.md"
        }
      ],
      "rules": [
        "a2rule29_1",
        "a2rule29_2",
        "a2rule29_3"
      ],
      "theoryExamples": [
        "I used to go to the gym. Did you use to go out often?",
        "I’m used to getting up early now.",
        "I’m tired. So am I. I don’t sleep much. Neither do I."
      ],
      "examples": [
        "I used to go to the gym. Did you use to go out often?",
        "I’m used to getting up early now.",
        "I’m tired. So am I. I don’t sleep much. Neither do I."
      ],
      "vocabulary": [
        [
          "meaningful",
          ""
        ],
        [
          "spontaneous",
          ""
        ],
        [
          "diaper",
          ""
        ],
        [
          "wipe",
          ""
        ],
        [
          "shoulder",
          ""
        ]
      ],
      "speakingSentences": [
        "I used to go out after work.",
        "I am used to getting up early now."
      ],
      "speakingPrompt": "Compare your old routine with your routine now. Use used to and be used to, then practise So/Neither agreement with a partner.",
      "items": [
        {
          "type": "choice",
          "prompt": "Did you ___ go to the gym after work?",
          "answer": "use to",
          "options": [
            "use to",
            "used to",
            "use for"
          ],
          "explanation": "After did, use the base form use to.",
          "id": "a2-29-g1",
          "rule": "a2feedback29_1",
          "source": "Adapted grammar task",
          "modelAnswer": "use to"
        },
        {
          "type": "choice",
          "prompt": "I’m used to ___ up early.",
          "answer": "getting",
          "options": [
            "getting",
            "get",
            "to get"
          ],
          "explanation": "The to in be used to is a preposition: getting.",
          "id": "a2-29-g2",
          "rule": "a2feedback29_2",
          "source": "Adapted grammar task",
          "modelAnswer": "getting"
        },
        {
          "type": "choice",
          "prompt": "“I’m tired.” Agree using So.",
          "answer": "So am I.",
          "options": [
            "So am I.",
            "So do I.",
            "So I am."
          ],
          "explanation": "Match be and invert: So am I.",
          "id": "a2-29-g3",
          "rule": "a2feedback29_3",
          "source": "Adapted grammar task",
          "modelAnswer": "So am I."
        },
        {
          "type": "input",
          "prompt": "I didn’t ___ to plan every walk. Use use or used.",
          "answers": [
            "use"
          ],
          "explanation": "Didn’t already marks the past: use to.",
          "id": "a2-29-g4",
          "rule": "a2feedback29_4",
          "source": "Adapted grammar task",
          "modelAnswer": "I didn’t use to plan every walk. Use use or used."
        },
        {
          "type": "input",
          "prompt": "“I don’t sleep much.” “Neither ___ I.” Use do.",
          "answers": [
            "do"
          ],
          "explanation": "For a negative Present Simple statement use Neither do I.",
          "id": "a2-29-g5",
          "rule": "a2feedback29_5",
          "source": "Adapted grammar task",
          "modelAnswer": "“I don’t sleep much.” “Neither do I.” Use do."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "I",
            "used",
            "to",
            "go",
            "to",
            "the",
            "gym."
          ],
          "answer": "I used to go to the gym.",
          "explanation": "Past habit: used to + base verb go.",
          "id": "a2-29-g6",
          "rule": "a2feedback29_6",
          "source": "Adapted grammar task",
          "modelAnswer": "I used to go to the gym."
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "When does Lily wake up at weekends?",
          "answer": "At 7 a.m.",
          "options": [
            "At 7 a.m.",
            "At 10 a.m.",
            "At noon"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-29-l1",
          "rule": "a2listen",
          "source": "How Our Family Life Has Changed"
        },
        {
          "type": "choice",
          "prompt": "What did Jake use to do after work?",
          "answer": "Go to the gym",
          "options": [
            "Go to the gym",
            "Work in a café",
            "Study at a museum"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-29-l2",
          "rule": "a2listen",
          "source": "How Our Family Life Has Changed"
        },
        {
          "type": "choice",
          "prompt": "How much food do they buy now?",
          "answer": "Enough for the whole week",
          "options": [
            "Enough for the whole week",
            "Only for two days",
            "Only one meal at a time"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-29-l3",
          "rule": "a2listen",
          "source": "How Our Family Life Has Changed"
        },
        {
          "type": "choice",
          "prompt": "What does Jake say he wants more of?",
          "answer": "Sleep",
          "options": [
            "Sleep",
            "Work messages",
            "Spontaneous meetings"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-29-l4",
          "rule": "a2listen",
          "source": "How Our Family Life Has Changed"
        },
        {
          "type": "choice",
          "prompt": "What simple date does Emma suggest?",
          "answer": "Coffee and a short walk",
          "options": [
            "Coffee and a short walk",
            "A week abroad",
            "A concert every evening"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-29-l5",
          "rule": "a2listen",
          "source": "How Our Family Life Has Changed"
        }
      ]
    },
    {
      "id": "a2-sports-in-the-usa",
      "title": "a2l30",
      "goal": "a2g30",
      "person": "EMMA",
      "role": "Sports in the USA",
      "audioTitle": "Sports in the USA",
      "audio": "https://cdn.prod.website-files.com/67aa2baa0c65412632c4b3d1/696de54d1818f899ea1c213e_Sports%20in%20the%20USA.mp3",
      "transcript": [
        "EMMA: Hi, Ryan! I’m still learning about sports in the USA. There are so many. Can you explain the main ones?",
        "RYAN: Sure. The biggest sports in the US are American football, basketball, baseball, and ice hockey.",
        "EMMA: I know basketball, but American football is confusing. What is it like?",
        "RYAN: It’s a team game with an oval ball. Players run with the ball or throw it. The game stops a lot, so it feels different from soccer. But it’s very popular, especially on Sundays.",
        "EMMA: Is the Super Bowl about American football?",
        "RYAN: Yes! The Super Bowl is the biggest game of the year. People watch it for the game, the show at halftime, and the funny commercials.",
        "EMMA: That’s interesting. What about basketball? I hear about the NBA all the time.",
        "RYAN: Basketball is huge. The NBA has famous teams and players. The games are fast, and there are lots of points. Many people also play basketball at school or in parks.",
        "EMMA: And baseball? Some people say it’s slow.",
        "RYAN: It can be slower, but it’s a classic American sport. People like the atmosphere: hot dogs, music, and a relaxed day at the stadium. Many families go together. Also, baseball has a lot of tradition.",
        "EMMA: Do kids play baseball too?",
        "RYAN: Yes, many kids play baseball or softball. There are school teams and local clubs.",
        "EMMA: You also said ice hockey. Is it popular everywhere?",
        "RYAN: It’s more popular in colder states, but it has fans all over the country. Hockey is fast and physical. The league is the NHL.",
        "EMMA: What about soccer? Is it popular in the US?",
        "RYAN: It’s growing. A lot of kids play soccer, and more adults watch it now too. The US has MLS teams, and people also watch European leagues.",
        "EMMA: If I visit the US, which sport should I watch live?",
        "RYAN: It depends. If you want something exciting and easy to follow, watch a basketball game. If you want a big American experience, try baseball or American football.",
        "EMMA: And what do Americans do during games? Do they shout a lot?",
        "RYAN: Yes, fans can be very loud. They wear team colors, buy snacks, and sing or chant. But it’s usually friendly—families go too.",
        "EMMA: Sounds fun. I think I want to try a basketball game first.",
        "RYAN: Good choice. It’s a great atmosphere, and you’ll understand it quickly."
      ],
      "sourceNumber": 30,
      "sourceId": "sports-in-the-usa",
      "audioTranscriptVerified": false,
      "grammarSources": [
        {
          "number": 34,
          "sourceFile": "grammar/34-simple-passive.md"
        },
        {
          "number": 31,
          "sourceFile": "grammar/31-defining-relative-clauses.md"
        },
        {
          "number": 40,
          "sourceFile": "grammar/40-a2-tense-review.md"
        }
      ],
      "rules": [
        "a2rule30_1",
        "a2rule30_2",
        "a2rule30_3"
      ],
      "theoryExamples": [
        "Basketball is played in parks. The game was watched by many fans.",
        "A fan is someone who supports a team. This is a park where people play.",
        "I watch games every week. I’m watching now. I watched yesterday. I’ve seen this team before."
      ],
      "examples": [
        "Basketball is played in parks. The game was watched by many fans.",
        "A fan is someone who supports a team. This is a park where people play.",
        "I watch games every week. I’m watching now. I watched yesterday. I’ve seen this team before."
      ],
      "vocabulary": [
        [
          "oval",
          ""
        ],
        [
          "halftime",
          ""
        ],
        [
          "commercial",
          ""
        ],
        [
          "stadium",
          ""
        ],
        [
          "chant",
          ""
        ]
      ],
      "speakingSentences": [
        "Basketball is played in parks.",
        "Have you ever watched a basketball game?"
      ],
      "speakingPrompt": "Describe a sport and a fan using the passive and a relative clause. Say what you usually watch, what you watched recently and what you plan to watch next.",
      "items": [
        {
          "type": "choice",
          "prompt": "Use Present Simple Passive: Basketball ___ in parks.",
          "answer": "is played",
          "options": [
            "is played",
            "is play",
            "played is"
          ],
          "explanation": "Present passive uses is + participle played.",
          "id": "a2-30-g1",
          "rule": "a2feedback30_1",
          "source": "Adapted grammar task",
          "modelAnswer": "is played"
        },
        {
          "type": "choice",
          "prompt": "A fan is a person ___ supports a team.",
          "answer": "who",
          "options": [
            "who",
            "where",
            "what"
          ],
          "explanation": "Who identifies a person and is the clause subject.",
          "id": "a2-30-g2",
          "rule": "a2feedback30_2",
          "source": "Adapted grammar task",
          "modelAnswer": "who"
        },
        {
          "type": "choice",
          "prompt": "Yesterday we ___ the game.",
          "answer": "watched",
          "options": [
            "watched",
            "have watched",
            "watch"
          ],
          "explanation": "Yesterday gives a finished past time: watched.",
          "id": "a2-30-g3",
          "rule": "a2feedback30_3",
          "source": "Adapted grammar task",
          "modelAnswer": "watched"
        },
        {
          "type": "input",
          "prompt": "Use Past Simple Passive: The game ___ watched last night.",
          "answers": [
            "was"
          ],
          "explanation": "Singular game + past passive: was watched.",
          "id": "a2-30-g4",
          "rule": "a2feedback30_4",
          "source": "Adapted grammar task",
          "modelAnswer": "Use Past Simple Passive: The game was watched last night."
        },
        {
          "type": "input",
          "prompt": "Use Present Continuous: We ___ watching a game now.",
          "answers": [
            "are"
          ],
          "explanation": "With we, the current action uses are + watching.",
          "id": "a2-30-g5",
          "rule": "a2feedback30_5",
          "source": "Adapted grammar task",
          "modelAnswer": "Use Present Continuous: We are watching a game now."
        },
        {
          "type": "order",
          "prompt": "Build the sentence.",
          "tokens": [
            "Have",
            "you",
            "ever",
            "watched",
            "a",
            "basketball",
            "game?"
          ],
          "answer": "Have you ever watched a basketball game?",
          "explanation": "Experience question: have + subject + ever + participle.",
          "id": "a2-30-g6",
          "rule": "a2feedback30_6",
          "source": "Adapted grammar task",
          "modelAnswer": "Have you ever watched a basketball game?"
        }
      ],
      "listeningItems": [
        {
          "type": "choice",
          "prompt": "What shape is the American football ball in Ryan’s description?",
          "answer": "Oval",
          "options": [
            "Oval",
            "Perfectly round",
            "Square"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-30-l1",
          "rule": "a2listen",
          "source": "Sports in the USA"
        },
        {
          "type": "choice",
          "prompt": "What does Ryan say people watch during the Super Bowl besides the game?",
          "answer": "The halftime show and commercials",
          "options": [
            "The halftime show and commercials",
            "Only news reports",
            "A cooking lesson"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-30-l2",
          "rule": "a2listen",
          "source": "Sports in the USA"
        },
        {
          "type": "choice",
          "prompt": "Which league does Ryan name for ice hockey?",
          "answer": "The NHL",
          "options": [
            "The NHL",
            "The NBA",
            "MLS"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-30-l3",
          "rule": "a2listen",
          "source": "Sports in the USA"
        },
        {
          "type": "choice",
          "prompt": "What does Ryan recommend for an exciting game that is easy to follow?",
          "answer": "Basketball",
          "options": [
            "Basketball",
            "Only baseball",
            "Only American football"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-30-l4",
          "rule": "a2listen",
          "source": "Sports in the USA"
        },
        {
          "type": "choice",
          "prompt": "Which sport does Emma want to try watching first?",
          "answer": "Basketball",
          "options": [
            "Basketball",
            "Baseball",
            "Ice hockey"
          ],
          "explanation": "The transcript gives this detail.",
          "id": "a2-30-l5",
          "rule": "a2listen",
          "source": "Sports in the USA"
        }
      ]
    }
  ]
};if(typeof module==='object'&&module.exports)module.exports=data;else root.EvoCourseBank=data;})(typeof globalThis==='object'?globalThis:this);
