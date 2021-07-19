export const checkUrl = (message: string): boolean => {
  return message.includes("http://") || message.includes("https://");
};
