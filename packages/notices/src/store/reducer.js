/**
 * External dependencies
 */
import { reject } from 'lodash';

/**
 * Internal dependencies
 */
import onSubKey from './utils/on-sub-key';

const notices = onSubKey( 'context' )( ( state = [], action ) => {
	switch ( action.type ) {
		case 'CREATE_NOTICE':
			// Avoid duplicates on ID.
			return [
				...reject( state, { id: action.notice.id } ),
				action.notice,
			];

		case 'REMOVE_NOTICE':
			return reject( state, { id: action.id } );
	}

	return state;
} );

export default notices;
