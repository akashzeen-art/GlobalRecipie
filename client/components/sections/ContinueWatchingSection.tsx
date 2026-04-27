import { useRef } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { VIDEOS } from "@/lib/videos";

const CONTINUE_WATCHING = [
  { id: 1, title: "كفتة بصوص الطحينة",    image: "/Arabic Cook/7.png",  video: VIDEOS[7],  progress: 65, timeLeft: "15 دقيقة متبقية" },
  { id: 2, title: "كباب بالصينية",         image: "/Arabic Cook/8.png",  video: VIDEOS[8],  progress: 42, timeLeft: "22 دقيقة متبقية" },
  { id: 3, title: "ساندويش روست بيف",     image: "/Arabic Cook/9.png",  video: VIDEOS[9],  progress: 88, timeLeft: "3 دقائق متبقية"  },
  { id: 4, title: "تاكوز فرنسي بالدجاج", image: "/Arabic Cook/11.png", video: VIDEOS[11], progress: 20, timeLeft: "28 دقيقة متبقية" },
  { id: 5, title: "دجاج البونلس",          image: "/Arabic Cook/12.png", video: VIDEOS[12], progress: 55, timeLeft: "18 دقيقة متبقية" },
  { id: 6, title: "مكرونة الحبش",          image: "/Arabic Cook/15.png", video: VIDEOS[15], progress: 30, timeLeft: "25 دقيقة متبقية" },
];

export const ContinueWatchingSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-4xl font-cinematic text-white mb-1">متابعة المشاهدة</h2>
            <div className="w-12 h-1 bg-red-500 rounded-full" />
          </motion.div>
          <div className="flex gap-2">
            <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"><ChevronRight className="w-5 h-5" /></button>
            <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"><ChevronLeft className="w-5 h-5" /></button>
          </div>
        </div>

        <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {CONTINUE_WATCHING.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-xl overflow-hidden bg-gray-900 cursor-pointer flex-shrink-0 w-64 md:w-72">
              <VideoCard image={item.image} video={item.video} title={item.title} className="relative aspect-video">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Play className="w-5 h-5 fill-black text-black ml-0.5" />
                  </div>
                </div>
              </VideoCard>
              <div className="h-1 bg-gray-700">
                <motion.div className="h-full bg-red-500" initial={{ width: 0 }} whileInView={{ width: `${item.progress}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
              </div>
              <div className="p-3" dir="rtl">
                <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{item.timeLeft}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
