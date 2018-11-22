import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Button, Spinner } from 'vtex.styleguide'
import { GenericError } from 'vtex.my-account-commons'

import UpdateProfilePicture from '../../../graphql/updateProfilePicture.gql'
import BaseDropzone from './BaseDropzone'
import PictureRenderer from './PictureRenderer'

class PictureUploader extends Component {
  state = {
    error: null,
    isLoading: false,
    finishedUpload: false,
  }

  handleImageDrop = async acceptedFiles => {
    const { updateProfilePicture } = this.props

    if (acceptedFiles && acceptedFiles[0]) {
      this.setState({ isLoading: true, error: null })

      try {
        await updateProfilePicture({ variables: { file: acceptedFiles[0] } })
        this.setState({ isLoading: false, finishedUpload: true })
      } catch (e) {
        this.setState({ error: 'alert.unknownError', isLoading: false })
      }
    } else {
      this.setState({ error: 'alert.fileTooBig' })
    }
  }

  handleErrorReset = () => {
    this.setState({ error: null })
  }

  handleCloseClick = event => {
    event.stopPropagation()
    this.props.onCloseClick()
  }

  render() {
    const { currentPicture, intl } = this.props
    const { error, isLoading, finishedUpload } = this.state
    const boxText = finishedUpload
      ? 'upload.photoUpdated'
      : 'upload.dragYourPhoto'

    return (
      <Fragment>
        {error && (
          <div className="mb6">
            <GenericError onDismiss={this.handleErrorReset} errorId={error} />
          </div>
        )}
        <BaseDropzone
          disabled={isLoading}
          onClick={this.handleErrorReset}
          onDrop={this.handleImageDrop}>
          <div className="w-100 w5-ns flex flex-column justify-between items-center">
            {isLoading ? (
              <Fragment>
                <Spinner />
                <div className="mt8 f5 tc gray">
                  {intl.formatMessage({ id: 'upload.loading' })}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="h4 w4 mb8">
                  <PictureRenderer imagePath={currentPicture} />
                </div>
                <div className="mb6 f5 tc c-muted-1 lh-copy">
                  {intl.formatMessage({ id: boxText })}
                </div>
                {finishedUpload ? (
                  <Fragment>
                    <div className="mb4 w-100">
                      <Button
                        block
                        size="small"
                        onClick={this.handleCloseClick}>
                        {intl.formatMessage({ id: 'upload.save' })}
                      </Button>
                    </div>
                    <Button block size="small" variation="secondary">
                      {intl.formatMessage({ id: 'upload.chooseAgain' })}
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="flex w-100 items-center mb6">
                      <div className="flex-auto bt b--muted-4" />
                      <span className="mh3 c-muted-1">
                        {intl.formatMessage({ id: 'upload.or' })}
                      </span>
                      <div className="flex-auto bt b--muted-4" />
                    </div>
                    <Button block size="small">
                      {intl.formatMessage({ id: 'upload.choosePhoto' })}
                    </Button>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </BaseDropzone>
      </Fragment>
    )
  }
}

PictureUploader.propTypes = {
  updateProfilePicture: PropTypes.func.isRequired,
  currentPicture: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(UpdateProfilePicture, { name: 'updateProfilePicture' }),
  injectIntl
)
export default enhance(PictureUploader)
