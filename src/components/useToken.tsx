import type { CreateSessionResponse } from "@basis-theory/basis-theory-js/types/sdk";
import { useEffect, useState } from "react";
import { Token } from "@basis-theory/basis-theory-js/types/models";
import { useBasisTheory } from "@basis-theory/basis-theory-react";

export const useToken = (id: string, session?: CreateSessionResponse) => {
  const [token, setToken] = useState<Token>();
  const { bt } = useBasisTheory();

  useEffect(() => {
    const retrieveToken = async () => {
      if (bt && id && session && !token) {
        setToken(await bt.tokens.retrieve(id, { apiKey: session.sessionKey }));
      }
    };
    retrieveToken();
  }, [bt, id, token, session]);

  if (!session) {
    return undefined;
  }

  return token;
};
