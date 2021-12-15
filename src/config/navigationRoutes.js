import { LightningBoltIcon, DuplicateIcon, SearchCircleIcon } from '@heroicons/react/outline';

export const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Team', href: '/team', current: false },
  {
    name: 'Monsta',
    href: '/monsta',
    current: false,
    dropdown: [
      {
        name: 'Scanner',
        description: 'Genetic behind your monsta',
        href: '/monsta/scanner',
        icon: SearchCircleIcon
      },
      {
        name: 'Breeder',
        description: 'Breeding genetic chances',
        href: '/monsta/breeder',
        icon: DuplicateIcon
      },
      {
        name: 'Marketplace',
        description: 'The monsta that you need in seconds',
        href: '/monsta/marketplace',
        icon: LightningBoltIcon
      }
    ]
  },
  {
    name: 'Axie Infinity',
    href: '/axie',
    current: false,
    dropdown: [
      {
        name: 'Scanner',
        description: 'Genetic behind your monsta',
        href: '/axie/scanner',
        icon: SearchCircleIcon
      },
      {
        name: 'Breeder',
        description: 'Breeding genetic chances',
        href: '/axie/breeder',
        icon: DuplicateIcon
      },
      {
        name: 'Marketplace',
        description: 'The monsta that you need in seconds',
        href: '/axie/marketplace',
        icon: LightningBoltIcon
      }
    ]
  }
];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' }
];
