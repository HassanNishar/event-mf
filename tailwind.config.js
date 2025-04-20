// event-mf/tailwind.config.js
module.exports = {
    content: [
      "./projects/event-shell/src/**/*.{html,ts}",
      "./projects/event-remote1/src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
            primary: "#FFA828", // Define your primary color here (you can change the hex value)
          },
      },
    },
    plugins: [],
  };
