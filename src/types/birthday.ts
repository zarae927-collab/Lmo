export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  rotation?: number;
}

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  url?: string;
  duration?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SurpriseItem {
  id: 'camera' | 'envelope' | 'cassette' | 'gift';
  title: string;
  subtitle: string;
  icon: string;
  revealTitle: string;
  revealContent: string;
  targetPage: number; // Page index 1 to 7
  unlocked?: boolean;
}

export interface BirthdayState {
  global: {
    recipientName: string;
    nickname: string;
    senderName: string;
    birthdayDate: string; // YYYY-MM-DD
    websiteTitle: string;
    mainGreeting: string;
    ambientSoundEnabled: boolean;
  };
  gateway: {
    teaserBadge: string;
    heading: string;
    subheading: string;
    openBtnText: string;
    questionText: string;
    yesBtnText: string;
    noBtnText: string;
    noReactionTitle: string;
    noReactionSubtitle: string;
    tryAgainBtnText: string;
    celebrationTitle: string;
    celebrationSubtitle: string;
    enterSurpriseBtnText: string;
  };
  gallery: {
    heading: string;
    subheading: string;
    activeLayout: 'polaroid' | 'grid' | 'heart' | 'scrapbook';
    featuredPhotoId: string;
    photos: GalleryPhoto[];
  };
  letter: {
    heading: string;
    envelopeSealText: string;
    letterTitle: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    hiddenMessagePrompt: string;
    hiddenMessage: string;
    photoUrl?: string;
    photoCaption?: string;
  };
  music: {
    heading: string;
    subheading: string;
    currentTrackTitle: string;
    currentArtist: string;
    audioUrl: string; // uploaded file data-url or web URL; if blank, uses melodic built-in chimes
    coverUrl: string;
    dedicationTitle: string;
    dedicationText: string;
    playlist: PlaylistItem[];
  };
  surpriseHub: {
    heading: string;
    subheading: string;
    items: SurpriseItem[];
  };
  quiz: {
    heading: string;
    subheading: string;
    questions: QuizQuestion[];
    resultTitle: string;
    resultMessage: string;
  };
  finale: {
    heading: string;
    subheading: string;
    wishTitle: string;
    wishMessage: string;
    cakeEnabled: boolean;
    candleCount: number;
    secretStarWish: string;
    countdownEnabled: boolean;
    finalQuote: string;
  };
}

export const STORAGE_KEY = 'golden_midnight_birthday_data_v1';

export const INITIAL_BIRTHDAY_DATA: BirthdayState = {
  global: {
    recipientName: 'Betu',
    nickname: 'My Favorite Person',
    senderName: 'With all my love',
    birthdayDate: '2026-10-20',
    websiteTitle: 'Happy Birthday, Betu',
    mainGreeting: 'A Little Surprise for Someone Special',
    ambientSoundEnabled: true,
  },
  gateway: {
    teaserBadge: 'A Special Digital Gift',
    heading: 'A Little Surprise for Someone Special',
    subheading: 'Take a quiet moment, turn up the sound, and step inside.',
    openBtnText: 'Open Your Surprise',
    questionText: 'I made something special for you. Do you wanna see it?',
    yesBtnText: 'YES! ✨',
    noBtnText: 'NO 🙈',
    noReactionTitle: 'Why did you click NO?! 🥺💔',
    noReactionSubtitle: 'Hey! I spent days crafting this little universe for you! Pretty please try again?',
    tryAgainBtnText: 'TRY AGAIN 💕',
    celebrationTitle: 'Happy Birthday!',
    celebrationSubtitle: 'Today is all about you, your laughter, and the bright light you bring into this world.',
    enterSurpriseBtnText: 'Explore Your Surprises →',
  },
  gallery: {
    heading: 'Our Little Collection of Memories',
    subheading: 'Moments that became forever. Every photo holds a heartbeat.',
    activeLayout: 'polaroid',
    featuredPhotoId: 'photo-1',
    photos: [
      {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        caption: 'Happy birthday to my favorite person! Wishing you the happiest of birthdays. You make every day special.',
        date: 'A Golden Afternoon',
        location: 'Our Favorite Spot',
        rotation: -2,
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
        caption: 'The way your smile lights up even the darkest room. Never stop laughing like this.',
        date: 'Sunset Memories',
        location: 'City Lights',
        rotation: 3,
      },
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cheers to another year of amazing memories! You’re more than just a friend, you are family.',
        date: 'Coffee & Endless Talks',
        location: 'Little Cafe',
        rotation: -1,
      },
      {
        id: 'photo-4',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        caption: 'May your birthday be as wonderful, genuine, and kind as you are to everyone around you.',
        date: 'That Spontaneous Trip',
        location: 'Under the Stars',
        rotation: 2,
      },
      {
        id: 'photo-5',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
        caption: 'Every second spent with you is a memory I treasure deeply. Here is to a hundred more adventures!',
        date: 'Beach Walk',
        location: 'Golden Hour',
        rotation: -3,
      },
      {
        id: 'photo-6',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Always stay the pure, gentle, and brilliant soul you are. Wishing you the absolute best on your day!',
        date: 'Celebration Night',
        location: 'Forever Memory',
        rotation: 1,
      },
    ],
  },
  letter: {
    heading: 'The Sweet Letter',
    envelopeSealText: 'FOR YOU',
    letterTitle: 'The Sweet Letter',
    salutation: 'Dearest,',
    paragraphs: [
      'If I could give you one gift for your birthday, it would be the ability to see yourself through my eyes—because then you would finally understand just how extraordinary you truly are.',
      'Thank you for always being the person who listens without judgment, who laughs at the silly inside jokes only we understand, and who brings calm into every storm. You make life richer simply by being in it.',
      'Through every season, whether in quiet moments or grand adventures, having you by my side has been one of the greatest blessings. You deserve all the peace, joy, and dreams coming true this year.',
      'Cheers to another year of late-night conversations, shared dreams, unapologetic laughter, and creating stories we will remember when we are old.',
    ],
    signOff: 'With all my love and warmest hugs,',
    hiddenMessagePrompt: 'Click to reveal a secret birthday wish 🗝️',
    hiddenMessage: 'P.S. I promise to always have your back, celebrate your wins as if they were mine, and bring you your favorite treats whenever you need a smile. Happy Birthday!',
    photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    photoCaption: 'I love you! ✨',
  },
  music: {
    heading: 'The Music & Vibe Room',
    subheading: 'A curated melody dedicated especially to your beautiful heart.',
    currentTrackTitle: 'Haareya (Acoustic Birthday Melody)',
    currentArtist: 'Dedicated With Love',
    audioUrl: '', // blank by default: triggers our built-in melodic soothing chimes synth
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    dedicationTitle: 'Why This Song is for You',
    dedicationText: 'Every time this chord progression plays, it reminds me of the peaceful, joyful warmth you bring into every room. Press play and let the vibe wash over you.',
    playlist: [
      { id: 'track-1', title: 'Haareya (Acoustic Melody)', artist: 'Acoustic Soul', duration: '3:24' },
      { id: 'track-2', title: 'Golden Hour Memories', artist: 'Midnight Lo-Fi', duration: '2:50' },
      { id: 'track-3', title: 'Stars in Your Eyes', artist: 'Warm Strings', duration: '3:15' },
    ],
  },
  surpriseHub: {
    heading: 'The Interactive Surprise Room',
    subheading: 'Click on each cherished item to unlock secrets and memories.',
    items: [
      {
        id: 'camera',
        title: 'Vintage Camera',
        subtitle: 'Our Captured Memories',
        icon: 'camera',
        revealTitle: 'Snapshot of Forever 📸',
        revealContent: 'Every snapshot with you is a frozen piece of magic. Jump into the photo gallery to relive our adventures!',
        targetPage: 2,
        unlocked: false,
      },
      {
        id: 'envelope',
        title: 'Golden Envelope',
        subtitle: 'A Heartfelt Letter',
        icon: 'envelope',
        revealTitle: 'Words from the Heart 💌',
        revealContent: 'A sealed letter waiting just for you. Open it whenever you need a reminder of how deeply cherished you are.',
        targetPage: 3,
        unlocked: false,
      },
      {
        id: 'cassette',
        title: 'Retro Mixtape',
        subtitle: 'Your Birthday Soundtrack',
        icon: 'cassette',
        revealTitle: 'The Soundtrack to You 🎶',
        revealContent: 'A retro cassette with gentle acoustic chimes dedicated to you. Put your headphones on and enjoy the vibe.',
        targetPage: 4,
        unlocked: false,
      },
      {
        id: 'gift',
        title: 'Mystery Gift Box',
        subtitle: 'Open the Surprise',
        icon: 'gift',
        revealTitle: 'A Special Birthday Promise 🎁',
        revealContent: 'Inside this box is a lifetime voucher for: unconditional support, unlimited coffee dates, emergency hugs, and infinite laughs!',
        targetPage: 7,
        unlocked: false,
      },
    ],
  },
  quiz: {
    heading: 'The Birthday Challenge',
    subheading: 'How well do you know our inside jokes and memories? Take the test!',
    questions: [
      {
        id: 'q1',
        question: 'What is the absolute best thing about your birthday today?',
        options: [
          'Getting older and wiser',
          'Eating the entire cake without sharing',
          'Knowing someone made this entire website for you',
          'All of the above!',
        ],
        correctIndex: 3,
        explanation: 'Obviously all of the above! Especially having an entire website made just for you.',
      },
      {
        id: 'q2',
        question: 'When was the time we laughed so hard our stomachs actually hurt?',
        options: [
          'That late night food run when everything went wrong',
          'When one of us tripped over absolutely nothing',
          'Trying to take a serious photo and failing for 20 minutes',
          'Every single time we hang out!',
        ],
        correctIndex: 3,
        explanation: 'Every single time without fail! You always bring out the best laughs.',
      },
      {
        id: 'q3',
        question: 'What is your certified superpower in our friendship?',
        options: [
          'Knowing what I’m thinking with just one glance',
          'Recommending the best songs and food',
          'Always giving the warmest hugs',
          'Being the most genuine soul ever',
        ],
        correctIndex: 3,
        explanation: 'Your genuine kindness and authenticity are unmatched in this world.',
      },
      {
        id: 'q4',
        question: 'If our friendship had an official motto, what would it be?',
        options: [
          '"Partners in crime, forever and always"',
          '"First we drink coffee, then we conquer"',
          '"Distance means nothing when someone means everything"',
          '"Never a dull moment when we are together"',
        ],
        correctIndex: 0,
        explanation: 'Partners in crime through thick and thin, always by your side!',
      },
      {
        id: 'q5',
        question: 'What is my ultimate birthday wish for you this upcoming year?',
        options: [
          'Endless happiness, peace of mind, and wild success',
          'Never-ending good health and radiant confidence',
          'Achieving every dream you whispered to the stars',
          'All of these and ten times more!',
        ],
        correctIndex: 3,
        explanation: 'You deserve the whole universe and everything good it has to offer. Happy Birthday!',
      },
    ],
    resultTitle: 'You Passed With 100% Love! 🌟',
    resultMessage: 'You are officially the best friend in the universe. No test needed to prove that!',
  },
  finale: {
    heading: 'The Grand Finale',
    subheading: 'Blow out the candles, make a wish, and step into your happiest year yet.',
    wishTitle: 'May All Your Dreams Take Flight',
    wishMessage: 'As another chapter begins, may your days be filled with light, your heart with peace, and your path with beautiful surprises.',
    cakeEnabled: true,
    candleCount: 3,
    secretStarWish: '🌟 Secret Star Blessing: May the universe conspire to give you everything you have silently prayed for in the quietest hours. You are destined for magic.',
    countdownEnabled: true,
    finalQuote: 'Happy Birthday, my favorite person. Forever celebrating you.',
  },
};

export function loadStoredBirthdayData(): BirthdayState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_BIRTHDAY_DATA;
    const parsed = JSON.parse(raw);
    // Shallow merge to preserve any added fields across versioning
    return {
      ...INITIAL_BIRTHDAY_DATA,
      ...parsed,
      global: { ...INITIAL_BIRTHDAY_DATA.global, ...parsed.global },
      gateway: { ...INITIAL_BIRTHDAY_DATA.gateway, ...parsed.gateway },
      gallery: { ...INITIAL_BIRTHDAY_DATA.gallery, ...parsed.gallery },
      letter: { ...INITIAL_BIRTHDAY_DATA.letter, ...parsed.letter },
      music: { ...INITIAL_BIRTHDAY_DATA.music, ...parsed.music },
      surpriseHub: { ...INITIAL_BIRTHDAY_DATA.surpriseHub, ...parsed.surpriseHub },
      quiz: { ...INITIAL_BIRTHDAY_DATA.quiz, ...parsed.quiz },
      finale: { ...INITIAL_BIRTHDAY_DATA.finale, ...parsed.finale },
    };
  } catch (e) {
    console.error('Error loading stored birthday data', e);
    return INITIAL_BIRTHDAY_DATA;
  }
}

export function saveStoredBirthdayData(data: BirthdayState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving birthday data to localStorage', e);
  }
}
