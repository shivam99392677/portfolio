import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Powers the desktop shared-element morph between a ProjectCard and its
   * Case Study hero (animations.md §5.7). Degrades to a normal navigation
   * with no animation on engines without View Transitions API support.
   */
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
