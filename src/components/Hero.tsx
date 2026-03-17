import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/fb10dc73-fb41-4f59-a8db-841262551e0c/files/8cfed08f-542f-49e0-b546-db079f5e7347.jpg"
          alt="Собаки в парке"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          PAWTALK
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Сообщество для настоящих собачников — чат, профили и рейтинг лучших владельцев
        </p>
        <button className="mt-8 bg-white text-black px-8 py-3 uppercase text-sm tracking-wide font-medium hover:bg-neutral-200 transition-colors duration-300 cursor-pointer">
          Присоединиться
        </button>
      </div>
    </div>
  );
}