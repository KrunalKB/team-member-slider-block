import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		columns,
		blockStyle,
		loop,
		autoplay,
		slidesToShow,
		slidesToScroll,
		dots,
		fade,
		arrow,
		speed,
	} = attributes;

	return (
		<>
			<div className="tmsb-slider-settings">
				<form>
					<input
						type="hidden"
						value={loop === true ? "1" : "0"}
						className="tmsb-loop"
					/>
					<input
						type="hidden"
						value={autoplay === true ? "1" : "0"}
						className="tmsb-autoplay"
					/>
					<input
						type="hidden"
						value={dots === true ? "1" : "0"}
						className="tmsb-dots"
					/>
					<input
						type="hidden"
						value={fade === true ? "1" : "0"}
						className="tmsb-fade"
					/>
					<input
						type="hidden"
						value={arrow === true ? "1" : "0"}
						className="tmsb-arrow"
					/>
					<input type="hidden" value={slidesToShow} className="tmsb-slides" />
					<input type="hidden" value={slidesToScroll} className="tmsb-scroll" />
					<input type="hidden" value={speed} className="tmsb-speed" />
				</form>
			</div>
			<div
				{...useBlockProps.save({
					className:
						blockStyle == "c" ? `has-${columns}-columns` : `has-slider`,
				})}
			>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
