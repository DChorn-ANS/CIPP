import React, { useState } from 'react'
import { CCol, CRow, CCallout, CSpinner } from '@coreui/react'
import { Field, FormSpy } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import { WizardTableField } from 'src/components/tables'
import PropTypes from 'prop-types'
import { RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
import { useLazyGenericGetRequestQuery, useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { OnChange } from 'react-final-form-listeners'

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? (
        <CCallout color="danger">
          <FontAwesomeIcon icon={faExclamationTriangle} color="danger" />
          {error}
        </CCallout>
      ) : null
    }
  />
)

Error.propTypes = {
  name: PropTypes.string.isRequired,
}

const requiredArray = (value) => (value && value.length !== 0 ? undefined : 'Required')

const AddPolicy = () => {
  const [DefenderForOfficeGetRequest, DefenderForOfficeTemplates] = useLazyGenericGetRequestQuery()
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    values.selectedTenants.map(
      (tenant) => (values[`Select_${tenant.defaultDomainName}`] = tenant.defaultDomainName),
    )
    values.TemplateType = values.Type
    genericPostRequest({
      path: '/api/AddDefenderForOffice',
      values: values,
    })
  }
  const WhenFieldChanges = ({ field, set }) => (
    <Field name={set} subscription={{}}>
      {(
        // No subscription. We only use Field to get to the change function
        { input: { onChange } },
      ) => (
        <FormSpy subscription={{}}>
          {({ form }) => (
            <OnChange name={field}>
              {(value) => {
                let template = DefenderForOfficeTemplates.data.filter(function (obj) {
                  return obj.GUID === value
                })
                // console.log(template[0][set])
                onChange(template[0][set])
              }}
            </OnChange>
          )}
        </FormSpy>
      )}
    </Field>
  )

  const formValues = {
    TemplateType: 'Admin',
  }

  return (
    <CippWizard
      initialValues={{ ...formValues }}
      onSubmit={handleSubmit}
      wizardTitle="Add Safe Links policy"
    >
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenants to create the Safe Links policy for."
      >
        <center>
          <h3 className="text-primary">Step 1</h3>
          <h5 className="card-title mb-4">Choose tenants</h5>
        </center>
        <hr className="my-4" />
        <Field name="selectedTenants" validate={requiredArray}>
          {(props) => (
            <WizardTableField
              reportName="Add-SafeLinks-Tenant-Selector"
              keyField="defaultDomainName"
              path="/api/ListTenants?AllTenantSelector=true"
              columns={[
                {
                  name: 'Display Name',
                  selector: (row) => row['displayName'],
                  sortable: true,
                  exportselector: 'displayName',
                },
                {
                  name: 'Default Domain Name',
                  selector: (row) => row['defaultDomainName'],
                  sortable: true,
                  exportselector: 'mail',
                },
              ]}
              fieldProps={props}
            />
          )}
        </Field>
        <Error name="selectedTenants" />
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Select Options" description="Select which options you want to apply.">
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5 className="card-title mb-4">
            Enter the raw JSON for this policy, or select from a template. You can create templates
            from existing policies.
          </h5>
        </center>
        <hr className="my-4" />
        <CRow>
          <CCol md={12}>
            {DefenderForOfficeTemplates.isUninitialized &&
              DefenderForOfficeGetRequest({
                path: 'api/ListDefenderForOfficeTemplates',
              })}
            {DefenderForOfficeTemplates.isSuccess && (
              <RFFCFormSelect
                name="TemplateList"
                values={DefenderForOfficeTemplates.data?.map((template) => ({
                  value: template.GUID,
                  label: template.Type + ' - ' + template.name,
                }))}
                placeholder="Select a template"
                label="Please choose a template to apply, or enter the information manually."
              />
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol>
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
            <RFFCFormTextarea
              name="JSON"
              label="JSON Parameters"
              placeholder={
                'Enter the JSON information to use as parameters, or select from a template'
              }
            />
          </CCol>
        </CRow>
        <hr className="my-4" />
        <WhenFieldChanges field="TemplateList" set="JSON" />
        <WhenFieldChanges field="TemplateList" set="Type" />
      </CippWizard.Page>
      <CippWizard.Page title="Review and Confirm" description="Confirm the settings to apply">
        <center>
          <h3 className="text-primary">Step 3</h3>
          <h5 className="card-title mb-4">Confirm and apply</h5>
        </center>
        <hr className="my-4" />
        {!postResults.isSuccess && (
          <FormSpy>
            {(props) => {
              return (
                <>
                  <CRow>
                    <CCol md={3}></CCol>
                    <CCol md={6}>
                      <h5 className="mb-0">Selected Tenants</h5>
                      <CCallout color="info">
                        {props.values.selectedTenants.map((tenant, idx) => (
                          <li key={idx}>
                            {tenant.displayName}- {tenant.defaultDomainName}
                          </li>
                        ))}
                      </CCallout>
                      <h5 className="mb-0">Rule Settings</h5>
                      <CCallout color="info">{props.values.PowerShellCommand}</CCallout>
                    </CCol>
                  </CRow>
                </>
              )
            }}
          </FormSpy>
        )}
        {postResults.isFetching && (
          <CCallout color="info">
            <CSpinner>Loading</CSpinner>
          </CCallout>
        )}
        {postResults.isSuccess && (
          <CCallout color="success">
            {postResults.data.Results.map((message, idx) => {
              return <li key={idx}>{message}</li>
            })}
          </CCallout>
        )}
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
  )
}

export default AddPolicy