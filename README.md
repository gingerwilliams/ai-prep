# ai-prep
Ai powered prep application

### To run the application
```
npx create-next-app@latest appname
npm run dev
```

```
npm i prisma --save-dev
npm i @prisma/client@latest
npx prisma init --datasource-provider sqlite
```

```
npx prisma migrate dev --name name 
(creates the file:./dev.db in prisma folder)
env DATABASE_URL=""
model Name {}
**npx prisma studio**
```

### Resources:
- Next.js
https://nextjs.org/docs

- Prisma
https://www.prisma.io/

- Tailwind
https://tailwindcss.com/

- UUID
https://developer.mozilla.org/en-US/docs/Glossary/UUID

- Requet Object
https://developer.mozilla.org/en-US/docs/Web/API/Request
