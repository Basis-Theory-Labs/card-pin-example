import { BasisTheory } from "@basis-theory/basis-theory-js/types/sdk";
import { RefObject } from "react";
import { TextElement } from "@basis-theory/basis-theory-react/types";
import { setPinGalileo } from "@/client/galileo";
import { setPinLithic } from "@/client/lithic";
import { setPinMarqeta } from "@/client/marqeta";

const setPinIssuer = (
  issuer: "marqeta" | "lithic" | "galileo",
  bt: BasisTheory,
  pinRef: RefObject<TextElement>
) => {
  switch (issuer) {
    case "galileo":
      return setPinGalileo(bt, pinRef);
    case "lithic":
      return setPinLithic(bt, pinRef);
    case "marqeta":
      return setPinMarqeta(bt, pinRef);
    default:
      throw new Error(`Issuer "${issuer}" not supported.`);
  }
};

export { setPinIssuer, setPinGalileo, setPinLithic, setPinMarqeta };
