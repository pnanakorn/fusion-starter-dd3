import { LeftPanel } from "@/components/login/LeftPanel";
import { RightPanel } from "@/components/login/RightPanel";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
