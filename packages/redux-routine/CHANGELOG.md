## 2.0.0 (Unreleased)

### Breaking change

- This releases changes the public API of the package. We're now exporting `createRuntime` and `createMiddleware` APIs to allow more flexibility in using the co-routine runtime without using it as a Redux Middleware.