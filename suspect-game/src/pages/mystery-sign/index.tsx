import { useState } from "react";
import { Box, Radio, RadioGroup, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import HintList from "@/features/mystery-sign/components/HintList";
import TargetProblem from "@/features/mystery-sign/components/TargetProblem";
import HintInput from "@/features/mystery-sign/components/HintInput";
import { HintType } from "@/features/mystery-sign/types";
import HomeButton from "@/components/HomeButton";

export default function Main() {
  const [hintList, setHintList] = useState<HintType[]>([]);
  const [round, setRound] = useState(0);
  //라운드 변경 시 확인 모달을 띄우고, 확인 시 힌트 리스트를 지우고 라운드를 변경합니다.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      window.confirm(
        `${round}라운드를 종료하고 ${event.target.value}라운드를 시작할까요?`
      )
    ) {
      setRound(Number(event.target.value));
      setHintList([]);
    }
  };

  const handleEnterHint = (hint: HintType) => {
    setHintList([...hintList, hint]);
  };

  const controlProps = (item: string) => ({
    checked: `${round}` === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <Box sx={{ mt: 6 }} textAlign="center">
      <HomeButton />
      <Typography fontFamily="Zen Dots" variant="h2">
        MYSTERY SIGN
      </Typography>
      <Typography fontFamily="Zen Dots" variant="body1">
        {round === 0 ? "튜토리얼 라운드" : `Round ${round}`}
      </Typography>
      <Typography mt={1} fontFamily="Zen Dots" variant="body2">
        추러스 12월 정기모임
      </Typography>
      <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
        <RadioGroup row name="use-radio-group" defaultValue="first">
          <Radio
            {...controlProps("0")}
            sx={{
              color: yellow[800],
              "&.Mui-checked": {
                color: yellow[600],
              },
            }}
          />
          <Radio {...controlProps("1")} />
          <Radio {...controlProps("2")} />
          <Radio {...controlProps("3")} />
          <Radio {...controlProps("4")} />
          <Radio {...controlProps("5")} />
          <Radio {...controlProps("6")} />
          <Radio {...controlProps("7")} />
          <Radio {...controlProps("8")} />
          <Radio {...controlProps("9")} />
        </RadioGroup>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <TargetProblem round={round} />
      </Box>

      <Box
        sx={{
          mt: 6,
        }}
        display="flex"
        justifyContent="center"
      >
        <HintInput round={round} onEnterHint={handleEnterHint} />
      </Box>
      <HintList hintList={hintList} />
    </Box>
  );
}
