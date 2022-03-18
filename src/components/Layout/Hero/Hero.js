/* This example requires Tailwind CSS v2.0+ */
import Button from '../../atoms/Button';

export default function Hero() {
  const onClickAxieMarket = (e) => {
    e.preventDefault();
    window.location.replace('https://rinocu.com/axie/marketplace');
  };
  return (
    <div className="relative overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <div className="mt-16 mx-auto max-w-screen-2xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Welcome to Rinocu</span>{' '}
              <span className="block text-indigo-400 text-2xl uppercase">Beta version</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Now featuring the best Axie Infinity marketplace explorer for investors along with
              major visual and performance upgrades.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Button label="Axie marketplace" onClick={onClickAxieMarket} />
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Button label="Tutorials" inverted onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
