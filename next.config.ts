import type { NextConfig } from "next";
import path from "path";

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: any) {
    // Prevent multiple builds in watch mode
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const { build } = await import("velite");
      await build({ watch: compiler.options.mode === "development", clean: !compiler.options.watch });
    });
  }
}

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "#velite": "./.velite",
    },
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    config.resolve.alias = {
      ...config.resolve.alias,
      "#velite": path.resolve(__dirname, ".velite"),
    };
    return config;
  },
};

export default nextConfig;
