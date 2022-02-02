import { getCurrentPrice } from './formatNumbers';

export const cards = {
  body: {
    '000000': {
      class: 'Prime',
      normal: 'Royal Blood',
      legendary: 'Conqueror'
    },
    '000001': {
      class: 'Terminator',
      normal: 'Reboot',
      legendary: 'Transformer'
    },
    '000010': {
      class: 'Alchemist',
      normal: 'Multicast',
      legendary: 'Rune Magic'
    },
    '000011': {
      class: 'Golem',
      normal: 'Harden',
      legendary: 'Diamond Body'
    },
    '000100': {
      class: 'Nightingale',
      normal: 'Doppelganger',
      legendary: 'Mirage Party'
    },
    '000101': {
      class: 'Prophet',
      normal: 'Oracle',
      legendary: 'Prophecy'
    },
    '000110': {
      class: 'Grognak',
      normal: 'Plunge',
      legendary: 'Rugpull'
    },
    '000111': {
      class: 'Juggernaut',
      normal: 'Adrenaline',
      legendary: 'Time Leap'
    },
    '001000': {
      class: 'Bomoh',
      normal: 'Ritual',
      legendary: 'Zombie'
    }
  },
  arms: {
    '000000': {
      class: 'Prime',
      normal: 'Smite',
      legendary: 'Domination'
    },
    '000001': {
      class: 'Terminator',
      normal: 'Taser',
      legendary: 'Laser Beam'
    },
    '000010': {
      class: 'Alchemist',
      normal: 'Zap',
      legendary: 'Thunderbolt'
    },
    '000011': {
      class: 'Golem',
      normal: 'Barrage',
      legendary: 'Meteor'
    },
    '000100': {
      class: 'Nightingale',
      normal: 'Moon Mirror',
      legendary: 'Eclipse'
    },
    '000101': {
      class: 'Prophet',
      normal: 'Spirit Tap',
      legendary: 'Spirit Steal'
    },
    '000110': {
      class: 'Grognak',
      normal: 'Cleave',
      legendary: 'Echolation'
    },
    '000111': {
      class: 'Juggernaut',
      normal: 'Juggy Flex',
      legendary: 'Spiked Knuckles'
    },
    '001000': {
      class: 'Bomoh',
      normal: 'Siphon',
      legendary: 'Vampire'
    }
  },
  legs: {
    '000000': {
      class: 'Prime',
      normal: 'Safeguard',
      legendary: 'Quarantine'
    },
    '000001': {
      class: 'Terminator',
      normal: 'Engine',
      legendary: 'Jetpack'
    },
    '000010': {
      class: 'Alchemist',
      normal: 'Weaken',
      legendary: 'Cripple'
    },
    '000011': {
      class: 'Golem',
      normal: 'Stomp',
      legendary: 'Split Ground'
    },
    '000100': {
      class: 'Nightingale',
      normal: 'Infinite',
      legendary: 'Parallel Universe'
    },
    '000101': {
      class: 'Prophet',
      normal: 'Astral',
      legendary: 'Astral Projection'
    },
    '000110': {
      class: 'Grognak',
      normal: 'Tantrum',
      legendary: 'Inner Peace'
    },
    '000111': {
      class: 'Juggernaut',
      normal: 'Swift',
      legendary: 'Enlighten'
    },
    '001000': {
      class: 'Bomoh',
      normal: 'Confuse',
      legendary: 'Gaslighting'
    }
  },
  head: {
    '000000': {
      class: 'Prime',
      normal: 'Phase Shift',
      legendary: 'Energy Fusion'
    },
    '000001': {
      class: 'Terminator',
      normal: 'Firewall',
      legendary: 'Neural Network'
    },
    '000010': {
      class: 'Alchemist',
      normal: 'Toxic Spray',
      legendary: 'Chemical Warfare'
    },
    '000011': {
      class: 'Golem',
      normal: 'Petrify',
      legendary: 'Stone Gaze'
    },
    '000100': {
      class: 'Nightingale',
      normal: 'Harmony',
      legendary: 'Synesthesia'
    },
    '000101': {
      class: 'Prophet',
      normal: 'Heal',
      legendary: 'Ray of Hope'
    },
    '000110': {
      class: 'Grognak',
      normal: 'Camouflage',
      legendary: 'Hidden Presence'
    },
    '000111': {
      class: 'Juggernaut',
      normal: 'Headbutt',
      legendary: 'Gifted Crown'
    },
    '001000': {
      class: 'Bomoh',
      normal: 'Prayer',
      legendary: 'Exorcism'
    }
  },
  face: {
    '000000': {
      class: 'Prime',
      normal: 'War Cry',
      legendary: 'Battle Aura'
    },
    '000001': {
      class: 'Terminator',
      normal: 'Scanner',
      legendary: 'Sattelite Radar'
    },
    '000010': {
      class: 'Alchemist',
      normal: 'Appraisal',
      legendary: 'True Sight'
    },
    '000011': {
      class: 'Golem',
      normal: 'Taunt',
      legendary: 'Gigantic Face'
    },
    '000100': {
      class: 'Nightingale',
      normal: 'Bubble',
      legendary: 'White Zone'
    },
    '000101': {
      class: 'Prophet',
      normal: 'Silence',
      legendary: 'Channel Mute'
    },
    '000110': {
      class: 'Grognak',
      normal: 'Berserker',
      legendary: 'Mask of Death'
    },
    '000111': {
      class: 'Juggernaut',
      normal: 'Frenzy',
      legendary: 'Hysteria'
    },
    '001000': {
      class: 'Bomoh',
      normal: 'Curse',
      legendary: 'Decrepify'
    }
  },
  tail: {
    '000000': {
      class: 'Prime',
      normal: 'Mend',
      legendary: 'Metabolism'
    },
    '000001': {
      class: 'Terminator',
      normal: 'Mark Precision',
      legendary: 'Target Lockdown'
    },
    '000010': {
      class: 'Alchemist',
      normal: 'Transmute',
      legendary: 'Immortality'
    },
    '000011': {
      class: 'Golem',
      normal: 'Bash',
      legendary: 'Earthquake'
    },
    '000100': {
      class: 'Nightingale',
      normal: 'Furry Swipe',
      legendary: 'Spiral Swipe'
    },
    '000101': {
      class: 'Prophet',
      normal: 'Offering',
      legendary: 'Receive Offering'
    },
    '000110': {
      class: 'Grognak',
      normal: 'Hyper Instinct',
      legendary: 'Synchro Deflect'
    },
    '000111': {
      class: 'Juggernaut',
      normal: 'Vengeance',
      legendary: 'Easily Offended'
    },
    '001000': {
      class: 'Bomoh',
      normal: 'Bohong',
      legendary: 'Stupefy'
    }
  }
};

const getClassFromIndex = (index) => {
  switch (index) {
    case 0:
      return 'Prime';
    case 1:
      return 'Terminator';
    case 2:
      return 'Alchemist';
    case 3:
      return 'Golem';
    case 4:
      return 'Nightingale';
    case 5:
      return 'Prophet';
    case 6:
      return 'Grognak';
    case 7:
      return 'Juggernaut';
    case 8:
      return 'Bomoh';
    default:
      return '';
  }
};

export const getTraits = (genes) => {
  return {
    body: {
      d: getPart(genes, 64, 'body', 32),
      r1: getPart(genes, 74, 'body'),
      r2: getPart(genes, 84, 'body')
    },
    arms: {
      d: getPart(genes, 96, 'arms', 35),
      r1: getPart(genes, 106, 'arms'),
      r2: getPart(genes, 116, 'arms')
    },
    legs: {
      d: getPart(genes, 128, 'legs', 38),
      r1: getPart(genes, 138, 'legs'),
      r2: getPart(genes, 148, 'legs')
    },
    head: {
      d: getPart(genes, 160, 'head', 41),
      r1: getPart(genes, 170, 'head'),
      r2: getPart(genes, 180, 'head')
    },
    face: {
      d: getPart(genes, 192, 'face', 44),
      r1: getPart(genes, 202, 'face'),
      r2: getPart(genes, 212, 'face')
    },
    tail: {
      d: getPart(genes, 224, 'tail', 47),
      r1: getPart(genes, 234, 'tail'),
      r2: getPart(genes, 244, 'tail')
    }
  };
};

const getPart = (genes, index, bodyPart, legendIndex) => {
  const genesClass = genes.substring(index, index + 6);
  const className = getClassFromIndex(parseInt(genesClass, 2));
  const vary = parseInt(genes.substring(index + 6, index + 10), 2) + 1;
  const isLegendary = legendIndex
    ? parseInt(genes.substring(legendIndex, legendIndex + 3), 2)
    : false;
  const partRarity = isLegendary ? 'legendary' : 'normal';
  return {
    class: className,
    vary,
    name: cards[bodyPart][genesClass][partRarity]
  };
};

export const cardsClasses = {
  body: {
    'Royal Blood': 'Prime',
    Conqueror: 'Prime',
    Reboot: 'Terminator',
    Transformer: 'Terminator',
    Multicast: 'Alchemist',
    'Rune Magic': 'Alchemist',
    Harden: 'Golem',
    'Diamond Body': 'Golem',
    Doppelganger: 'Nightingale',
    'Mirage Party': 'Nightingale',
    Oracle: 'Prophet',
    Prophecy: 'Prophet',
    Plunge: 'Grognak',
    Rugpull: 'Grognak',
    Adrenaline: 'Juggernaut',
    'Time Leap': 'Juggernaut',
    Ritual: 'Bomoh',
    Zombie: 'Bomoh'
  },

  arms: {
    Smite: 'Prime',
    Domination: 'Prime',
    Taser: 'Terminator',
    'Laser Beam': 'Terminator',
    Zap: 'Alchemist',
    Thunderbolt: 'Alchemist',
    Barrage: 'Golem',
    Meteor: 'Golem',
    'Moon Mirror': 'Nightingale',
    Eclipse: 'Nightingale',
    'Spirit Tap': 'Prophet',
    'Spirit Steal': 'Prophet',
    Cleave: 'Grognak',
    Echolation: 'Grognak',
    'Juggy Flex': 'Juggernaut',
    'Spiked Knuckles': 'Juggernaut',
    Siphon: 'Bomoh',
    Vampire: 'Bomoh'
  },
  legs: {
    Safeguard: 'Prime',
    Quarantine: 'Prime',
    Engine: 'Terminator',
    Jetpack: 'Terminator',
    Weaken: 'Alchemist',
    Cripple: 'Alchemist',
    Stomp: 'Golem',
    'Split Ground': 'Golem',
    Infinite: 'Nightingale',
    'Parallel Universe': 'Nightingale',
    Astral: 'Prophet',
    'Astral Projection': 'Prophet',
    Tantrum: 'Grognak',
    'Inner Peace': 'Grognak',
    Swift: 'Juggernaut',
    Enlighten: 'Juggernaut',
    Confuse: 'Bomoh',
    Gaslighting: 'Bomoh'
  },
  head: {
    'Phase Shift': 'Prime',
    'Energy Fusion': 'Prime',
    Firewall: 'Terminator',
    'Neural Network': 'Terminator',
    'Toxic Spray': 'Alchemist',
    'Chemical Warfare': 'Alchemist',
    Petrify: 'Golem',
    'Stone Gaze': 'Golem',
    Harmony: 'Nightingale',
    Synesthesia: 'Nightingale',
    Heal: 'Prophet',
    'Ray of Hope': 'Prophet',
    Camouflage: 'Grognak',
    'Hidden Presence': 'Grognak',
    Headbutt: 'Juggernaut',
    'Gifted Crown': 'Juggernaut',
    Prayer: 'Bomoh',
    Exorcism: 'Bomoh'
  },
  face: {
    'War Cry': 'Prime',
    'Battle Aura': 'Prime',
    Scanner: 'Terminator',
    'Sattelite Radar': 'Terminator',
    Appraisal: 'Alchemist',
    'True Sight': 'Alchemist',
    Taunt: 'Golem',
    'Gigantic Face': 'Golem',
    Bubble: 'Nightingale',
    'White Zone': 'Nightingale',
    Silence: 'Prophet',
    'Channel Mute': 'Prophet',
    Berserker: 'Grognak',
    'Mask of Death': 'Grognak',
    Frenzy: 'Juggernaut',
    Hysteria: 'Juggernaut',
    Curse: 'Bomoh',
    Decrepify: 'Bomoh'
  },
  tail: {
    Mend: 'Prime',
    Metabolism: 'Prime',
    'Mark Precision': 'Terminator',
    'Target Lockdown': 'Terminator',
    Transmute: 'Alchemist',
    Immortality: 'Alchemist',
    Bash: 'Golem',
    Earthquake: 'Golem',
    'Furry Swipe': 'Nightingale',
    'Spiral Swipe': 'Nightingale',
    Offering: 'Prophet',
    'Receive Offering': 'Prophet',
    'Hyper Instinct': 'Grognak',
    'Synchro Deflect': 'Grognak',
    Vengeance: 'Juggernaut',
    'Easily Offended': 'Juggernaut',
    Bohong: 'Bomoh',
    Stupefy: 'Bomoh'
  }
};

export const STATS = [
  'Prime',
  'Terminator',
  'Alchemist',
  'Golem',
  'Nightingale',
  'Prophet',
  'Grognak',
  'Juggernaut',
  'Bomoh'
];

export const STATS_LOWERCASE = [
  'prime',
  'terminator',
  'alchemist',
  'golem',
  'nightingale',
  'prophet',
  'grognak',
  'juggernaut',
  'bomoh'
];

export const getClass = (genesBin) => {
  const stats = parseInt(genesBin.substr(64, 6), 2);
  return { class: STATS[stats] };
};

export const getPureness = (monsta) => {
  const classType = monsta?.class;
  const body = { ...monsta?.body, name: 'body' };
  const arms = { ...monsta?.arms, name: 'arms' };
  const legs = { ...monsta?.legs, name: 'legs' };
  const head = { ...monsta?.head, name: 'head' };
  const face = { ...monsta?.face, name: 'face' };
  const tail = { ...monsta?.tail, name: 'tail' };
  const parts = [body, arms, legs, head, face, tail];
  return parts.reduce((result, part) => {
    if (classType === monsta[part.name]?.d?.class) {
      return (result += 1);
    }
    return result;
  }, 0);
};

export const monstaParts = ['body', 'arms', 'legs', 'head', 'face', 'tail'];
export const genesStructure = ['d', 'r1', 'r2'];

export const getMonstaPartIcon = (part = '', className = '', color = '#ffffff') => {
  const parserPart = part?.toLowerCase();
  const parsedClassName = className?.toLowerCase();
  // const { light, dark } = getAxieColors(parsedClassName);
  const light = 'purple';
  const dark = 'red';
  switch (parserPart) {
    case 'body':
      return (
        <svg
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="32"
          height="32"
        >
          <path d="M0 0h512v512H0z" fill="#4B5563" fill-opacity="1"></path>
          <g class="" transform="translate(0,0)">
            <path
              d="M155.8 25.14c-30.2.34-63.52 4.32-88.77 13.34-13.21 4.71-24.1 10.78-31.26 17.73-4.74 4.6-7.78 9.44-9.39 14.9 33.34.04 92.02 1.38 132.22 28.78 9.7-12.64 12-27.08 10.5-40.9-1.6-14.1-7.8-26.92-13.3-33.85zm200.4 0c-5.5 6.93-11.7 19.75-13.3 33.85-1.5 13.82.8 28.26 10.5 40.9 40.2-27.4 98.9-28.78 132.2-28.78-1.6-5.46-4.6-10.3-9.4-14.9-7.1-6.95-18-13.02-31.2-17.73-25.3-9.02-58.6-13-88.8-13.34zM187.4 66.59c0 7.94-1.2 16.14-3.9 24.16C205.8 112.5 231 123 256 123s50.2-10.5 72.5-32.26c-2.6-7.74-3.8-15.64-3.9-23.31-46.9 7.73-92.6 6.81-137.2-.84zm-84.3 30.26c-.8 15.65-1.8 32.45-3.24 50.25 9.44-3.2 19.54-8.2 29.14-14.6 7.5-5 14.6-10.8 20.8-16.9-12.8-8.9-29.3-14.8-46.7-18.75zm305.8.01c-17.4 3.94-33.9 9.84-46.7 18.74 6.2 6.1 13.3 11.9 20.8 16.9 9.6 6.3 19.7 11.4 29.1 14.6-1.4-17.7-2.4-34.6-3.2-50.24zM178 110.1c-9.6 14.2-23.6 27.1-39 37.4-13 8.7-27 15.5-40.55 18.9 5.35 6 10.95 12.5 16.45 19.3 22.2 14.6 40.8 21.3 61.1 21.3 20.9 0 44.6-7.4 76-23.1l4-2 4 2c31.4 15.7 55.1 23.1 76 23.1 20.3 0 38.9-6.7 61.1-21.3 5.5-6.8 11-13.3 16.4-19.3C400 163 386 156.2 373 147.5c-15.4-10.3-29.4-23.2-39-37.4-23.6 20.3-50.7 30.9-78 30.9-27.3 0-54.4-10.6-78-30.9zm-82.12 80.8c-9.74 94.8-28.76 207-63.29 302.4 24.59-12 50.33-21.9 76.81-29.6-8.3-19.7-16.54-50.7-5.9-82.5 14.3-43.2 40.6-85.3 47.4-95.7-1.4-12.2-11.8-34.7-26.4-56.5-8.7-13.1-18.8-26.3-28.62-38.1zm320.22 0c-9.9 11.8-19.9 25-28.6 38.1-14.6 21.8-25 44.3-26.4 56.5 6.8 10.4 33.1 52.5 47.4 95.7 10.6 31.8 2.4 62.8-5.9 82.5 26.5 7.7 52.2 17.6 76.8 29.6-34.5-95.4-53.5-207.6-63.3-302.4zM247 206.2c-26.7 12.2-49.4 18.8-71 18.8-12.7 0-24.8-2.3-37-6.7.2.3.3.5.5.7 15.2 22.8 27.4 45 29.2 64.4 6.4 5.3 17.9 10.4 32.4 13.8 5.2 1.2 10.8 2.3 16.5 3.1 2.3-4.9 6-9.2 10.4-12.5 5.3-4 11.8-6.7 19-8v-73.6zm18 0v73.6c7.2 1.3 13.7 4 19 8 4.4 3.3 8.1 7.6 10.4 12.5 5.7-.8 11.3-1.9 16.5-3.1 14.5-3.4 26-8.5 32.4-13.8 1.8-19.4 14-41.6 29.2-64.4.2-.2.3-.4.5-.7-12.2 4.4-24.3 6.7-37 6.7-21.6 0-44.3-6.6-71-18.8zm-9 90.8c-7 0-13.2 2.2-17.2 5.2-4.1 3.1-5.8 6.4-5.8 9.8 0 3.4 1.7 6.7 5.8 9.8 4 3 10.2 5.2 17.2 5.2s13.2-2.2 17.2-5.2c4.1-3.1 5.8-6.4 5.8-9.8 0-3.4-1.7-6.7-5.8-9.8-4-3-10.2-5.2-17.2-5.2zm-93.8 4.3c-8.7 14-29.6 49.3-41.7 85.5-13.3 40.1 10.5 80.8 13.8 86.2 30 14.2 75.8 22 121.7 22 45.9 0 91.7-7.8 121.7-22 3.3-5.4 27.1-46.1 13.8-86.2-12.1-36.2-33-71.5-41.7-85.5-9.4 6.1-21.4 10.4-34.7 13.5-6 1.4-12.3 2.6-18.9 3.5-1.7 7.2-6.3 13.4-12.2 17.9-7.5 5.6-17.3 8.8-28 8.8s-20.5-3.2-28-8.8c-5.9-4.5-10.5-10.7-12.2-17.9-6.6-.9-12.9-2.1-18.9-3.5-13.3-3.1-25.3-7.4-34.7-13.5z"
              fill={color}
              fill-opacity="1"
            ></path>
          </g>
        </svg>
      );
    case 'arms':
      return (
        <svg
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="32"
          height="32"
        >
          <path d="M0 0h512v512H0z" fill="#4B5563" fill-opacity="1"></path>
          <g class="" transform="translate(0,0)">
            <path
              d="M123.153 24.602c-11.349.764-48.792 83.005-63.545 132.174-8.046 26.818 2.983 74.734 41.723 106.45 8.813-1.502 16.946-3.047 24.434-4.626-22.473-24.22-39.048-50.488-47.772-82.059l-1.021-3.699 1.963-3.299c26.135-43.925 37.681-68.548 50.85-112.24l3.849-12.773 10.402 8.351c14.624 11.743 23.72 18.084 32.098 21.809-14.428-22.99-31.841-41.36-52.46-50.06a2.164 2.164 0 0 0-.52-.028zm19.791 50.203c-11.724 36.176-24.141 62.49-46.508 100.379 9.004 29.978 25.746 54.616 49.733 78.65 18.744-4.857 32.588-9.929 43.383-14.978 16.875-7.894 26.514-15.73 36.92-23.701-6.532-34.91-18.944-80.14-38.018-118.375-14.754-2.769-27.196-8.373-45.51-21.975zm90.094 158.008c-9.156 7.022-19.796 14.833-35.861 22.347-17.365 8.123-40.947 15.887-76.29 22.793 35.349 28.759 64.905 62.213 112.643 82.157 2.79-15.613 10.509-29.532 20.61-39.782 9.547-9.688 21.609-16.383 34.252-16.82 2.202-5.202 5.378-10.557 10.593-14.93 6.41-5.374 15.626-8.323 26.932-8.156a35.046 35.046 0 0 1 4.807-5.424c-7.384-1.603-16.19-3.168-27.145-5.586zm120.275 50.299c-.04.009-.084.012-.125.021-11.264 3.729-12.514 6.776-16.947 16.078-8.484-1.005-19.247-2.081-25.69 3.16-6.017 6.313-7.279 12.696-9.685 20.715-14.012-3.276-25.77 1.842-33.904 9.877-8.032 8.15-14.35 20.016-16.082 32.65 5.926 2.628 12.109 4.214 18.139 5.727 12.69-15.498 32.27-33.513 50.66-36.851 12.995-13.444 28.669-18.08 41.183-19.891a60.105 60.105 0 0 1 11.764-8.4c-6.632-11.786-12.405-18.622-19.313-23.086zm-232.011 18.882c-1.967 12.934-7.997 24.573-.64 46.305 32.36 70.655 41.042 23.73 93.735 22.953-38.944-18.938-66.126-45.737-93.095-69.258zm267.765 17.102c-4.87.972-9.343 3.536-13.062 6.28 9.197 12.249 16.987 27.313 23.28 43.81 7.916-2.052 14.75-4.612 21.103-7.506-6.473-26.762-18.951-37.976-31.32-42.584zm-29.935 13.906c-7.676 1.509-15.588 4.36-22.774 10.35 8.367 8.844 20.976 24.773 26.053 43.283 7.632-1.268 15.91-3.698 21.006-8.576-6.608-17.858-15.058-33.73-24.285-45.057zm-38.139 19.668c-14.313 5.357-25.257 14.981-34.674 25.938l19.383 26.324c13.696-1.49 26.639-6.254 39.39-13.299-4.69-15.098-18.62-32.912-24.447-38.607zm108.848 24.365c-6.679 3.099-13.973 5.985-22.237 8.375 6.323 10.32 11.618 21.138 15.602 32.543 7.703-3.07 14.902-6.372 21.264-10.082-3.964-11.28-8.68-22.055-14.63-30.836zM164.687 408.39l49.638 43.377c11.274-13.516 27.044-23.94 42.492-33.942l-22.02-25.32c-24.334-8.01-52.756 2.355-70.11 15.885zM391.9 394.153c-6.866 5.056-14.143 7.727-21.795 9.377 5.371 9.31 10.375 19.502 14.354 29.755 7.946-2.139 15.451-4.432 22.344-7.775-3.648-10.897-8.68-21.303-14.903-31.357zm-39.88 14.105c-11.759 6.313-24.191 11.162-37.42 13.545l13.316 27.447c14.663-2.177 28.099-3.684 39.666-9.746-4.195-10.706-9.777-21.706-15.563-31.246zm98.017 17.156c-6.627 3.604-13.647 6.703-20.846 9.534 2.83 7.167 5.28 14.119 7.21 20.757 10.397-1.435 20.263-5.912 18.179-13.869-1.423-5.296-2.923-10.83-4.543-16.422zM268.82 431.54c-16.062 10.564-31.09 20.975-40.728 32.256l1.392 1.217c16.648 14.548 36.256 20.475 44.95 9.13 8.522-11.12 10.536-24.116-5.614-42.603zm144.01 10.957c-7.166 3.334-14.4 5.634-21.465 7.58 3.051 6.991 5.842 13.849 8.244 20.48 9.2-.457 17.732-4.025 19.33-10.442-1.622-5.49-3.688-11.409-6.109-17.618zm-38.437 13.69c-12.724 6.396-25.866 8.467-38.184 10.154l6 12.367c10.038 10.705 32.656 11.336 42.21 2.944-2.654-7.907-6.1-16.516-10.026-25.465z"
              fill={color}
              fill-opacity="1"
            ></path>
          </g>
        </svg>
      );
    case 'legs':
      return (
        <svg
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="32"
          height="32"
        >
          <path d="M0 0h512v512H0z" fill="#4B5563" fill-opacity="1"></path>
          <g class="" transform="translate(0,0)">
            <path
              d="M128 22.781c-11.101 10.941-19.822 27.6-26.076 41.203 6.044 20.063 11.083 40.869 27.539 54.926 18.862-14.015 27.05-33.752 35.187-56.351C154.631 51.155 144.412 34.368 128 22.78zm256 0c-16.412 11.587-26.631 28.374-36.65 39.778 8.137 22.599 16.325 42.336 35.187 56.351 16.456-14.057 21.495-34.863 27.54-54.926C403.821 50.381 395.1 33.722 384 22.781zM222.23 46.104c-11.546 2.749-24.948 7.229-37.04 12.68-8.622 28.9-21.924 55.363-45.965 74.734l16.55 177.107-19.933-8.438-14.61-167.787c-16.163-16.006-28.001-43.023-38.39-71.285-3.545-2.304-7.083-4.15-10.621-5.424 6.237 82.926 25.341 186.732 47.006 274.592 2.544-1.159 5.746-2.4 8.724-3.459 29.464 7.318 56.995 29.357 81.848 53.067C192 272 256 160 222.23 46.104zm67.54 0C256 160 320 272 302.2 381.89c24.853-23.71 52.384-45.75 81.848-53.067 2.978 1.06 6.18 2.3 8.724 3.46 21.665-87.86 40.77-191.667 47.006-274.593-3.538 1.274-7.076 3.12-10.62 5.424-10.39 28.262-22.228 55.28-38.391 71.285l-14.61 167.787-19.933 8.438 16.55-177.107c-24.04-19.37-37.343-45.834-45.964-74.735-12.093-5.45-25.495-9.93-37.041-12.68zM129.004 347.83c-13.31 5.672-27.915 18.355-33.014 34.666 23.725 4.679 52.808 18.407 75.524 40.389l3.947 26.867 33.467-12.074-1.33-29.082c-19.75-28.701-51.073-52.92-78.594-60.766zm253.992 0c-27.52 7.846-58.843 32.065-78.594 60.766l-1.33 29.082 33.467 12.074 3.947-26.867c22.716-21.982 51.8-35.71 75.524-40.389-5.099-16.311-19.704-28.994-33.014-34.666zM90.69 399.703l-52.257 39.272c-10.312 15.251-12.923 32.609-8.657 47.158 52.559 9.293 88.252-3.287 129.043-25.838l-4.275-29.084c-14.703-15.135-33.665-26.354-63.854-31.508zm330.622 0c-30.189 5.154-49.151 16.373-63.854 31.508l-4.275 29.084c40.791 22.55 76.484 35.131 129.043 25.838 4.266-14.55 1.655-31.907-8.657-47.158l-52.257-39.272z"
              fill={color}
              fill-opacity="1"
            ></path>
          </g>
        </svg>
      );
    case 'head':
      return (
        <svg
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="32"
          height="32"
        >
          <path d="M0 0h512v512H0z" fill="#4B5563" fill-opacity="1"></path>
          <g class="" transform="translate(0,0)">
            <path
              d="M253.714 20.358c-8.79.075-17.448.82-25.89 2.308-46.55 8.208-89.423 26.157-121.225 52.065-31.803 25.908-52.572 59.39-56.316 100.053l-.004.04-.004.04c-8.45 83.885 39.397 152.37 65.604 181.553 5.21 5.804 7.064 13.574 6.533 20.862-.53 7.288-3.04 14.494-6.598 21.838-7.114 14.688-18.703 30.06-31.03 44.457-13.957 16.303-27.375 29.703-37.75 39.627 7.203-1.214 14.764-4.37 22.67-9.368 14.66-9.265 29.554-24.475 42.097-41.298 12.543-16.824 22.807-35.28 28.802-50.586 2.998-7.654 4.912-14.54 5.614-19.72.7-5.178-.177-8.39-.354-8.687-15.34-25.73-31.257-52.027-40.687-79.112-9.43-27.085-12.2-55.565-.073-83.35 25.223-57.79 78.02-85.085 130.772-89.605 52.61-4.508 105.963 12.396 136.545 44.71l23.292 22.474 69.254-41.47c-20.34-26.314-55.49-55.33-96.24-76.257-33.546-17.226-70.702-28.978-106.18-30.428-2.957-.12-5.902-.17-8.832-.144zM372.42 146.184l-.058-.057.31.313c-.083-.087-.17-.17-.25-.256zM244.814 118.95c-2.468.102-4.935.245-7.4.457-3.562.305-7.11.73-10.64 1.255l9.628 45.077c5.76-1.637 11.657-2.823 17.646-3.564l-9.233-43.226zm43.85 3.658c-4.866 12.845-7.33 25.916-6.978 39.04 6.034.48 12.086 1.335 18.12 2.557-.868-12.19 1.306-24.43 6.362-36.98-5.66-1.82-11.515-3.363-17.504-4.617zm-106.672 11.79c-6.112 3.028-12 6.54-17.612 10.532 17.55 8.862 29.7 22.763 34.715 39.594 4.936-3.84 10.145-7.183 15.564-10.063-6.122-16.257-17.577-30.086-32.666-40.063zm88.136 44.796c-1.156-.002-2.308.014-3.457.047-2.675.076-5.328.242-7.952.502-41.993 4.176-77.31 30.258-87.475 90.07-2.198 12.94 4.293 42.822 12.246 67.66 7.952 24.836 16.634 45.517 16.634 45.517l.504 1.198.143 1.295c1.96 17.7-9.11 34.967-21.212 52.26-8.036 11.486-16.43 22.104-23.97 31.72 24-1.35 45.963-11.985 67.177-30.947-.124-.5-.17-.71-.313-1.297-.866-3.594-1.955-8.697-1.687-14.68.446-9.983 5.674-21.958 18.818-31.868-24.577-35.02-28.898-78.757-24.06-115.027l.886-6.65 6.626-1.05c58.715-9.29 97.246-28.81 139.34-54.593-27.566-21.88-61.198-34.115-92.25-34.158zm120.197 37.84c-48.424 30.517-91.56 55.67-157.556 67.35-3.253 33.408 2.427 71.84 25.226 100.798 12.607.61 23.264 6.977 29.904 16.184 6.747 9.353 9.946 21.162 10.83 33.628 23.288 21.426 62.97 39.024 97.764 56.655-3.17-39.444-.296-76.34-14.538-114.11l-62.842-25.3-.062-.027c-14.313-6.018-23.332-13.792-26.512-24.03-3.18-10.236-.874-19.966 1.188-31.064l2.2-11.852 10.74 5.476c23.407 11.94 51.394 20.52 77.548 20.065l6.582-.116 2.103 6.238c10.593 31.436 12.912 56.612 15.752 82.203l7.787 3.113c4.126-29.38 1.912-68.686-3.862-104.425-5.463-33.817-14.72-65.03-22.252-80.788zM223.397 441.148c-.01.444.094.455.01.04-.002-.008-.01-.033-.01-.04z"
              fill={color}
              fill-opacity="1"
            ></path>
          </g>
        </svg>
      );
    case 'face':
      return (
        <svg
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="32"
          height="32"
        >
          <path d="M0 0h512v512H0z" fill="#4B5563" fill-opacity="1"></path>
          <g class="" transform="translate(0,0)">
            <path
              d="M207.47 18.875l35.968 162.25c.29 1.087.86 1.863 2.562 2.813 1.7.95 4.433 1.66 7.22 1.656 2.785-.003 5.543-.703 7.25-1.656 1.704-.954 2.276-1.75 2.56-2.813L299 18.875h-91.53zm88.936 98.03l-15.22 68.657-.06.22-.032.187c-1.747 6.52-6.404 11.432-11.5 14.28-5.096 2.848-10.738 4.026-16.344 4.03-5.606.007-11.24-1.15-16.344-4-5.104-2.847-9.782-7.784-11.53-14.31l-.032-.19-.063-.218-14.686-66.218C175 133.818 147.157 164.56 135.53 202.97c8.044 4.25 19.254 9.84 32.314 15.468 26.527 11.43 60.506 22.55 88.5 22.406 28.003-.145 61.81-11.56 88.156-23.22 13.467-5.96 24.914-11.872 32.938-16.25-12.624-39.968-42.853-71.398-81.032-84.468zm88.97 101.376c-8.365 4.538-19.865 10.487-33.313 16.44-27.522 12.18-62.797 24.673-95.625 24.843-32.838.17-68.293-12-96-23.938-13.614-5.866-25.276-11.744-33.72-16.22-.51 70.485-3.647 138.64 9.626 188.376 7.135 26.737 18.683 47.874 37.375 62.595 12.092 9.525 27.443 16.584 47.25 20.375V330.125c-28.654 16.12-67.847 2.81-81.064-30.625 8.825-22.322 30.127-33.074 50.78-33 24.583.087 48.224 15.532 48.876 45.094h.094v89h36.03l.002-87.72c-.01-.01-.023-.018-.032-.03 0-.422.022-.834.03-1.25.655-29.562 24.327-45.007 48.908-45.094 20.654-.074 41.926 10.678 50.75 33-13.204 33.403-52.324 46.702-80.97 30.656v160.47c19.544-3.867 34.6-11 46.438-20.595 18.396-14.908 29.6-36.337 36.375-63.342 12.59-50.184 8.804-118.532 8.188-188.407z"
              fill={color}
              fill-opacity="1"
            ></path>
          </g>
        </svg>
      );
    case 'tail':
      return (
        <svg
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="32"
          height="32"
        >
          <path d="M0 0h512v512H0z" fill="#4B5563" fill-opacity="1"></path>
          <g class="" transform="translate(0,0)">
            <path
              d="M126.75 21.563L115.344 72.28l115.687 58.97 92.407-109.688H126.75zm-111 .593V60.28l81.438 7.69L107.5 22.155H15.75zM321.375 53l-74.313 88.188 65.5 56.187 105.813-67.03-97-77.345zM15.75 79.03v91.407c120.73-24.94 305.18 81.97 378.5 237.188l-1.406-45.75-32.813-74.03-52.592-70.283-1.782-1.53-74.062-63.5-2.438-1.25L103.75 87.343l-88-8.313zm386.78 83.5l-76.624 48.5 45.78 61.19 93.783-34.283-62.94-75.406zm49.97 100.064l-71.656 26.156 27.312 61.594 77.375-2.72-33.03-85.03zm11.53 104.47l-52.28 1.842 2.875 93.188c3.34 12.008 5.99 24.238 7.875 36.625 33.85-37.927 45.03-83.554 41.53-131.658z"
              fill={color}
              fill-opacity="1"
            ></path>
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export const monstaClasses = [
  'prime',
  'terminator',
  'alchemist',
  'golem',
  'nightingale',
  'prophet',
  'grognak',
  'juggernaut',
  'bomoh'
];

const genesToBin = (genes) => BigInt(genes).toString(2).padStart(256, '0');

export const getDetail = (monsta) => {
  const genesBin = genesToBin(monsta.genes);
  const detailedMonsta = {
    ...monsta,
    ...getClass(genesBin),
    ...getTraits(genesBin),
    price: getCurrentPrice(monsta.monstaEvents[0])
  };
  return { ...detailedMonsta, pureness: getPureness(detailedMonsta) };
};

export const monstaColors = {
  alchemist: '#60A5FA',
  prophet: '#059669',
  juggernaut: '#D97706',
  prime: '#FBBF24',
  bomoh: '#E56997',
  nightingale: '#6EE7B7',
  golem: '#9CA3AF',
  grognak: '#FCA5A5',
  terminator: '#78350F'
};

export const getMonstaColor = (className = '') => {
  const parsedClassName = className?.toLowerCase();
  switch (parsedClassName) {
    case 'alchemist':
      return monstaColors.alchemist;
    case 'prophet':
      return monstaColors.prophet;
    case 'juggernaut':
      return monstaColors.juggernaut;
    case 'prime':
      return monstaColors.prime;
    case 'bomoh':
      return monstaColors.bomoh;
    case 'nightingale':
      return monstaColors.nightingale;
    case 'golem':
      return monstaColors.golem;
    case 'grognak':
      return monstaColors.grognak;
    case 'terminator':
      return monstaColors.terminator;
    default:
      return '#FFFFFF';
  }
};
