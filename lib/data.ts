import { scoreEntity } from "@/lib/scoring";
import type {
  BenchmarkEntry,
  DashboardSnapshot,
  Entity,
  ScoredEntity,
  SourceLink,
} from "@/lib/types";

export const reviewDate = "2026-04-06";

export const benchmarkEntries: BenchmarkEntry[] = [
  {
    algorithm: "CRYSTALS-Dilithium",
    signatureSize: "~2.4 KB",
    performanceNote: "Balanced verifier and signer costs for general-purpose deployments.",
    ethereumImpact: "Large compared with secp256k1 signatures, but still easier to reason about than hash-based extremes.",
    maturityNote: "NIST-selected and frequently used as the baseline reference point in Ethereum PQC discussions.",
  },
  {
    algorithm: "Falcon",
    signatureSize: "~666 bytes",
    performanceNote: "Very compact signatures, but the implementation surface is harder to harden safely.",
    ethereumImpact: "Most attractive for calldata pressure, though assurance and tooling complexity stay front and center.",
    maturityNote: "Interesting for wallet UX, but engineering risk is still a practical discussion item.",
  },
  {
    algorithm: "SPHINCS+",
    signatureSize: "~8 KB",
    performanceNote: "Conservative hash-based posture with heavy signature-size tradeoffs.",
    ethereumImpact: "A clear stress test for calldata, mempool propagation, and gas growth in the EVM stack.",
    maturityNote: "Useful as a benchmark for worst-case payload expansion rather than the most ergonomic default.",
  },
];

export const layerBriefs = [
  {
    layer: "Execution accounts",
    posture: "Highest exposure",
    description:
      "Ethereum EOAs still depend on secp256k1 signatures. Once an account signs onchain, its public key can be derived from the signature data.",
  },
  {
    layer: "Consensus validators",
    posture: "Distinct but still vulnerable",
    description:
      "Proof-of-stake validators use BLS keys, which improves aggregation and validator ergonomics but does not provide post-quantum safety.",
  },
  {
    layer: "Rollup settlement",
    posture: "Operationally agile, cryptographically inherited",
    description:
      "Rollups can ship protocol changes faster than L1, yet their hard finality, bridging, and data publication still anchor to Ethereum.",
  },
  {
    layer: "Smart-account wallets",
    posture: "Best current migration surface",
    description:
      "Contract accounts and ERC-4337 stacks add signer policy and upgrade flexibility, even though most deployments still rely on classical cryptography today.",
  },
  {
    layer: "Transaction infrastructure",
    posture: "Low direct risk, high ecosystem leverage",
    description:
      "RPCs, bundlers, and wallet infrastructure are not the root signing risk, but they will strongly influence how fast new account models ship.",
  },
];

export const primarySources: SourceLink[] = [
  {
    label: "Ethereum accounts",
    url: "https://ethereum.org/en/developers/docs/accounts/",
  },
  {
    label: "EIP-7702",
    url: "https://eips.ethereum.org/EIPS/eip-7702",
  },
  {
    label: "Ethereum proof-of-stake keys",
    url: "https://ethereum.org/developers/docs/consensus-mechanisms/pos/keys/",
  },
  {
    label: "ERC-4337",
    url: "https://eips.ethereum.org/EIPS/eip-4337",
  },
  {
    label: "Arbitrum Nitro",
    url: "https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro",
  },
  {
    label: "Scroll accounts",
    url: "https://docs.scroll.io/en/technology/chain/accounts/",
  },
  {
    label: "zkSync account abstraction",
    url: "https://docs.zksync.io/zksync-protocol/account-abstraction",
  },
  {
    label: "Safe smart accounts",
    url: "https://docs.safe.global/home/what-is-safe",
  },
  {
    label: "Base Account",
    url: "https://docs.base.org/base-account/overview/what-is-base-account",
  },
  {
    label: "MetaMask Services",
    url: "https://docs.metamask.io/services/",
  },
];

const entities: Entity[] = [
  {
    slug: "ethereum-execution",
    name: "Ethereum Execution Accounts",
    category: "L1",
    affectedLayer: "Execution accounts",
    signatureScheme: "ECDSA (secp256k1) EOAs, with EIP-7702 adding delegated code but not PQ-safe signatures.",
    publicKeyExposure:
      "Public keys are not directly encoded in the address, but they become derivable after the account signs and spends onchain.",
    upgradeability:
      "A credible migration path would require an Ethereum protocol upgrade plus coordinated wallet, tooling, and account-migration changes.",
    l1Dependency: "Root execution layer for the EVM ecosystem.",
    notes:
      "Ethereum still anchors the dominant account model for the ecosystem. EIP-7702 improves delegation and account behavior, but it does not replace secp256k1 with a post-quantum signature path.",
    readinessSignals: [
      "Pectra introduces EIP-7702, showing the base layer can evolve account behavior.",
      "ERC-4337 and smart-account work are expanding around Ethereum rather than replacing its native signature assumptions.",
      "No canonical post-quantum transaction format exists on Ethereum today.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "ecdsa_eoa",
    publicKeyExposureKey: "visible_after_spend",
    upgradeabilityKey: "hard_fork",
    l1DependencyKey: "core_protocol",
    sources: [
      {
        label: "Ethereum accounts",
        url: "https://ethereum.org/en/developers/docs/accounts/",
      },
      {
        label: "EIP-7702",
        url: "https://eips.ethereum.org/EIPS/eip-7702",
      },
    ],
  },
  {
    slug: "ethereum-validators",
    name: "Ethereum Validators",
    category: "Consensus",
    affectedLayer: "Consensus validators",
    signatureScheme: "BLS validator signing keys with separate withdrawal credentials.",
    publicKeyExposure:
      "Validator public keys are included in deposit data, and validator signing keys stay online for proposals and attestations.",
    upgradeability:
      "Any validator-key migration would require consensus-layer protocol work, client upgrades, and new operational tooling across stakers.",
    l1Dependency: "Core consensus layer for Ethereum finality.",
    notes:
      "Ethereum already operates with a second signature family at the validator layer, which proves the protocol can support different cryptographic roles. That said, BLS is still not post-quantum, so validator readiness remains a distinct migration problem.",
    readinessSignals: [
      "Validator and withdrawal keys are already separated operationally.",
      "BLS proves Ethereum can integrate non-ECDSA signature roles when the protocol benefits are strong.",
      "No post-quantum validator scheme is standardized in Ethereum today.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "bls_validator",
    publicKeyExposureKey: "frequent_onchain",
    upgradeabilityKey: "hard_fork",
    l1DependencyKey: "core_protocol",
    sources: [
      {
        label: "Keys in proof-of-stake Ethereum",
        url: "https://ethereum.org/developers/docs/consensus-mechanisms/pos/keys/",
      },
      {
        label: "EIP-7002",
        url: "https://eips.ethereum.org/EIPS/eip-7002",
      },
    ],
  },
  {
    slug: "arbitrum-one",
    name: "Arbitrum One",
    category: "L2",
    affectedLayer: "Rollup settlement",
    signatureScheme: "Ethereum-compatible transaction flow on an EVM-equivalent rollup stack.",
    publicKeyExposure:
      "Users still expose keys through normal EOA spending patterns, while transaction data is sequenced and posted to Ethereum.",
    upgradeability:
      "Arbitrum can iterate faster than L1, but upgrades still have to respect sequencer, bridge, and dispute-protocol coordination.",
    l1Dependency: "Hard finality, data publication, and the delayed inbox all inherit Ethereum.",
    notes:
      "Arbitrum is more operationally agile than Ethereum L1, but it is not cryptographically independent from it. The key readiness question is whether a future PQ migration reaches both user accounts and the L1 settlement path.",
    readinessSignals: [
      "Transactions can route through the Delayed Inbox on Ethereum for censorship resistance.",
      "Batches are posted to Ethereum via blobs or calldata.",
      "Hard finality depends on Ethereum confirmation and rollup assertions.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "ecdsa_eoa",
    publicKeyExposureKey: "visible_after_spend",
    upgradeabilityKey: "protocol_upgrade",
    l1DependencyKey: "inherits_l1_security",
    sources: [
      {
        label: "Inside Arbitrum Nitro",
        url: "https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro",
      },
      {
        label: "Arbitrum Docs",
        url: "https://docs.arbitrum.io/",
      },
    ],
  },
  {
    slug: "op-mainnet",
    name: "OP Mainnet",
    category: "L2",
    affectedLayer: "Rollup settlement",
    signatureScheme: "Ethereum-compatible transaction model on an OP Stack rollup.",
    publicKeyExposure:
      "User keys follow the usual EOA exposure pattern unless activity is abstracted through contract accounts.",
    upgradeability:
      "The OP Stack is easier to upgrade than Ethereum L1, but protocol changes still depend on sequencer, bridge, fault-proof, and ecosystem coordination.",
    l1Dependency: "Settlement security and ecosystem compatibility remain Ethereum-dependent.",
    notes:
      "OP Mainnet can move faster than Ethereum at the rollup layer, but its readiness ceiling is still set by Ethereum-compatible users, bridging, and L1 settlement guarantees.",
    readinessSignals: [
      "Rollup architecture gives the chain more room to iterate than L1.",
      "Ethereum remains the trust anchor for final settlement.",
      "No public post-quantum signing path is part of the default OP user flow today.",
    ],
    confidence: "Medium",
    lastReviewed: reviewDate,
    signatureSchemeKey: "ecdsa_eoa",
    publicKeyExposureKey: "visible_after_spend",
    upgradeabilityKey: "protocol_upgrade",
    l1DependencyKey: "inherits_l1_security",
    sources: [
      {
        label: "Optimism Docs",
        url: "https://docs.optimism.io/",
      },
      {
        label: "Optimism",
        url: "https://www.optimism.io/",
      },
    ],
  },
  {
    slug: "base",
    name: "Base",
    category: "L2",
    affectedLayer: "Rollup settlement",
    signatureScheme: "Ethereum-compatible transaction flow on an OP Stack Ethereum L2.",
    publicKeyExposure:
      "EOA-driven activity still exposes public keys through standard signing, even when wallet UX improves.",
    upgradeability:
      "Base can ship product and protocol changes quickly, but the security floor still depends on Ethereum and the OP Stack stack-up.",
    l1Dependency: "Settlement and broad compatibility remain tightly coupled to Ethereum.",
    notes:
      "Base pairs a modern product surface with a conventional L2 trust model. That makes it an important migration venue, but not a cryptographic escape hatch from Ethereum.",
    readinessSignals: [
      "Base explicitly positions itself as an Ethereum L2.",
      "The ecosystem is actively pushing smart-wallet UX and ERC-4337 adoption.",
      "Underlying settlement assumptions still point back to Ethereum.",
    ],
    confidence: "Medium",
    lastReviewed: reviewDate,
    signatureSchemeKey: "ecdsa_eoa",
    publicKeyExposureKey: "visible_after_spend",
    upgradeabilityKey: "protocol_upgrade",
    l1DependencyKey: "inherits_l1_security",
    sources: [
      {
        label: "Build a Base app",
        url: "https://docs.base.org/get-started/build-app",
      },
      {
        label: "Base",
        url: "https://base.org/",
      },
    ],
  },
  {
    slug: "scroll",
    name: "Scroll",
    category: "L2",
    affectedLayer: "Rollup settlement",
    signatureScheme: "Ethereum-compatible EOAs and contract accounts on a zkEVM rollup.",
    publicKeyExposure:
      "Scroll follows Ethereum-style account semantics, so ordinary EOA usage still exposes keys after spending.",
    upgradeability:
      "Rollup-level changes can move faster than L1, but prover, bridge, and Ethereum integration still constrain migration speed.",
    l1Dependency: "Settlement and exits remain anchored to Ethereum.",
    notes:
      "Scroll keeps account semantics very close to Ethereum, which is excellent for compatibility and much less helpful for avoiding quantum inheritance.",
    readinessSignals: [
      "The docs describe the same two account types as Ethereum: EOAs and contract accounts.",
      "zkEVM design preserves familiar execution semantics.",
      "A future PQ shift would still need to cross both Scroll and Ethereum layers.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "ecdsa_eoa",
    publicKeyExposureKey: "visible_after_spend",
    upgradeabilityKey: "protocol_upgrade",
    l1DependencyKey: "inherits_l1_security",
    sources: [
      {
        label: "Scroll technology docs",
        url: "https://docs.scroll.io/en/technology/",
      },
      {
        label: "Scroll accounts",
        url: "https://docs.scroll.io/en/technology/chain/accounts/",
      },
    ],
  },
  {
    slug: "zksync-era",
    name: "zkSync Era",
    category: "L2",
    affectedLayer: "Rollup settlement",
    signatureScheme: "Native account-abstraction stack with contract-based accounts still settling into Ethereum.",
    publicKeyExposure:
      "Native account abstraction can mediate signer exposure, but many user flows still connect to classical keys and Ethereum-compatible exits.",
    upgradeability:
      "zkSync has more room than a plain EOA rollup to evolve transaction logic, though prover, protocol, and L1 coordination still matter.",
    l1Dependency: "Security and exits still inherit Ethereum.",
    notes:
      "zkSync is one of the clearest signals that account abstraction can improve migration flexibility. PQBEAT still treats it as exposed overall because the chain remains in the Ethereum settlement family and not yet on PQ-safe signatures.",
    readinessSignals: [
      "The protocol documents account abstraction as native rather than bolted on.",
      "Contract-based account logic creates more room for signature agility.",
      "L1 anchoring still limits how independent a full migration can be.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "smart_account_stack",
    publicKeyExposureKey: "mediated_or_selective",
    upgradeabilityKey: "protocol_upgrade",
    l1DependencyKey: "inherits_l1_security",
    sources: [
      {
        label: "zkSync account abstraction",
        url: "https://docs.zksync.io/zksync-protocol/account-abstraction",
      },
      {
        label: "zkSync Docs",
        url: "https://docs.zksync.io/",
      },
    ],
  },
  {
    slug: "safe-smart-accounts",
    name: "Safe Smart Accounts",
    category: "Wallet",
    affectedLayer: "Smart-account wallets",
    signatureScheme: "Contract accounts verified through owner policies and contract signature standards such as EIP-1271.",
    publicKeyExposure:
      "Contract mediation reduces direct exposure of a single hot signer, though many deployments still use classical owner keys underneath.",
    upgradeability:
      "Modules, policies, and contract-based account logic provide a better migration surface than plain EOAs.",
    l1Dependency: "Still deeply tied to Ethereum-compatible settlement and signer ecosystems.",
    notes:
      "Safe is not post-quantum today, but it is one of the strongest examples of why smart accounts matter. They give teams a place to swap signer policy, permissions, and recovery flows without rewriting Ethereum from scratch.",
    readinessSignals: [
      "Safe explicitly frames EOAs as limited and pushes modular smart-account infrastructure.",
      "EIP-1271 standardizes contract signature validation for smart-wallet flows.",
      "Owner policies can evolve faster than Ethereum EOAs can.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "contract_owners",
    publicKeyExposureKey: "mediated_or_selective",
    upgradeabilityKey: "contract_upgrade",
    l1DependencyKey: "strong_eth_dependency",
    sources: [
      {
        label: "What is Safe?",
        url: "https://docs.safe.global/home/what-is-safe",
      },
      {
        label: "EIP-1271",
        url: "https://eips.ethereum.org/EIPS/eip-1271",
      },
    ],
  },
  {
    slug: "base-account",
    name: "Base Account",
    category: "Wallet",
    affectedLayer: "Smart-account wallets",
    signatureScheme: "ERC-4337 smart-wallet account layer with passkey-first UX and multi-chain deployment.",
    publicKeyExposure:
      "The contract account can mediate how signers are used, even though the system is still built on classical cryptography today.",
    upgradeability:
      "Because the account layer is contract-backed and SDK-driven, it can adopt new signing and policy logic faster than EOAs.",
    l1Dependency: "Strong dependency on Ethereum-compatible chains and ERC-4337 infrastructure.",
    notes:
      "Base Account is one of the clearest product examples of the migration surface Ethereum likely needs: smart-wallet accounts, flexible authentication, and programmable transaction policy. That is readiness leverage, not proof of post-quantum safety.",
    readinessSignals: [
      "Base says each account is an ERC-4337 smart wallet.",
      "The product uses passkeys for universal sign-on and multi-chain support.",
      "The account layer can change faster than Ethereum's native EOA format.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "smart_account_stack",
    publicKeyExposureKey: "mediated_or_selective",
    upgradeabilityKey: "contract_upgrade",
    l1DependencyKey: "strong_eth_dependency",
    sources: [
      {
        label: "Base Account overview",
        url: "https://docs.base.org/base-account/overview/what-is-base-account",
      },
      {
        label: "ERC-4337",
        url: "https://eips.ethereum.org/EIPS/eip-4337",
      },
    ],
  },
  {
    slug: "metamask-wallet",
    name: "MetaMask Wallet Stack",
    category: "Wallet",
    affectedLayer: "Smart-account wallets",
    signatureScheme: "Mixed wallet stack: large EOA surface area plus growing smart-account and delegated-permissions tooling.",
    publicKeyExposure:
      "Legacy and mainstream usage still revolves around Ethereum-style signing, so public keys are commonly exposed after spending.",
    upgradeability:
      "Wallet software can move quickly, but durable PQ readiness still depends on the chains, standards, and account types it supports.",
    l1Dependency: "Strong dependency on Ethereum account semantics across the EVM ecosystem.",
    notes:
      "MetaMask is strategically important because it sits close to users and now documents smart accounts alongside the legacy wallet. PQBEAT treats it as more flexible than a pure EOA wallet, but still far from a post-quantum endpoint.",
    readinessSignals: [
      "MetaMask now documents Smart Accounts Kit alongside the wallet stack.",
      "The wallet surface can adopt new UX and account types faster than L1.",
      "The installed base still depends heavily on classical Ethereum signing.",
    ],
    confidence: "Medium",
    lastReviewed: reviewDate,
    signatureSchemeKey: "mixed_wallet_stack",
    publicKeyExposureKey: "visible_after_spend",
    upgradeabilityKey: "software_update",
    l1DependencyKey: "strong_eth_dependency",
    sources: [
      {
        label: "MetaMask wallet docs",
        url: "https://docs.metamask.io/wallet/",
      },
      {
        label: "MetaMask developer docs",
        url: "https://docs.metamask.io/",
      },
    ],
  },
  {
    slug: "metamask-infura-services",
    name: "MetaMask / Infura Services",
    category: "Infrastructure",
    affectedLayer: "Transaction infrastructure",
    signatureScheme: "Indirect dependence on Ethereum cryptography through RPC, APIs, and transaction-serving infrastructure.",
    publicKeyExposure:
      "The service layer has limited direct signer exposure unless paired with wallet products or embedded accounts.",
    upgradeability:
      "Service software can adopt new transaction formats, APIs, and compatibility layers relatively quickly.",
    l1Dependency: "Strong dependency on Ethereum and EVM demand, formats, and standards.",
    notes:
      "Infra is not where quantum risk originates, but it is where migration speed can succeed or fail. MetaMask Services and Infura are low direct risk, high leverage systems for any future account-format transition.",
    readinessSignals: [
      "The services layer spans Ethereum and multiple L2 networks.",
      "API products can roll out support for new transaction flows quickly.",
      "Readiness here is mostly about ecosystem enablement rather than signer safety.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "infra_indirect",
    publicKeyExposureKey: "limited_direct",
    upgradeabilityKey: "software_update",
    l1DependencyKey: "strong_eth_dependency",
    sources: [
      {
        label: "MetaMask Services",
        url: "https://docs.metamask.io/services/",
      },
      {
        label: "Infura",
        url: "https://www.infura.io/",
      },
    ],
  },
  {
    slug: "alchemy-account-kit",
    name: "Alchemy Account Kit & Bundler",
    category: "Infrastructure",
    affectedLayer: "Transaction infrastructure",
    signatureScheme: "ERC-4337-oriented wallet and bundler infrastructure rather than a base-layer signature system.",
    publicKeyExposure:
      "Direct signer exposure is limited because the platform mainly mediates smart-wallet creation and UserOperation flow.",
    upgradeability:
      "Bundler, paymaster, and SDK infrastructure can adopt new standards faster than chains and end-user accounts can.",
    l1Dependency: "Strong Ethereum dependency because ERC-4337 and EVM compatibility define the product surface.",
    notes:
      "Alchemy is one of the clearest examples of infra that could accelerate a migration even while remaining low direct risk itself. The important readiness signal is support for smart-wallet transaction flows, not native PQ cryptography.",
    readinessSignals: [
      "Alchemy documents smart wallets and bundler infrastructure around ERC-4337.",
      "Infrastructure can add compatibility for new account types quickly.",
      "The stack still depends on classical cryptography unless the wallets above it change.",
    ],
    confidence: "High",
    lastReviewed: reviewDate,
    signatureSchemeKey: "infra_indirect",
    publicKeyExposureKey: "limited_direct",
    upgradeabilityKey: "software_update",
    l1DependencyKey: "strong_eth_dependency",
    sources: [
      {
        label: "Alchemy Smart Wallets",
        url: "https://www.alchemy.com/docs/wallets/",
      },
      {
        label: "ERC-4337",
        url: "https://eips.ethereum.org/EIPS/eip-4337",
      },
    ],
  },
];

export const scoredEntities: ScoredEntity[] = entities
  .map(scoreEntity)
  .sort((left, right) => right.risk.score - left.risk.score || left.name.localeCompare(right.name));

export function getDashboardSnapshot(data: ScoredEntity[]): DashboardSnapshot {
  const distribution = data.reduce(
    (totals, entity) => {
      totals[entity.risk.level] += 1;
      return totals;
    },
    {
      Low: 0,
      Medium: 0,
      High: 0,
    },
  );

  const vulnerableCount = data.filter((entity) => entity.risk.level !== "Low").length;

  return {
    entitiesTracked: data.length,
    quantumVulnerablePct: Math.round((vulnerableCount / data.length) * 100),
    highRiskCount: distribution.High,
    trackedCategories: new Set(data.map((entity) => entity.category)).size,
    distribution,
    watchlist: data.slice(0, 4),
  };
}

export const dashboardSnapshot = getDashboardSnapshot(scoredEntities);
