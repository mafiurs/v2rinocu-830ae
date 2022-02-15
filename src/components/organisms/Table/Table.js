import { classNames } from '../../../utils/helpers';

export default function Table({ columns, rows = [] }) {
  return (
    <div className="flex flex-col w-full sm:w-auto">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-900 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-700">
                <tr>
                  {columns.map(({ title, srLabel }, idx) => {
                    const empty = !title;
                    if (empty) {
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">{srLabel}</span>
                      </th>;
                    }
                    return (
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        key={idx}
                      >
                        {title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-gray-600 divide-y divide-gray-500">
                {rows.map((row, idx) => {
                  return (
                    <tr key={idx}>
                      {row.map(({ content, className }, idx) => (
                        <td
                          key={idx}
                          className={classNames(
                            'px-3 py-2 whitespace-nowrap text-sm font-medium',
                            className
                          )}
                        >
                          {content}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
