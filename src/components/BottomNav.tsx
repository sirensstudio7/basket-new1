import { useNavigate, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home04Icon, Message01Icon, Notification01Icon, UserCircleIcon } from "@hugeicons/core-free-icons";

const navItems = [
  { path: "/home", icon: Home04Icon, label: "Home" },
  { path: "/messages", icon: Message01Icon, label: "Message" },
  { path: "/notifications", icon: Notification01Icon, label: "Notification" },
  { path: "/profile", icon: UserCircleIcon, label: "Profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] pt-3">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1"
            >
              <HugeiconsIcon
                icon={icon}
                size={24}
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
