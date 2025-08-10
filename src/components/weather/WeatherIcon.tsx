import { FC } from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  Snowflake,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Moon,
} from "lucide-react";

export interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

const WeatherIcon: FC<WeatherIconProps> = ({ condition, size = 32, className }) => {
  const c = condition.toLowerCase();

  if (c.includes("storm") || c.includes("thunder")) return <CloudLightning size={size} className={className} />;
  if (c.includes("rain") || c.includes("shower")) return <CloudRain size={size} className={className} />;
  if (c.includes("drizzle")) return <CloudDrizzle size={size} className={className} />;
  if (c.includes("snow")) return <Snowflake size={size} className={className} />;
  if (c.includes("fog") || c.includes("mist")) return <CloudFog size={size} className={className} />;
  if (c.includes("partly") || c.includes("mostly")) return <CloudSun size={size} className={className} />;
  if (c.includes("clear") || c.includes("night")) return <Moon size={size} className={className} />;
  if (c.includes("sun") || c.includes("sunny")) return <Sun size={size} className={className} />;
  if (c.includes("cloud")) return <Cloud size={size} className={className} />;

  return <Sun size={size} className={className} />;
};

export default WeatherIcon;
