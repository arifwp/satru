import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { EditProfileForm } from "../../../components/forms/EditProfileForm";
import { useBgComponentBaseColor, useBgHover } from "../../../constant/colors";
import { EditEmailForm } from "../../../components/forms/EditEmailForm";

export const ProfilePage = () => {
  const location = useLocation();
  const paramsId = location.state.userId;
  const bgHover = useBgHover();
  const bgComponent = useBgComponentBaseColor();
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
          <Tab
            w={"100%"}
            justifyContent={"start"}
            borderRadius={"md"}
            _selected={{ color: "white", bg: "teal.400" }}
            _hover={{ bg: bgHover }}
          >
            Profil
          </Tab>
          <Tab
            w={"100%"}
            mt={2}
            justifyContent={"start"}
            borderRadius={"md"}
            _selected={{ color: "white", bg: "teal.400" }}
            _hover={{ bg: bgHover }}
          >
            Email
          </Tab>
          <Tab
            w={"100%"}
            mt={2}
            justifyContent={"start"}
            borderRadius={"md"}
            _selected={{ color: "white", bg: "teal.400" }}
            _hover={{ bg: bgHover }}
          >
            Whatsapp
          </Tab>
          <Tab
            w={"100%"}
            mt={2}
            justifyContent={"start"}
            borderRadius={"md"}
            _selected={{ color: "white", bg: "teal.400" }}
            _hover={{ bg: bgHover }}
          >
            Password
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EditProfileForm paramsId={paramsId} />
          </TabPanel>
          <TabPanel>
            <EditEmailForm paramsId={paramsId} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
