import { Avatar, type AvatarProps } from "@mui/material";
import { getImageProps } from "next/image";

type OptimizedAvatarProps = AvatarProps & {
  imageSize: number;
};

export default function OptimizedAvatar({
  imageSize,
  src,
  alt = "",
  ...avatarProps
}: OptimizedAvatarProps) {
  const imageProps = src
    ? getImageProps({ src, alt, width: imageSize, height: imageSize, quality: 60 }).props
    : null;

  return (
    <Avatar
      {...avatarProps}
      alt={alt}
      src={imageProps?.src}
      srcSet={imageProps?.srcSet}
    />
  );
}
