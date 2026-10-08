import React from "react";
import { SparklesText } from "./ui/sparkles-text";

export function HeroTitle() {
  return (
    <SparklesText
      colors={{ first: "#3b82f6", second: "#60a5fa" }}
      sparklesCount={4}
      textClassName="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent"
    >
      Penyedia Cloud VPS & Akun Digital Premium
    </SparklesText>
  );
}

export default HeroTitle;
