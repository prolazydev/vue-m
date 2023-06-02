export default {
  plugins: {
    cssnano: [ 'default', {
      discardComments: {
        removeAll: true,
      },
    } ],
    tailwindcss: {},
    autoprefixer: {},
  },
};
