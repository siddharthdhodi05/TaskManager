import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const id = params.id; // Ensure params is awaited

    const {
      newTitle: title,
      newDescription: description,
      newDate: date,
    } = await request.json();

    // Update the topic
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Topic updated successfully",
      topic: updatedTopic,
    });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const id = params.id; // Ensure params is awaited

    const topic = await Topic.findById(id);

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
