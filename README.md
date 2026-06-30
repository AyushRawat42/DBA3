# Aspire Academy Website

Public website and admissions admin for:

- Aspire Sports Academy
- Aspire Defence Academy

The site includes public academy pages, sports and coaching admission forms, and a minimal admin panel for reviewing form submissions.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- DynamoDB for admissions submissions
- Static password-based admin login

## Local Setup

```bash
npm install
npm run dev
```

Or with pnpm: `pnpm install` then `pnpm dev`.

Open `http://localhost:3000`.

## Useful Scripts

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Environment Variables

Create `.env.local` for local development:

```bash
AWS_REGION=ap-south-1
ADMISSIONS_TABLE_NAME=AspireAdmissions
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<bcrypt-password-hash>
ADMIN_SESSION_SECRET=<random-secret>
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
```

See `.env.example` for the full canonical list. Legacy aliases remain supported:
`DDB_TABLE_MAIN` (table name), `APP_AWS_REGION`, `APP_AWS_ACCESS_KEY_ID`, and
`APP_AWS_SECRET_ACCESS_KEY`.

If `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are both unset, the AWS SDK
uses its default credential chain (for example an EC2/ECS IAM role). Serverless
hosts such as Vercel do not provide that chain, so explicit AWS keys are
required there.

## Deployment

### Recommended host

**Vercel** is the cleanest fit for this repo:

- Next.js 16 App Router with `proxy.ts` is supported out of the box
- `npm run build` / default Next.js output works without extra config
- No `amplify.yml` or Docker setup is required

Set all production environment variables in the Vercel project settings. Use
**Node.js 20.9+** (see `engines` in `package.json`).

### Other hosts

| Host | Fit | AWS credentials |
| --- | --- | --- |
| **Vercel** | Best match | Set `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` in project env |
| **AWS Amplify Hosting** | Works; add Gen2/Hosting config | Prefer IAM role for SSR/Lambda compute, or set explicit AWS keys |
| **Generic Node** (`next build` + `next start` on EC2/ECS/Docker) | Works | IAM instance/task role is safest; omit static keys if the role has DynamoDB access |

### Production environment checklist

Required for a working admissions + admin flow:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH` or `ADMIN_PASSWORD_HASH_BASE64`
- `ADMIN_SESSION_SECRET` (strong random value; do not rely on dev fallbacks)
- `ADMISSIONS_TABLE_NAME` (defaults to `AspireAdmissions` if unset)
- `AWS_REGION` (defaults to `ap-south-1` if unset)
- `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` on serverless hosts (Vercel/Amplify unless IAM is wired)

### HTTPS and admin cookies

In production (`NODE_ENV=production`), the admin session cookie is set with
`secure: true`. Admin login and session persistence **require HTTPS** on the
public site URL. HTTP-only production URLs will not keep the session cookie.

Cookie name: `aspire_admin_session` (httpOnly, sameSite=lax, path=/, 8-hour max age).

### DynamoDB IAM permissions

The runtime identity (IAM user keys or instance/task role) needs access to the
admissions table:

- `dynamodb:PutItem` (public form submissions)
- `dynamodb:Scan`, `dynamodb:GetItem`, `dynamodb:UpdateItem` (admin panel)

Table key schema: `PK` (string), `SK` (string).

### Build and runtime notes

- **Node.js 20.9+** is required (Next.js 16).
- `bcrypt` is a native dependency; the host must allow native module builds
  (`pnpm.onlyBuiltDependencies` lists `bcrypt` and `sharp`).
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `next build`
  may succeed even if `npx tsc --noEmit` would fail. Run `npx tsc --noEmit`
  in CI before release.
- `images.unoptimized: true` avoids the Next image optimizer (static files in
  `public/` are served as-is).
- `proxy.ts` guards `/admin/*` page routes; API routes under `/api/admin/*`
  still perform their own session verification.

### Deploy checklist

1. Provision DynamoDB table (`PK`/`SK`) in the target region.
2. Create an IAM policy with the DynamoDB permissions above.
3. Set production env vars on the host (see `.env.example`).
4. Generate admin password hash: `node scripts/hash-admin-password.js "your-password"`
5. Run `npm run build` (or platform equivalent).
6. Deploy behind HTTPS.
7. Smoke test: submit sports + coaching forms, admin login, list/detail, CSV export, logout.

### Security notes (pre-launch)

- All secrets stay server-side (`lib/env.ts` uses `server-only`; no `NEXT_PUBLIC_*` vars).
- Production must set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (or `ADMIN_PASSWORD_HASH_BASE64`), and `ADMIN_SESSION_SECRET`.
- Without a session secret in production, admin login returns `503` and sessions cannot be created.
- Public form POST endpoints are intentionally unauthenticated; protect with WAF/rate limits at the host if needed.
- Admin APIs enforce `requireAdminCookie()` independently of `proxy.ts`.
- No custom CORS headers are configured (same-origin default for browser admin UI).
- Run `npx tsc --noEmit` in CI; do not rely on `ignoreBuildErrors` alone before release.

## DynamoDB Assumptions

Admissions submissions are stored in one DynamoDB table.

Required primary key:

- Partition key: `PK` string
- Sort key: `SK` string

Submission items use this shape:

```txt
PK = SUBMISSION#<id>
SK = META
```

Each item stores:

- `id`
- `formType` (`sports` or `coaching`)
- `createdAt`
- `updatedAt`
- `status` (`New`, `Contacted`, `Qualified`, `Closed`)
- `notes`
- submitted form fields

No S3 bucket or file upload flow is required.

## Admin Login

Admin login is available at `/admin/login`.

The app reads:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH` or `ADMIN_PASSWORD_HASH_BASE64`
- `ADMIN_SESSION_SECRET` (recommended in production)

Generate a bcrypt password hash with:

```bash
node scripts/hash-admin-password.js "your-password"
```

The script prints `ADMIN_PASSWORD_HASH_BASE64=...`. Set that value in your environment,
or paste the decoded bcrypt string as `ADMIN_PASSWORD_HASH`.

## Contact Details

- Address: Chanderbani Mohbewala, Dehradun
- Phone: +91-8250309184
- Email: boxing@hartishfoundation.in
- WhatsApp: +91-8250309184

## Release Notes

This repository is prepared to be published as:

```txt
aspire-academy-website
```

See **Deployment** above for production env vars, host guidance, and the release
smoke-test checklist.
