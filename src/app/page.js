import DynamicFAQ from "@/components/home/DynamicFAQ";
import HeroSection from "@/components/home/HeroSection";
import ImpactStats from "@/components/home/ImpactStats";
import MetricSpotlight from "@/components/home/MetricSpotlight";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";
import UniqueNewsletter from "@/components/home/UniqueNewsletter";
import WhyItMatters from "@/components/home/WhyItMatters";
import FeaturedLessons from "@/components/lessons/FeaturedLessons";


export default function Home() {
  return (
    <div>
     <HeroSection />
     <ImpactStats />
     <WhyItMatters />
     <FeaturedLessons />
     <TestimonialsMarquee />
     <DynamicFAQ />
     <UniqueNewsletter />
     <MetricSpotlight />
    </div>
  );
}
