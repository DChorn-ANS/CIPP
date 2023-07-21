import React, { useState } from 'react'
import { CRow, CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faBook, faCheck, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { cellDateFormatter, cellBooleanFormatter, CellTip } from 'src/components/tables'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { useSelector } from 'react-redux'

const DefenderForOfficeSettings = () => {
  return (
    <div>
      <CRow className="mb-3">
        <PhishingSettings />
      </CRow>
      <CRow className="mb-3">
        <AntispamInboundSettings />
      </CRow>
      <CRow className="mb-3">
        <AntispamOutboundSettings />
      </CRow>
      <CRow className="mb-3">
        <AntimalwareSettings />
      </CRow>
      <CRow className="mb-3">
        <SafeAttachmentsSettings />
      </CRow>
      <CRow className="mb-3">
        <SafeLinksSettings />
      </CRow>
    </div>
  )
}
export default DefenderForOfficeSettings

const PhishingSettings = () => {
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    //console.log(row)
    return (
      <>
        <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </CButton>
        <CippActionsOffcanvas
          title="Phishing threshold & protection Settings"
          extendedInfo={[
            {
              label: 'Honor Dmarc Policy',
              value: `${row.HonorDmarcPolicy}`,
            },
            {
              label: 'Honor Dmarc Policy - Quarantine',
              value: `${row.DmarcQuarantineAction}`,
            },
            {
              label: 'Honor Dmarc Policy - Reject',
              value: `${row.DmarcRejectAction}`,
            },
            {
              label: 'Enable first contact safety tip',
              value: `${row.EnableFirstContactSafetyTips}`,
            },
            {
              label: 'Enable user impersonation safety tip',
              value: `${row.EnableSimilarUsersSafetyTips}`,
            },
            {
              label: 'Enable domain impersonation safety tip',
              value: `${row.EnableSimilarDomainsSafetyTips}`,
            },

            {
              label: 'Enable unusual characters safety tip',
              value: `${row.EnableUnusualCharactersSafetyTips}`,
            },
            {
              label: 'Show (?) for unauthenticated senders',
              value: `${row.EnableUnauthenticatedSender}`,
            },
            { label: 'Enable "via" Tag', value: `${row.EnableViaTag}` },
            {
              label: 'Domain Impersonation Protection',
              value: `${row.EnableTargetedDomainsProtection}`,
            },
            {
              label: 'Include Organization Domains',
              value: `${row.EnableOrganizationDomainsProtection}`,
            },
            {
              label: 'Include Custom Domains',
              value: `${row.TargetedDomainsToProtect}`,
            },
            {
              label: 'User Impersonation Protection',
              value: `${row.EnableTargetedUserProtection}`,
            },
            { label: 'Include Users', value: `${row.TargetedUsersToProtect}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate?Function=AntiPhish`,
              modalMessage: 'Are you sure you want to create a template based on this rule?',
            },
            {
              label: 'Enable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faCheck} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=enable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=AntiPhish`,
              modalMessage: 'Are you sure you want to enable this rule?',
            },
            {
              label: 'Disable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faBan} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=disable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=AntiPhish`,
              modalMessage: 'Are you sure you want to disable this rule?',
            },
            {
              label: 'Delete Rule',
              color: 'danger',
              modal: true,
              icon: <FontAwesomeIcon icon={faTrash} className="me-2" />,
              modalUrl: `/api/RemoveDefenderForOffice?TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=AntiPhish`,
              modalMessage: 'Are you sure you want to delete this rule?',
            },
          ]}
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Default Rule',
      selector: (row) => row['IsDefault'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'IsDefault',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
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
      name: 'Creation Date',
      selector: (row) => row['WhenCreated'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Last Edit Date',
      selector: (row) => row['WhenChanged'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '80px',
    },
  ]

  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Anti Phishing"
      tenantSelector={true}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DefenderForOffice-list`,
        path: '/api/ListDefenderForOffice?Function=AntiPhish',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

const AntispamInboundSettings = () => {
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    //console.log(row)
    return (
      <>
        <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </CButton>
        <CippActionsOffcanvas
          title="Extended Settings"
          extendedInfo={[
            {
              label: 'Quarantine Spam Retention (days)',
              value: `${row.QuarantineRetentionPeriod}`,
            },
            { label: 'Mark bulk mail as spam', value: `${row.MarkAsSpamBulkMail}` },
            {
              label: 'Bulk Mail Threshold',
              value: `${row.BulkThreshold}`,
            },
            { label: 'Enable spam safety tips', value: `${row.InlineSafetyTipsEnabled}` },
            { label: 'Enable zero-hour auto purge', value: `${row.ZapEnabled}` },
            { label: 'Enable zero-hour auto purge - Phishing', value: `${row.PhishZapEnabled}` },
            { label: 'Enable zero-hour auto purge - Spam', value: `${row.SpamZapEnabled}` },
            {
              label: 'Increase spam score with image links',
              value: `${row.IncreaseScoreWithImageLinks}`,
            },
            {
              label: 'Increase spam score with links that contain an ip',
              value: `${row.IncreaseScoreWithNumericIps}`,
            },
            {
              label: 'Increase Spam score with links that contain ports',
              value: `${row.IncreaseScoreWithRedirectToOtherPort}`,
            },
            {
              label: 'Increase Spam score for .Biz or .Info',
              value: `${row.IncreaseScoreWithBizOrInfoUrls}`,
            },
            { label: 'Mark Empty Messages as spam', value: `${row.MarkAsSpamEmptyMessages}` },
            { label: 'Mark Embedded HTML as spam', value: `${row.MarkAsSpamEmbedTagsInHtml}` },
            {
              label: 'Mark javascript in HTML as spam',
              value: `${row.MarkAsSpamJavaScriptInHtml}`,
            },
            { label: 'Mark Form tags as spam', value: `${row.MarkAsSpamFormTagsInHtml}` },
            { label: 'Mark iFrames as spam', value: `${row.MarkAsSpamFramesInHtml}` },
            { label: 'Mark known html bugs as spam', value: `${row.MarkAsSpamWebBugsInHtml}` },
            { label: 'Mark Object tags as spam', value: `${row.MarkAsSpamObjectTagsInHtml}` },

            {
              label: 'Mark Senstive wordlists as spam.',
              value: `${row.MarkAsSpamSensitiveWordList}`,
            },
            { label: 'Mark SPF Hard Fail as spam', value: `${row.MarkAsSpamSpfRecordHardFail}` },
            { label: 'Mark SenderID Fails as spam', value: `${row.MarkAsSpamFromAddressAuthFail}` },

            { label: 'Mark Backscatter as spam', value: `${row.MarkAsSpamNdrBackscatter}` },
            {
              label: 'Mark messages with these languages as spam',
              value: `${row.LanguageBlockList}`,
            },
            {
              label: 'Mark messages from these countries as spam',
              value: `${row.RegionBlockList}`,
            },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate?Function=HostedContentFilter`,
              modalMessage: 'Are you sure you want to create a template based on this rule?',
            },
            {
              label: 'Enable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faCheck} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=enable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=HostedContentFilter`,
              modalMessage: 'Are you sure you want to enable this rule?',
            },
            {
              label: 'Disable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faBan} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=disable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=HostedContentFilter`,
              modalMessage: 'Are you sure you want to disable this rule?',
            },
            {
              label: 'Delete Rule',
              color: 'danger',
              modal: true,
              icon: <FontAwesomeIcon icon={faTrash} className="me-2" />,
              modalUrl: `/api/RemoveDefenderForOffice?TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=HostedContentFilter`,
              modalMessage: 'Are you sure you want to delete this rule?',
            },
          ]}
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Default Rule',
      selector: (row) => row['IsDefault'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'IsDefault',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
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
      name: 'Creation Date',
      selector: (row) => row['WhenCreated'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Last Edit Date',
      selector: (row) => row['WhenChanged'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '80px',
    },
  ]

  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Inbound Anti Spam"
      tenantSelector={true}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DefenderForOffice-list`,
        path: '/api/ListDefenderForOffice?Function=HostedContentFilter',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

const AntispamOutboundSettings = () => {
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    //console.log(row)
    return (
      <>
        <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </CButton>
        <CippActionsOffcanvas
          title="Extended Settings"
          extendedInfo={[
            {
              label: 'Send a copy of message users and groups',
              value: `${row.BccSuspiciousOutboundAdditionalRecipients}`,
            },
            {
              label: 'Notify these users and groups if blocked',
              value: `${row.NotifyOutboundSpamRecipients}`,
            },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate?Function=HostedOutboundSpamFilter`,
              modalMessage: 'Are you sure you want to create a template based on this rule?',
            },
            {
              label: 'Enable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faCheck} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=enable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=HostedOutboundSpamFilter`,
              modalMessage: 'Are you sure you want to enable this rule?',
            },
            {
              label: 'Disable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faBan} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=disable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=HostedOutboundSpamFilter`,
              modalMessage: 'Are you sure you want to disable this rule?',
            },
            {
              label: 'Delete Rule',
              color: 'danger',
              modal: true,
              icon: <FontAwesomeIcon icon={faTrash} className="me-2" />,
              modalUrl: `/api/RemoveDefenderForOffice?TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=HostedOutboundSpamFilter`,
              modalMessage: 'Are you sure you want to delete this rule?',
            },
          ]}
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Default Rule',
      selector: (row) => row['IsDefault'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'IsDefault',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
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
      name: 'Creation Date',
      selector: (row) => row['WhenCreated'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Last Edit Date',
      selector: (row) => row['WhenChanged'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '80px',
    },
  ]

  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Outbound Anti Spam"
      tenantSelector={true}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DefenderForOffice-list`,
        path: '/api/ListDefenderForOffice?Function=HostedOutboundSpamFilter',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

const AntimalwareSettings = () => {
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    //console.log(row)
    return (
      <>
        <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </CButton>
        <CippActionsOffcanvas
          title="Extended Settings"
          extendedInfo={[
            {
              label: 'File Types blocked as malware',
              value: `${row.FileTypes}`,
            },
            {
              label: 'Internal sender undelivered message notification',
              value: `${row.InternalSenderAdminAddress}`,
            },
            {
              label: 'External sender undelivered message notification',
              value: `${row.ExternalSenderAdminAddress}`,
            },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate?Function=MalwareFilter`,
              modalMessage: 'Are you sure you want to create a template based on this rule?',
            },
            {
              label: 'Enable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faCheck} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=enable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=MalwareFilter`,
              modalMessage: 'Are you sure you want to enable this rule?',
            },
            {
              label: 'Disable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faBan} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=disable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=MalwareFilter`,
              modalMessage: 'Are you sure you want to disable this rule?',
            },
            {
              label: 'Delete Rule',
              color: 'danger',
              modal: true,
              icon: <FontAwesomeIcon icon={faTrash} className="me-2" />,
              modalUrl: `/api/RemoveDefenderForOffice?TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=MalwareFilter`,
              modalMessage: 'Are you sure you want to delete this rule?',
            },
          ]}
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Default Rule',
      selector: (row) => row['IsDefault'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'IsDefault',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
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
      name: 'Creation Date',
      selector: (row) => row['WhenCreated'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Last Edit Date',
      selector: (row) => row['WhenChanged'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '80px',
    },
  ]

  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Anti Malware"
      tenantSelector={true}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DefenderForOffice-list`,
        path: '/api/ListDefenderForOffice?Function=MalwareFilter',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

const SafeAttachmentsSettings = () => {
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    //console.log(row)
    return (
      <>
        <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </CButton>
        <CippActionsOffcanvas
          title="Extended Settings"
          extendedInfo={[
            {
              label: 'Redirect Attachments',
              value: `${row.Redirect}`,
            },
            {
              label: 'Redirect to',
              value: `${row.RedirectAddress}`,
            },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate?Function=SafeAttachment`,
              modalMessage: 'Are you sure you want to create a template based on this rule?',
            },
            {
              label: 'Enable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faCheck} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=enable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=SafeAttachment`,
              modalMessage: 'Are you sure you want to enable this rule?',
            },
            {
              label: 'Disable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faBan} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=disable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=SafeAttachment`,
              modalMessage: 'Are you sure you want to disable this rule?',
            },
            {
              label: 'Delete Rule',
              color: 'danger',
              modal: true,
              icon: <FontAwesomeIcon icon={faTrash} className="me-2" />,
              modalUrl: `/api/RemoveDefenderForOffice?TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=SafeAttachment`,
              modalMessage: 'Are you sure you want to delete this rule?',
            },
          ]}
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Default Rule',
      selector: (row) => row['IsBuiltInProtection'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'IsBuiltInProtection',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
    },
    {
      name: 'Action',
      selector: (row) => row['Action'],
      sortable: true,
      exportSelector: 'Action',
    },
    {
      name: 'Creation Date',
      selector: (row) => row['WhenCreated'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Last Edit Date',
      selector: (row) => row['WhenChanged'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '80px',
    },
  ]

  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Safe Attachments"
      tenantSelector={true}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DefenderForOffice-list`,
        path: '/api/ListDefenderForOffice?Function=SafeAttachment',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

const SafeLinksSettings = () => {
  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    //console.log(row)
    return (
      <>
        <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </CButton>
        <CippActionsOffcanvas
          title="Extended Settings"
          extendedInfo={[
            {
              label: 'Apply Safe Links to Internal messages',
              value: `${row.EnableForInternalSenders}`,
            },
            {
              label: 'Apply real-time scanning',
              value: `${row.ScanUrls}`,
            },
            {
              label: 'Wait for scanning to complete',
              value: `${row.DeliverMessageAfterScan}`,
            },
            {
              label: 'Do not rewrite URLs',
              value: `${row.DisableRewriteUrls}`,
            },
            { label: 'Do not rewrite these URLs', value: `${row.DoNotRewriteUrls}` },
            {
              label: 'Track User Clicks',
              value: `${row.TrackClicks}`,
            },
            {
              label: 'Let Users click through to the original URL',
              value: `${row.AllowClickThrough}`,
            },
            { label: 'Display Organization branding', value: `${row.EnableOrganizationBranding}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate?Function=SafeLinks`,
              modalMessage: 'Are you sure you want to create a template based on this rule?',
            },
            {
              label: 'Enable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faCheck} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=enable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=SafeLinks`,
              modalMessage: 'Are you sure you want to enable this rule?',
            },
            {
              label: 'Disable Rule',
              color: 'info',
              icon: <FontAwesomeIcon icon={faBan} className="me-2" />,
              modal: true,
              modalUrl: `/api/EditDefenderForOffice?State=disable&TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=SafeLinks`,
              modalMessage: 'Are you sure you want to disable this rule?',
            },
            {
              label: 'Delete Rule',
              color: 'danger',
              modal: true,
              icon: <FontAwesomeIcon icon={faTrash} className="me-2" />,
              modalUrl: `/api/RemoveDefenderForOffice?TenantFilter=${tenant.defaultDomainName}&name=${row.Name}&Function=SafeLinks`,
              modalMessage: 'Are you sure you want to delete this rule?',
            },
          ]}
          placement="end"
          visible={ocVisible}
          id={row.id}
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Default Rule',
      selector: (row) => row['IsBuiltInProtection'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'IsBuiltInProtection',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
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
      name: 'Creation Date',
      selector: (row) => row['WhenCreated'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Last Edit Date',
      selector: (row) => row['WhenChanged'],
      sortable: true,
      exportSelector: 'WhenChanged',
      cell: cellDateFormatter(),
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '80px',
    },
  ]

  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Safe Links"
      tenantSelector={true}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-DefenderForOffice-list`,
        path: '/api/ListDefenderForOffice?Function=SafeLinks',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}
