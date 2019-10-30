import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import Button from '../Button';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import { registrationSetStep } from '../../actions/registration';
import { THIRD_STEP_ID } from '../../store/registration';

class RegistrationBrainkeyStepThird extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      brainkeyPopupVisible: false,
      brainkeyPopupAgree: false,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="registration__text">
          <div className="text">
            <p>{this.props.t('Write it down on a paper, make a photo')}</p>
          </div>
        </div>

        <div className="registration-brainkey">
          {this.props.registration.brainkey.split(' ').map((item, index) => (
            <div className="registration-brainkey__item" key={index} data-index={index + 1}>{item}&nbsp;</div>
          ))}
        </div>

        {!this.state.brainkeyPopupAgree ? (
          <div className="registration__action">
            <Button
              isStretched
              isUpper
              size="big"
              theme="red"
              type="submit"
              text={this.props.t('Proceed')}
              onClick={() => this.setState({ brainkeyPopupVisible: true })}
            />
          </div>
        ) : (
          <div className="registration__action registration__action_fluid">
            <Button
              isUpper
              size="big"
              theme="red"
              type="submit"
              text={this.props.t('I’ve saved it, Proceed')}
              onClick={() => this.props.registrationSetStep(THIRD_STEP_ID)}
            />
          </div>
        )}

        {this.state.brainkeyPopupVisible &&
          <Popup onClickClose={() => this.setState({ brainkeyPopupVisible: false })}>
            <ModalContent mod="brainkey-info">
              <div className="registration__title">
                <h3 className="title title_small">{this.props.t('The Brainkey cannot be restored if lost')}</h3>
              </div>

              <div className="registration__text">
                <div className="text">
                  <p>{this.props.t('Write down or memorize your Brainkey. The Brainkey is your access to your account. <strong>It can’t be restored</strong>')}</p>
                </div>
              </div>

              <div className="registration__action">
                <Button
                  isStretched
                  isUpper
                  size="big"
                  theme="red"
                  type="submit"
                  text={this.props.t('Got it')}
                  onClick={() => {
                    this.setState({
                      brainkeyPopupVisible: false,
                      brainkeyPopupAgree: true,
                    });
                  }}
                />
              </div>
            </ModalContent>
          </Popup>
        }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    registration: state.registration,
  }),
  dispatch => bindActionCreators({
    registrationSetStep,
  }, dispatch),
)(withTranslation()(RegistrationBrainkeyStepThird));
