import _ from 'lodash';
import Navigation from './Navigation';
import Footer from './Footer';
import CoinsRibbon from './CoinsRibbon';
import Hero from './Hero';

export default function Layout(props) {
  console.log('PROPS: ', props);
  const { children, homePage = false } = props;
  console.log('homePage: ', homePage);
  return (
    <div className="min-h-full">
      <Navigation />
      <CoinsRibbon />
      {homePage && <Hero />}
      <main className="mb-16">
        <div
          className="max-w-full px-2 sm:px-6 mx-auto py-3  lg:px-8 mt-0"
          style={{ minHeight: 'calc( 100vh - 88px )' }}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
