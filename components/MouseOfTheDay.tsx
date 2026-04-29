import { getMouseForDay } from "@/lib/mily-data";
import { MouseOfTheDayClient } from "@/components/MouseOfTheDayClient";

export function MouseOfTheDay() {
  const { index } = getMouseForDay(new Date());
  return <MouseOfTheDayClient initialIndex={index} />;
}
