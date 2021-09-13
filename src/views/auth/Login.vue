<template>
    <div class="login-form">
        <h2 class="login-heading">Login</h2>
        <ValidationObserver ref="observer"
                            v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
            <div v-if="dataSuccessMessage" class="success-message">{{dataSuccessMessage}}</div>
            <div v-if="serverError" class="server-error">{{serverError}}</div>

            <ValidationProvider name="username" rules="required|email" v-slot="{ errors, classes }">
                <div class="form-control">
                    <label for="username">Username/Email</label>
                    <input @input="serverError=''" type="email" name="username" id="username"
                           class="login-input"
                           :class="classes"
                           v-model="username">
                    <span>{{ errors[0] }}</span>
                </div>
            </ValidationProvider>

            <ValidationProvider name="name" rules="required|min:6" v-slot="{ errors, classes }">
                <div class="form-control mb-more">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password"
                           class="login-input"
                           :class="classes"
                           v-model="password">
                    <span>{{ errors[0] }}</span>
                </div>
            </ValidationProvider>

            <div class="form-control">
                <button type="submit" class="btn-submit">
                    <div class="lds-container" v-if="isLoading"
                         :disabled="isLoading||invalid">
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    Login
                </button>
            </div>

        </ValidationObserver>
    </div>
</template>

<script>
export default {
  props: {
    dataSuccessMessage: {
      type: String,
    },
  },
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.login();
      }
    },
    login() {
      const { username, password } = this;
      this.isLoading = true;
      this.$store.dispatch('retrieveToken',
        {
          username,
          password,
        })
        .then(() => {
          this.isLoading = false;
          this.$router.push({ name: 'todo' });
        })
        .catch(({ data }) => {
          this.isLoading = false;
          this.serverError = data;
          this.password = '';
          this.successMessage = '';
        });
    },
  },
};
</script>

<style scoped>

</style>
