import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';

import 'antd/dist/antd.css';
import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ModalManager from '@/components/modal';

import { store } from '@/reducer/store';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalManager />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
