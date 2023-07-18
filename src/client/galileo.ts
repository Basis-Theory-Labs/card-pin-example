import axios from "axios";
import type { RefObject } from "react";
import type { BasisTheory } from "@basis-theory/basis-theory-js/types/sdk";
import type { TextElement } from "@basis-theory/basis-theory-react/types";

export const setPinGalileo = async (
  bt: BasisTheory,
  pinRef: RefObject<TextElement>
) => {
  const {
    data: { token },
  } = await axios.post("/api/authorize/galileo");

  await bt.post(
    "https://agserv-sandbox.cv.gpsrv.com/agserv/pin", // request is made through the iframe
    {
      pin: pinRef.current, // passing element in the payload
      pin_reentry: pinRef.current, // passing element in the payload
      submitter_id: process.env.NEXT_PUBLIC_GALILEO_PROVIDER_ID,
      pin_change_key: token,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};
