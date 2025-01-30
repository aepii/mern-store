import { Box, Heading, Image, Text, HStack, IconButton } from "@chakra-ui/react";
import { Product } from "@/types/product.type";
import { useColorModeValue } from "./ui/color-mode";
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        fit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text as={"h3"} fontWeight={"bold"} color={useColorModeValue("cyan.400", "blue.500")} fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton>
            <BiSolidEdit />
          </IconButton>
          <IconButton>
            <BiSolidTrash />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
