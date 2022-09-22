import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';

registerBlockType("create-block/team-member",{
    title: __("Team Member","team-members"),
    description: __("A team member","team-members"),
    icon:"admin-users",
    parent: ['create-block/team-member-slider-block'],
    supports:{
        reusable: false,
        html: false
    },
    attributes:{
        name:{
            type: "string",
            source: "html",
            selector: "h4"
        },
        bio:{
            type: "string",
            source: "html",
            selector: "p"
        },
        imgID:{
            type:"number"
        },
        imgALT:{
            type: "string",
            source:"attribute",
            attribute:"alt",
            selector: "img",
            default: "",
        },
        imgURL:{
            type: "string",
            source:"attribute",
            attribute:"src",
            selector: "img",
            default: "",
        },
        socialLinks:{
            type: 'array',
            default:[
                {link: "https://facebook.com",icon:"facebook"},
                {link: "https://instagram.com",icon:"instagram"},
            ]
        }
    },
    edit: Edit,
    save,
})