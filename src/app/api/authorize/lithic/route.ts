import { NextRequest } from "next/server";
import { BasisTheory } from "@basis-theory/basis-theory-js";

export async function POST(request: NextRequest) {
  const { nonce } = await request.json();

  const bt = await new BasisTheory().init(process.env.BASIS_THEORY_PRIVATE_KEY);

  await bt.sessions.authorize({
    nonce,
    permissions: ["token:use"],
  });

  return new Response(null, { status: 204 });
}
