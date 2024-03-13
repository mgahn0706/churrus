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
  width: number | string;
  height: number | string;
  style?: CSSProperties;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      width={width}
      height={height}
    >
      <Image
        src={src}
        alt={alt}
        style={{
          ...style,
        }}
        fill
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
