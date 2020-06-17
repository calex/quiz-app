'use strict';

const USERDATASTORE = {   
    id: cuid(), 
    correctScore: 0, 
    incorrectScore: 0,
    currentStep: 1
};

const QUESTIONSTORE = [
    {   
        id: cuid(), 
        questionText: "Who is the only cinematographer to have been nominated three times in a row for an Academy Award?",
        correctAnswerNumber: 2,
        possibleAnswers: [ 
            {
                id: cuid(),
                number: 1,
                answerText: "Roger Deakins",
                supportingImageUri: "1917-roger-deakins.jpg",
                supportingImageAltText: "",
                supportingInfoText: "1917",
                answerGuessedResponseHtml: "While Roger Deakins has been one of the most celebrated cinematographers of the last 30 years&mdash;nominated 12 times by the Academy&mdash;he did not win an Oscar until 2017's <i>Blade Runner 2049</i>."
            },
            {
                id: cuid(),
                number: 2,
                answerText: "Emmanuel Lubezki",
                supportingImageUri: "birdman-emmanuel-lubezki.jpg",
                supportingImageAltText: "",
                supportingInfoText: "Birdman",
                answerGuessedResponseHtml: "In a remarkable trifecta, Luzbezki won in 2013, 2014, and 2015 for <i>Gravity</i>, <i>Birdman</i>, and <i>The Revenant</i>, respectively."
            },
            {
                id: cuid(),
                number: 3,
                answerText: "Gregg Toland",
                supportingImageUri: "kane-gregg-toland.jpg",
                supportingImageAltText: "",
                supportingInfoText: "Citizen Kane",
                answerGuessedResponseHtml: "Although <i>Citizen Kane</i> is considered by many to be the greatest film of all time, Toland did not win the Oscar for his work on the movie. Toland, considered one of the most influential cinematographers of all time, only won the Best Cinematography Oscar once, for 1939's <i>Wuthering Heights</i>."
            },
            {
                id: cuid(),
                number: 4,
                answerText: "Gordon Willis",
                supportingImageUri: "godfather-gordon-willis.jpg",
                supportingImageAltText: "",
                supportingInfoText: "The Godfather",
                answerGuessedResponseHtml: "Unbelievably, Willis never won an Oscar for Cinematography. While the films he worked on between 1970-1977 (including <i>The Godfather</i>, <i>All the President’s Men</i>, and <i>Annie Hall</i>) are considered master classes in film lighting, and received a combined 39 nominations, he was not even <i>nominated</i> for an Oscar during this period."
            },
            {
                id: cuid(),
                number: 5,
                answerText: "Theo Van de Sande",
                supportingImageUri: "nicky-theo-van-de-sande.jpg",
                supportingImageAltText: "",
                supportingInfoText: "Little Nicky",
                answerGuessedResponseHtml: "The man who lit and shot the Adam Sandler &ldquo;classic&rdquo; <i>Little Nicky</i> has not yet won any Academy Awards&mdash;but he did win Netherland’s Golden Calf for Best Cinematography in 1982 and 1987, perhaps a reminder to never too-harshly judge one person's work by the collective results of one film."
            }
        ]
    },
    {   
        id: cuid(), 
        questionText: "Which movie came out in 1999?",
        correctAnswerNumber: 5,
        possibleAnswers: [ 
            {
                id: cuid(),
                number: 1,
                answerText: "The Matrix",
                supportingImageUri: "the-matrix.jpg",
                supportingImageAltText: "Movie still from The Matrix",
                supportingInfoText: "",
                answerGuessedResponseHtml: "1999 is considered by cinephiles to be one of the most remarkable years in modern movie history&mdash;for the number and variety of amazing films released&mdash;and did <i>include</i> the release of <i>The Matrix</i>."
            },
            {
                id: cuid(),
                number: 2,
                answerText: "The Sixth Sense",
                supportingImageUri: "the-sixth-sense.jpg",
                supportingImageAltText: "Movie still from The Sixth Sense",
                supportingInfoText: "",
                answerGuessedResponseHtml: "1999 is considered by cinephiles to be one of the most remarkable years in modern movie history&mdash;for the number and variety of amazing films released&mdash;and did <i>include</i> the release of <i>The Sixth Sense</i>."
            },
            {
                id: cuid(),
                number: 3,
                answerText: "Fight Club",
                supportingImageUri: "fight-club.jpg",
                supportingImageAltText: "Movie still from Fight Club",
                supportingInfoText: "",
                answerGuessedResponseHtml: "1999 is considered by cinephiles to be one of the most remarkable years in modern movie history&mdash;for the number and variety of amazing films released&mdash;and did <i>include</i> the release of <i>Fight Club</i>."
            },
            {
                id: cuid(),
                number: 4,
                answerText: "Big Daddy",
                supportingImageUri: "big-daddy.jpg",
                supportingImageAltText: "Movie still from Big Daddy",
                supportingInfoText: "",
                answerGuessedResponseHtml: "1999 is considered by cinephiles to be one of the most remarkable years in modern movie history&mdash;for the number and variety of amazing films released. Less notably and perhaps unfortunately, it did also <i>include</i> the release of <i>Big Daddy</i>."
            },
            {
                id: cuid(),
                number: 5,
                answerText: "All of the above",
                supportingImageUri: "",
                supportingImageAltText: "",
                supportingInfoText: "",
                answerGuessedResponseHtml: "1999 is considered by cinephiles to be one of the most remarkable years in modern movie history, for the number and variety of amazing films released. In addition to the films above, <i>American Beauty</i>, <i>Magnolia</i>, <i>The Iron Giant</i>, and <i>The Talented Mr. Ripley</i> were all released, plus many more legendary titles."
            }
        ]
    },
    {   
        id: cuid(), 
        questionText: "Which movie took the longest amount of time (of all time) to reach $200 million at the box office?",
        correctAnswerNumber: 1,
        possibleAnswers: [ 
            {
                id: cuid(),
                number: 1,
                answerText: "Raiders of the Lost Ark",
                supportingImageUri: "raiders-of-the-lost-ark.jpg",
                supportingImageAltText: "Movie still from Raiders of the Lost Ark",
                supportingInfoText: "1981",
                answerGuessedResponseHtml: "<i>Raiders</i> opened at number 1 in its 1981 box office weekend with about $8 million grossed, but was quickly knocked off its perch the following weekend by <i>Superman II</i>, worrying executives at Paramount. Contrary to the way today’s box office works, though, the film had huge staying power and actually climbed <i>back</i> to the number 1 spot after 6 weeks. It took 282 weeks for it to hit $200 million."
            },
            {
                id: cuid(),
                number: 2,
                answerText: "Forrest Gump",
                supportingImageUri: "forrest-gump.jpg",
                supportingImageAltText: "Forrest Gump movie still",
                supportingInfoText: "1995",
                answerGuessedResponseHtml: "Though it was released in an era when movies had staying power at the box office&mdash;and did very well week after week&mdash;<i>Forrest Gump</i> was not especially slow to hit $200 million."
            },
            {
                id: cuid(),
                number: 3,
                answerText: "Star Wars: Episode IV: A New Hope",
                supportingImageUri: "star-wars.jpg",
                supportingImageAltText: "Movie still from Star Wars",
                supportingInfoText: "1976",
                answerGuessedResponseHtml: "<i>Star Wars</i> is actually the slowest film to make $350 million, not $200 million. It gathered steam slowly as people discovered it, just like the actual slowest film to hit $200 million."
            },
            {
                id: cuid(),
                number: 4,
                answerText: "Titanic",
                supportingImageUri: "titanic.jpg",
                supportingImageAltText: "Movie still from Titanic",
                supportingInfoText: "",
                answerGuessedResponseHtml: "<i>Titanic</i> is actually the slowest film to make $400 million, $450 million, $500 million, and $550 million. It gathered steam slowly as people discovered it, just like the actual slowest film to hit $200 million."
            },
            {
                id: cuid(),
                number: 5,
                answerText: "The Waterboy",
                supportingImageUri: "waterboy.jpg",
                supportingImageAltText: "The Waterboy movie still",
                supportingInfoText: "",
                answerGuessedResponseHtml: "<i>The Waterboy<i>‘s worldwide total was a respectable $185 million, but it has not yet made $200 million at the box office."
            }
        ]
    },
    {   
        id: cuid(), 
        questionText: "Which movie has, in its lead role, an Emmy, Golden Globe, and Independent Spirit Award-winning actor?",
        correctAnswerNumber: 2,
        possibleAnswers: [ 
            {
                id: cuid(),
                number: 1,
                answerText: "The Talented Mr. Ripley",
                supportingImageUri: "talented-mr-ripley.jpg",
                supportingImageAltText: "Movie still from The Talented Mr. Ripley",
                supportingInfoText: "1999",
                answerGuessedResponseHtml: "Though <i>Ripley</i> boasts an impressive cast of award winners like Matt Damon and Jude Law, nobody in the cast has won all of the particular awards listed above."
            },
            {
                id: cuid(),
                number: 2,
                answerText: "Just Go With It",
                supportingImageUri: "just-go-with-it.jpg",
                supportingImageAltText: "Just Go With It movie still",
                supportingInfoText: "2011",
                answerGuessedResponseHtml: "This is the actual answer, believe it or not! Adam Sandler has turned in respected performances over the years, especially in the movies <i>Punch-drunk Love</i> and <i>Uncut Gems</i> (both of which you should probably watch instead of <i>Just Go With It</i>)."
            },
            {
                id: cuid(),
                number: 3,
                answerText: "The Apartment",
                supportingImageUri: "the-apartment.jpg",
                supportingImageAltText: "Movie still from The Apartment",
                supportingInfoText: "1960",
                answerGuessedResponseHtml: "Perhaps even more impressively, however, the star of <i>The Apartment</i>, Jack Lemmon, was nominated many times for Emmy, Grammy, Oscar, and Tony Awards over the course of his life."
            },
            {
                id: cuid(),
                number: 4,
                answerText: "Rebel Without a Cause",
                supportingImageUri: "rebel-without-a-cause.jpg",
                supportingImageAltText: "Movie still from Rebel without a Cause",
                supportingInfoText: "1955",
                answerGuessedResponseHtml: "Sadly, the stars of <i>Rebel</i>, James Dean and Natalie Wood, died too young to garner all the awards they undoubtedly would have won had their careers not been shortened."
            },
            {
                id: cuid(),
                number: 5,
                answerText: "Men, Women, and Children",
                supportingImageUri: "men-women-and-children.jpg",
                supportingImageAltText: "Movie still from Men, Women, and Children",
                supportingInfoText: "2014",
                answerGuessedResponseHtml: "<i>Men, Women, and Children</i> had a very talented cast, but as such, no lead roles. Small clue: The cast does <i>include</i> the lead actor or actress of the actual answer to this question."
            }
        ]
    },
    {   
        id: cuid(), 
        questionText: 'From what movie does this quote come?: "I have so much strength in me you have no idea. I have a love in my life. It makes me stronger than anything you can imagine."',
        correctAnswerNumber: 5,
        possibleAnswers: [ 
            {
                id: cuid(),
                number: 1,
                answerText: "When Harry Met Sally",
                supportingImageUri: "when-harry-met-sally.jpg",
                supportingImageAltText: "Movie still from When Harry Met Sally",
                supportingInfoText: "1989",
                answerGuessedResponseHtml: 'Though <i>When Harry Met Sally</i> has some incredibly memorable and quotable lines&mdash;"I\'ll have what she\'s having"&mdash;this was not one of them.'
            },
            {
                id: cuid(),
                number: 2,
                answerText: "Splash",
                supportingImageUri: "splash.jpg",
                supportingImageAltText: "Splash movie still",
                supportingInfoText: "1984",
                answerGuessedResponseHtml: "Though Daryl Hannah have inspired Tom Hanks to similar feelings in <i>Splash</i>, it was not the correct answer."
            },
            {
                id: cuid(),
                number: 3,
                answerText: "Joe Versus the Volcano",
                supportingImageUri: "joe-versus-the-volcano.jpg",
                supportingImageAltText: "Movie still from Joe Versus the Volcano",
                supportingInfoText: "1990",
                answerGuessedResponseHtml: "<i>Joe</i> is full of big, grand feelings articulated boldly, much like the quote above. But it did not include it."
            },
            {
                id: cuid(),
                number: 4,
                answerText: "Uncut Gems",
                supportingImageUri: "uncut-gems.jpg",
                supportingImageAltText: "Movie still from Uncut Gems",
                supportingInfoText: "2019",
                answerGuessedResponseHtml: "Though <i>Uncut Gems</i> does star Adam Sandler&mdash;like the movie that is the correct answer to this question!&mdash;and is full of grand ialogue similar to the quote in the question, this was not a line in the film."
            },
            {
                id: cuid(),
                number: 5,
                answerText: "Punch-Drunk Love",
                supportingImageUri: "punch-drunk-love.jpg",
                supportingImageAltText: "Movie still from Punch-Drunk love",
                supportingInfoText: "2004",
                answerGuessedResponseHtml: "<i>Punch-Drunk Love</i> beautifully dream-like movie has Adam Sandler playing a powerful role that allows him to perfectly use his Sandler-ness to portray a man coming to grips with his feelings."
            }
        ]
    }
];
