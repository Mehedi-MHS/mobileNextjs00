import "./globals.css";
export const metadata = {
  title: "First Hello World App",
  description: "Lorem Ipsum Dolor Sit Amet.....",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
