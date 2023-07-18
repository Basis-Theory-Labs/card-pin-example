import axios from "axios";
import type { RefObject } from "react";
import type { BasisTheory } from "@basis-theory/basis-theory-js/types/sdk";
import type { TextElement } from "@basis-theory/basis-theory-react/types";

export const setPinMarqeta = async (
  bt: BasisTheory,
  pinRef: RefObject<TextElement>
) => {
  const {
    data: { control_token },
  } = await axios.post("/api/authorize/marqeta");

  await bt.put(
    "https://sandbox-api.marqeta.com/v3/pins", // request is made through the iframe
    {
      control_token, // passing plain text data
      pin: pinRef.current, // passing element in the payload
    },
    {
      headers: {
        // client side authentication goes here
      },
    }
  );
};
