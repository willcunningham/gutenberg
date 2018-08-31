## 2.0.0 (Unreleased)

### Breaking change

- The middleware returns a promise resolving once the runtime finishes looping throught the generator.
- It's not possible to kill the execution of the runtime anymore by returning `undefined`