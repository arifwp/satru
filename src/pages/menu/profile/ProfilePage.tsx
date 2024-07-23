import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { EditProfileForm } from "../../../components/forms/EditProfileForm";

export const ProfilePage = () => {
  const location = useLocation();
  const paramsId = location.state.userId;

  return (
    <VStack
      className="profile-container"
      w={"100%"}
      p={4}
      fontSize={"sm"}
      align={"stretch"}
    >
      <Tabs orientation="vertical">
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EditProfileForm paramsId={paramsId} />
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
