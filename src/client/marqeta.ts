import axios from "axios";
import type { RefObject } from "react";
import type {
  TextElement,
  BasisTheoryElements,
} from "@basis-theory/basis-theory-react/types";

export const setPinMarqeta = async (
  bt: BasisTheoryElements,
  pinRef: RefObject<TextElement>
) => {
  const token = await bt.tokens.create({
    type: "token",
    data: pinRef.current,
  });

  await axios.post("/api/authorize/marqeta", {
    token,
  });
};
