import { ActivityIndicator, FlatList, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
// import products from '../assets/products.json'
import ProductListItem from '../components/ProductListItem'
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';



export default function index() {

  // Use of TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts
  })


  // Use of useState and useEffect
  // const [products, setProduct] = useState()

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await listProducts()
  //     setProduct(data)
  //   }
  //   fetchProducts()
  // }, [])

  const numColumns = useBreakpointValue({ default: 2, sm: 3, md: 3, lg: 4, xl: 4 })

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto'
      columnWrapperClassName='gap-2'
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  )
}