import {
  Badge,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export interface GameContentType {
  title: string;
  url: string;
  imgSrc: string;
  isNew?: boolean;
}

export default function GameCard({ content }: { content: GameContentType }) {
  const router = useRouter();
  return (
    <Badge
      color="error"
      variant="standard"
      invisible={!content.isNew}
      badgeContent="N"
      sx={{
        width: "100%",
      }}
    >
      <CardActionArea
        sx={{
          width: "100%",
          borderRadius: "20px",
        }}
        onClick={() => {
          router.push(`/${content.url}`);
        }}
      >
        <Card
          sx={{
            minHeight: 60,
            color: "#121212",
            alignItems: "center",
            borderRadius: "20px",
            verticalAlign: "middle",
            display: "flex",
          }}
        >
          <CardMedia
            component="img"
            image={content.imgSrc}
            title={content.title}
            sx={{
              height: 60,
              width: 60,
              textAlign: "center",
              justifyContent: "center",
              borderRadius: "20px",
            }}
          />

          <Typography
            color="#202836"
            textAlign="center"
            fontSize="18px"
            sx={{
              width: "100%",
              wordBreak: "keep-all",
            }}
          >
            {content.title}
          </Typography>
        </Card>
      </CardActionArea>
    </Badge>
  );
}
