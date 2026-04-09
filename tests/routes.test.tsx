import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import RegistryPage from "@/app/registry/page";
import QuantumRiskExplainerPage from "@/app/learn/quantum-risk-in-ethereum/page";

describe("route smoke tests", () => {
  it("renders the overview page from static content", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /tracking quantum readiness across the ethereum stack/i })).toBeInTheDocument();
    expect(screen.getByText(/archive intelligence v2.4/i)).toBeInTheDocument();
    expect(screen.getByText(/ecosystem breakdown/i)).toBeInTheDocument();
  });

  it("renders the registry page from static content", () => {
    render(<RegistryPage />);

    expect(screen.getByRole("heading", { name: /post-quantum resilience index/i })).toBeInTheDocument();
    expect(screen.getByText(/registry directory/i)).toBeInTheDocument();
  });

  it("renders the explainer page from static content", () => {
    render(<QuantumRiskExplainerPage />);

    expect(screen.getByRole("heading", { name: /post-quantum readiness: the ethereum transition/i })).toBeInTheDocument();
    expect(screen.getByText(/execution accounts: the path to abstraction/i)).toBeInTheDocument();
  });
});
