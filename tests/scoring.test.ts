import { describe, expect, it } from "vitest";
import { dashboardSnapshot, scoredEntities } from "@/lib/data";
import { getRiskLevel } from "@/lib/scoring";

describe("risk scoring", () => {
  it("maps thresholds into the intended labels", () => {
    expect(getRiskLevel(33)).toBe("Low");
    expect(getRiskLevel(34)).toBe("Medium");
    expect(getRiskLevel(66)).toBe("Medium");
    expect(getRiskLevel(67)).toBe("High");
  });

  it("computes the expected risk score for Ethereum execution accounts", () => {
    const ethereumExecution = scoredEntities.find((entity) => entity.slug === "ethereum-execution");

    expect(ethereumExecution).toBeDefined();
    expect(ethereumExecution?.risk.score).toBe(95);
    expect(ethereumExecution?.risk.level).toBe("High");
    expect(ethereumExecution?.risk.breakdown).toEqual({
      signatureScheme: 40,
      publicKeyExposure: 20,
      upgradeability: 20,
      l1Dependency: 15,
    });
  });

  it("derives dashboard metrics from the registry data", () => {
    const totalFromDistribution = Object.values(dashboardSnapshot.distribution).reduce(
      (sum, count) => sum + count,
      0,
    );
    const vulnerableCount = scoredEntities.filter((entity) => entity.risk.level !== "Low").length;

    expect(dashboardSnapshot.entitiesTracked).toBe(scoredEntities.length);
    expect(totalFromDistribution).toBe(scoredEntities.length);
    expect(dashboardSnapshot.highRiskCount).toBe(dashboardSnapshot.distribution.High);
    expect(dashboardSnapshot.quantumVulnerablePct).toBe(
      Math.round((vulnerableCount / scoredEntities.length) * 100),
    );
  });

  it("shows smart-account systems as more adaptable than pure EOAs", () => {
    const safe = scoredEntities.find((entity) => entity.slug === "safe-smart-accounts");
    const alchemy = scoredEntities.find((entity) => entity.slug === "alchemy-account-kit");

    expect(safe?.risk.level).toBe("Medium");
    expect(alchemy?.risk.level).toBe("Low");
  });
});
