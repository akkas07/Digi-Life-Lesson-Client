"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Tooltip } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import Swal from "sweetalert2";
import { deleteLessonAction } from "@/lib/actions/lesson";

const DeleteLessonButton = ({ lessonId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!lessonId) {
      Swal.fire({
        title: "Error",
        text: "Lesson ID is missing.",
        icon: "error",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Delete this lesson?",
      text: "This action will remove the lesson permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    setIsDeleting(true);

    try {
      const response = await deleteLessonAction(lessonId);

      if (response?.success) {
        Swal.fire({
          title: "Deleted!",
          text: response.message || "Lesson deleted successfully.",
          icon: "success",
          confirmButtonColor: "#7c3aed",
        });
        router.refresh();
      } else {
        Swal.fire({
          title: "Failed",
          text: response?.error || "Could not delete the lesson.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Delete lesson error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while deleting the lesson.",
        icon: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Tooltip content="Delete lesson" placement="top">
      <Button
        isIconOnly
        isLoading={isDeleting}
        disabled={isDeleting}
        variant="light"
        size="sm"
        onClick={handleDelete}
        className="text-zinc-400 hover:text-rose-400 hover: bg-app-bg   hover:border-zinc-800 rounded-lg w-8 h-8 min-w-8 p-0 transition-all duration-200"
        aria-label="Delete lesson"
      >
        <TrashBin width={13} height={13} />
      </Button>
    </Tooltip>
  );
};

export default DeleteLessonButton;
