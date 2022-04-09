function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs(props) {
  const handleMobileChange = (e) => {
    const newSelectedTab = props?.content?.find((tab) => tab.tabLabel === e.target.value).name;

    props.handleSwitchTab(newSelectedTab)();
  };
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
          className="block w-full p-2 hover:bg-gray-700 border-gray-300 bg-gray-900 rounded-md text-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          defaultValue={props?.content?.find((tab) => tab.active).tabLabel}
          onChange={handleMobileChange}
        >
          {props?.content?.map((tab) => (
            <option key={tab.name}>{tab.tabLabel}</option>
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
