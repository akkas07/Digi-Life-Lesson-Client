import { getFeaturedLessons } from "@/lib/api/featured";
import FeaturedLessonsCard from "@/components/lessons/FeaturedLessonsCard";

const FeaturedLessons = async () => {
  const fetchFeaturedLessons = await getFeaturedLessons();
  const allLessons = fetchFeaturedLessons?.data || [];

  if (allLessons.length === 0) {
    return (
      <p className="text-zinc-500 font-mono text-center py-10">
        No featured lessons found.
      </p>
    );
  }

  return (
    <div className=" dark:bg-[#000000] py-12">
      <div className="text-center max-w-3xl mx-auto px-4 mb-12">
        <h1 className="text-3xl font-serif font-bold text-app-text  tracking-wide mb-3">
          Featured Life Lessons
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400/90">
          A curated treasury of exceptional wisdom from our community
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allLessons.map((singleLesson) => (
          <FeaturedLessonsCard key={singleLesson._id} lesson={singleLesson} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;