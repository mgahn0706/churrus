import quiz from "@/pages/quiz";
import { Box, Skeleton } from "@mui/material";
import { CSSProperties, useState } from "react";
import Image from "next/image";

export default function ImageWithPlaceHolder({
  src,
  alt,
  style,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: CSSProperties;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Image
        src={src}
        alt={alt}
        style={{
          ...style,
        }}
        width={isImageLoading ? 0 : width}
        height={isImageLoading ? 0 : height}
        priority
        onLoadingComplete={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      />
      {isImageLoading && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            borderRadius: "0.5rem",
            bgcolor: "rgba(255, 255, 255, 0.7)",
          }}
        />
      )}
    </Box>
  );
}
