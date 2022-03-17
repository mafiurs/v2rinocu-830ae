/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
  { name: 'New alert', href: '#', current: true },
  { name: 'My alerts', href: '#', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs(props) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex justify-center space-x-4" aria-label="Tabs">
          {props?.content?.map((tab, idx) => (
            <button
              key={idx}
              className={classNames(
                tab.active ? 'bg-gray-900' : 'hover:bg-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md',
                'focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              )}
              aria-current={tab.active ? 'page' : undefined}
              onClick={props.handleSwitchTab(tab.name)}
            >
              {tab.tabLabel}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
