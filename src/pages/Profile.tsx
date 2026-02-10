import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Logout01Icon,
  Share04Icon,
  Location01Icon,
  Calendar03Icon,
  RulerIcon,
  BodyWeightIcon,
  TShirtIcon,
  ChampionIcon,
  Edit01Icon,
  Certificate01Icon,
} from "@hugeicons/core-free-icons";
import BottomNav from "@/components/BottomNav";
import { playersProfile, CURRENT_USER_ID } from "@/data/players";
import { getCurrentUser, getAccountProfile, logout } from "@/data/accounts";

const defaultPlayer = playersProfile[CURRENT_USER_ID]!;

const Profile = () => {
  const navigate = useNavigate();
  const { playerId } = useParams<{ playerId?: string }>();
  const currentUser = getCurrentUser();
  const isOwnProfile = !playerId || playerId === CURRENT_USER_ID;
  const accountProfile = isOwnProfile && currentUser ? getAccountProfile(currentUser.email) : null;
  const player = accountProfile ?? (playerId && playersProfile[playerId] ? playersProfile[playerId]! : defaultPlayer);
  const displayName = player.name;

  return (
    <div className={`relative min-h-[100dvh] bg-background ${isOwnProfile ? "pb-24" : "pb-28"}`}>
      {/* Header */}
      <div className="fixed top-0 left-1/2 z-10 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-b border-border/50 bg-background/95 px-4 py-3 backdrop-blur-sm">
        <button
          onClick={() => navigate("/home")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
        </button>
        <span className="text-sm font-medium text-foreground">Profile</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: displayName,
                  text: `${displayName} - Hoops ID Profile`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard?.writeText(window.location.href);
              }
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <HugeiconsIcon icon={Share04Icon} size={20} />
          </button>
          {isOwnProfile && (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
            >
              <HugeiconsIcon icon={Logout01Icon} size={20} />
            </button>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-0 pt-14"
      >
        {/* Hero with cover + avatar overlapping into content */}
        <div className="relative -mx-4">
          <div
            className="h-28 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Avatar centered, overlapping cover and content */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl ring-4 ring-background">
              <img src={`https://i.pravatar.cc/400?img=${accountProfile ? accountProfile.imageId : (parseInt(player.id) % 70) + 1}`} alt={displayName} className="object-cover" />
              <AvatarFallback className="bg-primary/20 text-2xl font-semibold text-primary">
                {displayName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Name + info below avatar */}
        <div className="flex flex-col items-center pt-14 pb-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{displayName}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="font-normal">
              #{player.jersey}
            </Badge>
            <span>{player.team}</span>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="border-b border-border bg-muted/30 px-4 py-4">
          <div className="flex justify-around gap-2">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold tabular-nums text-primary">{player.ppg}</span>
              <span className="text-xs text-muted-foreground">PPG</span>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold tabular-nums text-foreground">{player.apg}</span>
              <span className="text-xs text-muted-foreground">APG</span>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold tabular-nums text-foreground">{player.rpg}</span>
              <span className="text-xs text-muted-foreground">RPG</span>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold tabular-nums text-foreground">{player.games}</span>
              <span className="text-xs text-muted-foreground">Games</span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* Location & position */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <HugeiconsIcon icon={Location01Icon} size={14} />
              {player.location}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-sm font-medium text-foreground">{player.position}</span>
          </div>

          {isOwnProfile && (
            <Button
              variant="outline"
              className="mb-6 w-full rounded-full border-primary/50 py-6 text-foreground hover:bg-primary/10 hover:border-primary"
            >
              <HugeiconsIcon icon={Edit01Icon} size={18} className="mr-2" />
              Edit Profile
            </Button>
          )}

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 w-full justify-start rounded-full bg-muted p-1">
              <TabsTrigger value="overview" className="rounded-full px-4">
                Overview
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-full px-4">
                Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Certified by coach */}
<Card className="border-blue-600 bg-blue-600">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <HugeiconsIcon icon={Certificate01Icon} size={20} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-semibold text-white">Certified Profile</p>
                      <p className="text-sm text-white/90">Data verified & approved by Coach Budi</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full rounded-full border-0 bg-white text-blue-600 hover:bg-white/90"
                  >
                    View certificate
                  </Button>
                </CardContent>
              </Card>

              {/* Bio */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">About</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{player.bio}</p>
                </CardContent>
              </Card>

              {/* Details grid */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={RulerIcon} size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Height</p>
                        <p className="font-medium">{player.height}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={BodyWeightIcon} size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="font-medium">{player.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={Calendar03Icon} size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Age</p>
                        <p className="font-medium">{player.age} years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={TShirtIcon} size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-medium">{player.experience}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <HugeiconsIcon icon={ChampionIcon} size={18} />
                    Season Averages
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Points", value: player.ppg, suffix: "PPG" },
                      { label: "Assists", value: player.apg, suffix: "APG" },
                      { label: "Rebounds", value: player.rpg, suffix: "RPG" },
                      { label: "Steals", value: player.spg, suffix: "SPG" },
                      { label: "Blocks", value: player.bpg, suffix: "BPG" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className="font-semibold tabular-nums">
                          {stat.value} {stat.suffix}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Shooting</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Field Goal %</span>
                      <span className="font-semibold tabular-nums">{player.fg}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">3-Point %</span>
                      <span className="font-semibold tabular-nums">{player.threePt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Free Throw %</span>
                      <span className="font-semibold tabular-nums">{player.ft}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {isOwnProfile && <BottomNav />}

      {/* Message button - fixed bottom, only when viewing another player */}
      {!isOwnProfile && (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            onClick={() => navigate("/messages")}
            className="h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
