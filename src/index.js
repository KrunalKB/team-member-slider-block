import { registerBlockType } from "@wordpress/blocks";
import "./team-member";
import { __ } from "@wordpress/i18n";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType(metadata.name, {
	icon: {
		src: "groups",
		background: "#000",
		foreground: "#fff",
	},

	attributes: {
		columns: {
			type: "number",
			default: 2,
		},
		blockStyle: {
			type: "string",
			default: "c",
		},
		loop: {
			type: "boolean",
			default: true,
		},
		autoplay: {
			type: "boolean",
			default: true,
		},
		slidesToShow: {
			type: "number",
			default: 1,
		},
		slidesToScroll: {
			type: "number",
			default: 1,
		},
		dots: {
			type: "boolean",
			default: true,
		},
		fade: {
			type: "boolean",
			default: false,
		},
		arrow: {
			type: "boolean",
			default: true,
		},
		speed: {
			type: "string",
			default: "300",
		},
	},

	edit: Edit,

	save,
});
