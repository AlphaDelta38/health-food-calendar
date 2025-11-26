export enum SidebarsKeys {
  MAIN = 'main',
}

export type CommonSidebarProps = {}

export type HeaderProps = {
  title?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export type SidebarModel = {
  sidebarKey: SidebarsKeys;
  headerProps?: HeaderProps;
  sideBarProps: CommonSidebarProps;
};

