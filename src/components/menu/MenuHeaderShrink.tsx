import {
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  StackProps,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import {
  RiAccountCircleFill,
  RiArrowLeftSLine,
  RiLogoutBoxLine,
  RiMenuFill,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "typescript-cookie";
import { getDataUser } from "../../utils/helperFunction";

interface Props extends StackProps {
  children?: any;
  label: string;
  isSubPage: boolean;
}

export const MenuHeaderShrink = ({ children, label, isSubPage }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleBack = () => {
    window.history.back();
  };

  const navigateToProfile = () => {
    navigate("/profile", { state: { userId: getDataUser()._id } });
  };

  const handleLogout = () => {
    setLoading(true);
    const token = getCookie("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/auth/logout/${getDataUser()._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        removeCookie("token");
        toast({
          title: JSON.parse(response.request.response).message,
          status: "success",
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <HStack
      className="header"
      alignItems={"center"}
      justify={"space-between"}
      p={3}
      align={"end"}
      w={"100%"}
      h={"72px"}
      fontSize={"sm"}
    >
      <HStack>
        {isSubPage && (
          <IconButton
            size="xs"
            variant="ghost"
            color="current"
            onClick={handleBack}
            icon={<Icon as={RiArrowLeftSLine} />}
            fontSize={"2xl"}
            aria-label={`Back to previous page`}
            mr={1}
          />
        )}

        <Text as={"b"} fontSize={"18px"}>
          {label}
        </Text>
      </HStack>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={RiMenuFill} />}
          variant="outline"
        />
        <MenuList>
          <MenuItem
            icon={<Icon as={colorMode === "light" ? RiMoonLine : RiSunLine} />}
            fontSize={"sm"}
            onClick={toggleColorMode}
            cursor={"pointer"}
          >
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </MenuItem>
          <MenuItem
            icon={<Icon as={RiAccountCircleFill} />}
            fontSize={"sm"}
            onClick={navigateToProfile}
            cursor={"pointer"}
          >
            Profil
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<Icon as={RiLogoutBoxLine} color={"red.400"} />}
            onClick={handleLogout}
          >
            {loading ? (
              <Spinner size={"sm"} color="red.400" />
            ) : (
              <Icon as={RiLogoutBoxLine} color={"red.400"} />
            )}{" "}
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
