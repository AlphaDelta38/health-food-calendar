
import Sidebar from "@/features/sidebar";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
}

export default function SideBarLayout({ children }: PropsWithChildren<Props> ) {
  return (
    <Box display="flex">
      <Sidebar />
      {children}
    </Box>
  )
}