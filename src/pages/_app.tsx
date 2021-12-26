import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import store from '@/reducer/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(MyApp);
