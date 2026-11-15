import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface QuizImageProps {
  src: string;
  alt: string;
  priority: boolean;
}

export default function QuizImage({ src, alt, priority }: QuizImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  return (
    <Box width="100%" position="relative" sx={{ aspectRatio }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            position: "absolute",
            inset: 0,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={Math.round(1200 / aspectRatio)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "12px",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
        priority={priority}
        unoptimized
        onLoadingComplete={(image) => {
          if (image.naturalWidth > 0 && image.naturalHeight > 0) {
            setAspectRatio(image.naturalWidth / image.naturalHeight);
          }
          setIsLoading(false);
        }}
        onError={() => setIsLoading(false)}
      />
    </Box>
  );
}
