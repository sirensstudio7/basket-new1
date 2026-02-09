import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, User, LogOut, ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const stats = [
  { label: "Games", value: "42" },
  { label: "PPG", value: "18.5" },
  { label: "APG", value: "6.2" },
  { label: "RPG", value: "7.8" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100dvh] bg-background p-4 pb-24">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate("/home")} className="flex h-10 w-10 items-center justify-center text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-center text-4xl text-foreground">PROFILE</h1>
        <button onClick={() => navigate("/")} className="flex h-10 w-10 items-center justify-center text-muted-foreground">
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <Avatar className="mb-4 h-24 w-24 border-4 border-primary">
          <AvatarFallback className="bg-card text-3xl text-foreground">
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-3xl text-foreground">AHMAD RIZKY</h2>
        <p className="mb-1 text-muted-foreground">Point Guard</p>
        <p className="mb-8 text-sm text-primary">Jakarta, Indonesia</p>

        {/* Stats Grid */}
        <div className="mb-8 grid w-full max-w-md grid-cols-2 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex flex-col items-center py-5">
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex w-full max-w-md gap-4">
          <Button
            variant="outline"
            className="flex-1 rounded-full border-border py-6 text-foreground hover:bg-card"
          >
            Edit Profile
          </Button>
          <Button
            onClick={() => navigate("/stats")}
            className="flex-1 rounded-full bg-primary py-6 text-primary-foreground hover:bg-primary/90"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Stats
          </Button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Profile;
