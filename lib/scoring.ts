import type {
  Entity,
  L1DependencyKey,
  PublicKeyExposureKey,
  RiskBreakdown,
  RiskLevel,
  ScoredEntity,
  SignatureSchemeKey,
  UpgradeabilityKey,
} from "@/lib/types";

const signatureSchemeWeights: Record<SignatureSchemeKey, number> = {
  ecdsa_eoa: 40,
  bls_validator: 38,
  contract_owners: 30,
  smart_account_stack: 22,
  mixed_wallet_stack: 28,
  infra_indirect: 12,
};

const publicKeyExposureWeights: Record<PublicKeyExposureKey, number> = {
  frequent_onchain: 25,
  visible_after_spend: 20,
  mediated_or_selective: 12,
  limited_direct: 4,
};

const upgradeabilityWeights: Record<UpgradeabilityKey, number> = {
  hard_fork: 20,
  protocol_upgrade: 16,
  contract_upgrade: 8,
  software_update: 4,
};

const l1DependencyWeights: Record<L1DependencyKey, number> = {
  core_protocol: 15,
  inherits_l1_security: 15,
  strong_eth_dependency: 12,
};

export const rubricRows = [
  {
    label: "Signature scheme",
    weight: "0-40",
    description:
      "How directly the entity depends on quantum-vulnerable Ethereum-style signature assumptions.",
  },
  {
    label: "Public key exposure",
    weight: "0-25",
    description:
      "Whether public keys are routinely exposed onchain or shielded behind contract or service layers.",
  },
  {
    label: "Upgrade flexibility",
    weight: "0-20",
    description:
      "How much coordination is needed to rotate toward post-quantum cryptography if the threat window tightens.",
  },
  {
    label: "L1 dependency",
    weight: "0-15",
    description:
      "How much the entity inherits Ethereum's cryptographic constraints even if it can change faster at the application layer.",
  },
] as const;

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 33) {
    return "Low";
  }

  if (score <= 66) {
    return "Medium";
  }

  return "High";
}

export function getRiskBreakdown(entity: Entity): RiskBreakdown {
  return {
    signatureScheme: signatureSchemeWeights[entity.signatureSchemeKey],
    publicKeyExposure: publicKeyExposureWeights[entity.publicKeyExposureKey],
    upgradeability: upgradeabilityWeights[entity.upgradeabilityKey],
    l1Dependency: l1DependencyWeights[entity.l1DependencyKey],
  };
}

export function scoreEntity(entity: Entity): ScoredEntity {
  const breakdown = getRiskBreakdown(entity);
  const score = Object.values(breakdown).reduce((total, value) => total + value, 0);

  return {
    ...entity,
    risk: {
      score,
      level: getRiskLevel(score),
      breakdown,
    },
  };
}
