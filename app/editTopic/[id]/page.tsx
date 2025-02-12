import EditTopicForm from "@/components/EditTopicForm";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>; // ✅ `params` should be a Promise
}

// Function to fetch topic data by ID
const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params; // ✅ Await params to get `id`
  const data = await getTopicById(id);

  if (!data) {
    return <p className="text-red-500 text-center">Error loading topic</p>;
  }

  return (
    <EditTopicForm
      id={id}
      title={data.topic.title}
      description={data.topic.description}
      date={data.topic.date}
    />
  );
};

export default Page;
