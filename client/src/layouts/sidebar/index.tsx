
import Sidebar from "@/features/sidebar";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
}

export default function SideBarLayout({ children }: PropsWithChildren<Props> ) {
  return (
    <Box display="flex" height="100%">
      <Sidebar />
      {children}
    </Box>
  )
}