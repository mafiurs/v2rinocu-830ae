import _ from 'lodash';
import Navigation from './Navigation';
import Footer from './Footer';
import CoinsRibbon from './CoinsRibbon';
import BottomContent from './BottomContent';
import Hero from './Hero';

export default function Layout(props) {
  const { children, homePage = false } = props;
  return (
    <div className="min-h-full">
      <Navigation />
      <CoinsRibbon />
      {homePage && <Hero />}
      <main className="">
        <div
          className="max-w-screen-2xl px-2 sm:px-6 mx-auto py-3  lg:px-8 mt-0"
          style={{ minHeight: 'calc( 100vh - 88px )' }}
        >
          {children}
        </div>
        <BottomContent />
      </main>
      <Footer />
    </div>
  );
}
