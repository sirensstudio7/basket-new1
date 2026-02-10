import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BottomNav from "@/components/BottomNav";
import { players } from "@/data/players";
import { getCurrentUser } from "@/data/accounts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location01Icon,
  StarIcon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";

const POSITIONS = ["all", "PG", "SG", "SF", "PF", "C"] as const;

const events = [
  { id: "1", title: "Jakarta Regional Cup", date: "Feb 15", location: "Jakarta", type: "Tournament", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400" },
  { id: "2", title: "Scouting Combine", date: "Feb 22", location: "Bandung", type: "Combine", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400" },
  { id: "3", title: "National Championship", date: "Mar 8", location: "Surabaya", type: "Tournament", image: "https://images.unsplash.com/photo-1504450758481-7338bbe71bbb?w=400" },
];

const news = [
  { id: "1", title: "Rising Star: Ahmad Rizky Leads Jakarta League", date: "Feb 8", excerpt: "Point guard averages 18.5 PPG in breakthrough season...", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400" },
  { id: "2", title: "Scouting Combine 2025: What to Expect", date: "Feb 6", excerpt: "Top prospects from across Indonesia to compete...", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400" },
  { id: "3", title: "National Team Tryouts Announced", date: "Feb 4", excerpt: "Open registration for U18 and senior squads...", image: "https://images.unsplash.com/photo-1504450758481-7338bbe71bbb?w=400" },
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
    <div className="flex h-[100dvh] min-w-0 flex-col overflow-hidden bg-background p-4 pt-0">
      {/* Header + Stats + Search - grouped */}
      <div className="-mx-4 mb-4 flex shrink-0 flex-col gap-4 bg-black px-4 pb-4 pt-4">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="space-y-1 p-0">
            <CardTitle className="font-sans text-2xl font-medium normal-case text-white">
              Hi {getCurrentUser()?.name ?? "there"}, how you doing?
            </CardTitle>
            <CardDescription className="text-[14px] text-white/80">
              Discover and evaluate basketball talent
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="flex min-h-[88px] gap-2 rounded-lg bg-white/10 p-4">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
            <span className="text-3xl font-bold tabular-nums text-white">{players.length}</span>
            <span className="text-xs text-white/70">Players</span>
          </div>
          <div className="w-px shrink-0 bg-white/20" />
          <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
            <span className="text-3xl font-bold tabular-nums text-primary">22.1</span>
            <span className="text-xs text-white/70">Top PPG</span>
          </div>
          <div className="w-px shrink-0 bg-white/20" />
          <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
            <span className="text-3xl font-bold tabular-nums text-white">13.4</span>
            <span className="text-xs text-white/70">Top RPG</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-4 pb-24"
        >
          {/* Search/filter - at top of content */}
          <section>
            <div className="mb-4 flex items-center gap-[16px]">
              <div className="relative min-w-0 flex-1">
                <HugeiconsIcon icon={Search01Icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, position, or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 rounded-full border border-input bg-background pl-10"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="h-11 w-20 shrink-0 justify-center gap-1 rounded-full">
                  <SelectValue placeholder="Pos" />
                </SelectTrigger>
                <SelectContent align="end" className="min-w-0 w-16 [&>div:nth-child(2)]:min-w-0 [&>div:nth-child(2)]:w-16">
                  {POSITIONS.map((pos) => (
                    <SelectItem key={pos} value={pos} className="rounded-md">
                      {pos === "all" ? "All" : pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Top Prospects - horizontal scroll */}
          {positionFilter === "all" && search === "" && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Top Prospects</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 py-1 text-[14px] text-orange-400 hover:bg-transparent hover:text-orange-300"
                >
                  View All
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {featuredPlayers.map((player) => (
                  <Card
                    key={player.id}
                    className="relative h-80 w-52 shrink-0 cursor-pointer overflow-hidden border-0 transition-colors hover:opacity-90"
                    onClick={() => navigate(`/profile/${player.id}`)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://i.pravatar.cc/400?img=${(parseInt(player.id) % 70) + 1})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                    <CardContent className="relative flex h-full min-w-0 flex-col justify-end p-0">
                      <div className="bg-gradient-to-b from-transparent to-black/70 px-3 py-3 backdrop-blur-sm">
                        <p className="truncate font-semibold text-white">
                          {player.name}
                        </p>
                        <p className="truncate text-sm text-white/80">
                          {player.fullPosition} · {player.location}
                        </p>
                        <div className="mt-2 flex w-full min-w-0 gap-2">
                          <div className="min-w-0 flex-1 rounded-lg border border-white/30 bg-black/40 px-2 py-2 text-center">
                            <span className="text-sm font-semibold text-primary">{player.ppg}</span>
                            <span className="text-xs text-white/80"> PPG</span>
                          </div>
                          <div className="min-w-0 flex-1 rounded-lg border border-white/30 bg-black/40 px-2 py-2 text-center">
                            <span className="text-sm font-semibold text-white">{player.height}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All Players - 2-col grid */}
          <section className="min-w-0 w-full max-w-full">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                {positionFilter === "all" ? "All Players" : `${positionFilter}s`}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-1 text-[14px] text-orange-400 hover:bg-transparent hover:text-orange-300"
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
                        onClick={() => navigate(`/profile/${player.id}`)}
                      >
                        <CardContent className="flex min-h-[180px] flex-col items-center justify-center gap-2 p-3 pt-6 text-center">
                          <div className="relative">
                            <Avatar className="h-16 w-16 shrink-0">
                              <AvatarImage src={`https://i.pravatar.cc/96?img=${(parseInt(player.id) % 70) + 1}`} alt={player.name} />
                              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                                {player.initials}
                              </AvatarFallback>
                            </Avatar>
                            {player.featured && (
                              <HugeiconsIcon icon={StarIcon} size={14} className="absolute -right-1 -top-1 fill-primary text-primary" />
                            )}
                          </div>
                          <div className="flex min-w-0 w-full flex-col gap-[12px]">
                            <div className="min-w-0 space-y-[4px]">
                              <p className="break-words font-semibold text-foreground">
                                {player.name}
                              </p>
                              <p className="break-words text-sm text-muted-foreground">
                                {player.fullPosition}
                              </p>
                            </div>
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                              <HugeiconsIcon icon={Location01Icon} size={14} />
                              {player.location}
                            </div>
                            <div className="flex w-full min-w-0 gap-2">
                              <div className="min-w-0 flex-1 rounded-lg border border-border bg-card px-2 py-2 text-center">
                                <span className="text-sm font-semibold text-primary">{player.ppg}</span>
                                <span className="text-xs text-muted-foreground"> PPG</span>
                              </div>
                              <div className="min-w-0 flex-1 rounded-lg border border-border bg-card px-2 py-2 text-center">
                                <span className="text-sm font-semibold text-foreground">{player.height}</span>
                              </div>
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
              <h2 className="text-2xl font-semibold text-foreground">Events</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-1 text-[14px] text-orange-400 hover:bg-transparent hover:text-orange-300"
              >
                View All
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="relative h-40 w-60 shrink-0 cursor-pointer overflow-hidden border-0 transition-colors hover:opacity-90"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                  <CardContent className="relative flex h-full flex-col justify-end p-3">
                    <Badge variant="secondary" className="mb-2 w-fit text-[10px]">
                      {event.type}
                    </Badge>
                    <p className="truncate font-semibold text-white">{event.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-white/90">
                      <span className="flex items-center gap-1">
                        <HugeiconsIcon icon={Calendar01Icon} size={12} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <HugeiconsIcon icon={Location01Icon} size={12} />
                        {event.location}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* News */}
          <section className="-mx-4">
            <div className="mb-4 flex items-center justify-between px-4">
              <h2 className="text-2xl font-semibold text-foreground">News</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-1 text-[14px] text-orange-400 hover:bg-transparent hover:text-orange-300"
              >
                View All
              </Button>
            </div>
            <div className="flex flex-col gap-3 px-4">
              {news.map((item) => (
                <Card key={item.id} className="cursor-pointer overflow-hidden transition-colors hover:bg-muted/50">
                  <div
                    className="h-32 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <CardContent className="p-4">
                    <p className="mb-1 text-xs text-muted-foreground">{item.date}</p>
                    <p className="font-semibold text-foreground line-clamp-2">{item.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
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
