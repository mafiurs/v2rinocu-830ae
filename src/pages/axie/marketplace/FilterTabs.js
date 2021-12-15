function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FilterTabs(props) {
  const { onChange, tabs = [] } = props;
  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
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
      <div className="hidden sm:block text-xs">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-800"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              onClick={onChange(tab.name)}
              className={classNames(
                tab.current ? 'bg-gray-900' : 'hover:bg-gray-700 bg-gray-600',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'cursor-pointer group relative min-w-0 flex-1 overflow-hidden py-1.5 px-1.5  font-medium text-center hover:bg-gray-700 focus:z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
