import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogIndexPage from "@/app/blog/page";
import KnowledgeBasePage from "@/app/knowledge-base/page";
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

    expect(screen.getByRole("heading", { name: /where quantum risk actually shows up in ethereum/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /eoas are still the obvious weak spot/i })).toBeInTheDocument();
  });

  it("renders the blog index from static content", () => {
    render(<BlogIndexPage />);

    expect(
      screen.getByRole("heading", {
        name: /weekly research notes on ethereum quantum risk/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/where quantum risk actually shows up in ethereum/i)).not.toHaveLength(0);
    expect(screen.getByText(/get the weekly pqbeat note/i)).toBeInTheDocument();
  });

  it("renders the knowledge base from static content", () => {
    render(<KnowledgeBasePage />);

    expect(screen.getByRole("heading", { name: /knowledge base/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search threads and notes/i)).toBeInTheDocument();
    expect(screen.getByText(/separator-based participation commitments/i)).toBeInTheDocument();
  });
});
