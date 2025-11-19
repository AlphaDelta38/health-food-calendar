import { WordBasedSelectItem } from "../components";

enum PersistantLCKeys {
  PRODUCTS_SELECTED_CATEGORY = "PRODUCTS_SELECTED_CATEGORY",
  OFF_PRODUCTS_PAGE = "OFF_PRODUCTS_PAGE",
  OFF_PRODUCTS_SEARCH = "OFF_PRODUCTS_SEARCH",
  PRODUCTS_PAGE = "OFF_PRODUCTS_PAGE_SIZE",
  PRODUCTS_SEARCH = "PRODUCTS_SEARCH",
}

type PersistantLCMaps = {
  [PersistantLCKeys.PRODUCTS_SELECTED_CATEGORY]: WordBasedSelectItem;
  [PersistantLCKeys.OFF_PRODUCTS_PAGE]: number;
  [PersistantLCKeys.OFF_PRODUCTS_SEARCH]: string;
  [PersistantLCKeys.PRODUCTS_PAGE]: number;
  [PersistantLCKeys.PRODUCTS_SEARCH]: string;
}

export {
  PersistantLCKeys,
  PersistantLCMaps,
}