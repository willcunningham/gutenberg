## 3.0.0 (Unreleased)

### Breaking Changes

- The `wideAlign` block supports hook has been removed. Use `alignWide` instead.
- `fetchSharedBlocks` action has been removed. Use `fetchReusableBlocks` instead.
- `receiveSharedBlocks` action has been removed. Use `receiveReusableBlocks` instead.
- `saveSharedBlock` action has been removed. Use `saveReusableBlock` instead.
- `deleteSharedBlock` action has been removed. Use `deleteReusableBlock` instead.
- `updateSharedBlockTitle` action has been removed. Use `updateReusableBlockTitle` instead.
- `convertBlockToSaved` action has been removed. Use `convertBlockToReusable` instead.
- `getSharedBlock` selector has been removed. Use `getReusableBlock` instead.
- `isSavingSharedBlock` selector has been removed. Use `isSavingReusableBlock` instead.
- `isFetchingSharedBlock` selector has been removed. Use `isFetchingReusableBlock` instead.
- `getSharedBlocks` selector has been removed. Use `getReusableBlocks` instead.
- `editorMediaUpload` has been removed. Use `mediaUpload` instead.

### Deprecations

- The `setupEditor` action has been deprecated. Note: An editor is kept in sync automatically by its post state, without a predefined start point.
- The `setupEditorState` action has been deprecated. Note: An editor is kept in sync automatically by its post state, without a predefined start point.
- The `checkTemplateValidity` action has been deprecated. Note: Validity is verified automatically upon block reset.

### Bug Fixes

- The `PostTextEditor` component will respect its in-progress state edited value, even if the assigned prop value changes.
