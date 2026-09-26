"use client";

import { deleteFavoriteLesson } from "@/lib/actions/favorite";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export const DeleteFavorite = ({ lessonId }) => {
  
  const { data: session } = useSession();
  const user = session?.user;

  const userId = session?.user?.id;

  const handleDelete = async () => {
    const res = await deleteFavoriteLesson(userId, lessonId);
    console.log(res, "delete response");

    if (!res.success) {
      Swal.fire({
        title: "Error!",
        text: res.message || "Failed to delete item",
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
    }).then((result) => {
      if (result.isConfirmed) {
        // 💡 Put your Next.js Server Action or fetch API call here

        Swal.fire({
          title: "Deleted!",
          text: "Your favorite has been removed.",
          icon: "success",
        });
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
