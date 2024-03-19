This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 使用既有專案

通常我們會利用 git 將專案上傳到 github/gitlab，下次我們就從 github/gitlab 下載專案。另外，當我們是小組一起工作時，也是需要使用 git。

如果在 github/gitlab 上已經有專案可以使用，就不必產生一個新的專案。首先，新增一個目錄(檔案夾)，例如: project，在 project 目錄下，利用 git clone 下載既有的專案，例如

```bash
git clone https://github.com/jitsungwu/web2023.git
```

下載既有專案後，因為一般而言都不會把已安裝的套件上傳到 github/gitlab，所以，執行前必須要再安裝既有的套件

```bash
npm install
```

安裝後，再執行專案

```bash
npm run dev
```

## 安裝說明

本範例程式配合 102 學年度「進階 Web 程式設計」課程，細節請詳閱[教材](https://fju-benwu.notion.site/Web-b55bc2f53aba466ebe9b54a1097380cf?pvs=4)

本範例程式連接 firebase，需要新增「.env.local」 (跟 README.md 同一檔案夾)
並且需要以下變數:
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=

firbase 變數內容設定方式請參考:[Firebase 環境設定](https://fju-benwu.notion.site/Firebase-b20c9b3c8ccd40038e58d5e9bdb1032f?pvs=4)
email (SMTP)變數內容設定方式請參考:[Next API](https://fju-benwu.notion.site/Next-API-c362309f4b254e1ca00e3e60a8be95b6?pvs=4)

另外，一開始應該是沒有任何資料，可以利用「新增產品」按鈕新增資料。如果有權限問題，請先設定權限，讓所有人都可以讀寫，請參考:[Add Data and Sort/Filter](https://fju-benwu.notion.site/Add-Data-and-Sort-Filter-13525de3908e434daec879a0e78d95f3?pvs=4)

注意，這是不安全的作法，所以，firebase 建議設定一個使用期限，在[Authentication](https://fju-benwu.notion.site/Authentication-fb4651ec9da44067b59659b0044a0214?pvs=4)會介紹較安全的作法
