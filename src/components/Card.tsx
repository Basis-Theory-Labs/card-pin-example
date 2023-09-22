import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  cardNumber?: ReactNode;
  cardholderName?: string;
}
export const Card = ({
  cardNumber = "3759 •••• •••• 2312",
  cardholderName = "James J. Holden",
}: Props) => {
  return (
    <Box width="100%">
      <Box
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "60.48%",
          background:
            "url(/mastercard.png), lightgray 0% 0% / 45.32000124454498px 45.32000124454498px repeat;",
          backgroundSize: "cover",
          borderRadius: "5%/8.4%",
        }}
      >
        <Box
          position="absolute"
          top="0"
          width="100%"
          height="100%"
          sx={{ containerType: "inline-size" }}
        >
          <Box position="absolute" top="56.67%" left="9.6%" width="65%">
            {typeof cardNumber === "string" && (
              <Typography color="white" fontSize="5.734cqw">
                {cardNumber}
              </Typography>
            )}
            {typeof cardNumber !== "string" && cardNumber}
          </Box>
          <Typography
            color="white"
            fontSize="4.84cqw"
            position="absolute"
            top="73%"
            left="9.6%"
          >
            {cardholderName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
