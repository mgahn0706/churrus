import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { MEETINGS } from "../../fixtures/meetings";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getMeetingCreators } from "../../domain";

const CREATOR_SCROLL_SPEED = 120; // pixels per second

function SlidingCreators({
  creators,
  isHovered,
}: {
  creators: string[];
  isHovered: boolean;
}) {
  const viewportRef = useRef<HTMLParagraphElement>(null);
  const label = creators.join(", ");

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (!isHovered) {
      viewport.scrollLeft = 0;
      return;
    }

    const scrollDistance = viewport.scrollWidth - viewport.clientWidth;
    if (scrollDistance <= 0) return;

    const duration = (scrollDistance / CREATOR_SCROLL_SPEED) * 1000;
    let startTime: number | undefined;
    let frameId: number;

    const slide = (timestamp: number) => {
      startTime ??= timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      viewport.scrollLeft = scrollDistance * progress;

      if (progress < 1) {
        frameId = requestAnimationFrame(slide);
      }
    };

    frameId = requestAnimationFrame(slide);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered, label]);

  return (
    <Typography
      ref={viewportRef}
      color="#606B80"
      fontSize="12px"
      sx={{
        width: 1,
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box
        component="span"
        sx={{
          display: "inline-block",
        }}
      >
        {label}
      </Box>
    </Typography>
  );
}

export default function MeetingCard({
  meetingId,
  size = "medium",
}: {
  meetingId: string;
  size?: "small" | "medium";
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const imageHeight = size === "small" ? 40 : 72;

  const meeting = MEETINGS[meetingId];

  const creators = getMeetingCreators(meeting.id);

  return (
    <Box
      display="flex"
      height={imageHeight}
      width={1}
      alignItems="center"
      py={1}
      gap={size === "small" ? 1 : 2}
      borderRadius="12px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        router.push(`/meetings/${meeting.id}`);
      }}
      sx={{
        cursor: "pointer",
        ":hover": {
          "& .meeting-card-image": {
            transform: "scale(1.2)",
            transition: "all 0.3s",
          },
        },
      }}
    >
      <Box
        width={imageHeight}
        height={imageHeight}
        overflow="hidden"
        borderRadius={size === "small" ? "4px" : "12px"}
        display="flex"
        minWidth={imageHeight}
        justifyContent="center"
      >
        <Image
          className="meeting-card-image"
          width={(imageHeight * 16) / 9}
          height={imageHeight}
          src={meeting.imageSource ?? "/image/quiz/meeting/default.png"}
          alt={meeting.title}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={1}
        minWidth={0}
      >
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={["200px", "300px", "500px"]}
          minWidth={0}
          width={1}
          sx={{ wordBreak: "keep-all" }}
        >
          <Typography
            color="#121212"
            fontSize={size === "small" ? "14px" : "18px"}
            fontWeight={500}
          >
            {meeting.title}
          </Typography>
          {size !== "small" && (
            <SlidingCreators creators={creators} isHovered={isHovered} />
          )}
        </Box>

        <Typography color="#606B80" fontSize="12px" sx={{ mb: 1 }}>
          문제 {meeting.quizIds.length}개
        </Typography>
      </Box>
    </Box>
  );
}
