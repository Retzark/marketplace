# Marketplace Project Documentation

## Overview

The Marketplace project is a private, module-type application leveraging React for building user interfaces, Zustand for state management, and Vite as a build tool. It's set up to use modern development practices, including linting, hot module replacement, and a streamlined development server.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Familiarity with React and modern JavaScript development.

### Installation

1. **Clone the Repository**

   First, clone the project repository to your local machine. You can do this by running the following command in your terminal or command prompt:

   ```bash
   git clone https://example.com/marketplace.git
   ```

2. **Navigate to the Project Directory**

   Change your current directory to the project directory:

   ```bash
   cd marketplace
   ```

3. **Install Dependencies**

   Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

4. **Run the Development Server**

   Launch the development server using Vite:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in the browser. The page will reload if you make edits.

### Building the Project

To build the app for production to the `dist` folder using Vite, run:

```bash
npm run build
```

This optimizes the build for the best performance.

### Linting the Project

To check for code quality and consistency issues in `.js` and `.jsx` files, run:

```bash
npm run lint
```

This reports unused eslint-disable directives and fails on any warnings.

### Previewing the Production Build

To serve the production build from the `dist` folder, allowing you to preview the app after it's built, run:

```bash
npm run preview
```

## Available Scripts

In the project directory, you can run several scripts defined in the `package.json`:

- `npm run dev`: Launches the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Serves the production build for preview.

## Dependencies

- **axios**: Promise based HTTP client for making requests.
- **dotenv**: Loads environment variables from `.env` files into `process.env`.
- **react** & **react-dom**: Core libraries for building React applications.
- **react-router-dom**: Declarative routing for React applications.
- **triplesec**: Encryption library.
- **zustand**: A state management solution.

## Development Dependencies

- **@types/react** & **@types/react-dom**: TypeScript definitions for React and ReactDOM.
- **@vitejs/plugin-react**: Provides React fast refresh and other features for Vite.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint** & related plugins: Linting tools for JavaScript and React.
- **postcss**: Tool for transforming CSS with JavaScript.
- **tailwindcss**: A utility-first CSS framework.
- **vite**: Frontend build tool that provides a faster and leaner development experience.

## Project Structure

- `/src`: Source files for the application.
- `/dist`: Output directory for the production build.
- `/node_modules`: Directory for NPM packages.
- `.env`: Environment variables file (ensure this file is not committed to version control).

## Project Structure

The project is organized as follows:

```
.
├── .env
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── ecosystem.config.cjs
├── folder_structure.txt
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── cards.json
│   ├── images
│   │   ├── BANNER-ALPHA-PACK.webp
│   │   ├── BANNER-HOMEPAGE.webp
│   │   ├── BANNER-OPEN.webp
│   │   ├── ability_icon.svg
│   │   ├── alpha-pack.webp
│   │   ├── asc_lvl_gray.svg
│   │   ├── asc_lvl_red.png
│   │   ├── asc_lvl_red.svg
│   │   ├── atk_icon.svg
│   │   ├── banner-homepage-logo.webp
│   │   ├── basic_attack_icon.svg
│   │   ├── buy-now.svg
│   │   ├── card-back-2.png
│   │   ├── card-pack-home.webp
│   │   ├── card_open.webp
│   │   ├── common-badge.svg
│   │   ├── currency_logo.svg
│   │   ├── egy_icon.svg
│   │   ├── epic-badge.svg
│   │   ├── game-board-home.webp
│   │   ├── home-prophecy-background.webp
│   │   ├── hp_icon.svg
│   │   ├── img.png
│   │   ├── legendary-badge.svg
│   │   ├── marketplace-hero.webp
│   │   ├── open-pack-image.webp
│   │   ├── open_cards.webp
│   │   ├── pack_drop_rate.webp
│   │   ├── rare-badge.svg
│   │   ├── retzark_logo.png
│   │   ├── spd_icon.svg
│   │   ├── subscribe-background-image.webp
│   ├── retzark.svg
│   ├── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── api
│   │   ├── apiService.ts
│   │   ├── sidechainApi.ts
│   ├── assets
│   │   ├── react.svg
│   ├── components
│   │   ├── CollectionCardsList.tsx
│   │   ├── Hero.tsx
│   │   ├── ListingsTable.tsx
│   │   ├── Loading.tsx
│   │   ├── NFTCardsList.tsx
│   │   ├── Navbar.tsx
│   │   ├── StatsAndMoveset.tsx
│   │   ├── UserMenu.tsx
│   │   ├── home
│   │   │   ├── AlphaPackSection.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MainContentSection.tsx
│   │   │   ├── MarketplaceSection.tsx
│   │   │   ├── PromotionalSection.tsx
│   │   │   ├── PropheciesSection.tsx
│   │   │   ├── SubscribeSection.tsx
│   │   ├── modals
│   │   │   ├── BuyCard.tsx
│   │   │   ├── BuyPacks.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── OpenPack.tsx
│   │   │   ├── TransferPack.tsx
│   │   │   ├── ViewCards.tsx
│   ├── hooks
│   │   ├── useFetchCollectionData.ts
│   │   ├── useFetchNFTMarketData.ts
│   │   ├── useInitializeSettings.ts
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── CardDetails.tsx
│   │   ├── Cards.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Open.tsx
│   │   ├── Packs.tsx
│   │   ├── Profile.tsx
│   ├── routes.tsx
│   ├── store
│   │   ├── index.ts
│   │   ├── useAppStore.ts
│   │   ├── useCardStore.ts
│   │   ├── useMarketStore.ts
│   │   ├── usePacksStore.ts
│   │   ├── useTransactionStore.ts
│   │   ├── userStore.ts
│   ├── types
│   │   ├── AppState.ts
│   │   ├── Card.ts
│   │   ├── Packs.ts
│   │   ├── SellBookEntry.ts
│   │   ├── Settings.ts
│   │   ├── index.ts
│   ├── utils
│   │   ├── arrayChunk.ts
│   │   ├── fetchCardData.ts
│   │   ├── triplesec.js
│   │   ├── web-crypto.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

## Environment Setup

You'll need to create a `.env` file in the root of your project directory to store environment-specific variables. The `dotenv` package is already included to help with this.

Example `.env` content:

```env
# Add your environment variables here
```

This guide provides a straightforward approach for users to set up and start working with the project. Adjust the URLs, commands, and any additional steps based on the specifics of your project and its environment.




