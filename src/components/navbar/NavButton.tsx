import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { NavLink as ReactLink } from "react-router-dom";
import { useBgHover } from "../../constant/colors";

interface Props extends LinkProps {
  children?: any;
  to?: string;
  end?: any;
}

export default function NavButton({ children, to, end, ...rest }: Props) {
  const bgHover = useBgHover();

  return (
    <ChakraLink
      end={end}
      className="nav-button-link"
      as={ReactLink}
      to={to}
      p={2}
      borderRadius={"xl"}
      w={"100%"}
      textDecoration={"none"}
      _hover={{ bgColor: bgHover }}
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
