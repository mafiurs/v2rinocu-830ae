import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import _ from 'lodash';

export default function FilterDrawer(props) {
  const { children, defaultOpen = false, title = '' } = props;
  return (
    <Disclosure as="div" className="border-b border-gray-200 py-4" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-1.5 text-white w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-400">
              <span className="font-medium">{title}</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-3">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
