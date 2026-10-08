import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const client = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins, sans-serif",
        },
      }}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
