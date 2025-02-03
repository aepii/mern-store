import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  IconButton,
  Button,
  Stack,
  Input,
} from "@chakra-ui/react";
import { Product } from "@/types/product.type";
import { useColorModeValue } from "./ui/color-mode";
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";
import {
  DialogBody,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRef } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const color = useColorModeValue("cyan.400", "blue.500");

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { updateProduct, deleteProduct } = useProductStore();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

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

  const handleUpdateProduct = async (
    productID: string | undefined,
    updatedProduct: Product
  ) => {
    const { success, message } = await updateProduct(productID, updatedProduct);
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
    setOpen(false);
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
          color={color}
          fontSize={"xl"}
          mb={4}
        >
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton colorPalette={"gray"} onClick={() => setOpen(true)}>
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

      <DialogRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        initialFocusEl={() => ref.current}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Input
                placeholder={"Product Name"}
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              ></Input>
              <Input
                placeholder={"Price"}
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              ></Input>
              <Input
                placeholder={"Image URL"}
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              ></Input>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button colorPalette={"pink"}>Cancel</Button>
            </DialogActionTrigger>
            <Button
              colorPalette={color}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;
