import { 
  createContext, 
  PropsWithChildren, 
  useContext, 
  useState 
} from "react";
import { SidebarModel, SidebarsKeys } from "../types";

interface ContextModel {
  isOpen: boolean;
  open: (sidebar: SidebarModel) => void;
  close: () => void;
  closeAll: () => void;
  setSidebarOffset: (offset: number) => void;
  sidebarOffset: number;
  sidebar: SidebarModel;
  sidebars: SidebarModel[];
}

const Context = createContext<ContextModel | undefined>(undefined)

const baseSidebar: SidebarModel = {
  sidebarKey: SidebarsKeys.MAIN,
  headerProps: {
    isActive: false,
  },
  sideBarProps: {}
}

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebars, setSidebars] = useState<SidebarModel[]>([ baseSidebar ]);
  const [sidebarOffset, setSidebarOffset] = useState(0);

  const sidebar = sidebars[sidebars.length - 1]

  const open = ({ sidebarKey, sideBarProps }: SidebarModel) => {
    setSidebars([...sidebars, { sidebarKey, sideBarProps }])
    setIsOpen(true);
  }

  const close = () => {
    if (sidebars.length > 1) {
      setSidebars(prev => [...prev.slice(0, -1)] );
    } else {
      setIsOpen(false)
    }
  }

  const closeAll = () => {
    setSidebars([ baseSidebar ])
    setIsOpen(false)
  }

  return (
    <Context.Provider value={{ 
        isOpen, 
        open, 
        close, 
        closeAll, 
        sidebar, 
        sidebars, 
        sidebarOffset, 
        setSidebarOffset 
      }}
    >
      {children}
    </Context.Provider>
  )
}   

export const useSidebar = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export default SidebarProvider;
