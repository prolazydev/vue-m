<!-- TODO: Create comparison links on vue-m versions -->
## 0.3.0 (06-06-2023)

### Feature

#### `<m-btn></m-btn>`

- Added the ability to add custom colors on input with shades on `hover` and `click`
- Added a set of custom sizes with the `size` string prop
- Added a set of custom shapes with the `shape` string prop
- Handle transparency with the `transparent` boolean prop
- Ability to add `custom elements` inside the button or optionally through the `text` string prop
- Added: `disabled` and `loading` with custom `loading-icon` with the `loading-circle` default icon

#### Added the `<m-input></m-input>` component 🎉

- Added the `id` prop at the input element or the `container-id` to select the whole element 
- Optionally add the component on top of the input with the `label` string prop that contains the text, with the optional `label-id` string prop
- Placeholder...
- Added an icon with the `icon` string property *limited to a small set of open source icons*
- `type` string prop **Currently supports `text` and `email` inputs**
- Added a set of custom colors for the input element with the `color` string prop with the optional support for custom `hex` and `rgb/a` colors
- Added a set of custom colors for the text inside of the input element with the `text-color` string prop with the optional support for custom `hex` and `rgb/a` colors
- Added a set of custom sizes with the `size` string prop
- Added a set of custom shapes with the `shape` string prop
- Handle **bold text** with the `bold` boolean prop
- Added: `disabled` and `loading` with custom `loading-icon` with the `loading-circle` default icon
- Added automatic email validation of input of `type="email"`
- Added persistent validation bar on email inputs **This will change to fit other types as well**
- Autofocus... :>

#### Added the `<m-switch></m-switch>` component 🎉

- Added a set of custom colors for the `switch` element with the `color` string prop with the optional support for custom `hex` and `rgb/a` colors
- Added a set of custom sizes with the `size` string prop
- Added the custom width with the `custom-width` string prop that accepts normal css size units
- Added: `disabled` and `loading` 

#### Other

- Added css minification with postcss cssnano plugin

### Changed

- Minor reorganizing of css with vars to better support color and style customization.

### Fixed

- Fixed some minor bugs on `<m-btn></m-btn>` that wasn't detecting the tab on custom colors

## 0.2.0 (01-06-2023)

### Feature

- Added the `<m-input></m-input>` and `<m-switch></m-switch>` Components with minor styling functionality that are still in development. 

### Changed

- Minor reorganizing of the project structure for better scalability and maintainability.

## 0.1.1 (26-05-2023)

##### First of many! 🎉

### Feature
0.1.1 brings us the `<m-btn></m-btn>` button element.

The docs for usage will be out in a jiffy (prolly next week - May 30ish or later...)