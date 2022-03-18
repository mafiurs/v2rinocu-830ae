import { withPageAuthRequired } from '@auth0/nextjs-auth0';
export { default } from './listedNftAlert';
export const getServerSideProps = withPageAuthRequired();
