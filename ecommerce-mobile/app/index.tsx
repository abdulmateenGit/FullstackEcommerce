import { FlatList, ActivityIndicator } from "react-native";
// import products from "@/assets/products.json";
import ProductListItem from "@/components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { useEffect, useState } from "react";
import { listProduct } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProduct,
  });

  // const [products, setProducts] = useState();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await listProduct();
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fatching products</Text>
  }

  return (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
