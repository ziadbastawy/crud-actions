<template>
  <div class="login d-flex justify-center align-center">
    <v-card width="30%">
      <v-card-title>Your credentialss</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" class="p-0">
              <v-text-field
                v-model="user_email"
                hint="This field is required"
                label="Email"
                ref="email"
                outlined
                dense
                required
                :error-messages="errorMessages"
                :rules="[
                  (value) => !!value || 'Email is required.',
                  rules.email,
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="p-0">
              <v-text-field
                outlined
                dense
                required
                v-model="user_password"
                type="password"
                ref="password"
                hint="This field is required"
                label="password"
                :rules="[(value) => !!value || 'Password is required.']"
              ></v-text-field>
            </v-col>
            <v-btn @click="login"> Login </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user_email: "",
      user_password: "",
      errorMessages: "",
      rules: {
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<script>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      valid: true,
    };
  },
  computed: {
    form() {
      return {
        email: this.user_email,
        password: this.user_password,
      };
    },
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
       
      }
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
}
</style>
