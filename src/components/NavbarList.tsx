import { HStack, Icon, Stack, Text, VStack, keyframes } from "@chakra-ui/react";
import {
  RiDiscountPercentLine,
  RiExchangeDollarLine,
  RiHistoryLine,
  RiHome3Line,
  RiMoneyCnyBoxLine,
  RiOutlet2Line,
  RiProductHuntLine,
  RiUserAddLine,
} from "@remixicon/react";
import NavButton from "./NavButton";
import useScreenWidth from "../lib/useScreenWidth";

const fadeText = keyframes`  
  0% {
        opacity: 0;
    }
        
    1% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const NavbarList = ({ ...props }) => {
  const sw = useScreenWidth();

  return (
    <Stack direction={sw >= 640 ? "column" : "row"} w={"100%"}>
      {/* <NavButton to="/home">
        <HStack justify={"start"}>
          <Icon as={RiHome3Line} w={"100%"} maxW={"24px"} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Home
          </Text>
        </HStack>
      </NavButton> */}

      <NavButton to="/product">
        <HStack justify={"start"}>
          <Icon as={RiProductHuntLine} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Produk
          </Text>
        </HStack>
      </NavButton>

      <NavButton to="/transaction">
        <HStack justify={"start"}>
          <Icon as={RiExchangeDollarLine} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Tranksasi
          </Text>
        </HStack>
      </NavButton>

      <NavButton to="/transaction-history">
        <HStack justify={"start"} whiteSpace={"nowrap"}>
          <Icon as={RiHistoryLine} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Riwayat Tranksasi
          </Text>
        </HStack>
      </NavButton>

      <NavButton to="/member">
        <HStack justify={"start"}>
          <Icon as={RiUserAddLine} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Member
          </Text>
        </HStack>
      </NavButton>

      <NavButton to="/finance">
        <HStack justify={"start"}>
          <Icon as={RiMoneyCnyBoxLine} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Keuangan
          </Text>
        </HStack>
      </NavButton>

      <NavButton to="/discount">
        <HStack justify={"start"}>
          <Icon as={RiDiscountPercentLine} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Diskon
          </Text>
        </HStack>
      </NavButton>

      <NavButton to="/outlet">
        <HStack justify={"start"}>
          <Icon as={RiOutlet2Line} pl={1} fontSize={"18px"} />
          <Text
            className="label-navbar"
            fontSize={"10px"}
            fontWeight={"semibold"}
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            Outlet
          </Text>
        </HStack>
      </NavButton>
    </Stack>
  );
};
