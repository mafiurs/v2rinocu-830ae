import _ from 'lodash';
import Navigation from './Navigation';
import Footer from './Footer';
import CoinsRibbon from './CoinsRibbon';
import BottomContent from './BottomContent';
import Hero from './Hero';
import Tabs from '../molecules/Tabs';
import Alert from '../molecules/Alert';

export default function Layout(props) {
  const { children, homePage = false, tabs } = props;
  return (
    <div className="min-h-full">
      <Navigation />
      <CoinsRibbon />
      {homePage && <Hero />}
      {tabs && (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-700 py-2">
          <Tabs {...tabs} />
        </div>
      )}
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
      {/* fixed positioned */}
      <Alert />
    </div>
  );
}
