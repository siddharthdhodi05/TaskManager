"use client"; // Ensures this runs on the client side

import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

// Define TypeScript interface for a Topic
interface Topic {
  _id: string;
  title: string;
  description: string;
  date: string;
}

// Fetch topics from the API
const getTopics = async (): Promise<{ topics: Topic[] }> => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return await res.json(); // Now TypeScript knows it returns { topics: Topic[] }
  } catch (error) {
    console.error("❌ Error fetching topics:", error);
    return { topics: [] }; // Return an empty array to prevent crashes
  }
};

const TopicsList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]); // Explicitly set type

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics || []); // Ensure `topics` is always an array
    };

    fetchTopics();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id} // Ensure each item has a unique key
            className="my-4 p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-md rounded-2xl flex justify-between items-center"
          >
            {/* Left Side: Topic Details */}
            <div>
              <h2 className="text-xl font-semibold">📌 {t.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{t.description}</p>
              <p className="text-gray-600 text-sm mt-1">
                📅 Due Date: {t.date.substring(0, 10)}
              </p>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-3">
              <RemoveBtn id={t._id} />
              <Link
                href={`/editTopic/${t._id}`}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition duration-300"
              >
                <HiPencilAlt size={20} className="text-white" />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No topics found</p>
      )}
    </div>
  );
};

export default TopicsList;
