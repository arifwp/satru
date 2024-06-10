import { Link as ChakraLink, HStack, LinkProps } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

interface Props extends LinkProps {
  children?: any;
  to?: string;
}

export default function NavButton({ children, to, ...rest }: Props) {
  return (
    <ChakraLink
      as={ReactLink}
      to={to}
      p={2}
      borderRadius={"xl"}
      className="nav-button-link"
      w={"100%"}
      {...rest}
    >
      <HStack color={"white"}>{children}</HStack>
    </ChakraLink>
  );
}
