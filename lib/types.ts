export type Category = "L1" | "Consensus" | "L2" | "Wallet" | "Infrastructure";

export type RiskLevel = "Low" | "Medium" | "High";

export type Confidence = "High" | "Medium" | "Exploratory";

export type SourceLink = {
  label: string;
  url: string;
};

export type SignatureSchemeKey =
  | "ecdsa_eoa"
  | "bls_validator"
  | "contract_owners"
  | "smart_account_stack"
  | "mixed_wallet_stack"
  | "infra_indirect";

export type PublicKeyExposureKey =
  | "frequent_onchain"
  | "visible_after_spend"
  | "mediated_or_selective"
  | "limited_direct";

export type UpgradeabilityKey =
  | "hard_fork"
  | "protocol_upgrade"
  | "contract_upgrade"
  | "software_update";

export type L1DependencyKey =
  | "core_protocol"
  | "inherits_l1_security"
  | "strong_eth_dependency";

export type Entity = {
  slug: string;
  name: string;
  category: Category;
  affectedLayer: string;
  signatureScheme: string;
  publicKeyExposure: string;
  upgradeability: string;
  l1Dependency: string;
  notes: string;
  readinessSignals: string[];
  sources: SourceLink[];
  confidence: Confidence;
  lastReviewed: string;
  signatureSchemeKey: SignatureSchemeKey;
  publicKeyExposureKey: PublicKeyExposureKey;
  upgradeabilityKey: UpgradeabilityKey;
  l1DependencyKey: L1DependencyKey;
};

export type RiskBreakdown = {
  signatureScheme: number;
  publicKeyExposure: number;
  upgradeability: number;
  l1Dependency: number;
};

export type RiskScore = {
  score: number;
  level: RiskLevel;
  breakdown: RiskBreakdown;
};

export type ScoredEntity = Entity & {
  risk: RiskScore;
};

export type BenchmarkEntry = {
  algorithm: string;
  signatureSize: string;
  performanceNote: string;
  ethereumImpact: string;
  maturityNote: string;
};

export type DashboardSnapshot = {
  entitiesTracked: number;
  quantumVulnerablePct: number;
  highRiskCount: number;
  trackedCategories: number;
  distribution: Record<RiskLevel, number>;
  watchlist: ScoredEntity[];
};
