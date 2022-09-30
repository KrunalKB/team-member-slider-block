import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import save from "./save";

registerBlockType("create-block/team-member", {
	title: __("Team Member", "team-members"),
	description: __("A team member", "team-members"),
	icon: "admin-users",
	parent: ["create-block/team-member-slider-block"],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h4",
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p",
		},
		nameColor: {
			type: "string",
			default: "#000",
		},
		bioColor: {
			type: "string",
			default: "#000",
		},
		fontSizeName: {
			type: "number",
			default: "22",
		},
		fontSizeBio: {
			type: "number",
			default: "22",
		},
		imgID: {
			type: "number",
		},
		imgALT: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img",
			default: "",
		},
		imgURL: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "img",
			default: "",
		},
		socialLinks: {
			type: "array",
			default: [
				{ link: "https://facebook.com", icon: "facebook" },
				{ link: "https://instagram.com", icon: "instagram" },
			],
			source: "query",
			selector: ".wp-block-create-block-team-member-social-links ul li",
			query: {
				icon: {
					source: "attribute",
					attribute: "data-icon",
				},
				link: {
					source: "attribute",
					attribute: "href",
					selector: "a",
				},
			},
		},
		iconColor: {
			type: "string",
			default: "#4e4e4e",
		},
	},
	edit: Edit,
	save,
});
