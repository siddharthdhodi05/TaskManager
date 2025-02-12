"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  // ✅ Make function async and fix function name
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Something is missing");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, date }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create topic");
      }
    } catch (error) {
      console.log("❌ Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit} // ✅ Corrected function name
      className="max-w-lg mx-auto mt-10 p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-white text-center mb-2">
        Create a New Topic
      </h2>

      {/* Topic Title */}
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-full px-5 py-3 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
        type="text"
        placeholder="Enter Topic Title"
      />

      {/* Description */}
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-full px-5 py-3 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none resize-none"
        placeholder="Enter Description"
      />

      {/* Date Picker with Label */}
      <div className="relative">
        <label className="block text-gray-400 text-sm mb-1">
          Select Due Date
        </label>
        <input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className="w-full px-5 py-3 rounded-md border border-gray-500 bg-transparent text-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
          type="date"
        />
      </div>

      {/* Submit Button */}
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition duration-300 shadow-md">
        + Add Topic
      </button>
    </form>
  );
};

export default Page;
