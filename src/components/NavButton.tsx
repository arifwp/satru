import {
  Link as ChakraLink,
  HStack,
  LinkProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink as ReactLink } from "react-router-dom";
import useScreenWidth from "../lib/useScreenWidth";

interface Props extends LinkProps {
  children?: any;
  to?: string;
}

export default function NavButton({ children, to, ...rest }: Props) {
  const bg = useColorModeValue("#E2E8F060", "#2D374860");
  const sw = useScreenWidth();

  return (
    <ChakraLink
      className="nav-button-link"
      as={ReactLink}
      to={to}
      p={2}
      borderRadius={"xl"}
      w={"100%"}
      textDecoration={"none"}
      _hover={{ bgColor: bg }}
      _activeLink={{
        bg: "teal.400",
        color: "white",
      }}
      display={"flex"}
      flexDirection={"column"}
      {...rest}
    >
      {children}
    </ChakraLink>
  );
}
