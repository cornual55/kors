<template>
    <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" src="https://picsum.photos/350/200" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
            </a>
            <p class="mb-3 sm:text-sm font-normal text-gray-700 dark:text-gray-400">{{ content }}</p>
            <a href="#"
                class="inline-flex items-center px-3 py-2 sm:p-2 text-sm font-medium text-center bg-green border-green border-2 rounded-lg hover:bg-white focus:ring-4 focus:outline-none">
                Подробнее
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecipeCard",
    props: ['title', 'content']
}
</script>