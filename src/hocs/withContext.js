import React, { useContext, useReducer } from 'react';
import { AppContext } from '../context';

const withContext = (WrappedComponent) => (props) => {
  const contextData = useContext(AppContext);
  return <WrappedComponent {...props} {...contextData} />;
};

export default withContext;
