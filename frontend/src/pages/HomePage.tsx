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

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);
  return (
    <Container maxW={"container.x1"}>
      <VStack padding={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          mb={4}
        >
          Current Products 🚀
        </Heading>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} padding={10} w={"full"}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>

      <Text fontSize="xl" textAlign="center" fontWeight="bold">
        No products found 😢{" "}
        <Link to="/create">
          <Box
            as="span"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            Create a product
          </Box>
        </Link>
      </Text>
    </Container>
  );
};

export default HomePage;
