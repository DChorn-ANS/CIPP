import React from 'react'
import { CButton, CCallout, CCard, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import { Form } from 'react-final-form'
import { CippContentCard, CippPage } from 'src/components/layout'
import { RFFCFormTextarea, RFFCFormSelect, RFFCFormInput } from 'src/components/forms'
import { useLazyGenericPostRequestQuery, useGenericGetRequestQuery } from 'src/store/api/app'

const DefenderForOfficeTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/EditDefenderForOffice',
      values,
    })
  }
  let query = useQuery()
  const ID = query.get('ID')
  const Function = query.get('Function')
  const { data: listTemplateResults = [], isFetching } = useGenericGetRequestQuery({
    path: 'api/listDefenderForOfficetemplates',
    params: { GUID: ID, Function: Function },
  })

  return (
    <CippPage tenantSelector={false} title="Add Anti Phishing Template">
      <CippContentCard title="Template Details">
        {postResults.isFetching && (
          <CCallout color="info">
            <CSpinner>Loading</CSpinner>
          </CCallout>
        )}
        {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        {isFetching && <CSpinner />}
        {!isFetching && (
          <Form
            initialValues={{
              ...listTemplateResults,
              DateFilter: DateFilter,
            }}
            onSubmit={handleSubmit}
            render={({ handleSubmit, submitting, values }) => {
              return (
                <CForm onSubmit={handleSubmit}>
                  <CCard>
                    <CCardHeader>
                      <CCardTitle>Rule</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <RFFCFormSwitch name="State" label="Rule State" value={false} />
                      </CRow>
                      <CRow>
                        <RFFCFormSelect
                          name="Priority"
                          label="Priority"
                          placeholder="Policy Priority"
                          values={listBackendResult.data.ScriptFiles}
                        />
                      </CRow>
                      <CRow>
                        <RFFCFormSelect
                          name="Type"
                          values={[
                            { label: 'Anti Phish', value: 'AntiPhish' },
                            { label: 'Inbound Anti Spam', value: 'HostedContentFilter' },
                            { label: 'Outbound Anti Spam', value: 'HostedOutboundSpamFilter' },
                            { label: 'Anti Malware', value: 'MalwareFilter' },
                            { label: 'Safe Attachments', value: 'SafeAttachment' },
                            { label: 'Safe Links', value: 'SafeLinks' },
                          ]}
                          placeholder="Select a policy type"
                          label="Policy Type"
                        />
                      </CRow>
                      <CCardText>Included</CCardText>
                      <CRow>
                        {listBackendResult.isSuccess &&
                          listBackendResult.data.Tenants.map((tenant) => (
                            <RFFSelectSearch
                              multi={true}
                              key={tenant.customerId}
                              name="Users"
                              label={tenant.displayName}
                              values={listBackendResult.data.HaloClients}
                              placeholder="Select a user"
                            />
                          ))}
                      </CRow>
                      <CRow>
                        {listBackendResult.isSuccess &&
                          listBackendResult.data.Tenants.map((tenant) => (
                            <RFFSelectSearch
                              multi={true}
                              key={tenant.customerId}
                              name="Users"
                              label={tenant.displayName}
                              values={listBackendResult.data.HaloClients}
                              placeholder="Select a Group"
                            />
                          ))}
                      </CRow>
                      <CRow>
                        {listBackendResult.isSuccess &&
                          listBackendResult.data.Tenants.map((tenant) => (
                            <RFFSelectSearch
                              multi={true}
                              key={tenant.customerId}
                              name="Users"
                              label={tenant.displayName}
                              values={listBackendResult.data.HaloClients}
                              placeholder="Select a Domain"
                            />
                          ))}
                      </CRow>
                      <CCardText>Excluded</CCardText>
                      <CRow>
                        {listBackendResult.isSuccess &&
                          listBackendResult.data.Tenants.map((tenant) => (
                            <RFFSelectSearch
                              multi={true}
                              key={tenant.customerId}
                              name="Users"
                              label={tenant.displayName}
                              values={listBackendResult.data.HaloClients}
                              placeholder="Select a user"
                            />
                          ))}
                      </CRow>
                      <CRow>
                        {listBackendResult.isSuccess &&
                          listBackendResult.data.Tenants.map((tenant) => (
                            <RFFSelectSearch
                              multi={true}
                              key={tenant.customerId}
                              name="Users"
                              label={tenant.displayName}
                              values={listBackendResult.data.HaloClients}
                              placeholder="Select a Group"
                            />
                          ))}
                      </CRow>
                      <CRow>
                        {listBackendResult.isSuccess &&
                          listBackendResult.data.Tenants.map((tenant) => (
                            <RFFSelectSearch
                              multi={true}
                              key={tenant.customerId}
                              name="Users"
                              label={tenant.displayName}
                              values={listBackendResult.data.HaloClients}
                              placeholder="Select a Domain"
                            />
                          ))}
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardHeader>
                      <CCardTitle>Policy</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol>
                          <RFFSelectSearch
                            multi={true}
                            label="Choose which logs you'd like to receive alerts from. This notification will be sent every 15 minutes."
                            name="logsToInclude"
                            values={[
                              { value: 'Updates', name: 'Updates Status' },
                              { value: 'Standards', name: 'All Standards' },
                              { value: 'TokensUpdater', name: 'Token Events' },
                              { value: 'ExecDnsConfig', name: 'Changing DNS Settings' },
                              { value: 'ExecExcludeLicenses', name: 'Adding excluded licenses' },
                              { value: 'ExecExcludeTenant', name: 'Adding excluded tenants' },
                              { value: 'EditUser', name: 'Editing a user' },
                              { value: 'ChocoApp', name: 'Adding or deploying applications' },
                              { value: 'AddAPDevice', name: 'Adding autopilot devices' },
                              { value: 'EditTenant', name: 'Editing a tenant' },
                              { value: 'AddMSPApp', name: 'Adding an MSP app' },
                              { value: 'AddUser', name: 'Adding a user' },
                              { value: 'AddGroup', name: 'Adding a group' },
                              { value: 'ExecOffboardUser', name: 'Executing the offboard wizard' },
                            ]}
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <RFFCFormSelect
                            name="Type"
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
                            name="JSON"
                            label="JSON parameters"
                            placeholder={'Enter the JSON parameters for your Policy.'}
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CRow className="mb-3">
                    <CCol>
                      <CButton className="text-white" type="submit" disabled={submitting}>
                        Save Template
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              )
            }}
          />
        )}
      </CippContentCard>
    </CippPage>
  )
}
export default DefenderForOfficeTemplates
