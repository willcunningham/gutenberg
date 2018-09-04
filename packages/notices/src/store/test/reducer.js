/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import reducer from '../reducer';
import { createNotice, removeNotice } from '../actions';
import { getNotices } from '../selectors';
import { DEFAULT_CONTEXT } from '../constants';

describe( 'reducer', () => {
	it( 'should default to an empty object', () => {
		const state = reducer( undefined, {} );

		expect( state ).toEqual( {} );
	} );

	it( 'should track a notice', () => {
		const state = reducer( undefined, createNotice( 'error', 'save error' ) );

		expect( state ).toEqual( {
			[ DEFAULT_CONTEXT ]: [
				{
					id: expect.any( String ),
					content: 'save error',
					status: 'error',
					spokenMessage: undefined,
					isDismissible: true,
				},
			],
		} );
	} );

	it( 'should track a notice by context', () => {
		const state = reducer( undefined, createNotice( 'error', 'save error', { context: 'foo' } ) );

		expect( state ).toEqual( {
			foo: [
				{
					id: expect.any( String ),
					content: 'save error',
					status: 'error',
					spokenMessage: undefined,
					isDismissible: true,
				},
			],
		} );
	} );

	it( 'should track notices, respecting order by which they were created', () => {
		const original = deepFreeze( reducer( undefined, createNotice( 'error', 'save error' ) ) );

		const state = reducer( original, createNotice( 'success', 'successfully saved' ) );

		expect( state ).toEqual( {
			[ DEFAULT_CONTEXT ]: [
				{
					id: expect.any( String ),
					content: 'save error',
					status: 'error',
					spokenMessage: undefined,
					isDismissible: true,
				},
				{
					id: expect.any( String ),
					content: 'successfully saved',
					status: 'success',
					spokenMessage: undefined,
					isDismissible: true,
				},
			],
		} );
	} );

	it( 'should omit a removed notice', () => {
		const original = deepFreeze( reducer( undefined, createNotice( 'error', 'save error' ) ) );
		const id = getNotices( original )[ 0 ].id;

		const state = reducer( original, removeNotice( id ) );

		expect( state ).toEqual( {
			[ DEFAULT_CONTEXT ]: [],
		} );
	} );

	it( 'should omit a removed notice by context', () => {
		const original = deepFreeze( reducer( undefined, createNotice( 'error', 'save error', { context: 'foo' } ) ) );
		const id = getNotices( original, 'foo' )[ 0 ].id;

		const state = reducer( original, removeNotice( id, 'foo' ) );

		expect( state ).toEqual( {
			foo: [],
		} );
	} );

	it( 'should omit a removed notice across contexts', () => {
		const original = deepFreeze( reducer( undefined, createNotice( 'error', 'save error' ) ) );
		const id = getNotices( original )[ 0 ].id;

		const state = reducer( original, removeNotice( id, 'foo' ) );

		expect( state[ DEFAULT_CONTEXT ] ).toHaveLength( 1 );
	} );

	it( 'should dedupe distinct ids, preferring new', () => {
		const original = deepFreeze( reducer( undefined, createNotice( 'error', 'save error (1)', { id: 'error-message' } ) ) );

		const state = reducer( original, createNotice( 'error', 'save error (2)', { id: 'error-message' } ) );

		expect( state ).toEqual( {
			[ DEFAULT_CONTEXT ]: [
				{
					id: 'error-message',
					content: 'save error (2)',
					status: 'error',
					spokenMessage: undefined,
					isDismissible: true,
				},
			],
		} );
	} );
} );
