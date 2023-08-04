"use client";
import { useGluedEmotionCache } from "./emotionNextjsGlue";
import { CacheProvider } from "@emotion/react";
import { MantineProvider } from "@mantine/core";
import { NextFont } from "next/dist/compiled/@next/font";

export default function EmotionProvider({
  children,
  font,
}: {
  children: JSX.Element;
  font: NextFont;
}) {
  const cache = useGluedEmotionCache();
  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={cache}
        theme={{
          globalStyles: () => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
            },
          }),
          fontFamily: font.style.fontFamily,
          colors: {
            text: ["#000000", "#FFFFFF"],
            background: ["#fbfbfb"],
          },
        }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
