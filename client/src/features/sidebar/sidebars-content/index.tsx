import { SidebarsKeys, SidebarModel } from "../types"
import { GeneralSidebarContent } from "./general"

export function GetSidebarContent({sidebarKey, sideBarProps}: SidebarModel) {
  switch(sidebarKey){
    case SidebarsKeys.MAIN:
      return <GeneralSidebarContent {...sideBarProps} />
  }
}
