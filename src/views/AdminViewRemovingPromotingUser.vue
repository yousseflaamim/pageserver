
<template>
  <div class="dialog-overlay" v-if="dialog">
    <div class="dialog-container">
      <v-card>
        <v-card-title class="headline">Delete User Confirmation</v-card-title>
        <v-card-text>
          <div>
            <p>Are you sure you want to delete user <strong>{{ selectedUser.username }}</strong>?</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn id="cancel"  text outlined @click="closeDialog">Cancel</v-btn> <br>
          <v-btn id="confirm"  text outlined @click="deleteUser">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name:'AdminViewRemovingPromoting',
  props: {
    dialog: Boolean,
    selectedUser: Object,
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    deleteUser() {
      this.$emit("delete-user", this.selectedUser);
    },
  },
};
</script>

<style>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.dialog-container {
  background-color: white;
  padding: 20px;
}
#cancel{
    background-color: red;
}
#confirm{
    background-color: green;
}
</style>

