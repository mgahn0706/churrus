import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ScenarioType } from "@/features/suspect/types";
import { useRouter } from "next/router";

interface ScenarioCardProps {
  scenario: ScenarioType;
  isSelected: boolean;
  onDeslect: () => void;
  onClick: () => void;
}

export default function ScenarioCard({
  scenario,
  isSelected,
  onClick,
  onDeslect,
}: ScenarioCardProps) {
  const router = useRouter();

  return (
    <Card
      sx={{
        padding: 0,
      }}
    >
      <CardActionArea>
        {isSelected && (
          <CheckIcon
            onClick={isSelected ? onDeslect : onClick}
            sx={{
              zIndex: 1,
              position: "absolute",
              width: 50,
              height: 50,
              backgroundColor: "rgb(24 118 210)",
              color: "white",
            }}
          />
        )}
        <CardMedia
          sx={{
            height: 140,
            backgroundPosition: "center",
          }}
          onClick={isSelected ? onDeslect : onClick}
          image={`/image/card/${scenario.keyword}-card.png`}
        />
        <CardContent
          onClick={
            isSelected
              ? () => {
                  if (scenario.isInDevelopment) {
                    onDeslect();
                    return;
                  }

                  router.push(`/suspect/${scenario.keyword}`);
                  localStorage.removeItem(scenario.keyword);
                }
              : onClick
          }
          sx={{
            alignItems: "center",
            py: 1,
            display: "flex",
            backgroundColor: isSelected
              ? scenario.isInDevelopment
                ? "gray"
                : "rgb(24 118 210)"
              : "white",
            justifyContent: "center",
          }}
        >
          <Typography
            color={isSelected ? "white" : "black"}
            gutterBottom
            variant="h5"
            component="div"
          >
            {isSelected
              ? scenario.isInDevelopment
                ? "준비중..."
                : "시작"
              : scenario.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
