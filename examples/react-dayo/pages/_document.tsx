import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  DefaultDocumentIProps,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

type GetInitialPropsReturnType =
  | DefaultDocumentIProps
  | Promise<DefaultDocumentIProps>;

export default class AppDocument extends Document<{
  styleTags: React.ReactElement;
}> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static getInitialProps({
    renderPage,
  }: NextDocumentContext<
    Record<string, string | string[]>
  >): GetInitialPropsReturnType {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App: any): any => (props: any): any =>
        sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();

    return ({...page, styleTags} as unknown) as GetInitialPropsReturnType;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  public render(): JSX.Element {
    return (
      <html lang="ja">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.styleTags}
        </Head>
        <body style={{margin: 0}}>
          <Main />
          <NextScript />

          <div
            id="alert-left-top"
            style={{
              position: 'fixed',
              left: 10,
              top: 10,
            }}
          />
          <div
            id="alert-center-top"
            style={{
              position: 'fixed',
              right: '50%',
              top: 10,
              transform: 'translateX(50%)',
            }}
          />
          <div
            id="alert-right-top"
            style={{
              position: 'fixed',
              right: 10,
              top: 10,
            }}
          />
          <div
            id="alert-left-bottom"
            style={{
              position: 'fixed',
              left: 10,
              bottom: 10,
            }}
          />
          <div
            id="alert-center-bottom"
            style={{
              position: 'fixed',
              right: '50%',
              bottom: 10,
              transform: 'translateX(50%)',
            }}
          />
          <div
            id="alert-right-bottom"
            style={{
              position: 'fixed',
              right: 10,
              bottom: 10,
            }}
          />
        </body>
      </html>
    );
  }
}
