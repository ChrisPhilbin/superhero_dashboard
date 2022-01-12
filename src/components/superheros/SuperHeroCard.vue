<template>
  <router-link :to="'/superheros/' + hero.id">
    <div
      class="shadow-xl bg-white md:rounded-tr-lg md:rounded-tl-lg cursor-pointer transition ease-in duration-700 transform hover:scale-105"
    >
      <div class="">
        <img
          :src="hero.images.sm"
          class="md:rounded-tl-lg md:rounded-tr-lg w-56 w-full h-auto"
        />
      </div>

      <div class="p-5">
        <p class="my-5 text-2xl font-bold text-red-500">{{ hero.name }}</p>
        <span v-if="hero.biography.fullName">
          <p class="inline text-sm text-gray-700 font-bold">AKA</p>
          <p class="inline text-sm text-gray-600">
            "{{ hero.biography.fullName }}"
          </p>
        </span>
        <span v-if="hero.biography.aliases.length">
          <p class="mt-4 text-md text-gray-900 font-bold">Aliases:</p>
          <ul>
            <li
              class="text-md text-gray-700"
              v-for="alias in hero.biography.aliases"
              :key="alias"
            >
              {{ alias }}
            </li>
          </ul>
        </span>
        <span v-if="hero.work.occupation != '-'">
          <p class="mt-4 text-md text-gray-900 font-bold">Occupation:</p>
          <p class="text-md text-gray-700">
            {{ hero.work.occupation }}
          </p>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SuperHeroCard",
  props: ["hero"],
};
</script>
