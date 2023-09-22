import { NextRequest } from "next/server";
import { BasisTheory } from "@basis-theory/basis-theory-js";

export async function POST(request: NextRequest) {
  const { nonce } = await request.json();

  const bt = await new BasisTheory().init(process.env.BASIS_THEORY_PRIVATE_KEY);

  await bt.sessions.authorize({
    nonce,
    rules: [
      {
        description: "Allows displaying token",
        priority: 1,
        permissions: ["token:read"],
        conditions: [
          {
            attribute: "id",
            operator: "equals",
            value: process.env.NEXT_PUBLIC_BASIS_THEORY_CARD_TOKEN as string,
          },
        ],
        transform: "reveal",
      },
    ],
  });

  return new Response(null, { status: 204 });
}
