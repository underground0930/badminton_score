<template>
  <v-dialog v-model="error" width="400">
    <v-card>
      <v-card-title class="title grey lighten-2 text-xs-center" primary-title>
        入力内容に不備があります
      </v-card-title>
      <v-card-text>{{ errorText }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="$emit('closeError')">
          閉じる
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['errorText', 'error'],
}
</script>
