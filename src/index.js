import { registerBlockType } from '@wordpress/blocks';
import './team-member';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon:{
		src : "groups",
		background : "#000",
		foreground : "#fff"
	},

	attributes:{
		columns:{
			type : "number",
			default: 2
		}
	},

	edit: Edit,

	save,
} );
