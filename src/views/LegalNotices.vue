<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- En-tête -->
      <div class="bg-gradient-to-r bg-components py-8 px-6">
        <h1 class="text-3xl font-bold text-white text-center">
          Mentions Légales
        </h1>
      </div>

      <div class="p-8">
        <!-- Éditeur du site -->
        <section class="mb-10 hover:bg-gray-50 rounded-lg p-6 transition duration-300">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-background rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-components"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">
              Éditeur du site
            </h2>
          </div>
          <div class="ml-16 space-y-3">
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Nom ou Raison sociale :</span>
              <span>Cyril Dohin</span>
            </p>
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Adresse :</span>
              <span>13 bis rue de l'amiral</span>
            </p>
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Téléphone :</span>
              <span>06 70 44 96 15</span>
            </p>
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Email :</span>
              <span>cyril.dohin@gmail.com</span>
            </p>
          </div>
        </section>

        <!-- Responsable de publication -->
        <section class="mb-10 hover:bg-gray-50 rounded-lg p-6 transition duration-300">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-background rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-components"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">
              Responsable de publication
            </h2>
          </div>
          <div class="ml-16">
            <p class="text-gray-600">
              Cyril Dohin
            </p>
          </div>
        </section>

        <!-- Hébergement -->
        <section class="hover:bg-gray-50 rounded-lg p-6 transition duration-300">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-background rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-components"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">
              Hébergement
            </h2>
          </div>
          <div class="ml-16 space-y-3">
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Hébergeur :</span>
              <span>DigitalOcean</span>
            </p>
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Adresse :</span>
              <span>ZEKERINSTRAAT 17A, 1014 AMSTERDAM PAYS-BAS</span>
            </p>
            <p class="flex items-center text-gray-600">
              <span class="font-medium w-48">Téléphone :</span>
              <span>+1 888 890 6714</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalMentions'
}
</script>