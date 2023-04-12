<template>
    <div class="container my-10">
        <div class="grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 lg:gap-0 lg:gap-y-6">
            <RecipeCard 
            v-for="item in current_items"
            :title="item.title"
            :content="item.content"
            :key="item.id"
            />
        </div>
        <div class="my-16 flex justify gap-16">
            <ul class="flex justify-center text-gray-700">
                <li class="transition-all hover:bg-green bg-white border-gray-700 border-2 p-2 cursor-pointer">&lt;&lt;</li>
                <router-link :to="`recipes?page=${num}`" class="transition-all hover:bg-green bg-white border-gray-700 border-2 p-2 cursor-pointer"
                    v-for="num in pages"
                    :key="num"
                    @click="loadPage()"
                >{{ num }}</router-link>
                <li class="transition-all hover:bg-green bg-white border-gray-700 border-2 p-2 cursor-pointer">>></li>
            </ul>
            <input class="shadow-xl border-solid border-black border-2 p-3 max-w-[70px] mx-auto justify-self-end" type="number" min="2" max="5" step="1" v-model="len"/>
        </div>
    </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue';

export default {
    data() {
        return {
            name: "Recipes",
            items: [],
            len: 3,
            pages: [],
            current_items: []
        }
    },
    watch: {
        len() {
            localStorage.setItem("length", this.len)
        }
    },
    components: {
        RecipeCard
    },
    mounted() {
        this.getLength()
        this.getItems()
    },
    methods: {
        getItems() {
            for (var i=1; i<6; i++) {
                this.items.push({id: i,title: "Обычный помидор", content: "Помидор"})
            }

            this.setTotalPages()
            
            this.loadPage()
        },
        setTotalPages() {
            var totPag = (this.items.length/this.len).toFixed()

            for (var i = 1; i <= totPag; i++) {
                this.pages.push(i)
            }
        },
        getLength() {
            if (localStorage.getItem('length')) {
                this.len = localStorage.getItem('length')
            } else {
                localStorage.setItem('length', this.len)
            }
        },
        loadPage() {
            // temp = (len*page_number)-(len*page_number-1)
            // this.items = t_items.slice((len*page_number-1), (len*page_number))
            let page_number = 1
            if (this.$route.query.page) {
                page_number = this.$route.query.page
            }

            this.current_items = []

            var slice_items = []
            for (var i = 0; i < this.items.length; i += this.len) {
                var chunk = this.items.slice(i, i+this.len)
                slice_items.push(chunk)
            }

            this.current_items = slice_items[page_number-1]
        }
    },
    computed: {
    }
}
</script>