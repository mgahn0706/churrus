import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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
          image="../../public/startup-main.png"
          alt="startup-image"
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
