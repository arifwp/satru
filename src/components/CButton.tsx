import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { MouseEventHandler } from "react";

interface BtnProps extends ButtonProps {
  children: any;
  variant?: string;
  btnColor?: any;
  icon?: RemixiconComponentType;
  size?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const CButton = ({
  children,
  variant,
  btnColor,
  icon,
  onClick,
  size,
  ...rest
}: BtnProps) => {
  return (
    <Button
      size={size !== undefined ? size : "sm"}
      variant={variant}
      bg={btnColor !== undefined ? btnColor : undefined}
      leftIcon={icon !== undefined ? <Icon as={icon} /> : undefined}
      // pl={icon !== undefined ? 2 : 2}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};
