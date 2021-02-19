const iconsMap: Record<string, string> = {
  ambiental: "🌻",
  carga: "🚛",
  especial: "🚐",
  motos: "🛵",
  particulares: "🚗",
  taxis: "🚕",
  tpc: "🚌",
};

type IconProps = {
  iconName: string;
};

const Icon = ({ iconName }: IconProps) => (
  <span aria-label="iconName" role="img">
    {iconsMap[iconName]}
  </span>
);

export default Icon;
