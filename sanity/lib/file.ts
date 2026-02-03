/**
 * Helper function to generate Sanity file URLs
 * Sanity file reference format: file-{fileId}-{extension}
 */
export const urlForFile = (file: any) => {
  if (!file?.asset) {
    return undefined;
  }

  // If the asset already has a URL, use it
  if (file.asset.url) {
    return file.asset.url;
  }

  // Otherwise, construct from the reference
  if (!file.asset._ref) {
    return undefined;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  // Sanity file reference format: file-{fileId}-{extension}
  // Example: file-abc123def456-pdf
  const ref = file.asset._ref;
  
  // Remove 'file-' prefix and split by last '-' to separate fileId and extension
  const withoutPrefix = ref.replace('file-', '');
  const lastDashIndex = withoutPrefix.lastIndexOf('-');
  
  if (lastDashIndex === -1) {
    return undefined;
  }
  
  const fileId = withoutPrefix.substring(0, lastDashIndex);
  const extension = withoutPrefix.substring(lastDashIndex + 1);
  
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;
};
