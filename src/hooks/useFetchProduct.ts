import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchProduct } from '../api'

export default function useFetchProduct(id: string | undefined) {
	return useSuspenseQuery({
		queryKey: ['product', id],
		queryFn: async () => await fetchProduct(id),
	})
}
