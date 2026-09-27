import { getLessonById } from "@/lib/api/lessons";
import EditLessonForm from "@/components/dashboard/EditLessonForm";

const EditLessonPage = async ({ params }) => {
  const { lessonId } = await params;
  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white text-slate-900 p-6 sm:p-12 dark:bg-[#040712] dark:text-zinc-100">
        <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-800 bg-white p-8 text-center dark:bg-[#08101f]">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-zinc-100">
            Lesson not found
          </h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-zinc-400">
            The requested lesson could not be loaded. Please go back and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 sm:p-12 dark:bg-[#040712] dark:text-zinc-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-400/80">
            Edit Your Lesson
          </p>
          <h1 className="mt-3 text-4xl font-serif font-bold text-zinc-100">
            Update your story and save your changes.
          </h1>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Use this form to update the lesson fields and save them back to the database.
          </p>
        </div>

        <EditLessonForm lesson={lesson} />
      </div>
    </div>
  );
};

export default EditLessonPage;
