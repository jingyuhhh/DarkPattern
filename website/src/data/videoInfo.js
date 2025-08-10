// import video1 from "/src/assets/invideo1.mp4";
// import video2 from "/src/assets/invideo2.mp4";
// import video3 from "/src/assets/invideo4.mp4";

export const videos = [
  {
    title: "8 Minutes of Calm | Everyday Objects, Beautifully Observed",
    channel: "stillhours",
    source: "/Shopping/videos/invideo1.mp4", // 不再 import,
    description: `A kettle bubbling. Curtains dancing. Shadows slowly shifting across a sunlit floor.
  
  “Corners of Time” is a soft observational diary—a collection of micro-moments from a quiet life. No words, no faces. Just small sounds and visuals that remind us to slow down.
  
  🎧 Headphones recommended.
  
  ✨ Captioned thoughts in the corners.
  
  —
  🎥 Shot on: Sony A7 III
  🎛 Edited in: DaVinci Resolve
  🎵 Sound: Real-time audio + soft lofi layer`,

    comments: [
      {
        user: "lofiwindow",
        text: "This feels like drinking tea with silence. Beautiful.",
        likes: 214,
      },
      {
        user: "minimoments",
        text: "I didn’t know how much I needed this until now.",
        likes: 178,
      },
      {
        user: "neonhush",
        text: "The lighting, the pacing, the SOUND. Everything is perfect.",
        likes: 263,
      },
      {
        user: "slowsundays",
        text: "I want this to play in the background of my whole life.",
        likes: 195,
      },
      {
        user: "deskpoetry",
        text: "“Do not disturb this moment” — that line in the corner hit deep.",
        likes: 237,
      },
    ],
  },
  {
    title: "When the City Sleeps | Night Walk Through an Empty World",
    channel: "afterhours.cities",
    source: "/Shopping/videos/invideo2.mp4",
    description: `What do cities look like when no one is watching?
  
  “Urban Stillness Atlas” captures quiet spaces between stories: neon reflections, empty crossings, mechanical movements continuing with no human presence. It’s both eerie and comforting.
  
  ⌛ Best watched late at night with the lights off.
  
  🕒 Coordinates + timestamps included.
  
  —
  🎥 Camera: Blackmagic Pocket Cinema
  🎛 Color Grading: Cool tones + Neon glow
  🎧 Soundtrack: Soft ambient synths + actual city sounds`,

    comments: [
      {
        user: "voidlooping",
        text: "The loneliness in this is so vivid it almost feels alive.",
        likes: 301,
      },
      {
        user: "synthghost",
        text: "Reminds me of walking home at 3AM, headphones on, no one in sight.",
        likes: 244,
      },
      {
        user: "coldneon",
        text: "This is like therapy for people tired of noise.",
        likes: 209,
      },
      {
        user: "ghoststructures",
        text: "Is this what the city dreams when we’re gone?",
        likes: 267,
      },
      {
        user: "afterrainfilms",
        text: "The escalator shot. Absolute chills.",
        likes: 283,
      },
    ],
  },
  {
    title: "Where the Wind Goes | A Visual Poem with No People",
    channel: "windletter",
    source: "/Shopping/videos/invideo4.mp4",
    description: `Wind performing on the stage of nature.
  
  “Still Life Theatre of Wind” explores how air moves the world—through trees, water, leaves, fabric, and forgotten objects. Each scene is a poem with no words.
  
  💨 Question for you: Does wind have memory?
  
  
  🎥 Captured with: Fujifilm X-T4
  🎞 Filter: Natural + light grain
  🎧 Audio: Raw wind recordings + subtle ambient layers`,

    comments: [
      {
        user: "blowingsilent",
        text: "The moment with the dandelion… time just stopped.",
        likes: 325,
      },
      {
        user: "leafflicker",
        text: "I’ve never seen wind *felt* like this.",
        likes: 281,
      },
      {
        user: "fieldjournals",
        text: "“Wind took a nap in the afternoon” — I want a whole book of these subtitles.",
        likes: 347,
      },
      {
        user: "glassmorning",
        text: "I didn’t realize how much I missed silence until this played.",
        likes: 222,
      },
      {
        user: "slowearthfilms",
        text: "This is what calm looks like in motion.",
        likes: 298,
      },
    ],
  },
];

export const getVideoInfo = (id) => {
  switch (id) {
    case "8":
      return videos[0];
    case "10":
      return videos[2];
    case "13":
      return videos[1];
  }
};
