import { useColorModeValue } from "@chakra-ui/react";

// export const useBgComponentBaseColor = () => {
//   return useColorModeValue("#F8F9FA", "#1C1C1E");
// };
export const useBgBaseColor = () => {
  // return useColorModeValue("#F0F0F0", "#121212");

  return useColorModeValue("#F0F0F0", "#151515");
};

export const useBgComponentBaseColor = () => {
  return useColorModeValue("white", "dark");
};

export const useBgHover = () => {
  return useColorModeValue("#ebedf0", "#ebedf020");
};

export const useErrorColor = () => {
  return useColorModeValue("#E53E3E", "#FC8181");
};

export const useBorderColorInput = () => {
  return useColorModeValue("RGBA(0, 0, 0, 0.08)", "RGBA(255, 255, 255, 0.16)");
};

export const useGreyColor = () => {
  return useColorModeValue("RGBA(0, 0, 0, 0.36)", "RGBA(255, 255, 255, 0.36)");
};

export const useTextPrimaryColor = () => {
  return useColorModeValue("teal.600", "teal.400");
};
