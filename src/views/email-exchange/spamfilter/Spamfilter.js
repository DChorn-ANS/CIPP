import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCallout,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormLabel,
  CNav,
  CNavItem,
  CRow,
  CTabContent,
  CTabPane,
  CForm,
  CListGroup,
  CListGroupItem,
  CLink,
  CSpinner,
  CCardText,
} from '@coreui/react'
import {
  useGenericGetRequestQuery,
  useLazyExecClearCacheQuery,
  useLazyExecNotificationConfigQuery,
  useLazyExecPermissionsAccessCheckQuery,
  useLazyExecTenantsAccessCheckQuery,
  useLazyGenericGetRequestQuery,
  useLazyGenericPostRequestQuery,
  useLazyListNotificationConfigQuery,
  useLoadVersionsQuery,
} from 'src/store/api/app'
import {
  useExecAddExcludeTenantMutation,
  useExecRemoveExcludeTenantMutation,
} from 'src/store/api/tenants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBan,
  faBook,
  faCheck,
  faEllipsisV,
  faTrash,
  faCheckCircle,
  faCircleNotch,
  faExclamationTriangle,
  faEye,
  faEyeSlash,
  faLink,
  faRecycle,
  faScroll,
} from '@fortawesome/free-solid-svg-icons'
import { useListTenantsQuery } from 'src/store/api/tenants'
import { useLazyEditDnsConfigQuery, useLazyGetDnsConfigQuery } from 'src/store/api/domains'
import { useDispatch, useSelector } from 'react-redux'
import {
  cellDateFormatter,
  CellBadge,
  cellBooleanFormatter,
  CellTip,
  CellTipIcon,
  CippTable,
} from 'src/components/tables'
import { CippPage, CippPageList } from 'src/components/layout'
import {
  RFFCFormSwitch,
  RFFCFormInput,
  RFFCFormSelect,
  RFFSelectSearch,
} from 'src/components/forms'
import { Form } from 'react-final-form'
import useConfirmModal from 'src/hooks/useConfirmModal'
import { setCurrentTenant } from 'src/store/features/app'
import {
  CippActionsOffcanvas,
  CippCodeBlock,
  ModalService,
  StatusIcon,
  TenantSelectorMultiple,
} from 'src/components/utilities'
import CippListOffcanvas from 'src/components/utilities/CippListOffcanvas'
import { TitleButton } from 'src/components/buttons'
import Skeleton from 'react-loading-skeleton'
import { Buffer } from 'buffer'
import Extensions from 'src/data/Extensions.json'

const DefenderForOfficeSettings = () => {
  const [active, setActive] = useState(1)
  return (
    <CippPage title="DefenderForOffice365" tenantSelector={false}>
      <CNav variant="tabs" role="tablist">
        <CNavItem active={active === 1} onClick={() => setActive(1)} href="#">
          Anti-phishing
        </CNavItem>
        <CNavItem active={active === 2} onClick={() => setActive(2)} href="#">
          Anti-spam Inbound
        </CNavItem>
        <CNavItem active={active === 3} onClick={() => setActive(3)} href="#">
          Anti-spam Outbound
        </CNavItem>
        <CNavItem active={active === 4} onClick={() => setActive(4)} href="#">
          Anti-Malware
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
          <PhishingSettings />
        </CTabPane>
        <CTabPane visible={active === 2} className="mt-3">
          <AntispamInboundSettings />
        </CTabPane>
        <CTabPane visible={active === 3} className="mt-3">
          <AntispamOutboundSettings />
        </CTabPane>
        <CTabPane visible={active === 4} className="mt-3">
          <AntimalwareSettings />
        </CTabPane>
        <CTabPane visible={active === 5} className="mt-3">
          <SafeAttachmentsSettings />
        </CTabPane>
        <CTabPane visible={active === 6} className="mt-3">
          <SafeLinksSettings />
        </CTabPane>
      </CTabContent>
    </CippPage>
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
            { label: 'Phishing Threshold', value: `${row.PhishThresholdLevel}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate&Function=AntiPhish`,
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
      title="Spam Filters"
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
          title="Spam Score Settings"
          extendedInfo={[
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
            {
              label: 'Mark javascript in HTML as spam',
              value: `${row.MarkAsSpamJavaScriptInHtml}`,
            },
            { label: 'Mark iFrames as spam', value: `${row.MarkAsSpamFramesInHtml}` },
            { label: 'Mark Object tags as spam', value: `${row.MarkAsSpamObjectTagsInHtml}` },
            { label: 'Mark Embedded HTML as spam', value: `${row.MarkAsSpamEmbedTagsInHtml}` },
            { label: 'Mark Form tags as spam', value: `${row.MarkAsSpamFormTagsInHtml}` },
            { label: 'Mark known html bugs as spam', value: `${row.MarkAsSpamWebBugsInHtml}` },
            {
              label: 'Mark Senstive wordlists as spam.',
              value: `${row.MarkAsSpamSensitiveWordList}`,
            },
            { label: 'Mark SPF Hard Fail as spam', value: `${row.MarkAsSpamSpfRecordHardFail}` },
            { label: 'Mark SenderID Fails as spam', value: `${row.MarkAsSpamFromAddressAuthFail}` },
            { label: 'Mark known bulk mail as spam', value: `${row.MarkAsSpamBulkMail}` },
            { label: 'Mark Backscatter as spam', value: `${row.MarkAsSpamNdrBackscatter}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate&Function=HostedContentFilter`,
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
      title="Spam Filters"
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
          title="Spam Score Settings"
          extendedInfo={[
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
            {
              label: 'Mark javascript in HTML as spam',
              value: `${row.MarkAsSpamJavaScriptInHtml}`,
            },
            { label: 'Mark iFrames as spam', value: `${row.MarkAsSpamFramesInHtml}` },
            { label: 'Mark Object tags as spam', value: `${row.MarkAsSpamObjectTagsInHtml}` },
            { label: 'Mark Embedded HTML as spam', value: `${row.MarkAsSpamEmbedTagsInHtml}` },
            { label: 'Mark Form tags as spam', value: `${row.MarkAsSpamFormTagsInHtml}` },
            { label: 'Mark known html bugs as spam', value: `${row.MarkAsSpamWebBugsInHtml}` },
            {
              label: 'Mark Senstive wordlists as spam.',
              value: `${row.MarkAsSpamSensitiveWordList}`,
            },
            { label: 'Mark SPF Hard Fail as spam', value: `${row.MarkAsSpamSpfRecordHardFail}` },
            { label: 'Mark SenderID Fails as spam', value: `${row.MarkAsSpamFromAddressAuthFail}` },
            { label: 'Mark known bulk mail as spam', value: `${row.MarkAsSpamBulkMail}` },
            { label: 'Mark Backscatter as spam', value: `${row.MarkAsSpamNdrBackscatter}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate&Function=HostedOutboundSpamFilter`,
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
      title="Spam Filters"
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
          title="Spam Score Settings"
          extendedInfo={[
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
            {
              label: 'Mark javascript in HTML as spam',
              value: `${row.MarkAsSpamJavaScriptInHtml}`,
            },
            { label: 'Mark iFrames as spam', value: `${row.MarkAsSpamFramesInHtml}` },
            { label: 'Mark Object tags as spam', value: `${row.MarkAsSpamObjectTagsInHtml}` },
            { label: 'Mark Embedded HTML as spam', value: `${row.MarkAsSpamEmbedTagsInHtml}` },
            { label: 'Mark Form tags as spam', value: `${row.MarkAsSpamFormTagsInHtml}` },
            { label: 'Mark known html bugs as spam', value: `${row.MarkAsSpamWebBugsInHtml}` },
            {
              label: 'Mark Senstive wordlists as spam.',
              value: `${row.MarkAsSpamSensitiveWordList}`,
            },
            { label: 'Mark SPF Hard Fail as spam', value: `${row.MarkAsSpamSpfRecordHardFail}` },
            { label: 'Mark SenderID Fails as spam', value: `${row.MarkAsSpamFromAddressAuthFail}` },
            { label: 'Mark known bulk mail as spam', value: `${row.MarkAsSpamBulkMail}` },
            { label: 'Mark Backscatter as spam', value: `${row.MarkAsSpamNdrBackscatter}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate&Function=MalwareFilter`,
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
      title="Spam Filters"
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
          title="Spam Score Settings"
          extendedInfo={[
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
            {
              label: 'Mark javascript in HTML as spam',
              value: `${row.MarkAsSpamJavaScriptInHtml}`,
            },
            { label: 'Mark iFrames as spam', value: `${row.MarkAsSpamFramesInHtml}` },
            { label: 'Mark Object tags as spam', value: `${row.MarkAsSpamObjectTagsInHtml}` },
            { label: 'Mark Embedded HTML as spam', value: `${row.MarkAsSpamEmbedTagsInHtml}` },
            { label: 'Mark Form tags as spam', value: `${row.MarkAsSpamFormTagsInHtml}` },
            { label: 'Mark known html bugs as spam', value: `${row.MarkAsSpamWebBugsInHtml}` },
            {
              label: 'Mark Senstive wordlists as spam.',
              value: `${row.MarkAsSpamSensitiveWordList}`,
            },
            { label: 'Mark SPF Hard Fail as spam', value: `${row.MarkAsSpamSpfRecordHardFail}` },
            { label: 'Mark SenderID Fails as spam', value: `${row.MarkAsSpamFromAddressAuthFail}` },
            { label: 'Mark known bulk mail as spam', value: `${row.MarkAsSpamBulkMail}` },
            { label: 'Mark Backscatter as spam', value: `${row.MarkAsSpamNdrBackscatter}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate&Function=SafeAttachment`,
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
      title="Spam Filters"
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
          title="Spam Score Settings"
          extendedInfo={[
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
            {
              label: 'Mark javascript in HTML as spam',
              value: `${row.MarkAsSpamJavaScriptInHtml}`,
            },
            { label: 'Mark iFrames as spam', value: `${row.MarkAsSpamFramesInHtml}` },
            { label: 'Mark Object tags as spam', value: `${row.MarkAsSpamObjectTagsInHtml}` },
            { label: 'Mark Embedded HTML as spam', value: `${row.MarkAsSpamEmbedTagsInHtml}` },
            { label: 'Mark Form tags as spam', value: `${row.MarkAsSpamFormTagsInHtml}` },
            { label: 'Mark known html bugs as spam', value: `${row.MarkAsSpamWebBugsInHtml}` },
            {
              label: 'Mark Senstive wordlists as spam.',
              value: `${row.MarkAsSpamSensitiveWordList}`,
            },
            { label: 'Mark SPF Hard Fail as spam', value: `${row.MarkAsSpamSpfRecordHardFail}` },
            { label: 'Mark SenderID Fails as spam', value: `${row.MarkAsSpamFromAddressAuthFail}` },
            { label: 'Mark known bulk mail as spam', value: `${row.MarkAsSpamBulkMail}` },
            { label: 'Mark Backscatter as spam', value: `${row.MarkAsSpamNdrBackscatter}` },
          ]}
          actions={[
            {
              label: 'Create template based on rule',
              color: 'info',
              modal: true,
              icon: <FontAwesomeIcon icon={faBook} className="me-2" />,
              modalBody: row,
              modalType: 'POST',
              modalUrl: `/api/AddDefenderForOfficeTemplate&Function=SafeLinks`,
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
      title="Spam Filters"
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
