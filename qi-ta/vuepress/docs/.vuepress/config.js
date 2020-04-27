module.exports = {
    title: '个人博客',  // 设置网站标题
    description: 'sineava',
    base: '/',
    themeConfig: {
        sidebar: 'auto',
        nav: [
            {
                text: '分类',
                items: [
                    {
                        text: '前端', items: [
                            { text: 'Css', link: '/cate/css/' },
                            { text: 'Javascript', link: '/cate/javascript/' },
                            { text: 'Vue', link: '/cate/vue/' },
                            { text: 'Git', link: '/cate/git/' }
                        ]
                    },
                    {
                        text: '服务器', items: [
                            { text: 'Docker', link: '/cate/docker/' }
                        ]
                    },
                    {
                        text: '其他', items: [
                            { text: 'Tools', link: '/cate/tools/' },
                            { text: 'Code', link: '/cate/code/' }
                        ]
                    }
                ]
            },
            { text: 'Vue项目', link: 'https://www.sineava.top' },
            { text: 'GitHub', link: 'https://github.com/sineava' }
        ],
        sidebarDepth: 2
    }
}