import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { name, bio, imgURL, imgALT, imgID } = attributes;
	return (
		<div {...useBlockProps.save()}>
			{imgURL && (
				<img
					src={imgURL}
					alt={imgALT}
					className={imgID ? `wp-image-${imgID}` : null}
				/>
			)}
			<RichText.Content tagName="h4" value={name} />
			<RichText.Content tagName="p" value={bio} />
		</div>
	);
}
