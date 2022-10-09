import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppContainer from './src';
import store, {persistor} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
