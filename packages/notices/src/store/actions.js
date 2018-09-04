/**
 * External dependencies
 */
import { uniqueId } from 'lodash';

/**
 * Internal dependencies
 */
import { DEFAULT_CONTEXT } from './constants';

/**
 * Returns an action object used in signalling that a notice is to be created.
 *
 * @param {?string}  status                Notice status. Defaults to `info`.
 * @param {string}   content               Notice message.
 * @param {?Object}  options               Optional notice options.
 * @param {?string}  options.context       Context under which notice is to be
 *                                         grouped.
 * @param {?string}  options.id            Unique identifier of notice. If not
 *                                         specified, one will be automatically
 *                                         generated.
 * @param {?boolean} options.isDismissible Whether the notice can be dismissed
 *                                         by the user. Defaults to `true`.
 * @param {?string}  options.spokenMessage A customized message spoken to
 *                                         screen-reader devices.
 *
 * @return {Object} Action object.
 */
export function createNotice( status = 'info', content, options = {} ) {
	const {
		spokenMessage,
		isDismissible = true,
		context = DEFAULT_CONTEXT,
		id = uniqueId( context ),
	} = options;

	return {
		type: 'CREATE_NOTICE',
		context,
		notice: {
			id,
			status,
			content,
			isDismissible,
			spokenMessage,
		},
	};
}

/**
 * Returns an action object used in signalling that a success notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */
export function createSuccessNotice( content, options ) {
	return createNotice( 'success', content, options );
}

/**
 * Returns an action object used in signalling that an info notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */
export function createInfoNotice( content, options ) {
	return createNotice( 'info', content, options );
}

/**
 * Returns an action object used in signalling that an error notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */
export function createErrorNotice( content, options ) {
	return createNotice( 'error', content, options );
}

/**
 * Returns an action object used in signalling that a warning notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */
export function createWarningNotice( content, options ) {
	return createNotice( 'warning', content, options );
}

/**
 * Returns an action object used in signalling that a notice is to be removed.
 *
 * @param {string}  id      Notice unique identifier.
 * @param {?string} context Optional context (grouping) in which the notice is
 *                          intended to appear. Defaults to default context.
 *
 * @return {Object} Action object.
 */
export function removeNotice( id, context = DEFAULT_CONTEXT ) {
	return {
		type: 'REMOVE_NOTICE',
		id,
		context,
	};
}
