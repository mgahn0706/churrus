"use client";

import { Box, TextField } from "@mui/material";
import type { InterrogationEvidence } from "@/types";

export default function EvidenceEditor({
  value,
  onChange,
  image = true,
  showId = true,
}: {
  value: InterrogationEvidence;
  onChange: (value: InterrogationEvidence) => void;
  image?: boolean;
  showId?: boolean;
}) {
  const edit = (patch: Partial<InterrogationEvidence>) => onChange({ ...value, ...patch });

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: showId ? "160px 1fr" : "1fr" }, gap: 1 }}>
      {showId && <TextField size="small" label="단서 ID" value={value.id} onChange={(event) => edit({ id: event.target.value })} />}
      <TextField size="small" label="단서 이름" value={value.title} onChange={(event) => edit({ title: event.target.value })} />
      <TextField size="small" label="단서 내용" value={value.description} onChange={(event) => edit({ description: event.target.value })} multiline minRows={2} sx={{ gridColumn: "1 / -1" }} />
      {image && (
        <>
          <TextField size="small" label="사진 경로" placeholder="/image/scenario/psychic/clue/파일.png" value={value.image ?? ""} onChange={(event) => edit({ image: event.target.value || undefined })} sx={{ gridColumn: "1 / -1" }} />
          {value.image && <Box component="img" src={value.image} alt={value.title} sx={{ gridColumn: "1 / -1", maxWidth: "100%", maxHeight: 180, objectFit: "contain", justifySelf: "start", bgcolor: "#090e0c" }} />}
        </>
      )}
    </Box>
  );
}
