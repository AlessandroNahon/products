import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../api'

export default function useFetchProduct() {
	const { id } = useParams() as { id: string }
	return useSuspenseQuery({
		queryKey: ['product', id],
		queryFn: async () => await fetchProduct(id),
	})
}
