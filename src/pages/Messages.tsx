import BottomNav from "@/components/BottomNav";

const Messages = () => (
  <div className="flex min-h-[100dvh] flex-col p-4 pb-24">
    <h1 className="text-2xl font-semibold">Messages</h1>
    <p className="mt-2 text-muted-foreground">Your messages will appear here.</p>
    <BottomNav />
  </div>
);

export default Messages;
