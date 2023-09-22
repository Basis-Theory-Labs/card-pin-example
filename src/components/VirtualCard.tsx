"use client";

import { Button, Card, CardContent, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Card as CardRender } from "@/components/Card";
import { useSession } from "@/components/useSession";
import { CardNumberElement } from "@basis-theory/basis-theory-react";
import type { CardNumberElement as ICardNumberElement } from "@basis-theory/basis-theory-js/types/elements";
import { useToken } from "@/components/useToken";
import { CardDetails } from "@/components/CardDetails";

const VirtualCard = () => {
  const [snackbar, setSnackbar] = useState<string>();
  const [visible, setVisible] = useState(false);

  const session = useSession();
  const token = useToken(
    process.env.NEXT_PUBLIC_BASIS_THEORY_CARD_TOKEN as string,
    session
  );

  const cardNumberRef = useRef<ICardNumberElement>(null);

  const toggleDisplayCard = async () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (visible && token) {
      cardNumberRef.current?.setValue((token as any).data.number);
    } else {
      cardNumberRef.current?.update({
        value: "",
      });
    }
  }, [token, visible]);

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <CardRender
            cardNumber={
              <CardNumberElement
                id="cardNumber"
                ref={cardNumberRef}
                iconPosition="none"
                readOnly
                placeholder="•••• •••• •••• ••••"
                style={{
                  base: {
                    fontSize: "8cqw",
                    color: "white",
                    "::placeholder": {
                      color: "white",
                    },
                  },
                }}
              />
            }
          />
          <Box display="flex" justifyContent="end" mt={2}>
            <Button variant="contained" onClick={toggleDisplayCard}>
              {visible ? "Hide" : "Show"} Details
            </Button>
          </Box>
        </CardContent>
      </Card>
      <CardDetails visible={visible} token={token} />
      <Snackbar
        open={!!snackbar}
        autoHideDuration={5000}
        onClose={() => setSnackbar(undefined)}
        message={snackbar}
      />
    </>
  );
};

export { VirtualCard };
