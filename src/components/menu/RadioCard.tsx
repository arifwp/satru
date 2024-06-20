import { Box, Text, useRadio } from "@chakra-ui/react";

export const RadioCard = (props: any, { ...rest }) => {
  const { outletName, ...radioProps } = props;
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <Box as="label" w={"100%"} cursor="pointer" {...htmlProps}>
      <input {...getInputProps({})} hidden />
      <Box
        {...getRadioProps()}
        // bg={state.isChecked ? "teal.400" : "transparent"}
        p={2}
        borderRadius={"lg"}
        _checked={{
          bg: "teal.400",
          color: "white",
          px: 4,
        }}
        fontSize={"sm"}
      >
        <Text {...getLabelProps()}>{outletName}</Text>
      </Box>
    </Box>
  );
};
