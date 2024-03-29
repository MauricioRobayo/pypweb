export const formatDistance = (endTime: Date, startTime = new Date()) => {
  const ONE_MINUTE = 60 * 1000;
  const distance = Math.max(
    Number(endTime) - Number(startTime) + ONE_MINUTE,
    0
  );

  if (distance <= 0) {
    return "";
  }

  const hours = Math.floor(distance / (60 * 60 * 1000));
  const minutes = Math.floor(distance / (60 * 1000)) % 60;

  const stringParts: string[] = [];

  if (hours) {
    stringParts.push(`${hours}h`);
  }

  stringParts.push(`${minutes}m`);

  return stringParts.join(" ");
};
