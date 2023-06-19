<!-- /**
This code represents a Vue component named "AdminViewRemovingPromoting" that displays a confirmation dialog for deleting a user.
The template defines the HTML structure of the dialog.
The dialog is conditionally rendered based on the dialog prop. It appears as an overlay when dialog is true.
Inside the dialog, there is a v-card component from Vuetify library, which contains the confirmation message and action buttons.
The username of the selected user is displayed within the message using string interpolation ({{ selectedUser.username }}).
The Cancel button triggers the closeDialog method when clicked, emitting a custom event named 'close-dialog'.
The Confirm button triggers the deleteUser method when clicked, emitting a custom event named 'delete-user' and passing the selected user object as the payloa
The script section defines the component's behavior and data.
The props property defines the expected props for the component: dialog (a boolean indicating whether the dialog should be displayed) and selectedUser (the user object selected for deletion).
The methods section contains two methods:
closeDialog emits a custom event named 'close-dialog', indicating that the user wants to close the dialog without deleting the user.
deleteUser emits a custom event named 'delete-user' and passes the selectedUser object as the payload, indicating that the user wants to proceed with the deletion
 */
  -- -->
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

<script>

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
