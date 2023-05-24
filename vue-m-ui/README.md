# vue-m ⚒ WORK IN PROGRESS

`0.1.0 is out! 🎉🥳`

[![npm version](https://badge.fury.io/js/vue-m.svg)](https://badge.fury.io/js/vue-m)

## Introduction

`vue-m` is a Vue 3 UI component library designed to enhance the user interface of your Vue applications. It provides a collection of modern and responsive UI components that are easy to install and use.

## Features

- Modern and responsive UI components
- Easy installation and usage
- Built with Vue 3 and TypeScript
- Highly customizable and flexible

## Installation

You can install the `vue-m` package using npm or Yarn:

```bash
npm install vue-m
```

or

```bash
yarn add vue-m
```

## Usage

To use the components from vue-m, register them in `main.ts`:

```ts
import { createApp } from 'vue';
import vueM from 'vue-m'; // Import the components
import 'vue-m/dist/vue-m.css'; // Import the styling (Optional)
import App from './App.vue';

createApp(App)
   .use(vueM)
   .mount('#app');
```

Then use the components like this:

```vue
<template>
  <div>
      <m-btn text="Write here" color='primary' />
      <!-- or -->
      <m-btn>
         <div>
            Custom element inside the button 
         </div>
      </m-btn>
  </div>
</template>
```

## TODO

- Create the todos :> `Doing`

<!--- Alert
- Avatar
- Breadcrumb
- Button
- Card
- Checkbox
- Chip
- Collapse
- Dialogs
- Divider
- Dropdown
- Images
- Input
- List
- Loading
- Navbar
- Notification
- Number Input
- Pagination
- Popup
- Progress
- Radio
- Select
- Sidebar
- Slider
- Switch
- Table
- Tabs
- Textarea
- Tooltip
- Upload -->
