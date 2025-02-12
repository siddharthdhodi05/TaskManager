import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";

export async function POST(request: NextRequest) {
  try {
    const { title, description, date } = await request.json();

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    await Topic.create({ title, description, date });

    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating topic:", error);
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();

  // No need for `.toISOString()` since `date` is stored as a string
  return NextResponse.json({ topics }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing topic ID" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Topic deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting topic:", error);
    return NextResponse.json(
      { error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
