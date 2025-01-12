import { FlatList, useWindowDimensions } from 'react-native'
import React from 'react'
import products from '../assets/products.json'
import ProductListItem from '../components/ProductListItem'
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';



export default function index() {
  const numColumns = useBreakpointValue({ default: 2, sm: 3, md: 3, lg: 4, xl: 4 })
  return (
    <FlatList
      key={numColumns}
      data={products}
      numColumns={numColumns}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto'
      columnWrapperClassName='gap-2'
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  )
}