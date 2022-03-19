import React, { useReducer } from 'react';

export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    alert: {
      open: false,
      title: '',
      type: ''
    }
  };

  let alertTimeOut;

  const closeAlertTimeout = () => {
    alertTimeOut = setTimeout(() => {
      closeAlert();
    }, 7000);
  };

  const clearAlertTimeout = () => {
    clearTimeout(alertTimeOut);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setAlert':
        if (action.payload.open) {
          closeAlertTimeout();
        } else {
          clearAlertTimeout();
        }
        return { ...state, alert: action.payload };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeAlert = () =>
    dispatch({ type: 'setAlert', payload: { title: '', type: '', open: false } });
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
