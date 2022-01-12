<template>
  <p class="text-center font-bold text-5xl my-8">Marvel Cinematic Universe</p>

  <div class="w-full ml-auto mr-auto text-center mb-6">
    <input
      type="text"
      v-model="heroSearch"
      @change="renderedSuperHeros()"
      placeholder="filter by name..."
      class="w-3/4 md:w-1/5 p-4 text-xl font-bold"
    />
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-4/5 mr-auto ml-auto mb-8"
  >
    <div v-if="loading" class="col-span-3">
      <p class="text-center font-bold text-3xl">Loading... Please wait...</p>
      <Loading />
    </div>
    <SuperHeroCard
      v-for="hero in renderedSuperHeros"
      :key="hero.id"
      :hero="hero"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Superhero, State } from "../../init";
import SuperHeroCard from "./SuperHeroCard.vue";
import Loading from "../util/Loading.vue";

export default defineComponent({
  name: "SuperHeroDashboard",
  components: { Loading, SuperHeroCard },
  data(): State {
    return {
      errors: false,
      heroSearch: "",
      loading: false,
      pointer: 15,
      superheros: [],
    };
  },
  async mounted(): Promise<void> {
    document.body.style.backgroundColor = "#E5E4E2";
    document.title = "The Marvel Cinematic Universe";
    this.loading = true;
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
      );
      if (response.ok) {
        this.superheros = await response.json();
        this.loading = false;
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      this.errors = true;
      this.loading = false;
    }
    this.incrementPointerBy15();
  },
  methods: {
    incrementPointerBy15(): void {
      window.onscroll = () => {
        // amount of pixels for the entire height of the document + the current amount of pixels positioned from the top of the document === the number of pixels for the height of the screen
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >
          document.documentElement.offsetHeight - 200;
        if (bottomOfWindow) {
          this.pointer = this.pointer + 15;
        }
      };
    },
  },
  computed: {
    renderedSuperHeros(): Superhero[] {
      if (this.heroSearch) {
        return this.superheros.filter((hero: Superhero) =>
          hero.name.toLowerCase().includes(this.heroSearch.toLowerCase())
        );
      }
      return this.superheros.slice(0, this.pointer);
    },
  },
});
</script>
