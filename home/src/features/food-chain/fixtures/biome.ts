import { Biome, BiomeId } from "../types";

export const BIOMES: Record<BiomeId, Biome> = {
  SKY: {
    id: "SKY",
    name: "하늘",
    color: "#5B3A6E",
  },
  FIELD: {
    id: "FIELD",
    name: "들",
    color: "#EB4410",
  },
  FOREST: {
    id: "FOREST",
    name: "숲",
    color: "#2C763B",
  },
  RIVER: {
    id: "RIVER",
    name: "강",
    color: "#17A391",
  },
};
