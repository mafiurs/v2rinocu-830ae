import { capitalize, listFormattter } from '../../../../../utils/helpers';
import axieParts from '../../../../../utils/axie/parts.json';
import Button from '../../../../../components/atoms/Button';

export default function AxieListedAlerts({ data = [], onDelete = () => {} }) {
  const getAlerts = () => {
    const formattedAlerts = data?.map((alert) => {
      const alertDate = alert.date['@date'];
      return {
        ...alert,
        formattedAlertDate: alertDate
      };
    });
    return formattedAlerts;
  };
  const getParts = (parts) => {
    return parts.length > 0
      ? parts?.map((part) => axieParts[part.split('-')[0]][part].partName)
      : null;
  };
  const rangedCriteria = ['breedCount', 'hp', 'morale', 'skill', 'speed'];

  const alerts = getAlerts();
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {alerts.length === 0 && (
        <h3 className="text-3xl font-bold tracking-tight text-white text-center">
          You have no alerts.
        </h3>
      )}
      {alerts?.map((alert, idx) => (
        <li
          key={idx}
          className="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 cursor-default"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <div className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium truncate">Axie listing alert nº {idx + 1}</p>
                <p className="text-xs text-gray-300 truncate">Budget: {alert?.data?.budget} ETH</p>
              </div>
            </div>
            <time className="flex-shrink-0 whitespace-nowrap text-xs text-gray-200">
              Created at: {alert.formattedAlertDate}
            </time>
          </div>
          <div className="flex justify-between space-x-3">
            <div className="mt-1">
              {alert?.data?.criteria?.parts && (
                <p className="line-clamp-2 text-xs text-gray-400">
                  Parts: {listFormattter.format(getParts(alert?.data?.criteria?.parts))}
                </p>
              )}
              {rangedCriteria?.map((criteria, idx) => {
                if (alert?.data?.criteria && alert?.data?.criteria[criteria].length > 0) {
                  return (
                    <p id={idx} className="line-clamp-2 text-xs text-gray-400">
                      {capitalize(criteria)}: {alert?.data?.criteria[criteria].join(' to ')}
                    </p>
                  );
                }
              })}
            </div>
            <div className="mt-1">
              <Button label="Delete" size="sm" onClick={onDelete(alert?.ref['@ref']?.id)} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
