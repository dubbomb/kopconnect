import { KopConnect } from "@/components/kop-connect";
import { completedDeals, transferTargets, verifiedFixtures, verifiedStories } from "@/lib/verified-data";

export default function Page() {
  return <KopConnect initialStories={[...verifiedStories].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))} initialFixtures={verifiedFixtures} transferTargets={transferTargets} completedDeals={completedDeals} />;
}
