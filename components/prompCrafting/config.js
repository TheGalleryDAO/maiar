const config = {
    photographySettings:{
        proximity:[
            {
                name:"Extreme close up",
                description:"Extreme close up shot.", 
                value:"extreme close-up shot"
            },

            {
                name:"Close up",
                description:"Close up shot.", 
                value:"close-up shot"
            },
            {
                name:"Medium shot",
                description:"Depicts subject from waist up.", 
                value:"medium shot, mid-shot, waist shot"
            },
            {
                name:"Long shot",
                description:"Shows full subject and surroundings", 
                value:"long shot, wide shot, full shot"
            },
            {
                name:"Extreme long",
                description:"Extreme long shot.", 
                value:"extreme wide shot, extreme long shot"
            },   
            
            // Overhead view: establishing shot, from above, high angle, crane shot Film still, establishing shot of bustling farmers market, golden hour, high angle
            // Low angle: from below, worms-eye-view Film still, gangster squirrel counting his money, low angle, shot from below, worms eye view
            // Aerial view: birds eye view, drone photography Aerial photo of a coral reef that looks like a labyrinth.
            // Tilted frame: dutch angle, skewed shot Film still of stylish girl dancing on school desk, tilted frame, 35°, Dutch angle, cinematography from music video
            // Over-the-shoulder shot: Film still, over-the-shoulder shot of two pirates having an angry discussion, eyepatch, from adventure movie 'SHIVER ME TIMBERS' (1999)            
        ],
        position:[
            {
                name:"Overhead view",
                description:null, 
                value:"establishing shot, from above, high angle, crane shot"
            },

            {
                name:"Low angle",
                description:null, 
                value:"from below, worms-eye-view"
            },
            {
                name:"Aerial view",
                description:null,
                value:"birds eye view, drone photography"
            },
            {
                name:"Tilted frame",
                description:null,
                value:"dutch angle, skewed shot"
            },
            {
                name:"Over the shoulder shot",
                description:null,
                value:"over-the-shoulder shot"
            },   
        ], 
        outdoorLighting:[
           {
               name:"Golden Hour",
               description:null,
               value:[
                "golden hour", "dusk", "sunset", "sunrise - warm lighting", "strong shadows"
               ]
           },
           //Blue hour, twilight, cool, ISO1200, slow shutter speed
           {
            name:"Blue Hour",
            description:null,
            value:[
                "blue hour", "twilight", "cool", "ISO1200", "slow shutter speed"
            ]
        },
        {
            //Midday, harsh overhead sunlight, directional sunlight
            name:"Midday",
            description:null,
            value:[
                "Midday", "harsh overhead sunlight", "directional sunlight"
            ]
        } ,
        {
            name:"Overcast",
            description:null,
            value:[
                "Overcast", "flat lighting"
            ]
        } 
        ],
        indorLighting:[            
            {
                name:"Warm",
                description:null,
                value:[
                    "warm lighting", "2700K"
                ]
            }, 
            {
                name:"Cold",
                description:null,
                value:[
                    "cold", "fluorescent lighting", "4800K"
                ]
            },
            {
                name:"Flash photography",
                description:null,
                value:[
                    "flash photography", "harsh flash"
                ]
            },
            {
                name:"High-key lighting",
                description:null,
                value:[
                    "high-key lighting", "neutral", "flat", "even", "corporate", "professional", "ambient"
                ]
            },
            {
                name:"Low-key lighting",
                description:null,
                value:[
                    "low-key lighting", "dramatic", "single light source", "high-contrast"
                ]
            },
            {
                name:"Backlighting",
                description:null,
                value:[
                    "backlight"
                ]
            },
            {
                name:"Studio lighting",
                description:null,
                value:[
                    "Studio lighting", "professional lighting","studio portrait", "well-lit"
                ]
            }                                      
        ],
        colorLighting:[
            {
                name:"Red",
                value:"red",
                hex:""
            },
            {
                name:"",
                value:"",
                hex:""
            },
            {
                name:"",
                value:"",
                hex:""
            },
            {
                name:"",
                value:"",
                hex:""
            },
            {
                name:"",
                value:"",
                hex:""
            }
        ],
        realObjectLighting:[

        ],
        definedDirection:[
            {
                name:"Frontlight",
                value:"frontlight, frontlighting",
                description:"Generally speaking, frontlight will give you a well-lit subject, so it can be a good go-to when in a pinch. But frontlight also results in very flat images, because your subject doesn’t have any shadows that can be seen by your camera."
            },
            {
                name:"Backlight",
                value:"backlight, backlighting",
                description:"Backlight comes from behind your subject. It's the most versatile of the lighting directions, because you can use it for a bunch of different effects"
            },
            {
                name:"Left side Light",
                value:"left side lighting",
                description:"Sidelight, offers a lot of three-dimensionality. It illuminates one side of your subject while casting shadows on the other half, making for significant depth, which in turn creates drama."
            },
            {
                name:"Right side Light",
                value:"right side lighting",
                description:"Sidelight, offers a lot of three-dimensionality. It illuminates one side of your subject while casting shadows on the other half, making for significant depth, which in turn creates drama."
            },
                       
            {
                name:"Overhead Light",
                value:"overhead light, overhead lighting, top side lighting, top side light",
                description:"When the light comes from overhead, it creates unpleasant shadows that fall over your subject in unflattering ways. Plus, overhead light, in nature, comes when the sun is high in the sky, so the light is also very harsh."
            },            {
                name:"Upward Lighting",
                value:"upward lighting, upward lightn, bottom side light, bottom side lighting",
                description:"The classic example of upward lighting is from Halloween photos, where a child lights their face using a flashlight held under the chin."
            }
        ],       
        filmType:[
            {
                name:"Kodachrome",
                description:"Strong reds and greens",
                value:"Kodachrome",
            },
            {
                name:"Autochrome",
                description:"Queasy yellow-greens + hot pinks",
                value:"Autochrome",
            },
            {
                name:"Lomography",
                description:"Oversaturated, hue-shifted images",
                value:"Lomography",
            },
            {
                name:"Polaroid, Instax",
                description:"Soft focus, square, and flash-y",
                value:"Polaroid, Instax",
            },
            {
                name:"CCTV",
                description:"surveillance, security footage, dashcam, black-and-white",
                value:"CCTV",
            },
            {
                name:"Disposable camera",
                description:"Authentically amateur composition",
                value:"Disposable camera",
            },
            {
                name:"Daguerrotype",
                description:"Very early film stock, 1800s, vintage",
                value:"Daguerrotype",
            },
            {
                name:"Camera obscura",
                description:"pinhole photography",
                value:"Camera obscura",
            },
            {
                name:"Double exposure",
                description:"Name two subjects to combine them both",
                value:"Double exposure",
            },
            {
                name:"Cyanotype",
                description:"Blue-and-white photo printing method",
                value:"Cyanotype",
            },
            {
                name:"Black and white, Tri-X 400TX",
                description:"Classic monochrome photography",
                value:"Black and white, Tri-X 400TX",
            },
            {
                name:"Colour splash",
                description:"One colour, and everything else B/W",
                value:"Colour splash",
            },
            {
                name:"Solarised",
                description:"Some colours/parts are 'negative'",
                value:"Solarised",
            },
            {
                name:"Anaglyph",
                description:"3D photography format ",
                value:"Anaglyph",
            },
            {
                name:"Redscale photography",
                description:"Makes things red, then more red",
                value:"Redscale photography",
            },
            {
                name:"Infrared photography",
                description:"Weird film that makes plants pink",
                value:"Infrared photography",
            },
            {
                name:"Bleach bypass",
                description:"Muted look from Saving P'vt Ryan",
                value:"Bleach bypass",
            },
            {
                name:"Instagram, Hipstamatic, 2015",
                description:"Faux-retro filtered Noughties look",
                value:"Instagram, Hipstamatic, 2015",
            },

            
        ]
    },
    artHistoryReference:{
        "Early Art history":[
            {
                name:"Cave paintings",
                value:[
                    "Cave paintings", "pre-historic", "Lascaux", "primitive"
                ]
            },
            {
                name:"Ancient Egyptian",
                value:[
                    "Ancient Egyptian mural", "tomb", "fresco", "register", "hieroglyphics"
                ]
            },
            {
                name:"Ancient Egypt",
                value:[
                    "Ancient Egypt papyrus", "Book of the Dead", "well-preserved"
                ]
            },
            {
                name:"Fayum portrait",
                value:[
                    "Fayum portrait", "Mummy portrait", "from Egypt", "from Luxor", "on wood"
                ]
            },
            {
                name:"Decorative Minoan",
                value:[
                    "Decorative Minoan mural", "2000 BCE", "artefact", "ancient"
                ]
            },
            {
                name:"Roman mosaic",
                value:[
                    "Roman mosaic", "Ancient Rome", "opus tesellatum "
                ]
            },
            {
                name:"Ancient Roman",
                value:[
                    "Ancient Roman painting", "Fourth Style", "Third Style", "second Style", "Pompeii"
                ]
            },
            {
                name:"Nuremberg Chronicle",
                value:[
                    "Nuremberg Chronicle", "1493", "Liber Chronicarum", "Michael Wolgemut"
                ]
            },
            {
                name:"Byzantine icon",
                value:[
                    "Byzantine icon", "Christian icon", "halo", "painting", "Eastern Roman"
                ]
            },
            {
                name:"Giilded codex",
                value:[
                    "Giilded codex", "lavish", "illiminated", "maniscript", "vellum", "well-preserved"
                ]
            },
        ], 
        Reinassance:[
            {
                name:"Renaissance",
                value:[
                    "Renaissance painting (1400-1600)"
                ]
            },
            {
                name:"Mannerism",
                value:[
                    "Mannerism", "Mannerist (1500-1600)"
                ]
            },
            {
                name:"Baroque",
                value:[
                    "Baroque", "17th c", "Velázquez", "Caravaggio", "Vermeer"
                ]
            },
            {
                name:"Rococo",
                value:[
                    "Rococo", "1730", "late Baroque", "Antoine Watteau "
                ]
            },
            {
                name:"Neoclassicism",
                value:[
                    "Neoclassicism", "capriccio", "18th c", "Angelica Kauffmann"
                ]
            },
            {
                name:"Realism",
                value:[
                    "Realism", "realist", "19th century", "Gustave Courbet"
                ]
            },
            {
                name:"Art Nouveau / Impressionism",
                value:[
                    "Art Nouveau", "Impressionism", "Monet", "Renoir"
                ]
            },
        ],
        "Modern Art":[
            {
                name:"Art deco",
                value:[
                    "Art deco, 1925", "vintage", "streamline moderne", "luxury", "poster"
                ]
            },
            {
                name:"Abstract expressionism",
                value:[
                    "Abstract expressionism", "paint splatters", "Jackson Pollock"
                ]
            },
            {
                name:"Bauhaus",
                value:[
                    "Bauhaus", "1930s", "geometric", "Paul Klee", "Wassily Kandinsky"
                ]
            },
            {
                name:"field painting",
                value:[
                    "Colour field painting", "abstract", "Rothko", "60s", "Clyfford Still"
                ]
            },
            {
                name:"Cubism",
            value:[
                "cubism", "cubist", "1910", "Picasso", "Georges Braque"
                ]
            },
            {
                name:"Constructivist",
                value:[
                    "Constructivist", "constructivism", "Russian", "design", "1915", "Soviet-era"
                ]
            },
            {
                name:"Dadaism",
                value:[
                    "Dadaism","Dada", "Dadaism", "Dadaist", "1920", "absurd", "nonsense ", "collage", "assemblage", "cut-up", "photomontage"
                ]
            },
            {
                name:"De Stijl",
                value:[
                    "De Stijl","neoplasticism", "Piet Mondrian", "Theon can Doesburg", "1920", "Dutch"
                ]
            },
            {
                name:"Expressionism",
                value:[
                    "Expressionism", "expressionist", "1912", "German Expressionism"
                ]
            },
            {
                name:"Fauvism",
                value:[
                    "Fauvism", "fauvist", "1905", "Andre Derain", "Henri Matisse"
                ]
            },
            {
                name:"Futurism",
                value:[
                    "Futurism", "Futurist", "1913", "Italian", "aeropittura", "dynamism"
                ]
            },
            {
                name:"Metaphysical painting",
                value:[
                    "Metaphysical painting", "de Chirico", "Italian", "Carlo Carrà"
                ]
            },
            {
                name:"Surrealism",
                value:[
                    "Surrealism", "surrealist", "Magritte", "Dali", "Andre Breton", "Max Ernst"
                ]
            },
            {
                name:"Art",
                value:[
                    "Pop Art", "Warhol", "1960s "
                ]
            },
            {
                name:"art",
                value:[
                    "Street art", "graffiti", "urban public art", "independent"
                ]
            },
            {
                name:"Suprematism",
                value:[
                    "Suprematism", "abstract", "geometric", "Kazimir Malevich", "1913 / Mexican muralism", "Diego Rivera", "José Clemente Orozco", "David Alfaro Siqueiros"
                ]
            },
            {
                name:"Expressionism",
                value:[
                    "Neo-Expressionism", "1980s"
                ]
            },
            {
                name:"Orphism",
                value:[
                    "Orphism", "Orphist", "František Kupka", "Robert Delaunay", "Sonia Delaunay"
                ]
            },
            {
                name:"photography",
                value:[
                    "Street photography", "urban", "candid", "flaneur", "unposed"
                ]
            },
            
        ]
    },
    aesthetics:[
        {
        name:"Vaporwave",
        value:["Vaporwave neon, pink, blue, geometric, futuristic, '80s"]
        },
        {
        name:"Post-apocalyptic",
        value:["Post-apocalyptic grey, desolate, stormy, fire, decay"]
        },
        {
        name:"Gothic",
        value:["Gothic, fantasy stone, dark, lush, nature, mist, mystery, angular"]
        },
        {
        name:"Cybernetic",
        value:["Cybernetic, sci-fi glows, greens, metals, armor, chrome"]
        },
        {
        name:"Steampunk",
        value:["Steampunk gold, copper, brass, Victoriana"]
        },
        {
        name:"Memphis",
        value:["Memphis Memphis Group, 1980s, bold, kitch, colourful, shapes"]
        },
        {
        name:"Dieselpunk",
        value:["Dieselpunk grimy, steel, oil, '50s, mechanised, punk cousin of steampunk"]
        },
        {
        name:"Afrofuturism",
        value:["Afrofuturism futuristic, and African!"]
        },
        {
        name:"Cyberpunk",
        value:["Cyberpunk 1990s, dyed hair, spiky, graphic elements"]
        },
        {
        name:"Biopunk, organic",
        value:["Biopunk, organic greens, slimes, plants, futuristic, weird"]
        },
        
    ],
    mood:[
        {
            name:"Positive mood, low energy ",
            value:[
                "light, peaceful, calm, serene, soothing, relaxed, placid, comforting, cosy, tranquil, quiet, pastel, delicate, graceful, subtle, balmy, mild, ethereal, elegant, tender, soft"
            ]
        },
        
                
        {
            name:"Positive mood, high energy",
            value:[
                "bright, vibrant, dynamic, spirited, vivid, lively, energetic, colorful, joyful, romantic, expressive, bright, rich, kaleidoscopic, psychedelic, saturated, ecstatic, brash, exciting, passionate, hot"
            ]
        },
        
        
        {
            name:"Negative mood, low energy",
            value:[
                "muted, bleak, funereal, somber, melancholic, mournful, gloomy, dismal, sad, pale, washed-out, desaturated, grey, subdued, dull, dreary, depressing, weary, tired"
            ]
        },
        
        
        {
            name:"Negative mood, high energy",
            value:[
                "dark, ominous, threatening, haunting, forbidding, gloomy, stormy, doom, apocalyptic, sinister, shadowy, ghostly, unnerving, harrowing, dreadful, frightful, shocking, terror, hideous, ghastly, terrifying "
            ]
        },
        
                
    ],
    sizeStructureShape:[
        {
            name:"Big and Free",
            value:["curvaceous, swirling, organic, riotous, turbulent, flowing, amorphous, natural, distorted, uneven, random, lush, organic, bold, intuitive, emotive, chaotic, tumultuous, earthy, churning"]
        },
        {
            name:"Big and Structured",
            value:["Monumental, imposing, rigorous, geometric, ordered, angular, artificial, lines, straight, rhythmic, composed, unified, manmade, perspective, minimalist, blocks, dignified, robust, defined"]
        },
        {
            name:"Small and Structured",
            value:["ornate, delicate, neat, precise, detailed, opulent, lavish, elegant, ornamented, fine, elaborate, accurate, intricate, meticulous, decorative, realistic"]
        },
        {
            name:"Small and Free",
            value:["unplanned, daring, brash, random, casual, sketched, playful, spontaneous, extemporaneous, offhand, improvisational, experimental, loose, jaunty, light, expressive"]
        }
    ],
    artStyle:[
    {
        name:"digital art",
        value:"digital art"
    },
    {
        name:"steampunk art",
        value:"steampunk art"
    },
    {
        name:"cyberpunk art",
        value:"cyberpunk art"
    },
    {
        name:"ukiyo-e art",
        value:"ukiyo-e art"
    },
    {
        name:"deco art",
        value:"deco art"
    },
    {
        name:"vector art",
        value:"vector art"
    },
    {
        name:"low poly art",
        value:"low poly art"
    },
    {
        name:"glitchcore art",
        value:"glitchcore art"
    },
    {
        name:"bauhaus art",
        value:"bauhaus art"
    },
    {
        name:"modern art",
        value:"modern art"
    },
    {
        name:"line art",
        value:"line art"
    },
    {
        name:"vaporwave art",
        value:"vaporwave art"
    },
    {
        name:"ballpoint pen art",
        value:"ballpoint pen art"
    },
    {
        name:"watercolor art",
        value:"watercolor art"
    },
    {
        name:"anime art",
        value:"anime art"
    },
    {
        name:"graffiti art",
        value:"graffiti art"
    },
    {
        name:"cartoon art",
        value:"cartoon art"
    },
    {
        name:"3D art",
        value:"3D art"
    },
    {
        name:"pixel art",
        value:"pixel art"
    },
    {
        name:"psychedelic art",
        value:"psychedelic art"
    },
    
    
    ],
    cameraLens:{
        canon:[
            {
                name:"Canon EF 50mm f/1.8 II Lens" ,
                value:"Canon EF 50mm f/1.8 II Lens" 
            },
            {
                name:"Canon EF 70-200mm f/2.8L IS USM Telephoto Zoom Lens" ,
                value:"Canon EF 70-200mm f/2.8L IS USM Telephoto Zoom Lens" 
            },
            {
                name:"Canon EF 50mm f1.4 USM Standard & Medium Telephoto Lens" ,
                value:"Canon EF 50mm f1.4 USM Standard & Medium Telephoto Lens" 
            },
            {
                name:"Canon EF 24-105mm f/4 L IS USM Lens" ,
                value:"Canon EF 24-105mm f/4 L IS USM Lens" 
            },
            {
                name:"Canon EF 24-70mm f/2.8L USM Standard Zoom Lens" ,
                value:"Canon EF 24-70mm f/2.8L USM Standard Zoom Lens" 
            },
            {
                name:"Canon EF 70-200mm f/4L USM Telephoto Zoom Lens" ,
                value:"Canon EF 70-200mm f/4L USM Telephoto Zoom Lens" 
            },
            {
                name:"Canon EF 85mm f/1.8 USM Telephoto Lens" ,
                value:"Canon EF 85mm f/1.8 USM Telephoto Lens" 
            },
            {
                name:"Canon EF-S 17-55mm f/2.8 IS USM Lens" ,
                value:"Canon EF-S 17-55mm f/2.8 IS USM Lens" 
            },
            {
                name:"Canon EF 17-40mm f/4L USM Ultra Wide Angle Zoom Lens" ,
                value:"Canon EF 17-40mm f/4L USM Ultra Wide Angle Zoom Lens" 
            },
            {
                name:"Canon EF 100mm f/2.8 Macro USM Lens" ,
                value:"Canon EF 100mm f/2.8 Macro USM Lens" 
            },            
        ],
        nikon:[
            {
                name:"Nikon 18-200mm f/3.5-5.6 G ED-IF AF-S VR DX Lens" ,
                value:"Nikon 18-200mm f/3.5-5.6 G ED-IF AF-S VR DX Lens" 
            },
            {
                name:"Nikon 50mm f/1.8D AF Nikkor Lens" ,
                value:"Nikon 50mm f/1.8D AF Nikkor Lens" 
            },
            {
                name:"Nikon 70-200mm f/2.8G ED-IF AF-S VR Zoom Nikkor Lens" ,
                value:"Nikon 70-200mm f/2.8G ED-IF AF-S VR Zoom Nikkor Lens" 
            },
            {
                name:"Nikon 105mm f/2.8G ED-IF AF-S VR Micro-Nikkor Lens" ,
                value:"Nikon 105mm f/2.8G ED-IF AF-S VR Micro-Nikkor Lens" 
            },
            {
                name:"Nikon 80-200mm f/2.8D ED AF Zoom Nikkor Lens" ,
                value:"Nikon 80-200mm f/2.8D ED AF Zoom Nikkor Lens" 
            },
            {
                name:"Nikon 17-55mm f/2.8G ED-IF AF-S DX Nikkor Zoom Lens" ,
                value:"Nikon 17-55mm f/2.8G ED-IF AF-S DX Nikkor Zoom Lens" 
            },
            {
                name:"Nikon 24-70mm f/2.8G ED AF-S Nikkor Wide Angle Zoom Lens" ,
                value:"Nikon 24-70mm f/2.8G ED AF-S Nikkor Wide Angle Zoom Lens" 
            },
            {
                name:"Nikon 10.5mm f/2.8G ED AF DX Fisheye Nikkor Lens",
                value:"Nikon 10.5mm f/2.8G ED AF DX Fisheye Nikkor Lens"
            },
        ],
        others:[
            {
                name:"Sigma 10-20mm f/4-5.6 EX DC HSM Lens",
                value:"Sigma 10-20mm f/4-5.6 EX DC HSM Lens"
            },
            {
                name:"Pentax SMCP-FA 50mm f/1.4 Lens",
                value:"Pentax SMCP-FA 50mm f/1.4 Lens"
            },
            {
                name:"Sigma 70-300mm f/4-5.6 DG APO Macro Telephoto Zoom",
                value:"Sigma 70-300mm f/4-5.6 DG APO Macro Telephoto Zoom"
            },
            {
                name:"Pentax-m 50mm 1:1.7",
                value:"Pentax-m 50mm 1:1.7"
            },
            {
                name:"Olympus 14-54mm f/2.8-3.5 Zuiko ED Digital SLR Lens",
                value:"Olympus 14-54mm f/2.8-3.5 Zuiko ED Digital SLR Lens"
            },
        ]        
    }
}

export default config;




