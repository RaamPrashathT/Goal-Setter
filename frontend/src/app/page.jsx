import Image from "next/image";
import goal from "@/images/goal.png"

export default function Home() {
  return (
    <div>
      <div
        className="min-h-screen w-[100%] flex items-center text-white"
        style={{ 
          backgroundImage: "url('/image/hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className=" p-8 rounded-lg ml-12 w-[50%]">
          <h1 className="text-4xl font-bold mb-4">Welcome to Goal Setter</h1>
          <p className="text-lg mb-6 w-[80%]">
          Set, track, and achieve your goals effortlessly! Our Goal Setter app keeps you organized and motivated every step of the way. Ready to make progress? Start today
          </p>
        </div>
        <div className='w-[50%]'>
          <Image
          className="relative left-24"
            src = {goal}
            alt = "Goal Setting"
            width = {400}
          />
        </div>
      </div>
    </div>
  );
}