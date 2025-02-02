import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Product } from "@/types/product.type";
import { useColorModeValue } from "./ui/color-mode";
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }: { product: Product }) => {
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (productID: string | undefined) => {
    const { success, message } = await deleteProduct(productID);
    console.log("Success:", success);
    console.log("Message:", message);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        meta: { closable: true },
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        meta: { closable: true },
      });
    }
  };

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

        <Text
          as={"h3"}
          fontWeight={"bold"}
          color={useColorModeValue("cyan.400", "blue.500")}
          fontSize={"xl"}
          mb={4}
        >
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton colorPalette={"gray"}>
            <BiSolidEdit />
          </IconButton>
          <IconButton
            colorPalette={"pink"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <BiSolidTrash />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
