import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}