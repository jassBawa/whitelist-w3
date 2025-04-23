# Whitelist Web3 Page

A modern web3 whitelist page built with Next.js, Wagmi, and Viem. This project provides a seamless way to verify and authenticate users through their Web3 wallets.

## Features

- 🔐 Web3 Wallet Integration using Wagmi
- 📝 Message Signing for Authentication
- 🎨 Modern UI with Framer Motion animations
- 🚀 Built with Next.js 15
- 🔄 React Query for data fetching
- 🛠 TypeScript Support

## Tech Stack

- **Framework**: Next.js 15
- **Web3**: Wagmi + Viem
- **UI**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: React Query
- **Database**: Prisma
- **Type Safety**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Web3 wallet (MetaMask, WalletConnect, etc.)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jassBawa/whitelist-w3.git
cd whitelist-page
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your environment variables:
Create a `.env` file in the root directory and add the following:
```env
# Add your environment variables here
```

4. Prisma client generate:
```bash
npx prisma generate
# or
yarn dev
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
whitelist-page/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── constants/        # Constants and configurations
│   └── lib/             # Utility functions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── ...config files
```

## How It Works

1. Users connect their Web3 wallet using the provided interface
2. Once connected, users are prompted to sign a message
3. The signed message is verified on the backend
4. Upon successful verification, users are redirected to the application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
