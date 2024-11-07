import { FlatList, StyleSheet, Text, View } from "react-native";
import products from '../assets/product.json';
import ProductListItem from "../components/ProductListItem";


export default function Page() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) =>
        <ProductListItem product={item} />
      }
    />
  );
}