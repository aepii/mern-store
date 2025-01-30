import { Button, Container, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Container maxW={"1920px"} px={4} py={4} boxShadow={"md"}>
      <Flex
        h={{ base: 20, sm: 12 }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "xl", sm: "3xl" }}
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

        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <Icon>
                <FiPlusSquare fontSize={20} />
              </Icon>
            </Button>
          </Link>
          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "light" ? <BiMoon /> : <BiSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
