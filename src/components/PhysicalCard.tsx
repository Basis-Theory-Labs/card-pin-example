"use client";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  Modal,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { TextElement, useBasisTheory } from "@basis-theory/basis-theory-react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const PhysicalCard = () => {
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [snackbar, setSnackbar] = useState<string>();
  const pinRef = useRef<any>(null);

  const { bt } = useBasisTheory();

  const openModal = () => {
    setOpen(true);
    pinRef.current?.focus();
  };

  const closeModal = () => {
    if (!busy) {
      setOpen(false);
      pinRef.current?.clear();
    }
  };

  const setPin = async () => {
    setBusy(true);
    try {
      const {
        data: { control_token },
      } = await axios.post("/api/authorize");

      // https://developers.basistheory.com/docs/sdks/web/react/methods#put
      await (bt as any).put(
        // Typescript bug requires casting
        "https://sandbox-api.marqeta.com/v3/pins", // request is made through the iframe
        {
          control_token, // passing plain text data
          pin: pinRef.current, // passing element in the payload
        },
        {
          // client side authentication goes here
        }
      );

      setSnackbar("PIN set successfully!");
    } catch (error) {
      setSnackbar("An error occurred, check the console for more info.");
      console.log(error);
    } finally {
      setBusy(false);
      closeModal();
    }
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <Button variant="contained" onClick={openModal}>
              Set PIN Number
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={closeModal} keepMounted>
        <DialogBody>
          <Box padding={7}>
            <Box>Enter a 4 digit PIN</Box>
            <Box
              marginTop={2}
              padding={3}
              border="1px solid"
              borderRadius="8px"
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
                  },
                }}
                onChange={({ complete }) => {
                  setValid(complete);
                }}
              />
            </Box>
          </Box>
        </DialogBody>
        <DialogActions sx={{ justifyContent: "center " }}>
          <LoadingButton
            variant="contained"
            disabled={!valid}
            loading={busy}
            onClick={setPin}
          >
            Set PIN Number
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={5000}
        onClose={() => setSnackbar(undefined)}
        message={snackbar}
      />
    </>
  );
};

export { PhysicalCard };
