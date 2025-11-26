import { Box, BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";


function FlexBox({ 
  children, 
  display = "flex",
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "center",
  ...props 
}: PropsWithChildren<BoxProps & {
  width?: string
  height?: string
  display?: string
  flexDirection?: string
  alignItems?: string
  justifyContent?: string
}>) {
  return (
    <Box 
      display={display} 
      flexDirection={flexDirection} 
      alignItems={alignItems} 
      justifyContent={justifyContent} 
      {...props}
    >
      {children}
    </Box>
  )
}

export default FlexBox;