import { useRouter } from 'next/router';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { VerifyOtp } from '@/api/user-service';
import ui from '@/utils/ui';

export default function ActiveAccountPage() {
  const router = useRouter();

  React.useEffect(() => {
    const { otp, otpId } = router.query;
    if (otp && otpId) {
      VerifyOtp({ otp: otp as string, otpId: otpId as string })
        .then((data: any) => {
          console.log(data);
          ui.alertSuccess('Verify account successful !');
        })
        .catch((err: any) => {
          ui.alertFailed(err?.error?.toString());
        });
    }
  }, [router.isReady, router.query]);

  return (
    <Layout>
      <Seo templateTitle='ActiveAccount' />
      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'></div>
        </section>
      </main>
    </Layout>
  );
}
