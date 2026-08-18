export function refCode(id) {
  return id ? id.replace(/-/g, "").slice(-6).toUpperCase() : "000000";
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote"];
