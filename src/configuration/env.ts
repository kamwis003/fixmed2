import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.url('VITE_SUPABASE_URL must be a valid URL'),
  VITE_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'VITE_SUPABASE_ANON_KEY is required'),
  VITE_BACKEND_API_URL: z.url('VITE_BACKEND_API_URL must be a valid URL')
})

const validateEnv = () => {
  try {
    return envSchema.parse(import.meta.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((err: z.core.$ZodIssue) => `❌ ${err.path.join('.')}: ${err.message}`)
        .join('\n')

      const errorMessage = `
🚨 BŁĄD KONFIGURACJI ŚRODOWISKA! 🚨

Brakuje wymaganych zmiennych środowiskowych:
${missingVars}

Aby naprawić ten problem:
1. Utwórz plik .env w głównym katalogu projektu
2. Dodaj następujące zmienne:

VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_BACKEND_API_URL="YOUR_BACKEND_API_URL"
VITE_BUNNY_VIDEO_LIBRARY_ID="YOUR_BUNNY_VIDEO_LIBRARY_ID"

3. Uzupełnij wartości prawdziwymi danymi i zapisz plik
4. Uruchom ponownie serwer deweloperski

Aplikacja nie może działać bez tych zmiennych!
      `
      console.error(errorMessage)
      throw new Error('Missing required environment variables')
    }
    throw error
  }
}

const env = validateEnv()

export const { VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_BACKEND_API_URL } = env
