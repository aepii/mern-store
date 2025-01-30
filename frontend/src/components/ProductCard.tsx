import { Box, Text } from "@chakra-ui/react";

type Product = {
  _id: string;
  name: string;
  price: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Text fontSize="lg" fontWeight="bold">
        {product.name}
      </Text>
    </Box>
  );
};

export default ProductCard;
