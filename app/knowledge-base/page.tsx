import { KnowledgeBaseIndex } from "@/components/knowledge-base-index";
import { SiteNavbar } from "@/components/site-navbar";
import { knowledgeBaseResources } from "@/lib/knowledge-base";

export const metadata = {
  title: "Knowledge Base",
};

export default function KnowledgeBasePage() {
  return (
    <>
      <SiteNavbar />
      <KnowledgeBaseIndex resources={knowledgeBaseResources} />
    </>
  );
}
