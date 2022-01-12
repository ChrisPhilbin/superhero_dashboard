<template>
  <Loading v-if="loading" />
  <div
    class="grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg w-full md:my-10 md:w-4/5 ml-auto mr-auto shadow-md border-2 border-gray-100"
    v-if="Object.keys(bioInfo).length"
  >
    <div class="ml-auto mr-auto mt-auto mb-auto">
      <img :src="bioInfo.images.lg" class="" :alt="bioInfo.name" />
    </div>
    <div class="p-8">
      <p class="text-center font-bold text-5xl text-red-500">
        {{ bioInfo.name }}
      </p>
      <p class="text-center text-lg">{{ bioInfo.work.occupation }}</p>

      <p class="mt-4 mb-2 font-bold text-xl text-green-600">Appearance</p>
      <p class="inline font-bold">Race:</p>
      <p class="inline">{{ " " + bioInfo.appearance.race }}</p>
      <br />
      <p class="inline font-bold">Gender:</p>
      <p class="inline">{{ " " + bioInfo.appearance.gender }}</p>
      <br />
      <p class="inline font-bold">Eye color:</p>
      <p class="inline">{{ " " + bioInfo.appearance.eyeColor }}</p>
      <br />
      <p class="inline font-bold">Hair color:</p>
      <p class="inline">{{ " " + bioInfo.appearance.hairColor }}</p>
      <br />
      <p class="inline font-bold">Height:</p>
      <p class="inline">
        {{ " " + bioInfo.appearance.height[0] }} / ({{
          bioInfo.appearance.height[1]
        }})
      </p>
      <br />
      <p class="inline font-bold">Weight:</p>
      <p class="inline">
        {{ bioInfo.appearance.weight[0] }} / ({{
          bioInfo.appearance.weight[1]
        }})
      </p>

      <p class="mt-4 mb-2 font-bold text-xl text-green-600">
        Biographical Information
      </p>
      <p class="inline font-bold">Full name:</p>
      <p class="inline">{{ " " + bioInfo.biography.fullName }}</p>
      <br />
      <span>
        <p class="inline font-bold">Aliases:</p>
        <p v-for="alias in bioInfo.biography.aliases" :key="alias" class="ml-2">
          {{ alias }}
        </p>
      </span>
      <p class="inline font-bold">Alter egos:</p>
      <p class="inline">{{ " " + bioInfo.biography.alterEgos }}</p>
      <br />
      <p class="inline font-bold">First appearance:</p>
      <p class="inline">{{ " " + bioInfo.biography.firstAppearance }}</p>

      <p class="mt-4 mb-2 font-bold text-xl text-green-600">Power Stats</p>

      <div class="relative py-1 w-3/5">
        Intelligence
        <div class="overflow-hidden text-xs flex rounded bg-red-200">
          <div
            :style="{
              width: bioInfo.powerstats.intelligence + '%',
            }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 py-1 px-1"
          >
            {{ bioInfo.powerstats.intelligence }}
          </div>
        </div>
      </div>

      <div class="relative py-1 w-3/5">
        Strength
        <div class="overflow-hidden text-xs flex rounded bg-red-200">
          <div
            :style="{
              width: bioInfo.powerstats.strength + '%',
            }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 py-1 px-1"
          >
            {{ bioInfo.powerstats.strength }}
          </div>
        </div>
      </div>

      <div class="relative py-1 w-3/5">
        Speed
        <div class="overflow-hidden text-xs flex rounded bg-red-200">
          <div
            :style="{
              width: bioInfo.powerstats.speed + '%',
            }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 py-1 px-1"
          >
            {{ bioInfo.powerstats.speed }}
          </div>
        </div>
      </div>

      <div class="relative py-1 w-3/5">
        Durability
        <div class="overflow-hidden text-xs flex rounded bg-red-200">
          <div
            :style="{
              width: bioInfo.powerstats.durability + '%',
            }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 py-1 px-1"
          >
            {{ bioInfo.powerstats.durability }}
          </div>
        </div>
      </div>

      <div class="relative py-1 w-3/5">
        Power
        <div class="overflow-hidden text-xs flex rounded bg-red-200">
          <div
            :style="{
              width: bioInfo.powerstats.power + '%',
            }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 py-1 px-1"
          >
            {{ bioInfo.powerstats.power }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "../util/Loading.vue";

export default defineComponent({
  name: "SuperHeroDetailsPage",
  components: { Loading },
  data() {
    return {
      loading: false as boolean,
      errors: false as boolean,
      //look into defining bioInfo via type definitions
      // eslint-disable-next-line
      bioInfo: {} as any,
    };
  },
  async mounted() {
    document.body.style.backgroundColor = "#E5E4E2";
    try {
      this.loading = true;
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${this.$route.params.id}.json`
      );
      if (response.ok) {
        this.bioInfo = await response.json();
        this.loading = false;
        document.title = this.bioInfo.name;
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      this.errors = true;
      this.loading = false;
    }
  },
});
</script>
