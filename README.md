<<<<<<< HEAD
# Rescu3 - Decentralized Wallet Recovery Protocol

A complete Web3 application for recovering lost Ethereum wallets using a secure commit-reveal protocol.

## 🚀 Features

- **Reactive Recovery**: No prior setup required - recover wallets after keys are lost
- **Commit-Reveal Protocol**: Secure 4-phase recovery process prevents front-running
- **Guardian Network**: Optional trusted contacts to assist in recovery
- **Challenge System**: Original owners can cancel false recovery attempts
- **Professional UI**: Clean, modern interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- TypeScript
- Tailwind CSS with custom design system
- Framer Motion for animations  
- RainbowKit + Wagmi for Web3 integration
- Lucide React for icons

### Smart Contracts
- Solidity ^0.8.20
- Hardhat for development & deployment
- Sepolia testnet ready

## 📦 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd rescu3-frontend
npm install
```

### 2. Smart Contract Setup

```bash
cd contracts
npm install
```

### 3. Deploy Contract to Sepolia

```bash
# In contracts/ directory
npm run deploy
```

Copy the deployed contract address and update `src/config/contract.ts`:

```typescript
export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_ADDRESS_HERE';
```

### 4. Start Development Server

```bash
# In root directory  
npm run dev
```

## 🔧 Configuration

### Environment Setup
The project includes pre-configured Sepolia testnet settings with Infura RPC.

### Contract Integration
- ABI is located in `src/abi/Rescu3.json`
- Contract configuration in `src/config/contract.ts`
- Utility functions in `src/utils/contract.ts`

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Hero.tsx           # Landing page hero section
│   ├── WalletStatus.tsx   # Wallet connection status
│   ├── RecoveryPhases.tsx # Main recovery interface
│   └── ui/               # Reusable UI components
├── config/
│   └── contract.ts       # Contract configuration
├── utils/
│   └── contract.ts       # Web3 utilities
├── providers/
│   └── Web3Provider.tsx  # Wagmi & RainbowKit setup
└── pages/
    ├── Index.tsx         # Landing page
    └── Dashboard.tsx     # Main application
```

### Recovery Process Flow

1. **Commit Phase**: Submit hashed recovery intent with fee deposit
2. **Reveal Phase**: Disclose addresses and nonce after delay period  
3. **Challenge Phase**: 5-minute window for original owner to cancel
4. **Claim Phase**: Complete ownership transfer if unchallenged

## 🎨 Design System

The application uses a professional light theme with:
- HSL-based color system for consistency
- Glassmorphism effects and soft shadows
- Semantic design tokens
- Responsive grid layouts
- Smooth animations and transitions

## 🔐 Security Features

- **Economic Deterrents**: 0.01 ETH commit fee to prevent spam
- **Time Delays**: Prevents front-running attacks
- **Challenge Windows**: Original owners can cancel false claims
- **Cover Traffic**: Support for fake commits to obfuscate real attempts

## 📱 Usage

1. **Connect Wallet**: Use RainbowKit to connect your Ethereum wallet
2. **Start Recovery**: Enter lost wallet and recovery addresses
3. **Commit**: Submit hashed commitment with fee
4. **Reveal**: Disclose original data after delay
5. **Wait**: Monitor challenge period
6. **Claim**: Complete ownership transfer

## 🧪 Testing

### Smart Contract Tests
```bash
cd contracts
npm test
```

### Frontend Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🚀 Deployment

### Smart Contract
Deploy to Sepolia testnet:
```bash
cd contracts
npm run deploy
```

### Frontend
The frontend can be deployed to any static hosting service:
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## 📄 Smart Contract Details

### Core Functions
- `commit(bytes32 h)`: Submit recovery commitment
- `reveal(address lost, address recovery, uint256 nonce)`: Reveal recovery details
- `challenge(address lost)`: Cancel recovery attempt
- `claim(address lost)`: Complete ownership transfer

### Constants
- `COMMIT_DELAY`: 1 minute before reveal allowed
- `CHALLENGE_PERIOD`: 5 minutes for owner to challenge
- `COMMIT_FEE`: 0.01 ETH deposit requirement

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation

---

**⚠️ Disclaimer**: This is experimental software. Use at your own risk and never commit more funds than you can afford to lose.
=======
Rescu3 = Rescue + Web3
>>>>>>> f1fc7729fd0fb51c08e86acaed7ca1aaf96bb792
