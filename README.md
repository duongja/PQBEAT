# PQBEAT

PQBEAT is a public analytics frontend for tracking quantum readiness across the Ethereum ecosystem. It brings curated entity data, transparent risk scoring, and explainers into one place:

- `/` for the dashboard and benchmark overview
- `/registry` for the filterable ecosystem registry
- `/learn/quantum-risk-in-ethereum` for the flagship explainer

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local static data with build-time scoring
- Vitest + Testing Library for smoke and interaction tests

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
npm run dev
npm run lint
npm test
npm run build
```

## Product Notes

- The registry is intentionally small and manually curated.
- Scores are directional and derived from four factors: signature scheme, public key exposure, upgrade flexibility, and L1 dependency.
- Source links, review dates, and confidence labels are included to keep the platform transparent about its assumptions.

## Next Iteration Ideas

- Expand the dataset and evidence model
- Add roadmap and EIP tracking
- Bring in live chain or wallet signals
- Publish deeper benchmarking outputs beyond the lite comparison table
