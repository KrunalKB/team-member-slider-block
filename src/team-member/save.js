import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Icon } from "@wordpress/components";

export default function save({ attributes }) {
	const {
		name,
		bio,
		imgURL,
		imgALT,
		imgID,
		socialLinks,
		nameColor,
		bioColor,
		fontSizeName,
		fontSizeBio,
		iconColor,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			{imgURL && (
				<img
					src={imgURL}
					alt={imgALT}
					className={imgID ? `wp-image-${imgID}` : null}
				/>
			)}
			{name && (
				<RichText.Content
					tagName="h4"
					value={name}
					style={{
						color: nameColor,
						fontSize: fontSizeName,
					}}
				/>
			)}
			{bio && (
				<RichText.Content
					tagName="p"
					value={bio}
					style={{
						color: bioColor,
						fontSize: fontSizeBio,
					}}
				/>
			)}
			{socialLinks.length > 0 && (
				<div className="wp-block-create-block-team-member-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li key={index} data-icon={item.icon}>
									<a href={item.link}>
										<Icon icon={item.icon} style={{ color: iconColor }} />
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
