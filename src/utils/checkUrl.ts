export const checkUrl = (message: string): boolean => {
  if (!message) return false;
  return (
    message.toString().includes("http://") ||
    message.toString().includes("https://")
  );
};
