"use client";

import {
  AppBar,
  Container,
  styled,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Box } from "@mui/system";
import { PhysicalCard } from "@/components/PhysicalCard";
import {
  BasisTheoryProvider,
  useBasisTheory,
} from "@basis-theory/basis-theory-react";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
export default function Home() {
  const [tab, setTab] = useState("physical");
  const { bt } = useBasisTheory(
    process.env.NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY,
    {
      elements: true,
    }
  );

  return (
    <>
      <BasisTheoryProvider bt={bt}>
        <AppBar position="fixed" elevation={0} color="secondary">
          <Toolbar sx={{ justifyContent: "center" }} color="secondary">
            My Bank
          </Toolbar>
        </AppBar>
        <Offset />
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(_, value) => setTab(value)} centered>
              <Tab label="Physical Card" value="physical" />
              <Tab label="Virtual Card" value="virtual" />
            </TabList>
          </Box>
          <Container component="main" maxWidth="sm">
            <Typography variant="h4" textAlign="center" marginTop={6}>
              Your Credit Card
            </Typography>
            <TabPanel value="physical">
              <PhysicalCard />
            </TabPanel>
            <TabPanel value="virtual">Coming soon...</TabPanel>
          </Container>
        </TabContext>
      </BasisTheoryProvider>
    </>
  );
}
