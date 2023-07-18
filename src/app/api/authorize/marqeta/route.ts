import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const {
    data: { control_token },
  } = await axios.post(
    "https://sandbox-api.marqeta.com/v3/pins/controltoken",
    {
      card_token: process.env.MARQETA_CARD_TOKEN,
      controltoken_type: "SET_PIN",
    },
    {
      auth: {
        username: process.env.MARQETA_APPLICATION_TOKEN as string,
        password: process.env.MARQETA_ACCESS_TOKEN as string,
      },
    }
  );

  return NextResponse.json({ control_token });
}
