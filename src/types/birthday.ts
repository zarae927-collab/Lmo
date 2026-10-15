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

export const STORAGE_KEY = 'bubu_dudu_birthday_surprise_v2';

export const INITIAL_BIRTHDAY_DATA: BirthdayState = {
  global: {
    recipientName: 'Betu',
    nickname: 'My Favorite Person',
    senderName: 'With love, Betu',
    birthdayDate: '2026-10-20',
    websiteTitle: 'Happy Birthday Betu <3',
    mainGreeting: 'I made something special for u',
    ambientSoundEnabled: true,
  },
  gateway: {
    teaserBadge: 'A Special Birthday Surprise',
    heading: 'I made something special for u',
    subheading: 'do u wanna see it?',
    openBtnText: 'Open Your Surprise',
    questionText: 'I made something special for u\ndo u wanna see it?',
    yesBtnText: 'YES',
    noBtnText: 'NO',
    noReactionTitle: 'Why did u click no!?',
    noReactionSubtitle: 'Hey! Don\'t break my heart! Pretty please try again?',
    tryAgainBtnText: 'TRY AGAIN',
    celebrationTitle: 'happy Birthday',
    celebrationSubtitle: 'Wishing you the happiest birthday ever! Click on any item below to explore!',
    enterSurpriseBtnText: 'CLICK ON ANY ITEM TO OPEN',
  },
  gallery: {
    heading: 'To my love,',
    subheading: 'Our sweet memories together captured forever.',
    activeLayout: 'polaroid',
    featuredPhotoId: 'photo-1',
    photos: [
      {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        caption: 'Happy birthday to my favorite person! Wishing you the happiest of birthdays! You make every day special. Happy birthday! Cheers to another year of amazing memories! Have the best birthday ever! You\'re more than just a friend, you\'re family. May your birthday be as wonderful as you are. Wishing u the absolute best on your birthday!',
        date: 'A Golden Day',
        location: 'With You',
        rotation: 0,
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cheers to another year of laughs, smiles, and unforgettable adventures!',
        date: 'Forever Memory',
        location: 'Our Favorite Spot',
        rotation: 2,
      },
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'The smile that lights up the whole world.',
        date: 'Sunset Magic',
        location: 'Beach Walk',
        rotation: -2,
      },
      {
        id: 'photo-4',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        caption: 'You make every day feel like a celebration.',
        date: 'Precious Moments',
        location: 'City Lights',
        rotation: 1,
      },
      {
        id: 'photo-5',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
        caption: 'I love you! <3',
        date: 'Pure Joy',
        location: 'Everywhere with You',
        rotation: -1,
      },
      {
        id: 'photo-6',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        caption: 'To endless years of happiness together!',
        date: 'Celebration Day',
        location: 'In My Heart',
        rotation: 3,
      },
    ],
  },
  letter: {
    heading: 'The sweet Letter',
    envelopeSealText: 'FOR YOU',
    letterTitle: 'The sweet Letter',
    salutation: 'Dear',
    paragraphs: [
      'if i could love you for one more day, i would love you for one more day. if i could look at you one more time, i would look at you one more time. if you want me to be by your side for a lifetime then first you have to show me that I\'ll be loved for a lifetime...',
      'i just want to thank you for always carrying all of my worries even though your own life hasn\'t been easy at all. i don\'t wish for you to be like anyone else, i only wish for you to be yourself, as a better version of yourself.',
    ],
    signOff: 'With love,',
    hiddenMessagePrompt: 'Click to reveal hidden message 💌',
    hiddenMessage: 'P.S. You will always be my number one. Forever and always! <3',
    photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    photoCaption: 'I love you! <3',
  },
  music: {
    heading: 'Birthday Playlist',
    subheading: 'Listen to the song dedicated especially to you.',
    currentTrackTitle: 'HAAREYA <3',
    currentArtist: 'Arijit Singh',
    audioUrl: '/media/haareya_birthday_song.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    dedicationTitle: 'Why This Song is for You',
    dedicationText: 'O haareya main dil haareya... this song belongs to you and all our sweet moments.',
    playlist: [
      { id: 'track-1', title: 'HAAREYA <3', artist: 'Arijit Singh', url: '/media/haareya_birthday_song.mp3', duration: '0:33' },
    ],
  },
  surpriseHub: {
    heading: 'CLICK ON ANY ITEM TO OPEN',
    subheading: 'Tap any item to jump into that special surprise!',
    items: [
      {
        id: 'camera',
        title: 'Photos & Memories',
        subtitle: 'Click to open photos',
        icon: 'camera',
        revealTitle: 'To my love,',
        revealContent: 'Open our cherished memories together!',
        targetPage: 2,
        unlocked: false,
      },
      {
        id: 'envelope',
        title: 'The sweet Letter',
        subtitle: 'Click to read letter',
        icon: 'envelope',
        revealTitle: 'The sweet Letter',
        revealContent: 'Read the heartfelt birthday letter written just for you.',
        targetPage: 3,
        unlocked: false,
      },
      {
        id: 'cassette',
        title: 'Mixtape & Music',
        subtitle: 'Click to play song',
        icon: 'cassette',
        revealTitle: 'HAAREYA <3',
        revealContent: 'Listen to your special birthday song!',
        targetPage: 4,
        unlocked: false,
      },
      {
        id: 'gift',
        title: 'Birthday Challenge',
        subtitle: 'Take the quiz!',
        icon: 'gift',
        revealTitle: 'How Well Do You Know Us?',
        revealContent: 'Test our inside jokes and memories!',
        targetPage: 6,
        unlocked: false,
      },
    ],
  },
  quiz: {
    heading: 'How Well Do You Know Us?',
    subheading: 'Take this cute quiz to test our memories!',
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
        explanation: 'All of the above! Especially having an entire website made just for you.',
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
    resultMessage: 'You are officially the best friend in the universe!',
  },
  finale: {
    heading: 'happy Birthday',
    subheading: 'Make a wish and blow out the candles!',
    wishTitle: 'Forever Celebrating You',
    wishMessage: 'Happy birthday to my favorite person in the whole universe. May all your sweetest dreams come true.',
    cakeEnabled: true,
    candleCount: 3,
    secretStarWish: '🌟 Secret Star Blessing: May every year ahead bring you pure joy, boundless love, and dreams fulfilled.',
    countdownEnabled: false,
    finalQuote: 'Happy Birthday, Betu <3',
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
