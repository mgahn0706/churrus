import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function CubeInAuction({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowingNumber, setIsShowingNumber] = useState(false);

  useEffect(() => {
    setIsShowingNumber(false);
  }, [children]);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        width="150px"
        height="150px"
        m={8}
        lineHeight="150px"
        fontSize="90px"
        textAlign="center"
        fontWeight="bolder"
        onClick={() => {
          setIsShowingNumber(!isShowingNumber);
        }}
        sx={{
          transition: "all 0.1s ease-in-out",
          cursor: "pointer",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
          backgroundImage: `url("https://m.media-amazon.com/images/I/817Q3VCabwL.jpg")`,
          "&:hover": {
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
            transform: "scale(1.05)",
          },
        }}
      >
        {isShowingNumber ? children : "?"}
      </Box>
    </Box>
  );
}
