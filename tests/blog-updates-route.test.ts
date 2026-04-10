import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/blog-updates/route";
import { getBlogSubscribersCollection } from "@/lib/mongodb";

vi.mock("@/lib/mongodb", () => ({
  getBlogSubscribersCollection: vi.fn(),
}));

describe("blog updates route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects invalid email addresses", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/blog-updates", {
        method: "POST",
        body: JSON.stringify({ email: "not-an-email" }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ message: "Enter a valid email address." });
    expect(getBlogSubscribersCollection).not.toHaveBeenCalled();
  });

  it("upserts a new subscriber", async () => {
    const updateOne = vi.fn().mockResolvedValue({ matchedCount: 0, upsertedCount: 1 });

    vi.mocked(getBlogSubscribersCollection).mockResolvedValue({
      updateOne,
    } as Awaited<ReturnType<typeof getBlogSubscribersCollection>>);

    const response = await POST(
      new Request("http://localhost:3000/api/blog-updates", {
        method: "POST",
        body: JSON.stringify({ email: "Reader@Example.com " }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    expect(response.status).toBe(200);
    expect(updateOne).toHaveBeenCalledWith(
      { email: "reader@example.com" },
      expect.objectContaining({
        $set: expect.objectContaining({
          source: "pqbeat-blog",
        }),
        $setOnInsert: expect.objectContaining({
          email: "reader@example.com",
        }),
      }),
      { upsert: true },
    );
    await expect(response.json()).resolves.toEqual({
      message: "Thanks. You’ll receive PQBEAT’s weekly blog updates at this address.",
    });
  });

  it("returns a friendly response for an existing subscriber", async () => {
    const updateOne = vi.fn().mockResolvedValue({ matchedCount: 1, upsertedCount: 0 });

    vi.mocked(getBlogSubscribersCollection).mockResolvedValue({
      updateOne,
    } as Awaited<ReturnType<typeof getBlogSubscribersCollection>>);

    const response = await POST(
      new Request("http://localhost:3000/api/blog-updates", {
        method: "POST",
        body: JSON.stringify({ email: "reader@example.com" }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      message: "This email is already receiving PQBEAT’s weekly blog updates.",
    });
  });
});
