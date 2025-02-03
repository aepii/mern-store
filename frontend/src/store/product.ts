import { create } from "zustand";
import { Product } from "@/types/product.type";

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (
    newProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (
    productID: string | undefined
  ) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    productID: string | undefined,
    updatedProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (productID) => {
    const res = await fetch(`/api/products/${productID}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== productID),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (productID, updatedProduct) => {
    const res = await fetch(`/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productID ? data.data : product
      ),
    }));
    return { success: true, message: "Product updated successfully." };
  },
}));
