module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Ensure Tailwind CSS is handled by PostCSS
        webpackConfig.module.rules.push({
          test: /\.css$/,
          use: [
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ],
        });
  
        return webpackConfig;
      },
    },
  };
  