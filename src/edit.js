import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	RadioControl,
	ToggleControl,
	SelectControl,
	PanelRow,
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

	const onChangeIconColor = (color) => {
		setAttributes({ slideIconColor: color });
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
							<PanelBody
								title={__("Loop sliding", "team-members")}
								initialOpen={false}
							>
								<PanelRow>
									<ToggleControl
										label={__("Infinite Loop", "team-members")}
										checked={loop}
										onChange={onChangeLoop}
									/>
								</PanelRow>
							</PanelBody>

							<PanelBody
								title={__("Autoplay", "team-members")}
								initialOpen={false}
							>
								<PanelRow>
									<ToggleControl
										label={__("Autoplay", "team-members")}
										checked={autoplay}
										onChange={onChangeAutoplay}
									/>
								</PanelRow>
							</PanelBody>

							<PanelBody
								title={__("Show dot indicators", "team-members")}
								initialOpen={false}
							>
								<PanelRow>
									<ToggleControl
										label={__("Dots", "team-members")}
										checked={dots}
										onChange={onChangeDots}
									/>
								</PanelRow>
							</PanelBody>

							<PanelBody
								title={__("Fade animation", "team-members")}
								initialOpen={false}
							>
								<PanelRow>
									<ToggleControl
										label={__("Fade", "team-members")}
										checked={fade}
										onChange={onChangeFade}
									/>
								</PanelRow>
							</PanelBody>
							{fade == false && (
								<PanelBody
									title={__("Slides to Show", "team-members")}
									initialOpen={false}
								>
									<PanelRow>
										<RangeControl
											label={__("Slides to Show", "team-members")}
											min={1}
											max={3}
											onChange={onChangeSlides}
											value={slidesToShow}
										/>
									</PanelRow>
								</PanelBody>
							)}
							{fade == false && (
								<PanelBody
									title={__("Slides to Scroll", "team-members")}
									initialOpen={false}
								>
									<PanelRow>
										<RangeControl
											label={__("Slides to Scroll", "team-members")}
											min={1}
											max={3}
											onChange={onChangeScroll}
											value={slidesToScroll}
										/>
									</PanelRow>
								</PanelBody>
							)}

							<PanelBody
								title={__("Prev/Next Arrows", "team-members")}
								initialOpen={false}
							>
								<PanelRow>
									<ToggleControl
										label="Arrow"
										checked={arrow}
										onChange={onChangeArrow}
									/>
								</PanelRow>
							</PanelBody>

							<PanelBody
								title={__("Slide/Fade animation speed", "team-members")}
								initialOpen={false}
							>
								<PanelRow>
									<SelectControl
										label={__("Speed", "team-members")}
										options={[
											{ value: "300", label: "300" },
											{ value: "500", label: "500" },
										]}
										value={speed}
										onChange={onChangeSpeed}
									/>
								</PanelRow>
							</PanelBody>

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
