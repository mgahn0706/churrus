import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { SuspectType, VictimType } from "@/features/suspect/types";
import { useEffect, useMemo, useState } from "react";

interface SuspectsInfoCardProps {
  isOpen: boolean;
  victims: VictimType[];
  suspects: SuspectType[];
  onClose: () => void;
}

export default function SuspectsInfoCard({
  isOpen,
  victims,
  suspects,
  onClose,
}: SuspectsInfoCardProps) {
  const [selectedProfile, setSelectedProfile] = useState<{
    role: "victim" | "suspect";
    name: string;
  } | null>(null);
  const [isStatementOpen, setIsStatementOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || selectedProfile) {
      return;
    }

    if (victims.length > 0) {
      setSelectedProfile({ role: "victim", name: victims[0].name });
      return;
    }

    if (suspects.length > 0) {
      setSelectedProfile({ role: "suspect", name: suspects[0].name });
    }
  }, [isOpen, victims, suspects, selectedProfile]);

  useEffect(() => {
    setIsStatementOpen(false);
  }, [selectedProfile]);

  const selectedPerson = useMemo(() => {
    if (!selectedProfile) {
      return null;
    }

    if (selectedProfile.role === "victim") {
      const victim = victims.find((v) => v.name === selectedProfile.name);
      return victim ? { ...victim, role: "victim" as const } : null;
    }

    const suspect = suspects.find((s) => s.name === selectedProfile.name);
    return suspect ? { ...suspect, role: "suspect" as const } : null;
  }, [selectedProfile, victims, suspects]);

  const genderIcon = (gender: "male" | "female") => {
    return gender === "male" ? (
      <Male fontSize="small" />
    ) : (
      <Female fontSize="small" />
    );
  };

  return (
    <Dialog open={isOpen} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={700}>
          용의자 / 피해자 정보
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "300px 1fr" }}
          minHeight={430}
        >
          <Box sx={{ p: 2, backgroundColor: "action.hover" }}>
            {victims.length > 0 && (
              <>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ letterSpacing: 0.7 }}
                >
                  피해자
                </Typography>
                <Box mt={1} display="flex" flexDirection="column" gap={0.4}>
                  {victims.map((victim) => {
                    const selected =
                      selectedProfile?.role === "victim" &&
                      selectedProfile.name === victim.name;

                    return (
                      <Button
                        key={victim.name}
                        variant="text"
                        color="primary"
                        onClick={() =>
                          setSelectedProfile({ role: "victim", name: victim.name })
                        }
                        sx={{
                          justifyContent: "flex-start",
                          textTransform: "none",
                          borderRadius: 1.5,
                          py: 0.8,
                          px: 1,
                          backgroundColor: selected
                            ? "primary.main"
                            : "transparent",
                          color: selected
                            ? "primary.contrastText"
                            : "text.primary",
                          "&:hover": {
                            backgroundColor: selected
                              ? "primary.dark"
                              : "rgba(0,0,0,0.04)",
                          },
                        }}
                      >
                        <Avatar src={victim.image} sx={{ width: 28, height: 28, mr: 1 }} />
                        <Box textAlign="left">
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Typography fontWeight={700} fontSize={13}>
                              {victim.name} ({victim.age})
                            </Typography>
                            <Box
                              color={selected ? "inherit" : "text.secondary"}
                              display="flex"
                            >
                              {genderIcon(victim.gender)}
                            </Box>
                          </Box>
                          <Typography fontSize={11}>{victim.job}</Typography>
                        </Box>
                      </Button>
                    );
                  })}
                </Box>
                <Divider sx={{ my: 1.6 }} />
              </>
            )}

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ letterSpacing: 0.7 }}
            >
              용의자
            </Typography>
            <Box mt={1} display="flex" flexDirection="column" gap={0.4}>
              {suspects.map((suspect) => {
                const selected =
                  selectedProfile?.role === "suspect" &&
                  selectedProfile.name === suspect.name;

                return (
                  <Button
                    key={suspect.name}
                    variant="text"
                    color="primary"
                    onClick={() =>
                      setSelectedProfile({ role: "suspect", name: suspect.name })
                    }
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      borderRadius: 1.5,
                      py: 0.8,
                      px: 1,
                      backgroundColor: selected
                        ? "primary.main"
                        : "transparent",
                      color: selected ? "primary.contrastText" : "text.primary",
                      "&:hover": {
                        backgroundColor: selected
                          ? "primary.dark"
                          : "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <Avatar
                      src={suspect.image}
                      sx={{ width: 28, height: 28, mr: 1 }}
                    />
                    <Box textAlign="left">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography fontWeight={700} fontSize={13}>
                          {suspect.name} ({suspect.age})
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          color={selected ? "inherit" : "text.secondary"}
                        >
                          {genderIcon(suspect.gender)}
                        </Box>
                      </Box>
                      <Typography fontSize={11}>{suspect.job}</Typography>
                    </Box>
                  </Button>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            {selectedPerson ? (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" gap={1.2}>
                    <Avatar src={selectedPerson.image} sx={{ width: 92, height: 92 }} />
                    <Box>
                      <Box display="flex" alignItems="center" gap={0.6}>
                        <Typography variant="h4" fontWeight={700}>
                          {selectedPerson.name}
                        </Typography>
                        <Typography color="text.secondary">
                          ({selectedPerson.age})
                        </Typography>
                        <Box color="text.secondary" display="flex">
                          {genderIcon(selectedPerson.gender)}
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <WorkIcon
                          sx={{ color: "text.secondary", width: 16, mr: 0.7 }}
                        />
                        <Typography color="text.secondary">
                          {selectedPerson.job}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip
                    label={selectedPerson.role === "suspect" ? "용의자" : "피해자"}
                    color={selectedPerson.role === "suspect" ? "primary" : "default"}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="text.secondary" mb={0.8}>
                  자기소개
                </Typography>
                <Typography
                  sx={{ lineHeight: 1.8, wordBreak: "keep-all", mb: 2.3 }}
                >
                  {selectedPerson.description}
                </Typography>

                {selectedPerson.role === "suspect" && (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      endIcon={
                        isStatementOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                      }
                      sx={{ textTransform: "none", mb: 0.6 }}
                      onClick={() => setIsStatementOpen((prev) => !prev)}
                    >
                      {isStatementOpen ? "행적 진술 숨기기" : "행적 진술 보기"}
                    </Button>

                    {isStatementOpen && (
                      <Typography sx={{ lineHeight: 1.9, wordBreak: "keep-all" }}>
                        {selectedPerson.statement}
                      </Typography>
                    )}
                  </>
                )}
              </>
            ) : (
              <Typography color="text.secondary">인물을 선택하세요.</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
