"use client";

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface RemoveBtnProps {
  id: string;
}

const RemoveBtn: React.FC<RemoveBtnProps> = ({ id }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete topic");
      }

      window.location.reload(); // Refresh page to update list
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-400 hover:text-red-600">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
