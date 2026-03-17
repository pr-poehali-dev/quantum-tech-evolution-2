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
          src="https://cdn.poehali.dev/projects/fb10dc73-fb41-4f59-a8db-841262551e0c/files/e09e6837-a306-426a-8518-57fc1e2e34cb.jpg"
          alt="Собаки на Плотинке в Екатеринбурге"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          URALDOG
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Чат собачников Екатеринбурга — расскажи о своей собаке, найди соседей по району и погуляй вместе
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#add-dog"
            className="bg-white text-black px-8 py-3 uppercase text-sm tracking-wide font-medium hover:bg-neutral-200 transition-colors duration-300 cursor-pointer"
          >
            Добавить свою собаку
          </a>
          <a
            href="https://t.me/+8L340jCF1h04NjMy/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-8 py-3 uppercase text-sm tracking-wide font-medium hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
          >
            Перейти в чат
          </a>
        </div>
      </div>
    </div>
  );
}