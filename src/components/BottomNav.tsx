import { useNavigate, useLocation } from "react-router-dom";
import { House, ChartBar, User } from "@phosphor-icons/react";

const navItems = [
  { path: "/home", icon: House, label: "Home" },
  { path: "/stats", icon: ChartBar, label: "Stats" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] pt-3">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1"
            >
              <Icon
                size={26}
                weight={isActive ? "fill" : "regular"}
                className={isActive ? "text-primary" : "text-muted-foreground"}
              />
              <span
                className={`text-xs ${isActive ? "font-medium text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
