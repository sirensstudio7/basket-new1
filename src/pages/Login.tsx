import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { login } from "@/data/accounts";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const account = login(email, password);
    if (account) {
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background px-4 py-8">
      <button onClick={() => navigate("/")} className="mb-8 self-start text-foreground">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col"
      >
        <h1 className="mb-2 text-5xl text-foreground">LOGIN</h1>
        <p className="mb-10 text-muted-foreground">Welcome back, baller!</p>

        <form onSubmit={handleLogin} className="flex flex-1 flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-border bg-card py-6 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-border bg-card py-6 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Link to="#" className="self-end text-sm text-primary">
            Forgot password?
          </Link>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <p className="text-xs text-muted-foreground">
            Demo: player@hoops.id / player123 · coach@hoops.id / coach123
          </p>

          <div className="mt-auto pb-8">
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
            >
              Login
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
