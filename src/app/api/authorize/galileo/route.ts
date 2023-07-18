import { v4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import * as querystring from "querystring";
import axios from "axios";

const galileoAuth = () => ({
  apiLogin: process.env.GALILEO_API_LOGIN,
  apiTransKey: process.env.GALILEO_API_TRANS_KEY,
  providerId: process.env.GALILEO_PROVIDER_ID,
  transactionId: v4(),
});

const galileoHeaders = () => ({
  "response-content-type": "json",
});

export async function POST(request: NextRequest) {
  const {
    data: {
      response_data: { token },
    },
  } = await axios.post(
    "https://api-sandbox.cv.gpsrv.com/intserv/4.0/getCardPinChangeKey",
    querystring.stringify({
      ...galileoAuth(),
    }),
    {
      headers: {
        ...galileoHeaders(),
      },
    }
  );

  return NextResponse.json({ token });
}
