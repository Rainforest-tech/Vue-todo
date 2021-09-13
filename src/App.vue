<template>
    <div id="app">
        <ul class="nav">
            <li>
                <router-link :to="{name: 'home'}">Home</router-link>
            </li>
            <li>
                <router-link :to="{name: 'todo'}">App</router-link>
            </li>
            <li>
                <router-link :to="{name: 'about'}">About</router-link>
            </li>
            <li v-if="!loggedIn">
                <router-link :to="{name: 'login'}">Login</router-link>
            </li>
            <li v-if="!loggedIn">
                <router-link :to="{name: 'register'}">Register</router-link>
            </li>
            <li v-if="loggedIn">
                <router-link :to="{name: 'logout'}">Logout</router-link>
            </li>
        </ul>
        <div class="flex-center">
            <transition name="router-animation"
                        mode="out-in"
                        leave-active-class="animated fadeOutDown router"
                        enter-active-class="animated fadeInUp router">
                <router-view/>
            </transition>
        </div>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                    is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700,300,100italic');
    /*@import "~cxlt-vue2-toastr/src/assets/toastr.css";*/
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css");
    @import "~vue-toast-notification/dist/index.css";

    .router {
        -webkit-animation-duration: 0.6s;
        animation-duration: .6s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    * {
        box-sizing: border-box;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
    }

    #app {
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 24px;
    }

    .logo {
        display: block;
        margin: 20px auto;
        height: 75px;
    }

    .nav {
        display: flex;
        list-style: none;
        padding: 15px 0;
        margin: 0;
        justify-content: flex-end;
        background-color: #f5f8fa;
        border-bottom: 1px solid lightgray;
        margin-bottom: 24px;

        & a {
            color: #636b6f;
            padding: 0 25px 5px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
            position: relative;

            &::before {
                content: '';
                width: 0;
                height: 2px;
                background-color: #2c3e50;
                position: absolute;
                bottom: 0;
                left: 50%;
                transition: all 0.3s;
            }

            &:hover {
                &::before {
                    width: 100%;
                    left: 0;
                    background-color: #60BD4F;
                }
            }
        }
    }

    .flex-center {
        display: flex;
        justify-content: center;
    }

    // Auth Pages
    label {
        display: block;
        margin-bottom: 4px;
    }

    .login-heading {
        margin-bottom: 16px;
    }

    .form-control {
        margin-bottom: 24px;

        & > span {
            color: #dc143c;
        }
    }

    .mb-more {
        margin-bottom: 42px;
    }

    .login-form {
        width: 500px;
        margin: auto;
    }

    .login-input {
        width: 100%;
        font-size: 16px;
        padding: 12px 16px;
        outline: 0;
        border-radius: 3px;
        border: 1px solid lightgrey;
        /*position: relative;*/
        transition: all 0.3s;

        &.invalid {
            border: solid 1px red !important;
        }

        &:focus {
            border-bottom: 1px solid #60BD4F !important;
        }

    }

    .btn-submit {
        width: 100%;
        padding: 14px 12px;
        font-size: 18px;
        font-weight: bold;
        background: #60BD4F;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        border: none;
        position: relative;

        &:hover {
            background: darken(#60BD4F, 10%);
        }

        &:disabled {
            background: lighten(#60BD4F, 25%);
            cursor: not-allowed;
        }
    }

    .server-error {
        margin-bottom: 12px;
        font-size: 16px;
        padding: 10px 16px;
        color: #a94442;
        background-color: #f3dede;
        border-radius: 4px;
    }

    .success-message {
        margin-bottom: 12px;
        font-size: 16px;
        padding: 10px 16px;
        color: #ffffff;
        background-color: darken(#60BD4F, 10%);
        border-radius: 4px;
    }

    //spinner
    .lds-container {
        position: absolute;
        left: 38%;
    }

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 25px;
        height: 25px;
    }

    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 25px;
        height: 25px;
        /*margin: 6px;*/
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


</style>
