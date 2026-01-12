import { Skeleton, Box } from "@mui/material";

const FollowersLoading = () => {
  return (
    <Box>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          {/* Avatar */}
          <Skeleton variant="circular" width={40} height={40} />

          {/* Name + username */}
          <Box flex={1}>
            <Skeleton variant="text" width="45%" height={18} />
            <Skeleton variant="text" width="30%" height={14} />
          </Box>

          {/* Follow button */}
          <Skeleton variant="rounded" width={80} height={32} />
        </Box>
      ))}
    </Box>
  );
};

export default FollowersLoading;
