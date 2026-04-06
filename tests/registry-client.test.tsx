import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RegistryClient } from "@/components/registry-client";
import { scoredEntities } from "@/lib/data";

describe("RegistryClient", () => {
  it("filters entities and opens the detail drawer", async () => {
    const user = userEvent.setup();

    render(<RegistryClient entities={scoredEntities} />);

    await user.type(screen.getByPlaceholderText(/validator, rollup, smart account, bundler/i), "Alchemy");

    expect(screen.getAllByText(/Alchemy Account Kit & Bundler/)).not.toHaveLength(0);
    expect(screen.queryAllByText(/Ethereum Execution Accounts/)).toHaveLength(0);

    await user.click(screen.getAllByRole("button", { name: /view details/i })[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveTextContent("Alchemy Account Kit & Bundler");
    expect(screen.getByRole("dialog")).toHaveTextContent("Confidence: High");
    expect(screen.getByRole("dialog")).toHaveTextContent("Transaction infrastructure");
  });

  it("combines category and risk filters", async () => {
    const user = userEvent.setup();

    render(<RegistryClient entities={scoredEntities} />);

    await user.selectOptions(screen.getByLabelText(/category/i), "Infrastructure");
    await user.selectOptions(screen.getByLabelText(/^risk$/i), "Low");

    expect(screen.getAllByText(/MetaMask \/ Infura Services/)).not.toHaveLength(0);
    expect(screen.getAllByText(/Alchemy Account Kit & Bundler/)).not.toHaveLength(0);
    expect(screen.queryAllByText(/MetaMask Wallet Stack/)).toHaveLength(0);
  });
});
