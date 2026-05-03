import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { PlayerBar } from "@/components/PlayerBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex gap-0 pb-24">
        <Sidebar />
        <main className="flex-1 m-2 rounded-xl overflow-hidden bg-gradient-to-b from-surface-elevated/60 via-background to-background min-h-[calc(100vh-104px)]">
          <TopBar />
          {children}
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}
