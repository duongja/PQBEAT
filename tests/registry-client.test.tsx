import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RegistryClient } from "@/components/registry-client";
import { scoredEntities } from "@/lib/data";

describe("RegistryClient", () => {
  it("updates the desktop evidence panel when filtering and selecting entities", async () => {
    const user = userEvent.setup();

    render(<RegistryClient entities={scoredEntities} />);

    const evidencePanel = screen.getByLabelText(/selected entity evidence panel/i);

    await user.type(screen.getByPlaceholderText(/validator, rollup, smart account, bundler/i), "Alchemy");

    expect(screen.getAllByText(/Alchemy Account Kit & Bundler/)).not.toHaveLength(0);
    expect(screen.queryAllByText(/Ethereum Execution Accounts/)).toHaveLength(0);
    expect(evidencePanel).toHaveTextContent("Alchemy Account Kit & Bundler");

    await user.click(screen.getAllByText(/Alchemy Account Kit & Bundler/)[0]!);

    expect(evidencePanel).toHaveTextContent("Technical Breakdown");
    expect(evidencePanel).toHaveTextContent("Readiness Signals");
    expect(evidencePanel).toHaveTextContent("Source Intelligence");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  }, 15000);

  it("falls back to the first visible entity when filters remove the current selection", async () => {
    const user = userEvent.setup();

    render(<RegistryClient entities={scoredEntities} />);

    const evidencePanel = screen.getByLabelText(/selected entity evidence panel/i);

    await user.type(screen.getByPlaceholderText(/validator, rollup, smart account, bundler/i), "Alchemy");
    expect(evidencePanel).toHaveTextContent("Alchemy Account Kit & Bundler");

    await user.clear(screen.getByPlaceholderText(/validator, rollup, smart account, bundler/i));
    await user.click(screen.getAllByRole("button", { name: /consensus/i })[0]!);

    expect(evidencePanel).toHaveTextContent("Ethereum Validators");
    expect(evidencePanel).not.toHaveTextContent("Alchemy Account Kit & Bundler");
  }, 15000);

  it("opens the mobile detail drawer", async () => {
    const user = userEvent.setup();

    render(<RegistryClient entities={scoredEntities} />);

    const viewButtons = screen.getAllByRole("button", { name: /view details/i });

    await user.click(viewButtons[0]);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/confidence score/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/source intelligence/i)).toBeInTheDocument();
  }, 10000);
});
