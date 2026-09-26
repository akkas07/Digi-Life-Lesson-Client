"use client";

import { deleteFavoriteLesson } from "@/lib/actions/favorite";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export const DeleteFavorite = ({ lessonId, onDeleteSuccess }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleDelete = async () => {
    if (!userId || !lessonId) {
      Swal.fire({
        title: "Error!",
        text: "User or Lesson ID is missing.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteFavoriteLesson(userId, lessonId);
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your favorite has been removed.",
              icon: "success",
            });

            if (onDeleteSuccess) {
              onDeleteSuccess(lessonId);
            }
          } else {
            Swal.fire({
              title: "Error!",
              text: res?.message || "Failed to delete item",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting favorite:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong on the server.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <Button
      onClick={handleDelete}
      className="p-2 bg-zinc-900/40 border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-rose-950 rounded-xl transition-all shadow-sm"
      title="Remove from favorites"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </Button>
  );
};
