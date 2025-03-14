import nextra from 'nextra'

const withNextra = nextra({
  // theme: 'nextra-theme-docs',
  // themeConfig: './theme.config.ts',
  search: {
    codeblocks: false,
  },
})


export default withNextra({
  experimental: {
    turbo: true,
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
})