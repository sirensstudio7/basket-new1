import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-6 py-8">
      <button onClick={() => navigate("/")} className="mb-8 self-start text-foreground">
        <ArrowLeft className="h-6 w-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col"
      >
        <h1 className="mb-2 text-5xl text-foreground">SIGN UP</h1>
        <p className="mb-10 text-muted-foreground">Join the court!</p>

        <form onSubmit={handleSignup} className="flex flex-1 flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Full Name</label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-border bg-card py-6 text-foreground placeholder:text-muted-foreground"
            />
          </div>
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

          <div className="mt-auto pb-8">
            <Button
              type="submit"
              className="w-full rounded-full bg-primary py-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Sign Up
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary">
                Login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
