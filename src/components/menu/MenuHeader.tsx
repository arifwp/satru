import {
  Avatar,
  Button,
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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  RiAccountCircleFill,
  RiArrowDownSFill,
  RiArrowLeftSLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "typescript-cookie";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { getDataUser } from "../../utils/helperFunction";
import { useBgBaseColor, useBgComponentBaseColor } from "../../constant/colors";

interface Props extends StackProps {
  children?: any;
  label: string;
  isSubPage: boolean;
}

export const MenuHeader = ({ children, label, isSubPage }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const bgBase = useBgBaseColor();
  const bgComponent = useBgComponentBaseColor();

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
      p={3}
      bg={bgBase}
      align={"center"}
      w={"100%"}
      h={"72px"}
      justify={"space-between"}
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

      <HStack>
        <ColorModeSwitcher bg={bgComponent} />

        <Menu>
          <MenuButton
            as={Button}
            bg={bgComponent}
            p={4}
            rightIcon={<Icon as={RiArrowDownSFill} />}
          >
            <Avatar
              size="xs"
              name={getDataUser().name}
              src={
                getDataUser().avatar &&
                `http://localhost:3000/uploads/users/avatars/${
                  getDataUser().avatar
                }`
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              as={"div"}
              icon={<Icon as={RiAccountCircleFill} fontSize={"md"} />}
              fontSize={"sm"}
              onClick={navigateToProfile}
              cursor={"pointer"}
            >
              Profil
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={
                loading ? (
                  <Spinner size={"sm"} color="red.400" />
                ) : (
                  <Icon as={RiLogoutBoxLine} color={"red.400"} />
                )
              }
              fontSize={"sm"}
              onClick={handleLogout}
            >
              <Text color={"red.400"}>Sign Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};
