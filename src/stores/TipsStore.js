import { defineStore } from "pinia";
import axios from "axios";

export const useTipsStore = defineStore('tips', {
    state: () => ({
        tips: []
    }),
    actions: {
        fetchTips() {

        }
    }
})
