import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
	PanelColorSettings,
} from "@wordpress/block-editor";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	Spinner,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Tooltip,
	Button,
	TextControl,
	Animate,
	Notice,
	FontSizePicker,
	ColorPalette,
} from "@wordpress/components";
import { useEffect, useState, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";

export default function Edit({ attributes, setAttributes, isSelected }) {
	const {
		name,
		bio,
		imgID,
		imgALT,
		imgURL,
		socialLinks,
		nameColor,
		bioColor,
		fontSizeName,
		fontSizeBio,
		iconColor,
	} = attributes;

	const [blobURL, setBlobURL] = useState();

	const [selectedLink, setSelectedLink] = useState();

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return imgID ? getMedia(imgID) : null;
		},
		[imgID]
	);

	const imageSizes = useSelect((select) => {
		return select(blockEditorStore).getSettings().imageSizes;
	}, []);

	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug == key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	};

	const onChangeImageSize = (newURL) => {
		setAttributes({ imgURL: newURL });
	};

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeNameColor = (newColor) => {
		setAttributes({ nameColor: newColor });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onChangeBioColor = (newColor) => {
		setAttributes({ bioColor: newColor });
	};

	const onChangeIconColor = (newColor) => {
		setAttributes({ iconColor: newColor });
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ imgALT: newAlt });
	};

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ imgURL: undefined, imgID: undefined, imgALT: "" });
			return;
		}
		setAttributes({ imgURL: image.url, imgID: image.id, imgALT: image.alt });
	};

	const onSelectURL = (newURL) => {
		setAttributes({
			imgURL: newURL,
			imgID: undefined,
			imgALT: "",
		});
	};

	const removeImage = () => {
		setAttributes({
			imgURL: undefined,
			imgALT: "",
			imgID: undefined,
		});
	};

	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [...socialLinks, { icon: "wordpress", link: "" }],
		});
		setSelectedLink(socialLinks.length);
	};

	const updateSocialItem = (type, value) => {
		const socialLinksCopy = [...socialLinks];
		socialLinksCopy[selectedLink][type] = value;
		setAttributes({ socialLinks: socialLinksCopy });
	};

	const removeSocialItem = () => {
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1),
			],
		});
		setSelectedLink();
	};

	const prevURL = usePrevious(imgURL);

	const prevIsSelected = usePrevious(isSelected);

	const titleRef = useRef();

	useEffect(() => {
		if (!imgID && isBlobURL(imgURL)) {
			setAttributes({
				imgURL: undefined,
				imgALT: "",
			});
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(imgURL)) {
			setBlobURL(imgURL);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [imgURL]);

	useEffect(() => {
		if (imgURL && !prevURL) {
			titleRef.current.focus();
		}
	}, [imgURL, prevURL]);

	useEffect(() => {
		if (prevIsSelected && !isSelected) {
			setSelectedLink();
		}
	}, [isSelected, prevIsSelected]);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Image Settings", "team-members")}
					// icon={image}
					initialOpen={false}
				>
					{!imgID && !imgURL && (
						<Animate type="loading">
							{({ className }) => (
								<Notice className={className} status="error">
									<p>Please Upload Media.</p>
								</Notice>
							)}
						</Animate>
					)}
					{imgID && (
						<SelectControl
							label={__("Image Size", "team-members")}
							options={getImageSizeOptions()}
							value={imgURL}
							onChange={onChangeImageSize}
						/>
					)}
					{imgURL && !isBlobURL(imgURL) && (
						<TextareaControl
							label={__("Alt Text", "team-members")}
							value={imgALT}
							onChange={onChangeAlt}
							help={__(
								"The alt attribute provides alternative information for an image if a user for some reason cannot view it",
								"team-members"
							)}
						/>
					)}
				</PanelBody>
				<PanelBody
					title={__("Member Info Settings", "team-members")}
					initialOpen={false}
				>
					<PanelColorSettings
						title={__("Appearance", "team-members")}
						icon="admin-appearance"
						initialOpen={false}
						colorSettings={[
							{
								value: nameColor,
								onChange: onChangeNameColor,
								label: __("Member Name Color", "gutenberg-demo"),
							},
							{
								value: bioColor,
								onChange: onChangeBioColor,
								label: __("Member Bio Color", "gutenberg-demo"),
							},
						]}
					></PanelColorSettings>
					<hr />
					<p>
						<strong>Name Font Size:</strong>
					</p>
					<FontSizePicker
						fontSizes={[
							{
								name: __("Small"),
								slug: "small",
								size: 12,
							},
							{
								name: __("Big"),
								slug: "big",
								size: 26,
							},
							{
								name: __("Very Big"),
								slug: "very-big",
								size: 40,
							},
						]}
						value={fontSizeName}
						onChange={(fontSizeName) =>
							setAttributes({ fontSizeName: fontSizeName })
						}
					/>
					<hr />
					<p>
						<strong>Bio Font Size:</strong>
					</p>
					<FontSizePicker
						fontSizes={[
							{
								name: __("Small"),
								slug: "small",
								size: 12,
							},
							{
								name: __("Big"),
								slug: "big",
								size: 26,
							},
							{
								name: __("Very Big"),
								slug: "very-big",
								size: 40,
							},
						]}
						value={fontSizeBio}
						onChange={(fontSizeBio) =>
							setAttributes({ fontSizeBio: fontSizeBio })
						}
					/>
				</PanelBody>
				<PanelBody
					title={__("Icon Settings", "team-members")}
					initialOpen={false}
				>
					<p>
						<strong>Icon Color:</strong>
					</p>
					<ColorPalette
						colors={[
							{ name: "red", color: "#f00" },
							{ name: "white", color: "#fff" },
							{ name: "blue", color: "#00f" },
						]}
						value={iconColor}
						onChange={onChangeIconColor}
					/>
				</PanelBody>
			</InspectorControls>
			{imgURL && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "team-members")}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						accept="image/*"
						allowedTypes={["image"]}
						mediaId={imgID}
						mediaURL={imgURL}
					/>
					<ToolbarButton onClick={removeImage}>
						{__("Remove Image", "team-members")}
					</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps}>
				{imgURL && (
					<div
						className={`wp-block-create-block-team-member-img${
							isBlobURL(imgURL) ? " is-loading" : ""
						}`}
					>
						<img src={imgURL} alt={imgALT} height={"500"} />
						{isBlobURL(imgURL) && <Spinner />}
					</div>
				)}
				<MediaPlaceholder
					icon="format-image"
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					accept="image/*"
					allowedTypes={["image"]}
					disableMediaButtons={imgURL}
				/>
				<RichText
					ref={titleRef}
					placeholder={__("Member Name", "team-members")}
					tagName="h4"
					value={name}
					onChange={onChangeName}
					allowedFormats={[]}
					style={{
						color: nameColor,
						fontSize: fontSizeName,
					}}
				/>
				<RichText
					placeholder={__("Member Bio", "team-members")}
					tagName="p"
					value={bio}
					onChange={onChangeBio}
					allowedFormats={[]}
					style={{
						color: bioColor,
						fontSize: fontSizeBio,
					}}
				/>
				<div className="wp-block-create-block-team-member-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li
									key={index}
									className={selectedLink === index ? "is-selected" : null}
								>
									<button
										aria-label={__("Edit Social Link", "team-members")}
										onClick={() => setSelectedLink(index)}
									>
										<Icon icon={item.icon} style={{ color: iconColor }} />
									</button>
								</li>
							);
						})}
						{isSelected && (
							<li className="wp-block-create-block-team-member-add-icon-li">
								<Tooltip text={__("Add Social Link", "team-members")}>
									<button
										aria-label={__("Add Social Link", "team-members")}
										onClick={addNewSocialItem}
									>
										<Icon icon="plus" style={{ color: "#000" }} />
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
				{selectedLink !== undefined && (
					<div className="wp-block-create-block-team-member-link-form">
						<TextControl
							label={__("Icon", "team-members")}
							value={socialLinks[selectedLink].icon}
							onChange={(icon) => updateSocialItem("icon", icon)}
						/>
						<TextControl
							label={__("URL", "team-members")}
							value={socialLinks[selectedLink].link}
							onChange={(link) => updateSocialItem("link", link)}
						/>
						<br />
						<Button isDestructive onClick={removeSocialItem}>
							{__("Remove Item", "team-members")}
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
