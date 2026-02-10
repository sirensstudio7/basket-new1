import BottomNav from "@/components/BottomNav";

const Notifications = () => (
  <div className="flex min-h-[100dvh] flex-col p-4 pb-24">
    <h1 className="text-2xl font-semibold">Notifications</h1>
    <p className="mt-2 text-muted-foreground">Your notifications will appear here.</p>
    <BottomNav />
  </div>
);

export default Notifications;
