import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { MouseEventHandler } from "react";

interface BtnProps extends ButtonProps {
  children: any;
  variant?: string;
  btnColor?: any;
  icon?: RemixiconComponentType;
  rIcon?: RemixiconComponentType;
  size?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const CButton = ({
  children,
  variant,
  btnColor,
  icon,
  rIcon,
  onClick,
  size,
  ...rest
}: BtnProps) => {
  return (
    <Button
      size={size !== undefined ? size : "sm"}
      variant={variant}
      borderRadius={"md"}
      bg={btnColor !== undefined ? btnColor : undefined}
      leftIcon={icon !== undefined ? <Icon as={icon} /> : undefined}
      rightIcon={rIcon !== undefined ? <Icon as={rIcon} /> : undefined}
      // pl={icon !== undefined ? 2 : 2}
      onClick={onClick}
      fontSize={"xs"}
      {...rest}
    >
      {children}
    </Button>
  );
};
