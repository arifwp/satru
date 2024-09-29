import { useToast, VStack } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { PageContainer } from "../../../components/containers/PageContainer";
import { EditPasswordForm } from "../../../components/forms/EditPasswordForm";
import { pageNavsProfile } from "../../../constant/pageNavs";
import { UserInterface } from "../../../constant/User";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import { getDataUser } from "../../../utils/helperFunction";

export const PasswordPage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { statusData } = useTriggerRenderStore();
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
    <PageContainer navs={pageNavsProfile}>
      <VStack className="profile-container" w={"100%"} p={4}>
        <EditPasswordForm data={data} loaded={loaded} />
      </VStack>
    </PageContainer>
  );
};
