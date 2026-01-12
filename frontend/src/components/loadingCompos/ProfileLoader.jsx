import { Skeleton, Box } from "@mui/material";

const ProfileLoader = () => {
  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: 2, p: 3, height: "500px" }}>
      {/* Top section */}
      <Box display="flex" alignItems="center" gap={3}>
        {/* Avatar */}
        <Skeleton variant="circular" width={90} height={90} />

        {/* User info */}
        <Box flex={1}>
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="text" width="25%" height={18} />

          <Box display="flex" gap={3} mt={1}>
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
          </Box>
        </Box>
      </Box>

      {/* Bio */}
      <Box mt={3}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </Box>

      {/* Action buttons */}
      <Box display="flex" gap={2} mt={3}>
        <Skeleton variant="rounded" width={100} height={36} />
        <Skeleton variant="rounded" width={100} height={36} />
      </Box>
    </Box>
  );
};

export default ProfileLoader;
