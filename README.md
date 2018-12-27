# vue-context-menu

> functional and customizable context menu for VueJs

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

Check out the [demo](https://codekraft-studio.github.io/vue-context-menu/) to see it in action.

## Installation

Download the project using your favorite package manager:

```
npm install @codekraft-studio/vue-context-menu
yarn add @codekraft-studio/vue-context-menu
```

Than import it in your project and load it:

```js
import Vue from 'vue'
import VueContextMenu from '@codekraft-studio/vue-context-menu'

Vue.use(VueContextMenu)
```

## Usage

It's very simple to use, first you need to setup your context menu components with the menu template you desire:

```html
<VueContextMenu ref="SimpleMenu">
  <ul>
    <li>First action</li>
    <li>Second action</li>
  </ul>
</VueContextMenu>
```

You should assign a reference name to the component so it's accessible inside your component instance and template scope through `$refs` object, in case of the example above you can access the context menu via `$refs.SimpleMenu`.

The next step is to bind the context menu to the element(s) where he belongs:

```html
<div class="container" @contextmenu="$refs.SimpleMenu.open">
  <!-- Some content -->
</div>
```

When the rightclick (or contextmenu) event occurs on the element your custom menu should appear.

You can also pass a context object to the menu with the element clicked, this is useful in case of dynamic menus or lists:

```html
<li v-for="(item, index) in items" :key="index" @contextmenu="$refs.ListMenu.open($event, item)">
  <span>{{item.name}}</span>
</li>

<VueContextMenu ref="ListMenu">
  <template slot-scope="{item}">
    <ul>
      <li @click="onEditClick(item)">Edit {{item.name}}</li>
      <li @click="onRemoveClick(item)">Remove {{item.name}}</li>
    </ul>
  </template>
</VueContextMenu>
```

In the example above the context menu will open with the `item` value as context and it's forwarded to the menu actions methods.

Be sure to add the `$event` object as __first argument__ of the __open__ method, otherwise it will not work properly.

## Methods

Usually you should use only the __open__ method and bind it to the `@contextmenu` event of your elements, but here a list of the component methods:

#### .open(event, context = {})

Ensure the position of the context menu relative to the target element of the event and shows it, the optional context is forwarded to the menu template scope.

#### .close()

Hide the context menu and reset it's position.

---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

---

## License

This project is released under [MIT License](LICENSE) by [codekraft-studio](https://github.com/codekraft-studio).

[npm-image]: https://badge.fury.io/js/%40codekraft-studio%2Fvue-context-menu.svg

[npm-url]: https://npmjs.org/package/@codekraft-studio/vue-context-menu

[daviddm-image]: https://david-dm.org/codekraft-studio/vue-context-menu.svg?theme=shields.io

[daviddm-url]: https://david-dm.org/codekraft-studio/vue-context-menu
