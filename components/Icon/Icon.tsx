import { MdWeb } from "react-icons/md";
import {
  RiFacebookFill,
  RiMailFill,
  RiMailLine,
  RiMessengerFill,
  RiMessengerLine,
  RiTwitterFill,
  RiWhatsappFill,
  RiWhatsappLine,
} from "react-icons/ri";
import styled from "styled-components";
import Calendar from "svg-emojis/twemoji/1f4c5.svg";
import Megaphone from "svg-emojis/twemoji/1f4e3.svg";
import Bus from "svg-emojis/twemoji/1f68c.svg";
import Minibus from "svg-emojis/twemoji/1f690.svg";
import Taxi from "svg-emojis/twemoji/1f695.svg";
import Car from "svg-emojis/twemoji/1f697.svg";
import RecreationalVehicle from "svg-emojis/twemoji/1f699.svg";
import DeliveryTruck from "svg-emojis/twemoji/1f69a.svg";
import ArticulatedLorry from "svg-emojis/twemoji/1f69b.svg";
import Scooter from "svg-emojis/twemoji/1f6f5.svg";
import StarEyes from "svg-emojis/twemoji/1f929.svg";
import AlarmClock from "svg-emojis/twemoji/23f0.svg";
import WarningSign from "svg-emojis/twemoji/26a0.svg";

const iconName = {
  "⏰": AlarmClock,
  "⚠": WarningSign,
  "📣": Megaphone,
  "🤩": StarEyes,
  "🚌": Bus,
  "🚐": Minibus,
  "🚕": Taxi,
  "🚗": Car,
  "🚙": RecreationalVehicle,
  "🚚": DeliveryTruck,
  "🚛": ArticulatedLorry,
  "🛵": Scooter,
  "📅": Calendar,
  facebook: RiFacebookFill,
  twitter: RiTwitterFill,
  whatsappFill: RiWhatsappFill,
  whatsappLine: RiWhatsappLine,
  emailFill: RiMailFill,
  emailLine: RiMailLine,
  website: MdWeb,
  messengerFill: RiMessengerFill,
  messengerLine: RiMessengerLine,
};

type IconProps = {
  className?: string;
  name: keyof typeof iconName;
};

function Icon({ name, className }: IconProps) {
  const SvgIcon = iconName[name];
  return <SvgIcon className={className} />;
}

export const InlineIcon = styled(Icon)`
  height: 1em;
  width: 1em;
`;

export const IconLeft = styled(InlineIcon)`
  margin-right: 0.5em;
`;

export const IconRight = styled(InlineIcon)`
  margin-left: 0.5em;
`;
