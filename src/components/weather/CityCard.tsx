import { FC, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeatherIcon from "@/components/weather/WeatherIcon";
import { Droplets, Wind } from "lucide-react";

export interface City {
  name: string;
  tempC: number;
  condition: string;
  humidity: number;
  windKph: number;
}

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

const CityCard: FC<{ city: City; isCelsius: boolean }> = ({ city, isCelsius }) => {
  const temp = useMemo(() => (isCelsius ? city.tempC : toF(city.tempC)), [isCelsius, city.tempC]);

  return (
    <Card className="group transition-all duration-300 hover:shadow-glow hover:border-brand/40 border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight">{city.name}</CardTitle>
          <div className="text-sm text-muted-foreground">{city.condition}</div>
        </div>
        <WeatherIcon condition={city.condition} className="text-foreground/80" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold leading-none">{temp}</span>
          <span className="text-lg text-muted-foreground">°{isCelsius ? "C" : "F"}</span>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Droplets size={16} />
            <span>{city.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind size={16} />
            <span>{city.windKph} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityCard;
