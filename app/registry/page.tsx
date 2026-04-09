import { RegistryClient } from "@/components/registry-client";
import { scoredEntities } from "@/lib/data";

export const metadata = {
  title: "Registry",
};

export default function RegistryPage() {
  return <RegistryClient entities={scoredEntities} />;
}
