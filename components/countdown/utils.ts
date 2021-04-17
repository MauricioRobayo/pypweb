// eslint-disable-next-line import/prefer-default-export
export const formatDistance = (endTime: Date, startTime = new Date()) => {
  const distance = Math.max(Number(endTime) - Number(startTime), 0);
  const hours = Math.floor(distance / (60 * 60 * 1000));
  const minutes = Math.floor(distance / (60 * 1000)) % 60;

  const stringParts: string[] = [];

  if (hours) {
    stringParts.push(`${hours}h`);
  }

  if (minutes) {
    stringParts.push(`${minutes}m`);
  }

  return stringParts.join(" ");
};
