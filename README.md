<p align="center"><img width="100" height="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

<p align="center">BETA</p>
<h2 align="center">Vue Promise Snapshot</h2>
<p align="center">
  Reactive object that sync itself based on the latest snapshot of interaction with a Promise.
</p>

#

## Notice
This beta version is compatible with Vue 3 beta.

If you want Vue 2 compatible version, then see [here](https://github.com/c5n8/vue-promise-snapshot#readme)

## Tips

If you want same functionality, but as component, then checkout [vue-promise-builder](https://github.com/c5n8/vue-promise-builder#readme).

## Installation

- Using NPM
```
npm install vue-promise-snapshot@beta
```

- Using Yarn
```
yarn add vue-promise-snapshot@beta
```

## Usage

```html
<template>
  <section>
    <template v-if="calculation.isStandby">
      <div>Generate number 1-1000</div>
      <div>
        <button @click="startCalculation()">Start</button>
      </div>
    </template>

    <template v-if="calculation.isPending">
      <div>Generating...</div>
    </template>
    <template v-else-if="calculation.isFulfilled">
      <div>{{ calculation.result }}</div>
    </template>
    <template v-else-if="calculation.isRejected">
      <div>{{ calculation.error }}</div>
    </template>

    <template v-if="calculation.isSettled">
      <div>
        <button @click="startCalculation()">Retry</button>
      </div>
    </template>
  </section>
</template>

<script>
import { usePromise } from 'vue-promise-snapshot'
import { sample, random } from 'lodash-es'

export default {
  setup() {
    const calculation = usePromise()

    async function startCalculation() {
      try {
        await calculation.start(calculate())
      } catch (error) {
        //
      }
    }

    return {
      calculation,
      startCalculation,
    }
  },
}

export async function calculate() {
  const duration = random(200, 2000)

  await new Promise((resolve) => setTimeout(resolve, duration))

  if (sample([true, false])) {
    throw new Error('Failed to generate')
  }

  return random(0, 1000)
}
</script>
```

## API Reference

```ts
declare function usePromise<R>(): PromiseSnapshot<R>

interface PromiseSnapshot<R> {
    readonly error: any
    readonly result: R | null | undefined
    readonly status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
    readonly isStandby: boolean
    readonly isPending: boolean
    readonly isFulfilled: boolean
    readonly isRejected: boolean
    readonly isSettled: boolean
    readonly hasResult: boolean
    readonly hasError: boolean
    start(promise: Promise<R>): Promise<R>
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
