import { Skeleton, Box } from "@mui/material";

const PostSkeleton = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        p: 2,
        mb: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      {/* User row */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box flex={1}>
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton variant="text" width="25%" height={14} />
        </Box>
      </Box>

      {/* Post text */}
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />

      {/* Post image */}
      <Skeleton
        variant="rectangular"
        height={220}
        sx={{ mt: 1.5, borderRadius: 2 }}
      />

      {/* Actions */}
      <Box display="flex" gap={2} mt={2}>
        <Skeleton variant="rounded" width={60} height={28} />
        <Skeleton variant="rounded" width={60} height={28} />
        <Skeleton variant="rounded" width={60} height={28} />
      </Box>
    </Box>
  );
};

export default PostSkeleton;