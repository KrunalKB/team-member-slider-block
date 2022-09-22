import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Tooltip,
	Button,
	TextControl,
} from "@wordpress/components";
import { useEffect, useState, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";

export default function Edit({ attributes, setAttributes, isSelected }) {
	const { name, bio, imgID, imgALT, imgURL, socialLinks } = attributes;

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

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
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
					initialOpen={false}
				>
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
						<img src={imgURL} alt={imgALT} />
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
				/>
				<RichText
					placeholder={__("Member Bio", "team-members")}
					tagName="p"
					value={bio}
					onChange={onChangeBio}
					allowedFormats={[]}
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
										<Icon icon={item.icon} />
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
										<Icon icon="plus" />
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
