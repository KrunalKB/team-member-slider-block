import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, RadioControl } from "@wordpress/components";
import "./editor.scss";
import Slider from "react-slick";

export default function Edit({ attributes, setAttributes }) {
	const { columns, blockStyle } = attributes;

	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	const onChangeBlockStyle = (newStyle) => {
		setAttributes({ blockStyle: newStyle });
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Block Settings", "team-members")}
					initialOpen={true}
				>
					<RadioControl
						label="Block Style"
						help="The style you want to apply. This style reflects directly on your front end."
						selected={blockStyle}
						options={[
							{ label: "Columns", value: "c" },
							{ label: "Slider", value: "s" },
						]}
						onChange={onChangeBlockStyle}
					/>
					{blockStyle == "c" && (
						<RangeControl
							label={__("Columns", "team-members")}
							min={1}
							max={6}
							onChange={onChangeColumns}
							value={columns}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div
				{...useBlockProps({
					className: blockStyle == "c" ? `has-${columns}-columns` : `has-slider`,
				})}
			>
				<InnerBlocks
					allowedBlocks={["create-block/team-member"]}
					orientation="horizontal"
					template={[
						["create-block/team-member"],
						["create-block/team-member"],
						["create-block/team-member"],
					]}
					// templateLock ="insert"
				/>
			</div>
		</>
	);
}
