import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/startMongo";

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!SECRET_KEY) {
      return NextResponse.json(
        { message: "Server secret key not configured" },
        { status: 500 }
      );
    }
    const body = await req.json();
    const { secretKey, countdownTime } = body;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 403 }
      );
    }

    if (
      !countdownTime ||
      typeof countdownTime !== "number" ||
      countdownTime <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid countdown time" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("countdown");
    const collection = db.collection<{ _id: number; endTime: number }>(
      "countdown"
    );

    const existing = await collection.findOne({ _id: 1 });

    if (existing && existing.endTime > Date.now()) {
      const remainingTime = Math.floor(
        (existing.endTime - Date.now()) / 1000
      );

      return NextResponse.json({
        message: "Timer already running",
        remainingTime
      });
    }

    const endTime = Date.now() + countdownTime * 1000;

    await collection.updateOne(
      { _id: 1 },
      { $set: { endTime } },
      { upsert: true }
    );

    return NextResponse.json({
      message: "Timer started",
      endTime
    });
  } catch (err) {
    console.error("POST /src/app/api/countdown error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("countdown");
    const collection = db.collection<{ _id: number; endTime: number }>(
      "countdown"
    );

    const countdown = await collection.findOne({ _id: 1 });

    if (!countdown) {
      return NextResponse.json({
        message: "Timer not started",
        remainingTime: 0
      });
    }

    const remainingMs = countdown.endTime - Date.now();

    if (remainingMs <= 0) {
      await collection.deleteOne({ _id: 1 });

      return NextResponse.json({
        message: "Countdown ended",
        remainingTime: 0
      });
    }

    return NextResponse.json({
      message: "Countdown active",
      remainingTime: Math.floor(remainingMs / 1000)
    });
  } catch (err) {
    console.error("GET /src/app/api/countdown error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!SECRET_KEY) {
      return NextResponse.json(
        { message: "Server secret key not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { secretKey } = body;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db("countdown");
    const collection = db.collection<{ _id: number; endTime: number }>("countdown");
    await collection.deleteOne({ _id: 1 });

    return NextResponse.json({
      message: "Countdown stopped",
      remainingTime: 0
    });
  } catch (err) {
    console.error("PATCH /src/app/api/countdown error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
