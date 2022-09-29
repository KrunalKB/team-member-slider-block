import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import Slider from "react-slick";

export default function save({ attributes }) {
	const { columns, blockStyle } = attributes;

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div
			{...useBlockProps.save({
				className: blockStyle == "c" ? `has-${columns}-columns` : `has-slider`,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}
