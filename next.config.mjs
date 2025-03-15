import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  },
  contentDirBasePath: '/docs'
})


export default withNextra({
  experimental: {
    turbo: true
  },
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
})