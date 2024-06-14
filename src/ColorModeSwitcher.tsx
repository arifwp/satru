import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import * as React from "react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(
    <Icon as={RiMoonLine} />,
    <Icon as={RiSunLine} />
  );

  return (
    <IconButton
      size="md"
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      icon={SwitchIcon}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
