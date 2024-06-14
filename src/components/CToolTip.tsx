import { HStack, Tag, TagProps } from "@chakra-ui/react";
import React from "react";

interface Props extends TagProps {
  children: any;
}

export const CToolTip = React.forwardRef(
  ({ children, ...rest }: Props, ref) => (
    <HStack className="box-tag" p={0}>
      <Tag ref={ref} bgColor={"transparent"} {...rest}>
        {children}
      </Tag>
    </HStack>
  )
);
