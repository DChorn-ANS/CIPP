import React from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import { Form } from 'react-final-form'
import { CippContentCard, CippPage } from 'src/components/layout'
import { RFFCFormTextarea, RFFCFormSelect } from 'src/components/forms'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'

const DefenderForOfficeTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=' + values.PolicyType,
      values,
    })
  }

  return (
    <CippPage tenantSelector={false} title="Add Anti Phishing Template">
      <CippContentCard title="Template Details">
        {postResults.isFetching && (
          <CCallout color="info">
            <CSpinner>Loading</CSpinner>
          </CCallout>
        )}
        {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, submitting, values }) => {
            return (
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol>
                    <RFFCFormInput
                      type="text"
                      name="displayName"
                      label="Display Name"
                      placeholder="Enter the Display Name"
                      validate={required}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <RFFCFormInput
                      type="text"
                      name="description"
                      label="Description"
                      placeholder="Enter the description"
                      validate={required}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <RFFCFormSelect
                      name="PolicyType"
                      label="Policy Type"
                      placeholder={'Select the policy type'}
                      values={[
                        { label: 'Anti Phish', value: 'AntiPhish' },
                        { label: 'Inbound Anti Spam', value: 'HostedContentFilter' },
                        { label: 'Outbound Anti Spam', value: 'HostedOutboundSpamFilter' },
                        { label: 'Anti Malware', value: 'MalwareFilter' },
                        { label: 'Safe Attachments', value: 'SafeAttachment' },
                        { label: 'Safe Links', value: 'SafeLinks' },
                      ]}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="JSON parameters"
                      placeholder={'Enter the JSON parameters for your rule.'}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CButton className="text-white" type="submit" disabled={submitting}>
                      Add Template
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            )
          }}
        />
      </CippContentCard>
    </CippPage>
  )
}
export default DefenderForOfficeTemplates
