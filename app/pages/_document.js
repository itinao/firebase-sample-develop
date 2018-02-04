import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document
{
  static getInitialProps({ renderPage })
  {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render()
  {
    return (
<html>
  <Head>
    <title>This page has title</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel="manifest" href="static/manifest.json" />
    <style jsx>{`
/* base */
body {
  font-size: 62.5%;
  box-sizing: border-box;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
    `}</style>
  </Head>
  <body className="custom_class">
    {this.props.customValue}
    <Main />
    <NextScript />
  </body>
</html>
    )
  }
}
