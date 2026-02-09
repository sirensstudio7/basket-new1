import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BottomNav from "@/components/BottomNav";
import {
  Search,
  Users,
  TrendingUp,
  MapPin,
  Star,
  BarChart3,
  ChevronRight,
  Calendar,
} from "lucide-react";

const POSITIONS = ["all", "PG", "SG", "SF", "PF", "C"] as const;

const events = [
  { id: "1", title: "Jakarta Regional Cup", date: "Feb 15", location: "Jakarta", type: "Tournament" },
  { id: "2", title: "Scouting Combine", date: "Feb 22", location: "Bandung", type: "Combine" },
  { id: "3", title: "National Championship", date: "Mar 8", location: "Surabaya", type: "Tournament" },
];

const players = [
  {
    id: "1",
    name: "Ahmad Rizky",
    position: "PG",
    fullPosition: "Point Guard",
    location: "Jakarta",
    initials: "AR",
    ppg: 18.5,
    apg: 6.2,
    rpg: 7.8,
    height: "6'1\"",
    games: 42,
    featured: true,
  },
  {
    id: "2",
    name: "Budi Santoso",
    position: "SG",
    fullPosition: "Shooting Guard",
    location: "Bandung",
    initials: "BS",
    ppg: 22.1,
    apg: 3.4,
    rpg: 4.2,
    height: "6'3\"",
    games: 38,
    featured: true,
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    position: "SF",
    fullPosition: "Small Forward",
    location: "Surabaya",
    initials: "CR",
    ppg: 15.8,
    apg: 4.1,
    rpg: 8.5,
    height: "6'5\"",
    games: 40,
    featured: false,
  },
  {
    id: "4",
    name: "Dimas Pratama",
    position: "PF",
    fullPosition: "Power Forward",
    location: "Yogyakarta",
    initials: "DP",
    ppg: 12.3,
    apg: 2.1,
    rpg: 11.2,
    height: "6'7\"",
    games: 35,
    featured: false,
  },
  {
    id: "5",
    name: "Eko Wijaya",
    position: "C",
    fullPosition: "Center",
    location: "Medan",
    initials: "EW",
    ppg: 14.6,
    apg: 1.8,
    rpg: 13.4,
    height: "6'10\"",
    games: 39,
    featured: true,
  },
  {
    id: "6",
    name: "Fajar Nugroho",
    position: "PG",
    fullPosition: "Point Guard",
    location: "Semarang",
    initials: "FN",
    ppg: 16.2,
    apg: 7.1,
    rpg: 3.9,
    height: "5'11\"",
    games: 41,
    featured: false,
  },
  {
    id: "7",
    name: "Gita Permata",
    position: "SG",
    fullPosition: "Shooting Guard",
    location: "Bali",
    initials: "GP",
    ppg: 19.4,
    apg: 2.8,
    rpg: 5.1,
    height: "6'2\"",
    games: 36,
    featured: false,
  },
  {
    id: "8",
    name: "Hendra Kusuma",
    position: "SF",
    fullPosition: "Small Forward",
    location: "Makassar",
    initials: "HK",
    ppg: 17.2,
    apg: 3.6,
    rpg: 6.8,
    height: "6'4\"",
    games: 44,
    featured: false,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("all");

  const filteredPlayers = players.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fullPosition.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesPosition =
      positionFilter === "all" || p.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const featuredPlayers = players.filter((p) => p.featured);

  return (
    <div className="flex h-[100dvh] min-w-0 flex-col overflow-hidden bg-background p-4">
      {/* Header */}
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl">SCOUT</CardTitle>
          <CardDescription>
            Discover and evaluate basketball talent
          </CardDescription>
        </CardHeader>
      </Card>

      <Separator className="my-4" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center gap-2 p-3">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <CardTitle className="text-2xl">{players.length}</CardTitle>
              <CardDescription className="text-xs">Players</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center gap-2 p-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <CardTitle className="text-2xl">22.1</CardTitle>
              <CardDescription className="text-xs">Top PPG</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center gap-2 p-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <div>
              <CardTitle className="text-2xl">13.4</CardTitle>
              <CardDescription className="text-xs">Top RPG</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <div className="relative my-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, position, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 rounded-full pl-10"
        />
      </div>

      {/* Position filter - ToggleGroup */}
      <ToggleGroup
        type="single"
        value={positionFilter}
        onValueChange={(v) => v && setPositionFilter(v)}
        className="mb-4 justify-start gap-1"
      >
        {POSITIONS.map((pos) => (
          <ToggleGroupItem
            key={pos}
            value={pos}
            aria-label={`Filter by ${pos === "all" ? "all positions" : pos}`}
            className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {pos === "all" ? "All" : pos}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Separator className="mb-4" />

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-6 pb-24"
        >
          {/* Top Prospects - horizontal scroll */}
          {positionFilter === "all" && search === "" && (
            <section>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    Top Prospects
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 py-1 text-[14px] text-primary hover:bg-transparent hover:text-primary/80"
                >
                  View All
                </Button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {featuredPlayers.map((player) => (
                  <Card
                    key={player.id}
                    className="w-40 shrink-0 cursor-pointer border-primary/50 transition-colors hover:bg-muted/50"
                    onClick={() => navigate("/profile")}
                  >
                    <CardContent className="p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                            {player.initials}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="truncate font-semibold text-foreground">
                        {player.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {player.fullPosition}
                      </p>
                      <div className="mt-2 flex justify-between text-xs">
                        <span className="font-medium text-primary">
                          {player.ppg} PPG
                        </span>
                        <span className="text-muted-foreground">
                          {player.height}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All Players - 2-col grid */}
          <section className="min-w-0 w-full max-w-full">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                {positionFilter === "all" ? "All Players" : `${positionFilter}s`}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-1 text-[14px] text-primary hover:bg-transparent hover:text-primary/80"
              >
                View All
              </Button>
            </div>
            <AnimatePresence mode="popLayout">
              {filteredPlayers.length > 0 ? (
                <motion.div
                  layout
                  className="grid w-full grid-cols-2 gap-2"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredPlayers.map((player) => (
                    <motion.div
                      key={player.id}
                      layout
                      className="min-w-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className="min-w-0 max-w-full cursor-pointer overflow-hidden transition-colors hover:bg-muted/50"
                        onClick={() => navigate("/profile")}
                      >
                        <CardContent className="flex min-h-[180px] flex-col items-center justify-center gap-2 p-4 text-center">
                          <div className="relative">
                            <Avatar className="h-12 w-12 shrink-0 border-2 border-primary">
                              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                                {player.initials}
                              </AvatarFallback>
                            </Avatar>
                            {player.featured && (
                              <Star className="absolute -right-1 -top-1 h-3 w-3 fill-primary text-primary" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-foreground">
                              {player.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {player.fullPosition}
                            </p>
                            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {player.location}
                            </div>
                            <div className="mt-1 flex justify-center gap-2">
                              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                                {player.ppg} PPG
                              </Badge>
                              <Badge variant="outline" className="border-border px-1.5 py-0 text-[10px]">
                                {player.height}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  No players match your filters. Try a different search or
                  position.
                </motion.p>
              )}
            </AnimatePresence>
          </section>

          {/* Events */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Events
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-1 text-[14px] text-primary hover:bg-transparent hover:text-primary/80"
              >
                View All
              </Button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="w-44 shrink-0 cursor-pointer transition-colors hover:bg-muted/50"
                >
                  <CardContent className="p-3">
                    <Badge variant="secondary" className="mb-2 text-[10px]">
                      {event.type}
                    </Badge>
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
