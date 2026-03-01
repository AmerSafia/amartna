<template>
  <q-page class="flex flex-center">
    <q-card dark style="min-width: 400px; background: #1A2332; border-radius: 20px;" class="q-pa-md">
      <q-card-section>
        <div class="text-h5 text-center text-weight-bold q-mb-lg">تسجيل الدخول</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="email"
          dark
          outlined
          label="البريد الإلكتروني"
          type="email"
        />
        <q-input
          v-model="password"
          dark
          outlined
          label="كلمة المرور"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              color="grey-5"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <div v-if="error" class="text-negative text-center">{{ error }}</div>
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <q-btn
          unelevated
          color="primary"
          label="تسجيل الدخول"
          no-caps
          class="full-width"
          style="border-radius: 12px; padding: 12px;"
          :loading="logging"
          @click="login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useSanity } from '../composables/useSanity'

const router = useRouter()
const auth = useAuthStore()
const { fetch } = useSanity()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const logging = ref(false)

async function login() {
  logging.value = true
  error.value = ''
  const users = await fetch(
    '*[_type=="admin" && email==$email && password==$password]',
    { email: email.value, password: password.value }
  )
  logging.value = false

  if (users.length) {
    auth.login()
    router.push({ name: 'Home' })
  } else {
    error.value = 'يرجى التحقق من البريد الإلكتروني وكلمة المرور'
  }
}
</script>
