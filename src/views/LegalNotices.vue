<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- En-tête -->
      <div class="bg-gradient-to-r bg-components py-6 sm:py-8 px-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-text-accent text-center">
          Mentions Légales
        </h1>
      </div>

      <div class="p-6 sm:p-8">
        <!-- Éditeur du site -->
        <section class="mb-8 sm:mb-10 p-4 sm:p-6 bg-gray-100 rounded-lg transition duration-300">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="p-2 bg-white rounded-lg mr-3 sm:mr-4">
              <svg class="h-5 w-5 sm:h-6 sm:w-6 text-components" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 class="text-lg sm:text-2xl font-semibold text-gray-800">
              Éditeur du site
            </h2>
          </div>
          <div class="ml-6 sm:ml-16 space-y-2 sm:space-y-3 text-gray-600">
            <p><span class="font-medium">Nom :</span> Cyril Dohin</p>
            <p><span class="font-medium">Adresse :</span> 13 bis rue de l'amiral</p>
            <p><span class="font-medium">Téléphone :</span> 06 70 44 96 15</p>
            <p><span class="font-medium">Email :</span> cyril.dohin@gmail.com</p>
          </div>
        </section>

        <!-- Responsable de publication -->
        <section class="mb-8 sm:mb-10 p-4 sm:p-6 bg-gray-100 rounded-lg transition duration-300">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="p-2 bg-white rounded-lg mr-3 sm:mr-4">
              <svg class="h-5 w-5 sm:h-6 sm:w-6 text-components" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="text-lg sm:text-2xl font-semibold text-gray-800">
              Responsable de publication
            </h2>
          </div>
          <div class="ml-6 sm:ml-16 text-gray-600">
            <p>Cyril Dohin</p>
          </div>
        </section>

        <!-- Hébergement -->
        <section class="p-4 sm:p-6 bg-gray-100 rounded-lg transition duration-300">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="p-2 bg-white rounded-lg mr-3 sm:mr-4">
              <svg class="h-5 w-5 sm:h-6 sm:w-6 text-components" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h2 class="text-lg sm:text-2xl font-semibold text-gray-800">
              Hébergement
            </h2>
          </div>
          <div class="ml-6 sm:ml-16 space-y-2 sm:space-y-3 text-gray-600">
            <p><span class="font-medium">Hébergeur :</span> DigitalOcean</p>
            <p><span class="font-medium">Adresse :</span> ZEKERINSTRAAT 17A, 1014 AMSTERDAM PAYS-BAS</p>
            <p><span class="font-medium">Téléphone :</span> +1 888 890 6714</p>
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
