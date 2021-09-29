import { CategoryName } from "@mauriciorobayo/pyptron";

export const categoryIcon = {
  [CategoryName.CARGA_MAS_DE_20_ANOS_DE_EDAD]: "🚛",
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_3500KG]: "🚛",
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_8500KG]: "🚛",
  [CategoryName.MOTOCARROS]: "🛵",
  [CategoryName.MOTOS]: "🛵",
  [CategoryName.PARTICULARES]: "🚗",
  [CategoryName.SERVICIO_DE_TRANSPORTE_ESPECIAL]: "🚐",
  [CategoryName.TAXIS]: "🚕",
  [CategoryName.TRANSPORTE_DE_CARGA_MENOR_A_1500KG]: "🚛",
  [CategoryName.TRANSPORTE_DE_CARGA]: "🚛",
  [CategoryName.TRANSPORTE_PUBLICO_COLECTIVO]: "🚌",
} as const;
