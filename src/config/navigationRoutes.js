import {
  LightningBoltIcon,
  DuplicateIcon,
  SearchCircleIcon,
  UserGroupIcon,
  BellIcon
} from '@heroicons/react/outline';

export const navigation = [
  { name: 'Home', href: '/', current: true },
  {
    name: 'Monsta',
    href: '/monsta',
    current: false,
    dropdown: [
      {
        name: 'Marketplace explorer',
        description: 'The monsta that you need in seconds',
        href: '/monsta/marketplace',
        icon: LightningBoltIcon
      },
      {
        name: 'Clone simulator',
        description: 'Simulate your cloning chances',
        href: '/monsta/clone-simulator',
        icon: UserGroupIcon
      },
      {
        name: 'Genetic scanner',
        description: 'Explore the genetic behind your monsta',
        href: '/monsta/genetic-scanner',
        icon: SearchCircleIcon
      }
    ]
  },
  {
    name: 'Axie Infinity',
    href: '/axie',
    current: false,
    dropdown: [
      {
        name: 'Marketplace explorer',
        description: 'The best tool for breeders',
        href: '/axie/marketplace',
        icon: LightningBoltIcon
      },
      {
        name: 'Marketplace listing alert',
        description: 'Get notified when an axie gets listed',
        href: '/axie/listed-nft-alert',
        icon: BellIcon,
        restricted: true
      }
    ]
  },
  { name: 'Contact', href: '/contact', current: true }
];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/api/auth/logout' }
];
