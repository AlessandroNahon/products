import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type Props = {
	children: ReactNode
}

export default function Error({ children }: Props) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={(render: { resetErrorBoundary: () => void }) => (
						<div>
							There was an error!
							<button onClick={() => render.resetErrorBoundary()}>
								Try again
							</button>
						</div>
					)}
				>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	)
}
