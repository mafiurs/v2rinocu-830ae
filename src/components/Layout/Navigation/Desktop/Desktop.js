/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { BellIcon } from '@heroicons/react/outline';
// import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';
import PopoverMenuButton from '../PopoverMenuButton';
import { canUseDOM, getBasePath } from '../../../../utils/helpers';
import RinocuLogo from '../../../atoms/Svg/RinocuLogo';
import Button from '../../../atoms/Button';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Desktop({ navigation = [], userNavigation = [] }) {
  const router = useRouter();
  const { user } = useUser();
  // const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();
  const [basePath, setBasePath] = useState('/');
  useEffect(() => {
    if (canUseDOM) {
      setBasePath(getBasePath());
    }
  }, []);

  const isActive = ({ href }) => href === basePath;

  return (
    <>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <a href="/">
            <RinocuLogo />
          </a>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {navigation.map((item) => {
              const active = isActive(item);
              if (item.dropdown) {
                return <PopoverMenuButton {...item} active={active} />;
              }
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    active ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {/* <button onClick={loginWithRedirect} className="login">
        Login
      </button> */}
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          {/* <button
            type="button"
            className="bg-gray-900 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button> */}
          {!user && (
            <Button
              label="Login"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                router.push('/api/auth/login');
              }}
            />
          )}
          {user && (
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-gray-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.picture || '/images/rinocu-discord-logo.png'}
                    alt="profile picture"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
}
