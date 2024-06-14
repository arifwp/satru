import { Tooltip, TooltipProps } from "@chakra-ui/react";
import { CToolTip } from "./CToolTip";

interface Props extends TooltipProps {
  children: any;
  label: string;
}

export const CustomTooltip = ({ children, label, ...rest }: Props) => {
  return (
    <Tooltip hasArrow label={label} placement="bottom" {...rest}>
      <CToolTip>{children}</CToolTip>
    </Tooltip>
  );
};
