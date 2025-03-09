### To run the application
```
npx create-next-app@latest appname
npm run dev
```

```
npm i prisma --save-dev
npm i @prisma/client@latest
npx prisma init --datasource-provider sqlite
npx prisma generate
```

```
npx prisma migrate dev --name name 
env DATABASE_URL=""
model Name {}
**npx prisma studio**
npx prisma format
```

### Resources:
- Next.js
https://nextjs.org/docs

- Postgres Database
https://neon.tech

- Prisma
https://www.prisma.io/

- Tailwind
https://tailwindcss.com/

- UUID
https://developer.mozilla.org/en-US/docs/Glossary/UUID

- Clerk Authentication
https://clerk.com/docs/quickstarts/nextjs


### How To's
- Nextjs Requet Object
https://developer.mozilla.org/en-US/docs/Web/API/Request

- Connect Prisma and Neon
https://neon.tech/docs/guides/prisma

- Clerk Custom Sign Up Page
https://clerk.com/docs/references/nextjs/custom-sign-up-page

- Clerk Depricated Diff
https://clerk.com/docs/upgrade-guides/nextjs/v6#removed-deprecated-apis

- Clerk Environment Variables
https://clerk.com/docs/deployments/clerk-environment-variables



