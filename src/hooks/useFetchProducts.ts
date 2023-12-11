import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api'

export default function useFetchProducts(): UseQueryResult<any, any> {
	return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
}
