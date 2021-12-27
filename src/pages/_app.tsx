import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'antd/dist/antd.css';
import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import configure from '@/reducer/store';

const { store, persistor } = configure();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
