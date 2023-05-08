import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { title } from "process";

interface ScenarioCardProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ScenarioCard({
  title,
  isSelected,
  onClick,
}: ScenarioCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https%3A%2F%2Fwww.sparkplus.co%2Fspot%2Fmain%2Fdetail%2Fsinnonhyeon&psig=AOvVaw3fh-laauG1bqk8xnz8Y9q2&ust=1683626396373000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCPCOraG75f4CFQAAAAAdAAAAABAr"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
