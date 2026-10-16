# Dr. Heba El-Komy Clinic

The clinic website now runs on Next.js App Router. The existing React site remains the public homepage, with Supabase-backed booking requests and visitor analytics plus a protected Arabic admin dashboard.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set the Supabase URL and service-role key, admin username and password, and a unique `JWT_SECRET` of at least 32 bytes. Generate a secret with `openssl rand -base64 48`.
4. Apply [`supabase/schema.sql`](./supabase/schema.sql) to the Supabase project. Reapply it to add the booking idempotency column/index to an existing project.
5. Start the app with `npm run dev`.

`.env.local` is ignored by Git. Never put real credentials in `.env.example` or commit a service-role key. The service-role key is used only in server route handlers; it is never sent to the browser.

## Admin dashboard

Open `/admin/login` and authenticate with `ADMIN_USERNAME` and `ADMIN_PASSWORD`. The signed session is stored in an HTTP-only, same-site cookie and expires after eight hours. `JWT_SECRET` must be configured before admin routes can be used.

The dashboard reports page-view counts (not unique people), page traffic by Cairo calendar day, and up to 100 newest bookings. Appointment time is the clinic weekday/time choice currently offered in the public booking form; final appointment confirmation remains with the clinic.

## Supabase setup

Run the schema SQL in the Supabase SQL editor. Both tables have row-level security enabled, with direct `anon` and `authenticated` access revoked. The app performs database operations through server-side API routes using `SUPABASE_SERVICE_ROLE_KEY`.

The public booking and analytics endpoints validate input and only accept same-origin browser submissions when an `Origin` header is present. Booking submissions use a unique idempotency key, so retrying the same request does not create a second appointment. Apply the current schema before enabling booking writes. For production, configure platform-level request/rate limits and appropriate retention policies for patient contact details and analytics data.

## Scripts

- `npm run dev` — run Next.js development server
- `npm run lint` — TypeScript check
- `npm run build` — production build
- `npm start` — serve the production build
