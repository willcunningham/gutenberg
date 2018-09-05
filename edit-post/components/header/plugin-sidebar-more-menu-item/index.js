/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { MenuItem } from '@wordpress/components';
import { withPluginContext } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PluginsMoreMenuGroup from '../plugins-more-menu-group';

const PluginSidebarMoreMenuItem = ( { children, icon, isSelected, onClick } ) => (
	<PluginsMoreMenuGroup>
		{ ( fillProps ) => (
			<MenuItem
				icon={ isSelected ? 'yes' : icon }
				isSelected={ isSelected }
				role="menuitemcheckbox"
				onClick={ compose( onClick, fillProps.onClose ) }
			>
				{ children }
			</MenuItem>
		) }
	</PluginsMoreMenuGroup>
);

export default compose(
	withPluginContext( ( context, ownProps ) => {
		return {
			icon: ownProps.icon || context.icon,
			sidebarName: `${ context.name }/${ ownProps.target }`,
		};
	} ),
	withSelect( ( select, { sidebarName } ) => {
		const {
			getActiveGeneralSidebarName,
		} = select( 'core/edit-post' );

		return {
			isSelected: getActiveGeneralSidebarName() === sidebarName,
		};
	} ),
	withDispatch( ( dispatch, { isSelected, sidebarName } ) => {
		const {
			closeGeneralSidebar,
			openGeneralSidebar,
		} = dispatch( 'core/edit-post' );
		const {
			clearSelectedBlock,
		} = dispatch( 'core/editor' );

		const onClick = isSelected ?
			closeGeneralSidebar :
			() => {
				clearSelectedBlock();
				openGeneralSidebar( sidebarName );
			};

		return { onClick };
	} ),
)( PluginSidebarMoreMenuItem );
