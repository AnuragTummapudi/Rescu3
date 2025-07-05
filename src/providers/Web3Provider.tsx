import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
  optimismGoerli,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Rescu3 - Decentralized Wallet Recovery',
<<<<<<< HEAD
  projectId: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2', // WalletConnect Project ID
  chains: [sepolia],
  ssr: false,
=======
  projectId: '2f05a7cac472eca57b2ddc67b9b4c6f6', // Public demo project ID for development
  chains: [sepolia, optimismGoerli],
  ssr: true, // If your dApp uses server side rendering (SSR)
>>>>>>> f1fc7729fd0fb51c08e86acaed7ca1aaf96bb792
});

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            blurs: {
              modalOverlay: 'small',
            },
            colors: {
              accentColor: 'hsl(217 91% 60%)',
              accentColorForeground: 'white',
              actionButtonBorder: 'hsl(214 32% 91%)',
              actionButtonBorderMobile: 'hsl(214 32% 91%)',
              actionButtonSecondaryBackground: 'hsl(210 40% 96%)',
              closeButton: 'hsl(215 16% 47%)',
              closeButtonBackground: 'hsl(210 40% 96%)',
              connectButtonBackground: 'hsl(217 91% 60%)',
              connectButtonBackgroundError: 'hsl(0 72% 51%)',
              connectButtonInnerBackground: 'hsl(217 91% 60%)',
              connectButtonText: 'white',
              connectButtonTextError: 'white',
              connectionIndicator: 'hsl(120 100% 50%)',
              downloadBottomCardBackground: 'hsl(0 0% 100%)',
              downloadTopCardBackground: 'hsl(0 0% 100%)',
              error: 'hsl(0 72% 51%)',
              generalBorder: 'hsl(214 32% 91%)',
              generalBorderDim: 'hsl(214 32% 91%)',
              menuItemBackground: 'hsl(210 40% 96%)',
              modalBackdrop: 'rgba(0, 0, 0, 0.3)',
              modalBackground: 'hsl(0 0% 100%)',
              modalBorder: 'hsl(214 32% 91%)',
              modalText: 'hsl(222 16% 12%)',
              modalTextDim: 'hsl(215 16% 47%)',
              modalTextSecondary: 'hsl(215 16% 47%)',
              profileAction: 'hsl(210 40% 96%)',
              profileActionHover: 'hsl(214 32% 91%)',
              profileForeground: 'hsl(0 0% 100%)',
              selectedOptionBorder: 'hsl(217 91% 60%)',
              standby: 'hsl(215 16% 47%)',
            },
            fonts: {
              body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            },
            radii: {
              actionButton: '12px',
              connectButton: '12px',
              menuButton: '12px',
              modal: '16px',
              modalMobile: '16px',
            },
            shadows: {
              connectButton: '0 4px 20px hsl(217 91% 60% / 0.15)',
              dialog: '0 8px 32px rgba(0, 0, 0, 0.12)',
              profileDetailsAction: '0 2px 8px rgba(0, 0, 0, 0.1)',
              selectedOption: '0 2px 8px hsl(217 91% 60% / 0.2)',
              selectedWallet: '0 2px 8px hsl(217 91% 60% / 0.2)',
              walletLogo: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}