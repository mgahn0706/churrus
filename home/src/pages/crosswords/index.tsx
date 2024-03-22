import GlobalHeader from "@/components/Navigation/GlobalHeader";
import CrosswordCard from "@/features/crosswords/components/CrosswordCard";
import { CROSSWORDS, MINI_CROSSWORDS } from "@/features/crosswords/fixtures";

import { Box, Grid, Tab, Tabs } from "@mui/material";
import Head from "next/head";

import { useState } from "react";

const BACKGROUND_COLOR = "#f2f3f6";

export default function Crosswords() {
  const [selectedVariant, setSelectedVariant] = useState<"BASIC" | "MINI">(
    "BASIC"
  );

  return (
    <>
      <Head>
        <title>추로스워드 : 서울대 추리 동아리</title>
      </Head>
      <GlobalHeader />
      <Box
        minHeight="100dvh"
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
      >
        <Box
          height="100vh"
          overflow="scroll"
          px={[2, 6, 10]}
          width="100%"
          maxWidth={1000}
          pb={6}
        >
          <Box
            width="100%"
            textAlign="left"
            color="#212837"
            mt={[3, 4, "100px"]}
            mb={[2, 3, 4]}
            borderBottom={`1px solid #e0e0e0`}
          >
            <Tabs
              value={selectedVariant}
              onChange={(e, value) => setSelectedVariant(value)}
            >
              <Tab label="BASIC" value="BASIC" />
              <Tab label="MINI" value="MINI" />
            </Tabs>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <Grid container spacing={[3, 4, 6]} width="100%">
              {selectedVariant === "BASIC"
                ? CROSSWORDS.map((crossword) => (
                    <CrosswordCard {...crossword} />
                  ))
                : MINI_CROSSWORDS.map((crossword) => (
                    <CrosswordCard {...crossword} />
                  ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
