import { CategoryName } from "@mauriciorobayo/pyptron";

const iconsMap: Record<CategoryName, string> = {
  [CategoryName.MOTOS]: "🛵",
  [CategoryName.MOTOCARROS]: "🛵",
  [CategoryName.PARTICULARES]: "🚗",
  [CategoryName.SERVICIO_DE_TRANSPORTE_ESPECIAL]: "🚐",
  [CategoryName.TAXIS]: "🚕",
  [CategoryName.TRANSPORTE_DE_CARGA]: "🚛",
  [CategoryName.TRANSPORTE_PUBLICO_COLECTIVO]: "🚌",
  [CategoryName.CARGA_MAS_DE_20_ANOS_DE_EDAD]: "🚛",
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_3500KG]: "🚛",
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_8500KG]: "🚛",
  [CategoryName.TRANSPORTE_DE_CARGA_MENOR_A_1500KG]: "🚛",
};

type IconProps = {
  className?: string;
  iconName: CategoryName;
};

const Icon = ({ iconName, className = "" }: IconProps) => (
  <span aria-label="iconName" className={className} role="img">
    {iconsMap[iconName]}
  </span>
);

export default Icon;
