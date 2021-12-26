import * as React from 'react';

import Footer from './Footer';
import Header from './Header';

export default function Layout({
  children,
  hiddenHeader,
  hiddenFooter,
}: {
  children: React.ReactNode;
  hiddenHeader?: boolean;
  hiddenFooter?: boolean;
}) {
  return (
    <>
      {!hiddenHeader && <Header />}
      <div style={{ marginTop: `${!hiddenHeader ? '0' : '51.95px'}` }}></div>
      {children}
      {!hiddenFooter && <Footer />}
    </>
  );
}
