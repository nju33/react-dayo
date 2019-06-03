/**
 * impoort to able to use `Symbol.asyncIterator` because it is not supported on Edge etcc
 */
import 'core-js/es/symbol/async-iterator';
import React from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';
import {createDayo} from 'react-dayo';
import notificationSuccess from 'react-dayo/dist/main/presets/notifications/success';
import notificationWarn from 'react-dayo/dist/main/presets/notifications/warn';
import notificationError from 'react-dayo/dist/main/presets/notifications/error';
import confirmSuccess from 'react-dayo/dist/main/presets/confirms/success';
import confirmWarn from 'react-dayo/dist/main/presets/confirms/warn';
import confirmError from 'react-dayo/dist/main/presets/confirms/error';

const [LeftTopDayo, dispatchAtLeftTop] = createDayo({position: 'left'});
const [CenterTopDayo, dispatchAtCenterTop] = createDayo();
const [RightTopDayo, dispatchAtRightTop] = createDayo({position: 'right'});
const [LeftBottomDayo, dispatchAtLeftBottom] = createDayo({
  to: 'bottom',
  position: 'left',
});
const [CenterBottomDayo, dispatchAtCenterBottom] = createDayo({
  to: 'bottom',
});
const [RightBottomDayo, dispatchAtRightBottom] = createDayo({
  to: 'bottom',
  position: 'right',
});

const Section = styled.section`
  font-family: 'Lato', 'Noto Sans JP', '游ゴシック Medium', '游ゴシック体',
    'Yu Gothic Medium', YuGothic, 'ヒラギノ角ゴ ProN',
    'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック',
    'MS PGothic', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f3f3f3;
  /* text-align: center; */

  section {
    background: #fff;
    padding: 0.5em 1em 1em;
  }

  h4 {
    margin: 0.5em 0;
    font-weight: normal;
  }

  button {
    padding: 0.5em 1em;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      transition: 0.2s;
    }

    &:hover:before {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  button + button {
    margin-left: 0.5em;
  }

  button.success {
    background-color: #24936e;
    border: none;
  }

  button.warn {
    background-color: #ed784a;
    border: none;
  }

  button.error {
    background-color: #cb1b45;
    border: none;
  }
`;

const ConfirmBodyRoot = styled.div`
  text-align: center;
  margin-bottom: 1em;

  h5 {
    margin: 0.5em 0;
  }

  p {
    margin: 0;
  }
`;

interface ConfirmBodyProps {
  title: string;
  text: string;
}

const ConfirmBody: React.FC<ConfirmBodyProps> = props => {
  return (
    <ConfirmBodyRoot>
      <h5>{props.title}</h5>
      <p>{props.text}</p>
    </ConfirmBodyRoot>
  );
};

interface IndexPageInitialProps {
  isClient: boolean;
}

interface NextProcess {
  browser: boolean;
}

export class IndexPage extends React.Component<IndexPageInitialProps> {
  public static getInitialProps(): IndexPageInitialProps {
    if (typeof window === 'undefined') {
      return {isClient: false};
    }

    return {isClient: true};
  }

  public isBrowser(): boolean {
    return ((process as unknown) as NextProcess).browser;
  }

  public render(): JSX.Element {
    return (
      <div>
        <Section>
          <header>
            <h3>LEFT TOP</h3>
          </header>
          <section>
            <h4>Notification</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtLeftTop(
                  notificationSuccess().message(`成功だよ`),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtLeftTop(
                  notificationWarn().message('警告だよ'),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtLeftTop(
                  notificationError().message(`エラーだよ`),
                )}
              >
                error
              </button>
            </div>
          </section>
          <section>
            <h4>Confirm</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtLeftTop(
                  confirmSuccess()
                    .message(
                      <ConfirmBody
                        title="Success Confirm"
                        text={`
成功だよ成功だよ成功だよ成功だよ
成功だよ成功だよ成功だよ成功だよ成功だよ
                      `.trim()}
                      />,
                    )
                    .prop('onButtonClick', type => {
                      console.log('clicked: ', type);
                    }),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtLeftTop(
                  confirmWarn().message(
                    <ConfirmBody
                      title="Warn Confirm"
                      text={`
警告だよ警告だよ警告だよ警告だよ
警告だよ警告だよ警告だよ警告だよ警告だよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtLeftTop(
                  confirmError().message(
                    <ConfirmBody
                      title="Error Confirm"
                      text={`
エラーだよエラーだよエラーだよエラーだよ
エラーだよエラーだよエラーだよエラーだよエラーだよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                error
              </button>
            </div>
          </section>
        </Section>
        <Section>
          <header>
            <h3>CENTER TOP</h3>
          </header>
          <section>
            <h4>Notification</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtCenterTop(
                  notificationSuccess().message(`成功だよ`),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtCenterTop(
                  notificationWarn().message('警告だよ'),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtCenterTop(
                  notificationError().message(`エラーだよ`),
                )}
              >
                error
              </button>
            </div>
          </section>
          <section>
            <h4>Confirm</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtCenterTop(
                  confirmSuccess().message(
                    <ConfirmBody
                      title="Success Confirm"
                      text={`
成功だよ成功だよ成功だよ成功だよ
成功だよ成功だよ成功だよ成功だよ成功だよ
                      `.trim()}
                    />,
                  ),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtCenterTop(
                  confirmWarn().message(
                    <ConfirmBody
                      title="Warn Confirm"
                      text={`
警告だよ警告だよ警告だよ警告だよ
警告だよ警告だよ警告だよ警告だよ警告だよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtCenterTop(
                  confirmError().message(
                    <ConfirmBody
                      title="Error Confirm"
                      text={`
エラーだよエラーだよエラーだよエラーだよ
エラーだよエラーだよエラーだよエラーだよエラーだよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                error
              </button>
            </div>
          </section>
        </Section>
        <Section>
          <header>
            <h3>RIGHT TOP</h3>
          </header>
          <section>
            <h4>Notification</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtRightTop(
                  notificationSuccess().message(`成功だよ`),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtRightTop(
                  notificationWarn().message('警告だよ'),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtRightTop(
                  notificationError().message(`エラーだよ`),
                )}
              >
                error
              </button>
            </div>
          </section>
          <section>
            <h4>Confirm</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtRightTop(
                  confirmSuccess().message(
                    <ConfirmBody
                      title="Success Confirm"
                      text={`
成功だよ成功だよ成功だよ成功だよ
成功だよ成功だよ成功だよ成功だよ成功だよ
                      `.trim()}
                    />,
                  ),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtRightTop(
                  confirmWarn().message(
                    <ConfirmBody
                      title="Warn Confirm"
                      text={`
警告だよ警告だよ警告だよ警告だよ
警告だよ警告だよ警告だよ警告だよ警告だよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtRightTop(
                  confirmError().message(
                    <ConfirmBody
                      title="Error Confirm"
                      text={`
エラーだよエラーだよエラーだよエラーだよ
エラーだよエラーだよエラーだよエラーだよエラーだよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                error
              </button>
            </div>
          </section>
        </Section>
        <Section>
          <header>
            <h3>LEFT BOTTOM</h3>
          </header>
          <section>
            <h4>Notification</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtLeftBottom(
                  notificationSuccess().message(`成功だよ`),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtLeftBottom(
                  notificationWarn().message('警告だよ'),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtLeftBottom(
                  notificationError().message(`エラーだよ`),
                )}
              >
                error
              </button>
            </div>
          </section>
          <section>
            <h4>Confirm</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtLeftBottom(
                  confirmSuccess().message(
                    <ConfirmBody
                      title="Success Confirm"
                      text={`
成功だよ成功だよ成功だよ成功だよ
成功だよ成功だよ成功だよ成功だよ成功だよ
                      `.trim()}
                    />,
                  ),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtLeftBottom(
                  confirmWarn().message(
                    <ConfirmBody
                      title="Warn Confirm"
                      text={`
警告だよ警告だよ警告だよ警告だよ
警告だよ警告だよ警告だよ警告だよ警告だよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtLeftBottom(
                  confirmError().message(
                    <ConfirmBody
                      title="Error Confirm"
                      text={`
エラーだよエラーだよエラーだよエラーだよ
エラーだよエラーだよエラーだよエラーだよエラーだよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                error
              </button>
            </div>
          </section>
        </Section>
        <Section>
          <header>
            <h3>CENTER BOTTOM</h3>
          </header>
          <section>
            <h4>Notification</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtCenterBottom(
                  notificationSuccess().message(`成功だよ`),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtCenterBottom(
                  notificationWarn().message('警告だよ'),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtCenterBottom(
                  notificationError().message(`エラーだよ`),
                )}
              >
                error
              </button>
            </div>
          </section>
          <section>
            <h4>Confirm</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtCenterBottom(
                  confirmSuccess().message(
                    <ConfirmBody
                      title="Success Confirm"
                      text={`
成功だよ成功だよ成功だよ成功だよ
成功だよ成功だよ成功だよ成功だよ成功だよ
                      `.trim()}
                    />,
                  ),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtCenterBottom(
                  confirmWarn().message(
                    <ConfirmBody
                      title="Warn Confirm"
                      text={`
警告だよ警告だよ警告だよ警告だよ
警告だよ警告だよ警告だよ警告だよ警告だよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtCenterBottom(
                  confirmError().message(
                    <ConfirmBody
                      title="Error Confirm"
                      text={`
エラーだよエラーだよエラーだよエラーだよ
エラーだよエラーだよエラーだよエラーだよエラーだよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                error
              </button>
            </div>
          </section>
        </Section>
        <Section>
          <header>
            <h3>RIGHT BOTTOM</h3>
          </header>
          <section>
            <h4>Notification</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtRightBottom(
                  notificationSuccess().message(`成功だよ`),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtRightBottom(
                  notificationWarn().message('警告だよ'),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtRightBottom(
                  notificationError().message(`エラーだよ`),
                )}
              >
                error
              </button>
            </div>
          </section>
          <section>
            <h4>Confirm</h4>
            <div>
              <button
                className="success"
                onClick={dispatchAtRightBottom(
                  confirmSuccess().message(
                    <ConfirmBody
                      title="Success Confirm"
                      text={`
成功だよ成功だよ成功だよ成功だよ
成功だよ成功だよ成功だよ成功だよ成功だよ
                      `.trim()}
                    />,
                  ),
                )}
              >
                success
              </button>
              <button
                className="warn"
                onClick={dispatchAtRightBottom(
                  confirmWarn().message(
                    <ConfirmBody
                      title="Warn Confirm"
                      text={`
警告だよ警告だよ警告だよ警告だよ
警告だよ警告だよ警告だよ警告だよ警告だよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                warn
              </button>
              <button
                className="error"
                onClick={dispatchAtRightBottom(
                  confirmError().message(
                    <ConfirmBody
                      title="Error Confirm"
                      text={`
エラーだよエラーだよエラーだよエラーだよ
エラーだよエラーだよエラーだよエラーだよエラーだよ
                  `.trim()}
                    />,
                  ),
                )}
              >
                error
              </button>
            </div>
          </section>
        </Section>
        {this.isBrowser() &&
          createPortal(<LeftTopDayo maxLength={5} />, document.getElementById(
            'alert-left-top',
          ) as any)}
        {this.isBrowser() &&
          createPortal(<CenterTopDayo maxLength={3} />, document.getElementById(
            'alert-center-top',
          ) as any)}
        {this.isBrowser() &&
          createPortal(<RightTopDayo maxLength={8} />, document.getElementById(
            'alert-right-top',
          ) as any)}
        {this.isBrowser() &&
          createPortal(
            <LeftBottomDayo maxLength={4} />,
            document.getElementById('alert-left-bottom') as any,
          )}
        {this.isBrowser() &&
          createPortal(
            <CenterBottomDayo maxLength={5} />,
            document.getElementById('alert-center-bottom') as any,
          )}
        {this.isBrowser() &&
          createPortal(
            <RightBottomDayo maxLength={3} />,
            document.getElementById('alert-right-bottom') as any,
          )}
      </div>
    );
  }
}

export default IndexPage;
