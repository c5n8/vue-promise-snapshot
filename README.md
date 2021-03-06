<p align="center"><img width="100" height="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

<h2 align="center">Vue Promise Snapshot</h2>

<p align="center">
  Reactive object that sync itself based on the latest snapshot of state of a Promise.
</p>

#

## News
This stable version is compatible with Vue 2 using `@vue/composition-api` plugin.

If you want Vue 3 beta compatible version, then see [here](https://github.com/c5n8/vue-promise-snapshot/tree/release/v2.0.0-beta.1)

## Tips

If you want same functionality, but as component, then checkout [vue-promise-builder](https://github.com/c5n8/vue-promise-builder).

## Installation

- Using NPM
```
npm install vue-promise-snapshot
```

- Using Yarn
```
yarn add vue-promise-snapshot
```

## Usage

You must install `@vue/composition-api` as a plugin via `Vue.use()` beforehand.

See [@vue/composition-api](https://github.com/vuejs/composition-api).

```html
<template>
  <div>
    <div v-if="generation.isStandby">
      <div>Generate number 1-1000</div>
      <button @click="generate()">Start</button>
    </div>

    <div v-if="generation.isPending">
      Generating...
    </div>
    <div v-else-if="generation.isFulfilled">
      {{ generation.result }}
    </div>
    <div v-else-if="generation.isRejected">
      {{ generation.error }}
    </div>

    <div v-if="generation.isSettled">
      <button @click="generate()">Retry</button>
    </div>
  </div>
</template>

<script>
import { usePromiseSnapshot } from 'vue-promise-snapshot'

export default {
  setup() {
    const generation = usePromiseSnapshot()

    async function generate() {
      generation.promise = _generate(1, 1000)

      try {
        await generation.promise
      } catch (error) {
        //
      }
    }

    // You can also use start method to get one-liner and type hints

    // async function generate() {
    //   try {
    //     await generation.start(_generate(1, 1000))
    //   } catch (error) {
    //     //
    //   }
    // }

    return {
      generation,
      generate,
    }
  },
}

async function _generate(min, max) {
  await new Promise((resolve) => setTimeout(resolve, random(200, 2000)))
 
  if (random(0, 1)) {
    throw new Error('Failed to generate')
  }
 
  return random(min, max)
}
 
function random(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min + 1)) + min
}
</script>
```

## API Reference

```ts
declare function usePromise<R>(): PromiseSnapshot<R>

interface PromiseSnapshot<R> {
  promise: Promise<R | any> | null
  readonly error: any
  readonly result: R | null | undefined
  readonly status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  readonly isStandby: boolean
  readonly isPending: boolean
  readonly isSettled: boolean
  readonly isFulfilled: boolean | undefined
  readonly isRejected: boolean | undefined
  readonly hasResult: boolean | undefined
  readonly hasError: boolean | undefined
  start<T>(promise: Promise<T>): Promise<T>
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
