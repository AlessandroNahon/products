type Props = {
	image: string
	className: string
}

export default function Image({ image, className }: Props) {
	return (
		<div className={className} style={{ backgroundImage: `url(${image})` }} />
	)
}
