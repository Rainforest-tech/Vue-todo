<template>
    <div class="login-form">
        <h2 class="login-heading">Register</h2>
        <ValidationObserver ref="observer"
                            v-slot="{ invalid }" tag="form" @submit.prevent="submit()">


            <div v-if="serverErrors" class="server-error">
                <div v-for="(value, key) in serverErrors" :key="key">{{value[0]}}</div>
            </div>

            <ValidationProvider name="name" rules="required|alpha" v-slot="{ errors, classes }">
                <div class="form-control">
                    <label for="name">Name</label>
                    <input type="text" name="name"
                           id="name" class="login-input"
                           :class="classes"
                           v-model="name">
                    <span>{{ errors[0] }}</span>
                </div>
            </ValidationProvider>

            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" name="email"
                           id="email" class="login-input" v-model="email">
                    <span>{{ errors[0] }}</span>
                </div>
            </ValidationProvider>

            <ValidationProvider name="password"
                                rules="required|min:3" v-slot="{ errors, classes }">
                <div class="form-control mb-more">
                    <label for="password">Password</label>
                    <input type="password" name="password"
                           id="password" class="login-input"
                           :class="classes"
                           v-model="password">
                    <span>{{ errors[0] }}</span>
                </div>
            </ValidationProvider>

            <div class="form-control">
                <button type="submit"
                        :disabled="invalid"
                        class="btn-submit">Create Account
                </button>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      serverErrors: '',
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.register();
      }
    },
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push({
            name: 'login',
            params: {
              dataSuccessMessage: 'Registered Successfully!',
            },
          });
          // this.$toast.success({
          //   title: this.successMessage,
          //   message: 'You can login here',
          // });
          // this.$swal('Hello Vue world!!!');
          this.$toast.open('You did it!', {
            // override the global option
            position: 'bottom',
          });
        })
        .catch(({ data }) => {
          this.serverErrors = Object.values(data.errors);
        });
    },
  },
};
</script>
