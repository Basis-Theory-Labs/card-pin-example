import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogProps,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { TextElement, useBasisTheory } from "@basis-theory/basis-theory-react";
import { LoadingButton } from "@mui/lab";
import { RefObject, useEffect, useRef, useState } from "react";
import { TextElement as ITextElement } from "@basis-theory/basis-theory-js/types/elements/elements";
import type { BasisTheory } from "@basis-theory/basis-theory-js/types/sdk";

interface Props extends Pick<DialogProps, "open" | "onClose"> {
  setPin: (
    bt: BasisTheory,
    pinRef: RefObject<ITextElement>
  ) => Promise<unknown>;
}

export const SetPinDialog = ({ setPin, open, onClose }: Props) => {
  const [valid, setValid] = useState(false);
  const pinRef = useRef<ITextElement>(null);
  const [busy, setBusy] = useState(false);
  const { bt } = useBasisTheory();

  const handleSubmit = async () => {
    if (!bt || !valid || busy) {
      return;
    }

    setBusy(true);
    try {
      await setPin(bt, pinRef);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!busy) {
      if (open) {
        pinRef.current?.focus();
      } else {
        pinRef.current?.clear();
      }
    }
  }, [open, busy]);

  return (
    <Dialog open={busy || open} onClose={onClose} keepMounted>
      <DialogContent>
        <Box py={6} px={11}>
          <Typography fontSize="16px" fontWeight="bold">
            Enter a 4 digit PIN
          </Typography>
          <Box
            marginTop={2}
            padding={3}
            border={`${valid ? 2 : 1}px solid`}
            borderRadius="8px"
            borderColor={valid ? "#499D4A" : "inherit"}
            onClick={() => pinRef.current?.focus()}
          >
            <TextElement
              id="pin"
              ref={pinRef}
              mask={[/\d/u, /\d/u, /\d/u, /\d/u]}
              style={{
                base: {
                  fontSize: "50px",
                  fontFamily: "conceal",
                  textAlign: "center",
                },
              }}
              onChange={({ complete }) => {
                setValid(complete);
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </Box>
          <LoadingButton
            sx={{ marginTop: 5 }}
            variant="contained"
            disabled={!valid}
            loading={busy}
            onClick={handleSubmit}
          >
            Set PIN Number
          </LoadingButton>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center " }}></DialogActions>
    </Dialog>
  );
};
