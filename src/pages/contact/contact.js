import Head from 'next/head';
import Layout from '../../components/Layout';

const people = [
  {
    name: 'Marcos Blázquez',
    role: 'Founder / Developer',
    imageUrl: '/images/linkedin-marcos.png',
    // twitterUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/marcos-blazquez-3a756b111/?locale=en_US'
  }
];

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Rinocu | Contact</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Rinocu - contact page." />
        <meta
          name="description"
          content="Rinocu delivers the best crypto game content within the reach of a click. The best crypto game content ever created."
        />
        <meta property="og:image" content="/images/rinocu-discord-logo.png" />
        <meta
          name="keywords"
          content="crypto game, crypto, defi, staking, axie infinity, monsta infinite, pegaxy, eth, axs, slp, btc, moni, stt, blockchain, wallet, metamask, ronin, ron, liquidity, katana, binance, bsc, bnb, busd, usdt, data, volume, mint, token, coin, solidity, react, web3, ethers"
        />
      </Head>
      <main className="overflow-hidden">
        {/* Header */}
        <div className="bg-warm-gray-50">
          <div className="pt-12 lg:pt-20">
            <div className="relative z-10 max-w-7xl mx-auto pl-4 pr-8 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-4xl">
                Get in touch
              </h1>
              <p className="mt-6 text-base text-gray-300 max-w-3xl">
                In Rinocu we want to deliver the best crypto content within the reach of a click.
                You won't need to keep browsing for hours in order to find the best crypto game tool
                any longer.
              </p>
              <h3 className="mt-6 text-base text-gray-300 max-w-3xl">Contact information:</h3>
              <ul
                role="list"
                className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-7xl"
                className="text-base"
              >
                <li>
                  <span className="text-base text-gray-300"></span>
                  <a href="mailto:contact@rinocu.com" target="_blank" rel="noopener noreferrer">
                    contact@rinocu.com
                  </a>
                </li>
                <li>
                  <span className="text-base text-gray-300"></span>
                  <a href="https://discord.gg/rN6RUhftRX" target="_blank" rel="noopener noreferrer">
                    https://discord.gg/rN6RUhftRX
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <section className="relative" aria-labelledby="contact-heading">
          <div className="">
            <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-12">
              <div className="">
                <ul
                  role="list"
                  className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-7xl"
                >
                  {people.map((person) => (
                    <li key={person.name}>
                      <div className="space-y-6 bg-gray-700 rounded-lg py-8">
                        <img
                          className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                          src={person.imageUrl}
                          alt=""
                        />
                        <div className="space-y-2">
                          <div className="text-lg leading-6 font-medium space-y-1">
                            <h3>{person.name}</h3>
                            <p className="text-indigo-300">{person.role}</p>
                          </div>
                          <ul role="list" className="flex justify-center space-x-5">
                            <li>
                              <a
                                href={person.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">LinkedIn</span>
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact grid */}
        {/* <section aria-labelledby="offices-heading">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h2 id="offices-heading" className="text-3xl font-extrabold text-warm-gray-900">
              Our offices
            </h2>
            <p className="mt-6 text-lg text-warm-gray-500 max-w-3xl">
              Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non.
              Cras aliquet purus dui laoreet diam sed lacus, fames.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {offices.map((office) => (
                <div key={office.id}>
                  <h3 className="text-lg font-medium text-warm-gray-900">{office.city}</h3>
                  <p className="mt-2 text-base text-warm-gray-500">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </main>

      {/* <footer className="bg-warm-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <img
                className="h-10"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=warmGray&shade=400"
                alt="Company name"
              />
              <p className="text-warm-gray-400 text-base">
                Making the world a better place through constructing elegant hierarchies.
              </p>
              <div className="flex space-x-6">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-warm-gray-400 hover:text-warm-gray-300"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-warm-gray-200 tracking-wider uppercase">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-warm-gray-400 hover:text-warm-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-warm-gray-200 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-warm-gray-400 hover:text-warm-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-warm-gray-200 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-warm-gray-400 hover:text-warm-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-warm-gray-200 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-warm-gray-400 hover:text-warm-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-warm-gray-700 pt-8">
            <p className="text-base text-warm-gray-400 xl:text-center">
              &copy; 2020 Workflow, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </Layout>
  );
}
