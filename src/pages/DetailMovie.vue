<template>
  <default-container>
    <div class="flex flex-col sm:flex-row sm:gap-x-10 sm:mt-4">
      <div class="sm:w-3/12">
        <img src="@/assets/img/banner.jpg" class="rounded-md h-72 sm:h-96 w-full bg-cover" alt="" />
      </div>
      <div class="sm:w-9/12 pl-3">
        <h1 class="mt-3 font-poppins text-lg font-semibold text-secondary">
          Spider-Man: Across the Spider-Verse (2023)
        </h1>
        <!-- Tagline -->
        <h4 class="font-poppins text-base mt-1 text-secondary2 font-semibold italic">
          The end of the road begins.
        </h4>
        <span class="text-sm font-poppins opacity-75">Action, Comedy, Animation</span>
        <!-- Overview -->
        <h3 class="font-poppins mt-5 font-semibold text-lg">Overview</h3>
        <p class="font-poppins text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit quod rerum, id autem ipsum
          libero amet quae, quam voluptate excepturi error earum eos dolores veniam non! Quae
          repellendus vel sint, soluta sapiente molestias aperiam ipsum molestiae beatae repudiandae
          odit necessitatibus a delectus, modi distinctio dolore incidunt quaerat veritatis rem, in
          enim voluptate? Minus veritatis dolores fuga tempore, inventore vel quo. Vel est,
          doloribus delectus architecto laborum at obcaecati illum incidunt eum dolorem recusandae
          pariatur, facere error deserunt quia aperiam repellendus!
        </p>

        <!-- Status -->
        <div>
          <div class="mt-5 flex flex-col sm:flex-row sm:gap-x-4 border-b pb-4">
            <p class="font-poppins text-base">
              Status : <span class="font-poppins opacity-80">Released</span>
            </p>
            <p class="font-poppins text-base">
              Release Date : <span class="font-poppins opacity-80">23 Mei 2023</span>
            </p>
            <p class="font-poppins text-base">
              Runtime : <span class="font-poppins opacity-80">2h 22 m</span>
            </p>
          </div>
          <div class="border-b pb-4 my-4">
            <p class="font-poppins text-base">
              Director : <span class="font-poppins opacity-80">Louis Leterrier</span>
            </p>
          </div>
          <div class="border-b pb-4">
            <p class="font-poppins text-base">
              Writer :
              <span class="font-poppins opacity-80"
                >Justin Lin, Justin Lin, Dan Mazeau, Dan Mazeau, Zach Dean</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </default-container>
</template>

<script setup>
import DefaultContainer from '@/components/Layouts/DefaultContainer.vue'
</script>
