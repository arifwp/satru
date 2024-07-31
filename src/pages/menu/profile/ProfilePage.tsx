import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { EditEmailForm } from "../../../components/forms/EditEmailForm";
import { EditPasswordForm } from "../../../components/forms/EditPasswordForm";
import { EditProfileForm } from "../../../components/forms/EditProfileForm";
import { EditWhatsappForm } from "../../../components/forms/EditWhatsappForm";
import { useBgComponentBaseColor, useBgHover } from "../../../constant/colors";
import { UserInterface } from "../../../constant/User";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import { getDataUser } from "../../../utils/helperFunction";

const tabList = [
  { _id: 1, name: "Profil", key: "profile" },
  { _id: 2, name: "Email", key: "email" },
  { _id: 3, name: "Whatsapp", key: "whatsapp" },
  { _id: 4, name: "Password", key: "password" },
];

export const ProfilePage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  // const location = useLocation();
  // const paramsId = location.state.userId;
  const bgHover = useBgHover();
  const { statusData } = useTriggerRenderStore();
  const bgComponent = useBgComponentBaseColor();
  const [data, setData] = useState<UserInterface | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const token = getCookie("token");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/user/getDetailUser/${
          getDataUser()._id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        localStorage.setItem(
          "user",
          JSON.stringify(JSON.parse(response.request.response).data)
        );
        setData(JSON.parse(response.request.response).data);
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [statusData, toast]);

  return (
    <VStack
      className="profile-container"
      w={"100%"}
      p={4}
      fontSize={"sm"}
      align={"stretch"}
    >
      <Tabs
        size={"sm"}
        variant={"unstyled"}
        position={"relative"}
        orientation="vertical"
        colorScheme="teal"
        bg={bgComponent}
        p={4}
        borderRadius={"md"}
      >
        <TabIndicator
          mt="-1.5px"
          height="10px"
          width={"10px"}
          bg="blue.500"
          borderRadius="1px"
        />
        <TabList>
          {tabList.map((item, i) => (
            <Tab
              key={item._id}
              w={"100%"}
              justifyContent={"start"}
              borderRadius={"md"}
              _selected={{ color: "white", bg: "teal.400" }}
              _hover={{ bg: bgHover }}
            >
              {item.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <EditProfileForm data={data} loaded={loaded} />
          </TabPanel>
          <TabPanel>
            <EditEmailForm data={data} loaded={loaded} />
          </TabPanel>
          <TabPanel>
            <EditWhatsappForm data={data} loaded={loaded} />
          </TabPanel>
          <TabPanel>
            <EditPasswordForm data={data} loaded={loaded} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
