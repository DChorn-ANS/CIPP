import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CippCodeBlock, CippOffcanvas } from 'src/components/utilities'
import { CellTip, cellBooleanFormatter } from 'src/components/tables'
import { CButton, CCallout, CSpinner, CRow, CCol } from '@coreui/react'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLazyGenericGetRequestQuery } from 'src/store/api/app'
import { CippPageList } from 'src/components/layout'
import { ModalService } from 'src/components/utilities'
import { TitleButton } from 'src/components/buttons'
import CippCodeOffCanvas from 'src/components/utilities/CippCodeOffcanvas'

const DefenderForOfficeTemplates = () => {
  return (
    <div>
      <CCol>
        <CRow>
          <a target="_blank" href="/email/DefenderforOffice365/add-template">
            <CButton color="primary">Add Template</CButton>
          </a>
        </CRow>
        <CRow className="mb-3">
          <PhishingTemplates />
        </CRow>
        <CRow className="mb-3">
          <AntispamInboundTemplates />
        </CRow>
        <CRow className="mb-3">
          <AntispamOutboundTemplates />
        </CRow>
        <CRow className="mb-3">
          <AntimalwareTemplates />
        </CRow>
        <CRow className="mb-3">
          <SafeAttachmentsTemplates />
        </CRow>
        <CRow className="mb-3">
          <SafeLinksTemplates />
        </CRow>
      </CCol>
    </div>
  )
}
export default DefenderForOfficeTemplates

const PhishingTemplates = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const handleDeleteDefenderForOfficeTemplate = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () => ExecuteGetRequest({ path: apiurl }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    return (
      <>
        <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEye} />
        </CButton>
        <CButton
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() =>
            handleDeleteDefenderForOfficeTemplate(
              `/api/RemoveDefenderForOfficeTemplate?ID=${row.GUID}&Function=AntiPhish`,
              'Do you want to delete the template?',
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} href="" />
        </CButton>

        <CippOffcanvas
          title="Template JSON"
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        >
          <CippCodeBlock language="json" code={JSON.stringify(row, null, 2)} />
        </CippOffcanvas>
      </>
    )
  }

  const columns = [
    {
      name: 'Display Name',
      selector: (row) => row['name'],
      sortable: true,
      cell: (row) => CellTip(row['name']),
      exportSelector: 'name',
    },
    {
      name: 'User Impersonation Action',
      selector: (row) => row['TargetedUserProtectionAction'],
      sortable: true,
      exportSelector: 'TargetedUserProtectionAction',
    },
    {
      name: 'Domain Impersonation Action',
      selector: (row) => row['TargetedDomainProtectionAction'],
      sortable: true,
      exportSelector: 'TargetedDomainProtectionAction',
    },
    {
      name: 'Mailbox Intelligence Action',
      selector: (row) => row['MailboxIntelligenceProtectionAction'],
      sortable: true,
      exportSelector: 'MailboxIntelligenceProtectionAction',
    },
    {
      name: 'Spoof Intelligence Action',
      selector: (row) => row['AuthenticationFailAction'],
      sortable: true,
      exportSelector: 'AuthenticationFailAction',
    },
    {
      name: 'GUID',
      selector: (row) => row['GUID'],
      sortable: true,
      cell: (row) => CellTip(row['GUID']),
      exportSelector: 'GUID',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '125Px',
    },
  ]

  return (
    <>
      {getResults.isFetching && (
        <CCallout color="info">
          <CSpinner>Loading</CSpinner>
        </CCallout>
      )}
      {getResults.isSuccess && <CCallout color="info">{getResults.data?.Results}</CCallout>}
      {getResults.isError && (
        <CCallout color="danger">Could not connect to API: {getResults.error.message}</CCallout>
      )}
      <CippPageList
        title="Anti Phishing Templates"
        titleButton={
          <TitleButton href="/email/DefenderforOffice365/add-template" title="Add Template" />
        }
        datatable={{
          reportName: `${tenant?.defaultDomainName}-SpamfilterTemplates`,
          path: '/api/ListDefenderForOfficeTemplates?View=1&Function=AntiPhish',
          params: { TenantFilter: tenant?.defaultDomainName },
          columns,
        }}
      />
    </>
  )
}

const AntispamInboundTemplates = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const handleDeleteDefenderForOfficeTemplate = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () => ExecuteGetRequest({ path: apiurl }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    return (
      <>
        <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEye} />
        </CButton>
        <CButton
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() =>
            handleDeleteDefenderForOfficeTemplate(
              `/api/RemoveDefenderForOfficeTemplate?ID=${row.GUID}&Function=HostedContentFilter`,
              'Do you want to delete the template?',
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} href="" />
        </CButton>

        <CippCodeOffCanvas
          row={row}
          state={ocVisible}
          type="SpamfilterTemplate"
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Display Name',
      selector: (row) => row['name'],
      sortable: true,
      cell: (row) => CellTip(row['name']),
      exportSelector: 'name',
    },
    {
      name: 'High Confidence Spam Action',
      selector: (row) => row['HighConfidenceSpamAction'],
      sortable: true,
      exportSelector: 'HighConfidenceSpamAction',
    },
    {
      name: 'Bulk Spam Action',
      selector: (row) => row['BulkSpamAction'],
      sortable: true,
      exportSelector: 'BulkSpamAction',
    },
    {
      name: 'Phish Spam Action',
      selector: (row) => row['PhishSpamAction'],
      sortable: true,
      exportSelector: 'PhishSpamAction',
    },
    {
      name: 'Intra-Org Settings',
      selector: (row) => row['IntraOrgFilterState'],
      sortable: true,
      exportSelector: 'IntraOrgFilterState',
    },
    {
      name: 'GUID',
      selector: (row) => row['GUID'],
      sortable: true,
      cell: (row) => CellTip(row['GUID']),
      exportSelector: 'GUID',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '125Px',
    },
  ]

  return (
    <>
      {getResults.isFetching && (
        <CCallout color="info">
          <CSpinner>Loading</CSpinner>
        </CCallout>
      )}
      {getResults.isSuccess && <CCallout color="info">{getResults.data?.Results}</CCallout>}
      {getResults.isError && (
        <CCallout color="danger">Could not connect to API: {getResults.error.message}</CCallout>
      )}
      <CippPageList
        title="Inbound Spam Filter Templates"
        titleButton={<TitleButton href="/email/transport/add-template" title="Add Template" />}
        datatable={{
          reportName: `${tenant?.defaultDomainName}-SpamfilterTemplates`,
          path: '/api/ListDefenderForOfficeTemplates?View=1&Function=HostedContentFilter',
          params: { TenantFilter: tenant?.defaultDomainName },
          columns,
        }}
      />
    </>
  )
}

const AntispamOutboundTemplates = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const handleDeleteDefenderForOfficeTemplate = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () => ExecuteGetRequest({ path: apiurl }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    return (
      <>
        <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEye} />
        </CButton>
        <CButton
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() =>
            handleDeleteDefenderForOfficeTemplate(
              `/api/RemoveDefenderForOfficeTemplate?ID=${row.GUID}&Function=HostedOutboundSpamFilter`,
              'Do you want to delete the template?',
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} href="" />
        </CButton>

        <CippOffcanvas
          title="Template JSON"
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        >
          <CippCodeBlock language="json" code={JSON.stringify(row, null, 2)} />
        </CippOffcanvas>
      </>
    )
  }

  const columns = [
    {
      name: 'Display Name',
      selector: (row) => row['name'],
      sortable: true,
      cell: (row) => CellTip(row['name']),
      exportSelector: 'name',
    },
    {
      name: 'Internal Limit Per Hour',
      selector: (row) => row['RecipientLimitInternalPerHour'],
      sortable: true,
      exportSelector: 'RecipientLimitInternalPerHour',
    },
    {
      name: 'External Limit Per Hour',
      selector: (row) => row['RecipientLimitExternalPerHour'],
      sortable: true,
      exportSelector: 'RecipientLimitExternalPerHour',
    },
    {
      name: 'Total Limit Per Day',
      selector: (row) => row['RecipientLimitPerDay'],
      sortable: true,
      exportSelector: 'RecipientLimitPerDay',
    },
    {
      name: 'Threshold Reached Action',
      selector: (row) => row['ActionWhenThresholdReached'],
      sortable: true,
      exportSelector: 'ActionWhenThresholdReached',
    },
    {
      name: 'Automatic Forwarding Setting',
      selector: (row) => row['AutoForwardingMode'],
      sortable: true,
      exportSelector: 'AutoForwardingMode',
    },
    {
      name: 'GUID',
      selector: (row) => row['GUID'],
      sortable: true,
      cell: (row) => CellTip(row['GUID']),
      exportSelector: 'GUID',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '125Px',
    },
  ]

  return (
    <>
      {getResults.isFetching && (
        <CCallout color="info">
          <CSpinner>Loading</CSpinner>
        </CCallout>
      )}
      {getResults.isSuccess && <CCallout color="info">{getResults.data?.Results}</CCallout>}
      {getResults.isError && (
        <CCallout color="danger">Could not connect to API: {getResults.error.message}</CCallout>
      )}
      <CippPageList
        title="Outbound Spam Filter Templates"
        titleButton={<TitleButton href="/email/transport/add-template" title="Add Template" />}
        datatable={{
          reportName: `${tenant?.defaultDomainName}-SpamfilterTemplates`,
          path: '/api/ListDefenderForOfficeTemplates?View=1&Function=HostedOutboundSpamFilter',
          params: { TenantFilter: tenant?.defaultDomainName },
          columns,
        }}
      />
    </>
  )
}

const AntimalwareTemplates = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const handleDeleteDefenderForOfficeTemplate = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () => ExecuteGetRequest({ path: apiurl }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    return (
      <>
        <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEye} />
        </CButton>
        <CButton
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() =>
            handleDeleteDefenderForOfficeTemplate(
              `/api/RemoveDefenderForOfficeTemplate?ID=${row.GUID}&Function=MalwareFilter`,
              'Do you want to delete the template?',
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} href="" />
        </CButton>

        <CippOffcanvas
          title="Template JSON"
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        >
          <CippCodeBlock language="json" code={JSON.stringify(row, null, 2)} />
        </CippOffcanvas>
      </>
    )
  }

  const columns = [
    {
      name: 'Display Name',
      selector: (row) => row['name'],
      sortable: true,
      cell: (row) => CellTip(row['name']),
      exportSelector: 'name',
    },
    {
      name: 'Common Attachments Filter',
      selector: (row) => row['EnableFileFilter'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'EnableFileFilter',
    },
    {
      name: 'Malware Action',
      selector: (row) => row['FileTypeAction'],
      sortable: true,
      exportSelector: 'FileTypeAction',
    },
    {
      name: 'Zero-hour Auto Purge',
      selector: (row) => row['ZapEnabled'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'ZapEnabled',
    },
    {
      name: 'GUID',
      selector: (row) => row['GUID'],
      sortable: true,
      cell: (row) => CellTip(row['GUID']),
      exportSelector: 'GUID',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '125px',
    },
  ]

  return (
    <>
      {getResults.isFetching && (
        <CCallout color="info">
          <CSpinner>Loading</CSpinner>
        </CCallout>
      )}
      {getResults.isSuccess && <CCallout color="info">{getResults.data?.Results}</CCallout>}
      {getResults.isError && (
        <CCallout color="danger">Could not connect to API: {getResults.error.message}</CCallout>
      )}
      <CippPageList
        title="Anti Malware Templates"
        titleButton={<TitleButton href="/email/transport/add-template" title="Add Template" />}
        datatable={{
          reportName: `${tenant?.defaultDomainName}-SpamfilterTemplates`,
          path: '/api/ListDefenderForOfficeTemplates?View=1&Function=MalwareFilter',
          params: { TenantFilter: tenant?.defaultDomainName },
          columns,
        }}
      />
    </>
  )
}

const SafeAttachmentsTemplates = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const handleDeleteDefenderForOfficeTemplate = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () => ExecuteGetRequest({ path: apiurl }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    return (
      <>
        <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEye} />
        </CButton>
        <CButton
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() =>
            handleDeleteDefenderForOfficeTemplate(
              `/api/RemoveDefenderForOfficeTemplate?ID=${row.GUID}&Function=SafeAttachment`,
              'Do you want to delete the template?',
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} href="" />
        </CButton>

        <CippOffcanvas
          title="Template JSON"
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        >
          <CippCodeBlock language="json" code={JSON.stringify(row, null, 2)} />
        </CippOffcanvas>
      </>
    )
  }

  const columns = [
    {
      name: 'Display Name',
      selector: (row) => row['name'],
      sortable: true,
      cell: (row) => CellTip(row['name']),
      exportSelector: 'name',
    },
    {
      name: 'Action',
      selector: (row) => row['Action'],
      sortable: true,
      exportSelector: 'Action',
    },
    {
      name: 'GUID',
      selector: (row) => row['GUID'],
      sortable: true,
      cell: (row) => CellTip(row['GUID']),
      exportSelector: 'GUID',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '125Px',
    },
  ]

  return (
    <>
      {getResults.isFetching && (
        <CCallout color="info">
          <CSpinner>Loading</CSpinner>
        </CCallout>
      )}
      {getResults.isSuccess && <CCallout color="info">{getResults.data?.Results}</CCallout>}
      {getResults.isError && (
        <CCallout color="danger">Could not connect to API: {getResults.error.message}</CCallout>
      )}
      <CippPageList
        title="Safe Attachment Templates"
        titleButton={<TitleButton href="/email/transport/add-template" title="Add Template" />}
        datatable={{
          reportName: `${tenant?.defaultDomainName}-SpamfilterTemplates`,
          path: '/api/ListDefenderForOfficeTemplates?View=1&Function=SafeAttachment',
          params: { TenantFilter: tenant?.defaultDomainName },
          columns,
        }}
      />
    </>
  )
}

const SafeLinksTemplates = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const handleDeleteDefenderForOfficeTemplate = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () => ExecuteGetRequest({ path: apiurl }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    return (
      <>
        <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEye} />
        </CButton>
        <CButton
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() =>
            handleDeleteDefenderForOfficeTemplate(
              `/api/RemoveDefenderForOfficeTemplate?ID=${row.GUID}&Function=SafeLinks`,
              'Do you want to delete the template?',
            )
          }
        >
          <FontAwesomeIcon icon={faTrash} href="" />
        </CButton>

        <CippOffcanvas
          title="Template JSON"
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        >
          <CippCodeBlock language="json" code={JSON.stringify(row, null, 2)} />
        </CippOffcanvas>
      </>
    )
  }

  const columns = [
    {
      name: 'Display Name',
      selector: (row) => row['name'],
      sortable: true,
      cell: (row) => CellTip(row['name']),
      exportSelector: 'name',
    },
    {
      name: 'Email',
      selector: (row) => row['EnableSafeLinksForEmail'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'EnableSafeLinksForEmail',
    },
    {
      name: 'Teams',
      selector: (row) => row['EnableSafeLinksForTeams'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'EnableSafeLinksForTeams',
    },
    {
      name: 'Office Apps',
      selector: (row) => row['EnableSafeLinksForOffice'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'EnableSafeLinksForOffice',
    },
    {
      name: 'GUID',
      selector: (row) => row['GUID'],
      sortable: true,
      cell: (row) => CellTip(row['GUID']),
      exportSelector: 'GUID',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '125Px',
    },
  ]

  return (
    <>
      {getResults.isFetching && (
        <CCallout color="info">
          <CSpinner>Loading</CSpinner>
        </CCallout>
      )}
      {getResults.isSuccess && <CCallout color="info">{getResults.data?.Results}</CCallout>}
      {getResults.isError && (
        <CCallout color="danger">Could not connect to API: {getResults.error.message}</CCallout>
      )}
      <CippPageList
        title="Safe Links Templates"
        titleButton={<TitleButton href="/email/transport/add-template" title="Add Template" />}
        datatable={{
          reportName: `${tenant?.defaultDomainName}-SpamfilterTemplates`,
          path: '/api/ListDefenderForOfficeTemplates?View=1&Function=SafeLinks',
          params: { TenantFilter: tenant?.defaultDomainName },
          columns,
        }}
      />
    </>
  )
}
