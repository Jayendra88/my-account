import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { ExtensionPoint } from 'render'
import { ProfileRules, ProfileSummary } from 'vtex.profile-form'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'
import { withStoreCountry } from '../shared/withStoreCountry'

const ProfileBox = ({ profile, storeCountry, onEditClick, intl }) => {
  if (!profile) return null

  return (
    <ContentBox
      shouldAllowGrowing
      maxWidthStep={6}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}>
      <ProfileRules country={storeCountry} shouldUseIOFetching>
        <ProfileSummary profile={profile}>
          {({
            personalData: {
              firstName,
              lastName,
              email,
              document,
              gender,
              birthDate,
              homePhone,
            },
            businessData: {
              corporateName,
              tradeName,
              corporateDocument,
              businessPhone,
              stateRegistration,
            },
            isCorporate,
          }) => (
            <React.Fragment>
              <div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry label={firstName.label}>
                      {firstName.value}
                    </DataEntry>
                  </div>
                  <div className="mb8 flex-auto">
                    <DataEntry label={lastName.label}>
                      {lastName.value}
                    </DataEntry>
                  </div>
                </div>
                <div className="mb8">
                  <DataEntry label={email.label}>{email.value}</DataEntry>
                </div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry label={document.label}>
                      {document.value}
                    </DataEntry>
                  </div>
                  <div className="mb8 w-50-ns">
                    <DataEntry label={gender.label}>{gender.value}</DataEntry>
                  </div>
                </div>
                <div className="flex-ns flex-wrap">
                  <div className="mb8 flex-auto">
                    <DataEntry label={birthDate.label}>
                      {birthDate.value}
                    </DataEntry>
                  </div>
                  <div className="mb8 w-50-ns">
                    <DataEntry label={homePhone.label}>
                      {homePhone.value}
                    </DataEntry>
                  </div>
                </div>
              </div>
              {isCorporate && (
                <div>
                  <div className="mb8">
                    <DataEntry label={corporateName.label}>
                      {corporateName.value}
                    </DataEntry>
                  </div>
                  <div className="mb8">
                    <DataEntry label={tradeName.label}>
                      {tradeName.value}
                    </DataEntry>
                  </div>
                  <div className="mb8">
                    <DataEntry label={corporateDocument.label}>
                      {corporateDocument.value}
                    </DataEntry>
                  </div>
                  <div className="flex-ns flex-wrap">
                    <div className="mb8 flex-auto">
                      <DataEntry label={businessPhone.label}>
                        {businessPhone.value}
                      </DataEntry>
                    </div>
                    <div className="mb8 w-50-ns">
                      <DataEntry label={stateRegistration.label}>
                        {stateRegistration.value}
                      </DataEntry>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </ProfileSummary>
      </ProfileRules>
      <ExtensionPoint
        id="profile/display"
        render={fields => (
          <div className="flex-ns flex-wrap">
            {fields.map(({ label, value }) => (
              <div className="mb8 w-50-ns" key={label}>
                <DataEntry label={label}>{value}</DataEntry>
              </div>
            ))}
          </div>
        )}
      />
    </ContentBox>
  )
}

ProfileBox.propTypes = {
  profile: PropTypes.object.isRequired,
  storeCountry: PropTypes.string.isRequired,
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default withStoreCountry(injectIntl(ProfileBox))
