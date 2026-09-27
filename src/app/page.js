import DynamicFAQ from "@/components/home/DynamicFAQ";
import HeroSection from "@/components/home/HeroSection";
import ImpactStats from "@/components/home/ImpactStats";
import MetricSpotlight from "@/components/home/MetricSpotlight";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";
import TopContributors from "@/components/home/TopContributors";
import UniqueNewsletter from "@/components/home/UniqueNewsletter";
import WhyItMatters from "@/components/home/WhyItMatters";
import FeaturedLessons from "@/components/lessons/FeaturedLessons";
import MostSavedLessons from "../components/home/MostSavedLessons";
import { getMostSavedLessons, getTopContributors } from "@/lib/api/admin";


export default async function Home() {

  const contributorsRes = await getTopContributors();
  const mostSavedRes = await getMostSavedLessons();

  const contributors = contributorsRes?.success ? contributorsRes.data : [];
  const mostSavedLessons = mostSavedRes?.success ? mostSavedRes.data : [];


  return (
    <div>
     <HeroSection />
     <ImpactStats />
     <WhyItMatters />
     <FeaturedLessons />
     <TopContributors contributors={contributors}/>
     <MostSavedLessons mostSavedLessons={mostSavedLessons}/>
     <TestimonialsMarquee />
     <DynamicFAQ />
     <UniqueNewsletter />
     <MetricSpotlight />
    </div>
  );
}
