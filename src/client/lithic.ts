import axios from "axios";
import type { RefObject } from "react";
import type { BasisTheory } from "@basis-theory/basis-theory-js/types/sdk";
import type { TextElement } from "@basis-theory/basis-theory-react/types";

export const setPinLithic = async (
  bt: BasisTheory,
  pinRef: RefObject<TextElement>
) => {
  const session = await bt.sessions.create();

  await axios.post("/api/authorize/lithic", {
    nonce: session.nonce,
  });

  await bt.proxy.patch({
    path: process.env.NEXT_PUBLIC_LITHIC_CARD_ID,
    headers: {
      "BT-PROXY-KEY": process.env.NEXT_PUBLIC_LITHIC_PROXY_KEY,
    },
    body: {
      pin: pinRef.current,
    },
    apiKey: session.sessionKey,
  });
};
