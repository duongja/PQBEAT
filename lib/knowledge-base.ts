export type KnowledgeBaseCategory = "Threads" | "Updates";

export type KnowledgeBaseResource = {
  slug: string;
  title: string;
  summary: string;
  category: KnowledgeBaseCategory;
  kind: string;
  source: string;
  dateLabel?: string;
  url: string;
  tags: string[];
};

export const knowledgeBaseContributionUrl = "https://github.com/duongja/PQBEAT/issues/new";

export const knowledgeBaseCategories = ["All", "Threads", "Updates"] as const;

export const knowledgeBaseResources: readonly KnowledgeBaseResource[] = [
  {
    slug: "separator-based-participation-commitments",
    title: "Separator-Based Participation Commitments for Post-Quantum Attestation Aggregation",
    summary:
      "A thread on how post-quantum attestation aggregation could preserve clearer validator participation commitments at the consensus layer.",
    category: "Threads",
    kind: "Thread",
    source: "EthResearch",
    url: "https://ethresear.ch/t/separator-based-participation-commitments-for-post-quantum-attestation-aggregation/24622",
    tags: ["consensus", "attestations", "aggregation"],
  },
  {
    slug: "no-signatures-at-all",
    title: "What If Post-Quantum Ethereum Doesn't Need Signatures at All?",
    summary:
      "A more radical line of inquiry that asks whether parts of Ethereum's post-quantum path could move away from signature-heavy assumptions altogether.",
    category: "Threads",
    kind: "Thread",
    source: "EthResearch",
    url: "https://ethresear.ch/t/what-if-post-quantum-ethereum-doesn-t-need-signatures-at-all/24427",
    tags: ["architecture", "signatures", "protocol"],
  },
  {
    slug: "privacy-threats-comment",
    title: "Post-Quantum Threats to Ethereum Privacy",
    summary:
      "A focused privacy discussion on how quantum capability changes the threat model around exposure, metadata, and private transaction systems.",
    category: "Threads",
    kind: "Reply",
    source: "EthResearch",
    url: "https://ethresear.ch/t/post-quantum-threats-to-ethereum-privacy/24450/3",
    tags: ["privacy", "threat model", "research"],
  },
  {
    slug: "migration-strategies-for-eoas",
    title: "Migration Strategies for EOAs Under the Quantum Threat: Breakages and Open Questions",
    summary:
      "A practical discussion of the breakages and open questions involved in moving legacy EOAs onto safer execution paths.",
    category: "Threads",
    kind: "Reply",
    source: "EthResearch",
    url: "https://ethresear.ch/t/migration-strategies-for-eoas-under-the-quantum-threat-breakages-and-open-questions/23864/5",
    tags: ["eoa", "migration", "wallets"],
  },
  {
    slug: "road-to-post-quantum-transactions-aa",
    title: "The Road to Post-Quantum Ethereum Transaction Is Paved With Account Abstraction (AA)",
    summary:
      "An account-abstraction-oriented perspective on how transaction flow may need to evolve before post-quantum execution becomes practical.",
    category: "Threads",
    kind: "Reply",
    source: "EthResearch",
    url: "https://ethresear.ch/t/the-road-to-post-quantum-ethereum-transaction-is-paved-with-account-abstraction-aa/21783/2",
    tags: ["account abstraction", "transactions", "execution"],
  },
  {
    slug: "lattice-based-signature-aggregation",
    title: "Lattice-Based Signature Aggregation",
    summary:
      "Notes around aggregation strategies for lattice-based signatures, which matters directly for scaling any heavier post-quantum validation path.",
    category: "Threads",
    kind: "Reply",
    source: "EthResearch",
    url: "https://ethresear.ch/t/lattice-based-signature-aggregation/22282/7",
    tags: ["lattice", "aggregation", "signatures"],
  },
  {
    slug: "revisiting-falcon-signature-aggregation",
    title: "Revisiting Falcon Signature Aggregation for PQ Mempools",
    summary:
      "A narrower thread on Falcon-specific aggregation tradeoffs in a mempool context, where size and verification cost matter immediately.",
    category: "Threads",
    kind: "Thread",
    source: "EthResearch",
    url: "https://ethresear.ch/t/revisiting-falcon-signature-aggregation-for-pq-mempools/24431",
    tags: ["falcon", "mempools", "aggregation"],
  },
  {
    slug: "signature-free-rlpx-handshake",
    title: "Exploring Signature-Free Post-Quantum RLPx Handshake",
    summary:
      "A networking-focused discussion on whether Ethereum's peer handshake can be redesigned to avoid fragile post-quantum signature assumptions.",
    category: "Threads",
    kind: "Thread",
    source: "EthResearch",
    url: "https://ethresear.ch/t/exploring-signature-free-post-quantum-rlpx-handshake/24413",
    tags: ["networking", "rlpx", "handshake"],
  },
  {
    slug: "ephemeral-key-pairs-account-abstraction",
    title: "Achieving Quantum Safety Through Ephemeral Key Pairs and Account Abstraction",
    summary:
      "A wallet-focused proposal for rotating ECDSA keys on each transaction so long-lived public-key exposure stops compounding over time.",
    category: "Threads",
    kind: "Thread",
    source: "EthResearch",
    url: "https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273",
    tags: ["wallets", "account abstraction", "execution"],
  },
  {
    slug: "etherealize-x-post",
    title: "Etherealize X post",
    summary:
      "A shorter external signal from Etherealize that we want on hand alongside the longer research threads.",
    category: "Updates",
    kind: "X post",
    source: "Etherealize",
    dateLabel: "Apr 2, 2026",
    url: "https://x.com/Etherealize_io/status/2039731174738714876?s=20",
    tags: ["external", "x", "signal"],
  },
];
