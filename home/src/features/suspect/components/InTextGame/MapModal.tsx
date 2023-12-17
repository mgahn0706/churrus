import { Dialog, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import TabPanel from "../Answer/TabPanel";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useMobileWidth } from "@/hooks/useMobileWIdth";

export default function MapModal({
  isOpen,
  places,
  onClose,
}: {
  isOpen: boolean;
  places: string[];
  onClose: () => void;
}) {
  const [selectedMap, setSelectedMap] = useState(places[0]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedMap(newValue);
  };

  const { isMobileWidth } = useMobileWidth();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        p: 1,
      }}
      maxWidth={isMobileWidth ? "xs" : "lg"}
    >
      <Tabs value={selectedMap} onChange={handleChange}>
        {places.map((place) => {
          return <Tab label={place.split("-")[1]} value={place} />;
        })}
      </Tabs>
      <TabPanel value={selectedMap} index={selectedMap}>
        <Image
          width={isMobileWidth ? 300 : 1080}
          height={isMobileWidth ? 160 : 600}
          priority
          alt="맵 이미지"
          src={`/image/map/${selectedMap}.png`}
        />
      </TabPanel>
    </Dialog>
  );
}
