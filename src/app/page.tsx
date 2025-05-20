import CallToActionSection from "@/components/CallToAction";
import ExploreSection from "@/components/Explore";
import Hero from "@/components/Hero";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full flex flex-col gap-2">
        <Hero />
      </div>
      <div className="lg:col-span-full flex flex-col gap-2 mt-20">
        <ExploreSection />
      </div>

      <div className="lg:col-span-full flex flex-col gap-2 mt-20">
        <Separator />
        <CallToActionSection />
      </div>
    </div>
  );
}
