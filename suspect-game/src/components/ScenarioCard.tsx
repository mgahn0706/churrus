import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ScenarioType } from "@/fixtures";
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
        width: 300,
        boxShadow: isSelected
          ? "0 0 30px 10px #fff, 0 0 20px 10px rgb(24 118 210)"
          : "",
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
          onClick={isSelected ? onDeslect : onClick}
          component="img"
          width="140"
          height="140"
          image={`/image/card/${scenario.keyword}-card.png`}
          alt="startup-image"
        />
        <CardContent
          onClick={
            isSelected
              ? () => {
                  router.push(`/${scenario.keyword}`);
                  localStorage.removeItem(scenario.keyword);
                }
              : onClick
          }
          sx={{
            alignItems: "center",
            py: 1,
            display: "flex",
            backgroundColor: isSelected ? "rgb(24 118 210)" : "white",
            justifyContent: "center",
          }}
        >
          <Typography
            color={isSelected ? "white" : "black"}
            gutterBottom
            variant="h5"
            component="div"
          >
            {isSelected ? "시작" : scenario.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
