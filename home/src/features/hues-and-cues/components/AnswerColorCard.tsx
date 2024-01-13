import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getColorCodeFromNumbers } from "../libs";
import { VisibilityOff } from "@mui/icons-material";

export default function AnswerColorCard({
  color,
}: {
  color: [number, number];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEyesAllClosed, setIsEyesAllClosed] = useState(false);

  return (
    <>
      <Box
        position="fixed"
        top={0}
        right={70}
        borderRadius="0 0 5px 5px"
        bgcolor="#313131"
        color="white"
        py={1}
        width="180px"
        display="flex"
        justifyContent="center"
        onClick={() => {
          setIsModalOpen(true);
        }}
        sx={{
          cursor: "pointer",
          zIndex: 1,
        }}
        alignItems="center"
        boxShadow="0px 0px 10px 5px rgba(255,255,255,0.25)"
      >
        힌트 제시자 카드
      </Box>
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsEyesAllClosed(false);
          setIsModalOpen(false);
        }}
      >
        <DialogTitle>힌트 제시자 카드</DialogTitle>
        <DialogContent>
          {isEyesAllClosed ? (
            <Box
              display="flex"
              width="300px"
              height="400px"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">이번 라운드 설명 색깔은</Typography>
              <Box width="50px" height="50px" bgcolor="purple" mt={1} />
              <Typography fontSize="2.5rem" fontWeight="bolder">
                {getColorCodeFromNumbers(color)}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                }}
              >
                입니다.
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              width="300px"
              alignItems="center"
              height="400px"
              color="#121212"
              textAlign="center"
              border={0}
              borderRadius="5px"
              justifyContent="center"
              bgcolor="#D2D2D2"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setIsEyesAllClosed(true)}
            >
              <VisibilityOff sx={{ fontSize: "5rem" }} />
              <Typography variant="h6">
                힌트 제시자를 제외하고 <br /> 모두 눈을 감아주세요.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
