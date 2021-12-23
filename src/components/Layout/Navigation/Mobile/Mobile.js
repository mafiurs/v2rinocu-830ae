import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { BellIcon } from '@heroicons/react/outline';
import { canUseDOM, getBasePath } from '../../../../utils/helpers';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Mobile({ navigation = [], userNavigation = [], user = {} }) {
  const [basePath, setBasePath] = useState('/');
  useEffect(() => {
    if (canUseDOM) {
      setBasePath(getBasePath());
    }
  }, []);

  const isActive = ({ href }) => href === basePath;
  return (
    <>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navigation.map((item, idx) => {
          const active = isActive(item);
          const { dropdown } = item;
          const customProps = dropdown ? {} : { href: item.href, as: 'a' };

          if (dropdown) {
            return (
              <Disclosure>
                <Disclosure.Button
                  {...customProps}
                  key={item.name}
                  className={classNames(
                    active
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    dropdown
                      ? 'inline-flex justify-between group cursor-pointer hover:bg-gray-700 w-full text-left'
                      : '',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                  <ChevronDownIcon
                    className={`${open ? '' : 'text-opacity-70'}
                    mt-1 ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="rounded-md px-4 pb-4 pt-4 text-sm text-gray-500 bg-white">
                  <nav className="grid gap-y-8">
                    {dropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 p-1 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <item.icon
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />

                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </Disclosure.Panel>
              </Disclosure>
            );
          }
          return (
            <>
              <Disclosure.Button
                {...customProps}
                key={item.name}
                className={classNames(
                  active
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  dropdown ? 'cursor-pointer hover:bg-gray-700 w-full text-left' : '',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            </>
          );
        })}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">{user.name}</div>
            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
          </div>
          <button
            type="button"
            className="ml-auto bg-gray-900 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 px-2 space-y-1">
          {userNavigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </div>
    </>
  );
}
