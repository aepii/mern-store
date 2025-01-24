import { Button, Container, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes"; 
import { Link } from "react-router-dom";

import { FiPlusSquare } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme)
  return (
    <Container maxW={"1920px"} px={4} py={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack padding={4} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <Icon >
                <FiPlusSquare fontSize={20} />
              </Icon>
            </Button>
          </Link>
          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "light" ? <IoMoon /> : <LuSun size='20' />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
