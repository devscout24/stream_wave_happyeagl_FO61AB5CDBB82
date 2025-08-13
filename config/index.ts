interface Config {
  domain: string;
  apiUrl: string;
}

const config: Config = {
  domain: process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
};

// Validate required environment variables
const requiredEnvVars = [] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;
