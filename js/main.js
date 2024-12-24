const app = Vue.createApp(
    {
        data()
        {
            return {
                config: {},
                numberLines: null,
                textarea: null,
                isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
                isDesktop: window.innerWidth >= 768
            }
        },

        async mounted()
        {
            this.numberLines = document.getElementById('numberLines')
            this.textarea = document.getElementById('textarea')
            const res = await fetch('../config.json')
            this.config = await res.json()
            this.init(this.config[0])
        },

        methods:
        {
            /**
             * Just a method to initialize somethings
             * to editor according to config file
             * @param {object} config
             */
            init(config)
            {
                this.textarea.style.fontSize = `${config.editor.font.size}px`
                this.textarea.style.fontFamily = config.editor.font.family
                if (this.isDesktop) this.textarea.focus()
                if (this.isDarkMode)
                    {
                        this.textarea.classList.add(
                            `bg-${config.theme.dark.bg}-900`,
                            `text-${config.theme.dark.text}-200`
                        )
                        this.numberLines.classList.add(
                            `bg-${config.theme.dark.bg}-800`,
                            `text-${config.theme.dark.text}-200`
                        )
                    }
                else
                    {
                        this.textarea.classList.add(
                            `bg-${config.theme.light.bg}-50`,
                            `text-${config.theme.light.text}-800`
                        )
                        this.numberLines.classList.add(
                            `bg-${config.theme.dark.bg}-200`,
                            `text-${config.theme.dark.text}-800`
                        )
                    }
            },

            /**
             * Method to add number lines
             * to editor
             */
            createLine()
            {
                const lines = this.textarea.value.split("\n").length
                this.numberLines.innerHTML = Array.from({ length: lines}, (_, i) => i + 1).join("<br>")
            },

            /**
             * handle scrolling
             */
            syncScroll()
            {
                this.numberLines.scrollTop = this.textarea.scrollTop
            }
        }
    }
)

app.mount('#app')