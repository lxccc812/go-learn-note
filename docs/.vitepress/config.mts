import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "go learn note",
  description: "Golang Learning Notes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Note', link: '/day00' },
      { text: 'Example', link: 'https://github.com/lxccc812/go-learn-exmple' },
    ],

    sidebar: [
      {
        text: 'Note',
        items: [
          { text: 'day00', link: '/day00' },
          { text: 'day01', link: '/day01' },
          { text: 'day02', link: '/day02' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lxccc812' }
    ]
  },
  markdown: {
    lineNumbers: true,
  }
})
