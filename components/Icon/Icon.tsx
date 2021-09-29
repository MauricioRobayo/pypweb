import { CategoryName } from "@mauriciorobayo/pyptron";
import styled from "styled-components";
import Scooter from "svg-emojis/twemoji/1f3cd.svg";
import Megaphone from "svg-emojis/twemoji/1f4e3.svg";
import Bus from "svg-emojis/twemoji/1f68c.svg";
import Minibus from "svg-emojis/twemoji/1f690.svg";
import Taxi from "svg-emojis/twemoji/1f695.svg";
import Car from "svg-emojis/twemoji/1f697.svg";
import RecreationalVehicle from "svg-emojis/twemoji/1f699.svg";
import DeliveryTruck from "svg-emojis/twemoji/1f69a.svg";
import ArticulatedLorry from "svg-emojis/twemoji/1f69b.svg";
import StarEyes from "svg-emojis/twemoji/1f929.svg";

type IconName = keyof typeof iconsMap;
const iconsMap = {
  [CategoryName.CARGA_MAS_DE_20_ANOS_DE_EDAD]: ArticulatedLorry,
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_3500KG]: ArticulatedLorry,
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_8500KG]: ArticulatedLorry,
  [CategoryName.MOTOCARROS]: Scooter,
  [CategoryName.MOTOS]: Scooter,
  [CategoryName.PARTICULARES]: Car,
  [CategoryName.SERVICIO_DE_TRANSPORTE_ESPECIAL]: Minibus,
  [CategoryName.TAXIS]: Taxi,
  [CategoryName.TRANSPORTE_DE_CARGA_MENOR_A_1500KG]: ArticulatedLorry,
  [CategoryName.TRANSPORTE_DE_CARGA]: ArticulatedLorry,
  [CategoryName.TRANSPORTE_PUBLICO_COLECTIVO]: Bus,
  "🚚": DeliveryTruck,
  "📣": Megaphone,
  "🚙": RecreationalVehicle,
  "🤩": StarEyes,
  "🚐": Minibus,
  "🚗": Car,
  "🚛": ArticulatedLorry,
  "🛵": Scooter,
  "🚕": Taxi,
};

type IconProps = {
  className?: string;
  name: IconName;
};

function Icon({ name, className }: IconProps) {
  const SVGIcon = iconsMap[name];
  return <SVGIcon className={className} />;
}

export default styled(Icon)`
  height: 1em;
  width: 1em;
`;
