/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DMSans_400Regular"],
        "dmsans-extralight": ["DMSans_200ExtraLight"],
        "dmsans-medium": ["DMSans_500Medium"],
        "dmsans-bold": ["DMSans_700Bold"],
        "dmsans-semibold": ["DMSans_600SemiBold"],
        playwrite: ["PlaywriteAUQLD_400Regular"],
      },
    },
  },
  plugins: [],
};
