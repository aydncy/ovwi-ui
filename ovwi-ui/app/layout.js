export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.onerror = function(msg, url, line, col, error) {
              document.body.innerHTML = "<pre style='padding:40px;color:red'>" + msg + "\\n" + (error?.stack || "") + "</pre>";
            };
          `
        }} />
        {children}
      </body>
    </html>
  )
}
