export interface AdventureCoordinate {
  x: number;
  y: number;
}

export interface AdventureStop {
  id: string;
  name: string;
  area: string;
  description: string;
  progress: number;
  coordinate: AdventureCoordinate;
}

export interface AdventureJourney {
  id: string;
  year: number;
  season: "여름" | "겨울";
  title: string;
  subtitle: string;
  meetingId?: string;
  distance: string;
  duration: string;
  playbackDurationMs: number;
  accentColor: string;
  secondaryColor: string;
  stops: AdventureStop[];
  route: AdventureCoordinate[];
}
