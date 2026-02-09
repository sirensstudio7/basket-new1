import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";

const performanceData = [
  { game: "G1", pts: 22 },
  { game: "G2", pts: 15 },
  { game: "G3", pts: 28 },
  { game: "G4", pts: 18 },
  { game: "G5", pts: 24 },
  { game: "G6", pts: 20 },
  { game: "G7", pts: 30 },
  { game: "G8", pts: 16 },
];

const seasonData = [
  { month: "Jan", ppg: 14 },
  { month: "Feb", ppg: 16 },
  { month: "Mar", ppg: 18 },
  { month: "Apr", ppg: 17 },
  { month: "May", ppg: 20 },
  { month: "Jun", ppg: 19 },
];

const highlights = [
  { label: "Season High", value: "34 PTS", sub: "vs Surabaya Tigers" },
  { label: "Best Assists", value: "12 AST", sub: "vs Bandung Warriors" },
  { label: "Double-Doubles", value: "8", sub: "This season" },
];

const Stats = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100dvh] bg-background px-6 py-8 pb-24">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => navigate("/profile")} className="text-foreground">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-4xl text-foreground">STATS</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Points per game chart */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
              RECENT GAMES (PTS)
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={performanceData}>
                <XAxis dataKey="game" tick={{ fill: "hsl(220 10% 60%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(220 18% 14%)", border: "1px solid hsl(220 14% 22%)", borderRadius: 8, color: "#fff" }}
                />
                <Bar dataKey="pts" fill="hsl(24 100% 50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Season trend */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
              SEASON TREND (PPG)
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={seasonData}>
                <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 60%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(220 18% 14%)", border: "1px solid hsl(220 14% 22%)", borderRadius: 8, color: "#fff" }}
                />
                <Line type="monotone" dataKey="ppg" stroke="hsl(24 100% 50%)" strokeWidth={3} dot={{ fill: "hsl(24 100% 50%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Highlights */}
        <div className="space-y-3 pb-8">
          <h3 className="text-lg text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
            HIGHLIGHTS
          </h3>
          {highlights.map((h) => (
            <Card key={h.label} className="border-border bg-card">
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-muted-foreground">{h.label}</p>
                  <p className="text-xs text-muted-foreground">{h.sub}</p>
                </div>
                <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {h.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Stats;
