import React from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import { Form } from 'react-final-form'
import { CippContentCard, CippPage } from 'src/components/layout'
import { RFFCFormTextarea } from 'src/components/forms'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'

const DefenderForOfficeTemplates = () => {
  const [active, setActive] = useState(1)
  return (
    <CippPage title="DefenderForOffice365" tenantSelector={false}>
      <CNav variant="tabs" role="tablist">
        <CNavItem active={active === 1} onClick={() => setActive(1)} href="#">
          Anti phishing
        </CNavItem>
        <CNavItem active={active === 2} onClick={() => setActive(2)} href="#">
          Anti spam Inbound
        </CNavItem>
        <CNavItem active={active === 3} onClick={() => setActive(3)} href="#">
          Anti spam Outbound
        </CNavItem>
        <CNavItem active={active === 4} onClick={() => setActive(4)} href="#">
          Anti Malware
        </CNavItem>
        <CNavItem active={active === 5} onClick={() => setActive(5)} href="#">
          Safe Attachments
        </CNavItem>
        <CNavItem active={active === 6} onClick={() => setActive(6)} href="#">
          Safe Links
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane visible={active === 1} className="mt-3">
          <PhishingTemplates />
        </CTabPane>
        <CTabPane visible={active === 2} className="mt-3">
          <AntispamInboundTemplates />
        </CTabPane>
        <CTabPane visible={active === 3} className="mt-3">
          <AntispamOutboundTemplates />
        </CTabPane>
        <CTabPane visible={active === 4} className="mt-3">
          <AntimalwareTemplates />
        </CTabPane>
        <CTabPane visible={active === 5} className="mt-3">
          <SafeAttachmentsTemplates />
        </CTabPane>
        <CTabPane visible={active === 6} className="mt-3">
          <SafeLinksTemplates />
        </CTabPane>
      </CTabContent>
    </CippPage>
  )
}
export default DefenderForOfficeTemplates

const PhishingTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=AntiPhish',
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
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="New-AntiPhishPolicy parameters"
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

const AntispamInboundTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=HostedContentFilter',
      values,
    })
  }

  return (
    <CippPage tenantSelector={false} title="Add Inbound Anti Spam Template">
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
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="New-HostedContentFilterPolicy parameters"
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

const AntispamOutboundTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=HostedOutboundSpamFilter',
      values,
    })
  }

  return (
    <CippPage tenantSelector={false} title="Add Outbound Anti Spam Template">
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
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="New-HostedOutboundSpamFilterPolicy parameters"
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
const AntimalwareTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=MalwareFilter',
      values,
    })
  }

  return (
    <CippPage tenantSelector={false} title="Add Anti Malware Template">
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
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="New-MalwareFilterPolicy parameters"
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
const SafeAttachmentsTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=SafeAttachment',
      values,
    })
  }

  return (
    <CippPage tenantSelector={false} title="Add Safe Attachment Template">
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
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="New-SafeAttachmentPolicy parameters"
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

const SafeLinksTemplates = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const handleSubmit = async (values) => {
    genericPostRequest({
      path: '/api/AddDefenderForOfficeTemplate?Function=SafeLinks',
      values,
    })
  }

  return (
    <CippPage tenantSelector={false} title="Add Safe Links Template">
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
                    <RFFCFormTextarea
                      name="PowerShellCommand"
                      label="New-SafeLinksPolicy parameters"
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
