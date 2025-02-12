"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface EditTopicFormProps {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EditTopicForm: React.FC<EditTopicFormProps> = ({
  id,
  title,
  description,
  date,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDate, setNewDate] = useState(date);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [success, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const body = {
        title: newTitle,
        description: newDescription,
        date: newDate,
      };

      console.log("Sending update request with data:", body);

      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update topic: ${errorText}`);
      }

      const responseData = await res.json();
      console.log("Server response:", responseData);

      setSuccess(true);
      router.push("/");
    } catch (error) {
      console.error("Update error:", error);
      alert(`Error updating topic: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Update Topic</h2>

      <label htmlFor="title" className="text-gray-400 text-sm mb-1">
        Topic Title
      </label>
      <input
        id="title"
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="w-full px-5 py-3 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
        type="text"
        placeholder="Enter Topic Title"
        required
      />

      <label htmlFor="description" className="text-gray-400 text-sm mb-1">
        Description
      </label>
      <textarea
        id="description"
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="w-full px-5 py-3 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none resize-none"
        placeholder="Enter Description"
        required
      />

      <label htmlFor="date" className="text-gray-400 text-sm mb-1">
        Select Due Date
      </label>
      <input
        id="date"
        onChange={(e) => setNewDate(e.target.value)}
        value={newDate}
        className="w-full px-5 py-3 rounded-md border border-gray-500 bg-transparent text-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
        type="date"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition duration-300 shadow-md"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Topic"}
      </button>

      {success && (
        <p className="text-green-400 text-center mt-2">
          Topic updated successfully!
        </p>
      )}
    </form>
  );
};

export default EditTopicForm;
