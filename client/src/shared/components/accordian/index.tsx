import { PropsWithChildren, useMemo } from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import Icon from "@/shared/ui/icon";
import FlexBox from "@/shared/ui/flexbox";

interface Props {
  title: string;
  className?: string;
  additionalActions?: React.ReactNode;
}

function Accordion({ title, children, className, additionalActions }: PropsWithChildren<Props>) {

  const memoizedChildren = useMemo(() => {
    return children;
  }, []);

  return (
    <MuiAccordion className={className}>
      <AccordionSummary
        expandIcon={<Icon name="ArrowDown" />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <FlexBox alignItems="center" gap="16px">
          <Typography variant="h5">{title}</Typography>
          {additionalActions}
        </FlexBox>
      </AccordionSummary>
      <AccordionDetails>
        {memoizedChildren}
      </AccordionDetails>
    </MuiAccordion>
  );
}

export default Accordion;
