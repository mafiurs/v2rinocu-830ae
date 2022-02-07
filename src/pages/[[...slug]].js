import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getComponent } from '@stackbit/components';
import HomePage from './index';
function Page(props) {
  const { page, site } = props;
  const { layout } = page;
  console.log('site: ', site);
  console.log('page: ', page);
  console.log('ISHOMEPAGE: ', page.__metadata.urlPath === '/');
  const isHomePage = page.__metadata.urlPath === '/';

  if (!layout) {
    throw new Error(`page has no layout, page '${props.path}'`);
  }
  const PageLayout = getComponent(layout);
  if (!PageLayout) {
    throw new Error(`no page layout matching the layout: ${layout}`);
  }
  if (isHomePage) {
    return <HomePage page={page} site={site} homePage />;
  }
  return <PageLayout page={page} site={site} />;
}

export async function getStaticPaths() {
  let data = await sourcebitDataClient.getData();
  const paths = data.pages.map((page) => page.path);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath(params.slug);
  return { props };
}

export default withRemoteDataUpdates(Page);
