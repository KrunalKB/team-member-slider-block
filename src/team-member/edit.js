import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { isBlobURL } from "@wordpress/blob";
import { Spinner,withNotices } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { name, bio, imgID, imgALT, imgURL } = attributes;

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
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
            imgALT: ''
        })
    }

	return (
		<div {...useBlockProps}>
			{imgURL && (
				<div className={`wp-block-create-block-team-member-img${
                    isBlobURL(imgURL) ? ' is-loading' : ''
                }`}>
					<img src={imgURL} alt={imgALT} />
                    {isBlobURL(imgURL) && <Spinner />}
				</div>
			)}
			<MediaPlaceholder
				icon="format-image"
				onSelect={onSelectImage}
                onSelectURL = {onSelectURL}
				accept="image/*"
				allowedTypes={["image"]}
				disableMediaButtons={imgURL}
			/>
			<RichText
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
		</div>
	);
}
