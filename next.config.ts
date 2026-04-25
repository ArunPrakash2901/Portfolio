import type { NextConfig } from "next";
import type { webpack } from "next/dist/compiled/webpack/webpack";
import path from "path";

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: webpack.Compiler) {
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
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config: webpack.Configuration) => {
    const typedConfig = config as webpack.Configuration & {
      plugins: NonNullable<webpack.Configuration['plugins']>;
      resolve: NonNullable<webpack.Configuration['resolve']>;
    };

    typedConfig.plugins.push(new VeliteWebpackPlugin());
    typedConfig.resolve.alias = {
      ...(typedConfig.resolve.alias as Record<string, string | false | string[]>),
      "#velite": path.resolve(__dirname, ".velite"),
    };
    return config;
  },
};

export default nextConfig;
