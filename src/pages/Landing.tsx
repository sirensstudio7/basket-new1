import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
        className="relative h-[100dvh] w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/bg.png)" }}
      >
      {/* Buttons at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 p-4"
      >
        <button
          onClick={() => navigate("/login")}
          className="h-12 w-full max-w-sm rounded-full bg-white text-sm font-semibold text-black transition-transform active:scale-95 flex items-center justify-center"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="h-12 w-full max-w-sm rounded-full border border-white bg-transparent text-sm font-semibold text-white transition-transform active:scale-95 flex items-center justify-center"
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
};

export default Landing;
