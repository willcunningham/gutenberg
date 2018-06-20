/**
 * External dependencies
 */
import classnames from 'classnames';
import ResizableBox from 're-resizable';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	withColors,
	MediaContainer,
} from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Constants
 */
const MEDIA_POSITIONS = [ 'left', 'right' ];
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/list' ];
const TEMPLATE = [
	[ 'core/paragraph', { fontSize: 'large', placeholder: 'Content...' } ],
];

class ImageEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectMedia = this.onSelectMedia.bind( this );
	}

	onSelectMedia( media ) {
		const { setAttributes } = this.props;
		setAttributes( {
			mediaAlt: media.alt,
			mediaId: media.id,
			mediaType: media.type,
			mediaUrl: media.url,
		} );
	}

	renderMediaArea() {
		const { attributes, setAttributes } = this.props;
		const { mediaAlt, mediaId, mediaPosition, mediaType, mediaUrl, width } = attributes;
		const handleClasses = {
			left: 'block-library-half-media__resize-handler',
			right: 'block-library-half-media__resize-handler',
		};
		const onResizeStop = ( event, direction, elt, delta ) => {
			setAttributes( {
				width: parseInt( width + delta.width, 10 ),
			} );
		};
		const enablePositions = {
			right: mediaPosition === 'left',
			left: mediaPosition === 'right',
		};
		return (
			<ResizableBox
				className="block-library-half-media__resizer"
				size={ { width } }
				minWidth="100"
				handleClasses={ handleClasses }
				enable={ enablePositions }
				onResizeStop={ onResizeStop }
				axis="x"
			>
				<MediaContainer
					className="block-library-half-media__media-container"
					onSelectMedia={ this.onSelectMedia }
					{ ...{ mediaAlt, mediaId, mediaType, mediaUrl } }
				/>
			</ResizableBox>
		);
	}

	render() {
		const { attributes, backgroundColor, setAttributes, setBackgroundColor } = this.props;
		const className = classnames( 'wp-block-half-media', {
			'has-media-on-the-right': 'right' === attributes.mediaPosition,
			[ backgroundColor.class ]: backgroundColor.class,
		} );
		const style = {
			backgroundColor: backgroundColor.value,
		};
		const colorSettings = [ {
			value: backgroundColor.value,
			onChange: setBackgroundColor,
			label: __( 'Background Color' ),
		} ];
		return (
			<Fragment>
				<div className={ className } style={ style } >
					{ this.renderMediaArea() }
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
					/>
				</div>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ colorSettings }
					/>
				</InspectorControls>
				<BlockControls>
					<BlockAlignmentToolbar
						controls={ MEDIA_POSITIONS }
						value={ attributes.mediaPosition }
						onChange={ ( mediaPosition ) => setAttributes( { mediaPosition } ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( 'backgroundColor' ),
	withSelect( ( select ) => {
		return {
			wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
		};
	} ),
] )( ImageEdit );
