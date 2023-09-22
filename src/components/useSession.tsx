import { useBasisTheory } from "@basis-theory/basis-theory-react";
import { useEffect, useState } from "react";
import type { CreateSessionResponse } from "@basis-theory/basis-theory-js/types/sdk";
import axios from "axios";

export const useSession = () => {
  const { bt } = useBasisTheory();
  const [session, setSession] = useState<CreateSessionResponse>();

  useEffect(() => {
    const createSession = async () => {
      if (bt && !session) {
        const newSession = await bt.sessions.create();
        await axios.post("/api/authorize/display", {
          nonce: newSession.nonce,
        });
        setSession(newSession);
      }
    };

    createSession();
  }, [bt, session]);

  return session;
};
