import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelRow,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	RadioControl,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";
import "./editor.scss";
import Slider from "react-slick";

export default function Edit({ attributes, setAttributes }) {
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

	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	const onChangeBlockStyle = (newStyle) => {
		setAttributes({ blockStyle: newStyle });
	};

	const onChangeLoop = (state) => {
		setAttributes({ loop: state });
	};

	const onChangeDots = (state) => {
		setAttributes({ dots: state });
	};

	const onChangeArrow = (state) => {
		setAttributes({ arrow: state });
	};

	const onChangeFade = (state) => {
		setAttributes({ fade: state });
	};

	const onChangeSpeed = (newSpeed) => {
		setAttributes({ speed: newSpeed });
	};

	const onChangeAutoplay = (state) => {
		setAttributes({ autoplay: state });
	};

	const onChangeSlides = (slides) => {
		setAttributes({ slidesToShow: slides });
	};

	const onChangeScroll = (scroll) => {
		setAttributes({ slidesToScroll: scroll });
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
						selected={blockStyle}
						options={[
							{ label: "Columns", value: "c" },
							{ label: "Slider", value: "s" },
						]}
						onChange={onChangeBlockStyle}
					/>
					{blockStyle == "c" && (
						<PanelBody
							title={__("Column Settings", "team-members")}
							initialOpen={open}
						>
							<RangeControl
								label={__("Columns", "team-members")}
								min={1}
								max={6}
								onChange={onChangeColumns}
								value={columns}
							/>
						</PanelBody>
					)}
					{blockStyle == "s" && (
						<PanelBody
							title={__("Slider Settings", "team-members")}
							initialOpen={open}
						>
							<p>
								<strong> Loop sliding </strong>
							</p>
							<ToggleControl
								label={__("Infinite Loop", "team-members")}
								checked={loop}
								onChange={onChangeLoop}
							/>
							<hr />
							<p>
								<strong> Autoplay </strong>
							</p>
							<ToggleControl
								label={__("Autoplay", "team-members")}
								checked={autoplay}
								onChange={onChangeAutoplay}
							/>
							<hr />
							<p>
								<strong> Show dot indicators </strong>
							</p>
							<ToggleControl
								label={__("Dots", "team-members")}
								checked={dots}
								onChange={onChangeDots}
							/>
							<hr />
							<p>
								<strong> Fade animation </strong>
							</p>
							<ToggleControl
								label={__("Fade", "team-members")}
								checked={fade}
								onChange={onChangeFade}
							/>
							{fade == false && (
								<RangeControl
									label={__("Slides to Show", "team-members")}
									min={1}
									max={3}
									onChange={onChangeSlides}
									value={slidesToShow}
								/>
							)}
							{fade == false && (
								<RangeControl
									label={__("Slides to Scroll", "team-members")}
									min={1}
									max={3}
									onChange={onChangeScroll}
									value={slidesToScroll}
								/>
							)}
							<hr />
							<p>
								<strong> Prev/Next Arrows </strong>
							</p>
							<ToggleControl
								label="Arrow"
								checked={arrow}
								onChange={onChangeArrow}
							/>
							<hr />
							<p>
								<strong> Slide/Fade animation speed </strong>
							</p>
							<SelectControl
								label={__("Speed", "team-members")}
								options={[
									{ value: "300", label: "300" },
									{ value: "500", label: "500" },
								]}
								value={speed}
								onChange={onChangeSpeed}
							/>
						</PanelBody>
					)}
				</PanelBody>
			</InspectorControls>

			<div
				{...useBlockProps({
					className:
						blockStyle == "c" ? `has-${columns}-columns` : `has-slider`,
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
