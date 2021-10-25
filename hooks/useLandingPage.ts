import { isValidDateString } from "lib/dateUtils";
import { useRouter } from "next/router";

export default function useLandingPage() {
  const { query } = useRouter();

  return { isLandingPage: !isValidDateString(query.fecha) };
}
