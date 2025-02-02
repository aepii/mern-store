import {
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/product";
import ProductCard from "@/components/ProductCard";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const color = useColorModeValue("cyan.400", "blue.500");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.x1"} py={8}>
      <VStack gap={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          mb={6}
        >
          Current Products 🚀
        </Heading>
      </VStack>
      {products.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="xl" textAlign="center" fontWeight="bold">
          No products found 😢{" "}
          <Link to="/create">
            <Box
              as="span"
              color={color}
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Box>
          </Link>
        </Text>
      )}
      <Toaster />
    </Container>
  );
};

export default HomePage;
