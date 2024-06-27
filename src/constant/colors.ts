import { useColorModeValue } from "@chakra-ui/react"

export const useBgComponentBaseColor = () => {
    return useColorModeValue("#F8F9FA", "#1C1C1E");
}

export const useBgHover = () => {
    return useColorModeValue("#ebedf0", "#ebedf020");;
}

export const useErrorColor = () => {
       return useColorModeValue("#E53E3E", "#FC8181");
}

