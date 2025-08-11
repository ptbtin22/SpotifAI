# SpotifAI
A Fullstack Web Application that aids users in adding AI suggested songs into their own Spotify playlists!

# Project Structure:

```text
SpotifAI/
├─ README.md
├─ .gitignore
├─ .editorconfig
├─ .prettierrc
├─ package.json                 # (optional) workspace root if you use Turborepo/pnpm
├─ pnpm-workspace.yaml          # or npm/yarn workspaces
├─ .github/
│  └─ workflows/ci.yml          # lint/test/build on push
├─ infra/
│  ├─ docker-compose.yml        # postgres, redis, mailhog (optional), localstack (optional)
│  ├─ migrations/               # SQL or Prisma migrations snapshots
│  └─ k8s/                      # (optional) manifests/helm for prod
├─ packages/
│  ├─ shared-types/             # zod/ts interfaces shared by web & backend
│  ├─ shared-utils/             # CSV parsing, normalizers (feat./ft., duration delta), scoring
│  └─ config/                   # eslint configs, tsconfig base, prettier, commitlint config
├─ backend/                     # NestJS (API + Spotify integration)
│  ├─ src/
│  │  ├─ app.module.ts
│  │  ├─ main.ts
│  │  ├─ common/
│  │  │  ├─ guards/             # session guard injects sessionId
│  │  │  ├─ interceptors/
│  │  │  └─ filters/
│  │  ├─ auth/                  # PKCE flow, session store, refresh
│  │  ├─ spotify/               # search/create playlist/add tracks
│  │  ├─ imports/               # CSV upload + parse + match queue
│  │  ├─ match/                 # ISRC-first, fuzzy fallback, scoring
│  │  ├─ ai/                    # (optional) OpenAI proxy endpoint
│  │  ├─ queue/                 # bullmq or custom job runner
│  │  └─ db/                    # prisma schema or TypeORM entities
│  ├─ prisma/                   # prisma.schema & migrations (if using Prisma)
│  ├─ test/
│  ├─ .env.example
│  ├─ Dockerfile
│  └─ tsconfig.json
├─ web/                         # Next.js app (App Router)
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx               # landing
│  │  ├─ dashboard/
│  │  │  ├─ page.tsx
│  │  │  └─ imports/[id]/page.tsx
│  │  └─ api/                   # (only for web-only helpers; main API is backend)
│  ├─ components/
│  ├─ lib/                      # fetcher with cookies, zod schemas
│  ├─ styles/
│  ├─ public/
│  ├─ .env.local.example
│  └─ next.config.ts
├─ ios/                         # SwiftUI app (later)
│  ├─ SpotifAI.xcodeproj
│  ├─ SpotifAI/
│  │  ├─ App.swift
│  │  ├─ Auth/                  # ASWebAuthenticationSession + Keychain
│  │  ├─ Views/
│  │  └─ Services/              # API client (URLSession), CSV parser
│  └─ Config/
└─ scripts/
   ├─ dev.sh                    # spin up compose + run web/backend
   └─ seed.ts                   # seed demo data
```
