import { CategoryName } from "@mauriciorobayo/pyptron";
import styled from "styled-components";
import BusIcon from "svg-emojis/twemoji/1f68c.svg";
import MinivanIcon from "svg-emojis/twemoji/1f690.svg";
import TaxiIcon from "svg-emojis/twemoji/1f695.svg";
import CarIcon from "svg-emojis/twemoji/1f697.svg";
import TruckIcon from "svg-emojis/twemoji/1f69b.svg";
import MotoIcon from "svg-emojis/twemoji/1f6f5.svg";

const iconsMap: Record<CategoryName, any> = {
  [CategoryName.MOTOS]: MotoIcon,
  [CategoryName.MOTOCARROS]: MotoIcon,
  [CategoryName.PARTICULARES]: CarIcon,
  [CategoryName.SERVICIO_DE_TRANSPORTE_ESPECIAL]: MinivanIcon,
  [CategoryName.TAXIS]: TaxiIcon,
  [CategoryName.TRANSPORTE_DE_CARGA]: TruckIcon,
  [CategoryName.TRANSPORTE_PUBLICO_COLECTIVO]: BusIcon,
  [CategoryName.CARGA_MAS_DE_20_ANOS_DE_EDAD]: TruckIcon,
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_3500KG]: TruckIcon,
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_8500KG]: TruckIcon,
  [CategoryName.TRANSPORTE_DE_CARGA_MENOR_A_1500KG]: TruckIcon,
};

type IconProps = {
  className?: string;
  iconName: CategoryName;
};

function Icon({ iconName, className }: IconProps) {
  const SVGIcon = iconsMap[iconName];
  return <SVGIcon className={className} />;
}

export default styled(Icon)`
  height: 1em;
  width: 1em;
`;
