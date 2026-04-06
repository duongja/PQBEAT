import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import RegistryPage from "@/app/registry/page";
import QuantumRiskExplainerPage from "@/app/learn/quantum-risk-in-ethereum/page";

describe("route smoke tests", () => {
  it("renders the overview page from static content", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /track quantum readiness across the ethereum stack/i })).toBeInTheDocument();
    expect(screen.getAllByText(/tracked systems/i)).not.toHaveLength(0);
  });

  it("renders the registry page from static content", () => {
    render(<RegistryPage />);

    expect(screen.getByRole("heading", { name: /curated map of ethereum quantum readiness/i })).toBeInTheDocument();
    expect(screen.getByText(/ecosystem registry/i)).toBeInTheDocument();
  });

  it("renders the explainer page from static content", () => {
    render(<QuantumRiskExplainerPage />);

    expect(screen.getByRole("heading", { name: /quantum readiness across ethereum, layer by layer/i })).toBeInTheDocument();
    expect(screen.getByText(/execution accounts are still the biggest systemic exposure/i)).toBeInTheDocument();
  });
});
