import React, { useState } from 'react'
import { CCol, CRow, CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBan,
  faBook,
  faCheck,
  faEllipsisV,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  cellDateFormatter,
  cellBooleanFormatter,
  CellTip,
  CellBoolean,
} from 'src/components/tables'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { useSelector } from 'react-redux'
import { ModalService } from 'src/components/utilities'

const DefenderForOfficeSettings = () => {
  return (
    <div>
      <CCol>
        <CRow className="mb-3">
          <div className="d-flex justify-content-end">
            <CButton className="ms-auto" color="primary" href="/email/threatpolicies/deploy">
              <FontAwesomeIcon icon={faPlus} className="pe-1" />
              Apply Template
            </CButton>
          </div>
        </CRow>
        <CRow className="mb-3">
          <SafeAttachmentsSettings />
        </CRow>
        <CRow className="mb-3">
          <SafeLinksSettings />
        </CRow>
      </CCol>
    </div>
  )
}
export default DefenderForOfficeSettings

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
  const handleIncludedList = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.ruleInclAll.split('<br />'),
      title: `Included`,
    })
  }
  const handleExcludedList = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.ruleExclAll.split('<br />'),
      title: `Excluded`,
    })
  }

  const columns = [
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
    },
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Included',
      selector: (row) => row['ruleInclAllCount'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return (
            <CButton className="btn-primary" size="sm" onClick={() => handleIncludedList({ row })}>
              {cell} Inclusion{cell > 1 ? 's' : ''}
            </CButton>
          )
        } else if (cell === 0) {
          return <CellBoolean cell={false} />
        } else {
          return <CellBoolean cell={true} colourless />
        }
      },
      exportSelector: 'Included Count',
    },
    {
      name: 'Excluded',
      selector: (row) => row['ruleExclAllCount'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return (
            <CButton className="btn-primary" size="sm" onClick={() => handleExcludedList({ row })}>
              {cell} Exclusion{cell > 1 ? 's' : ''}
            </CButton>
          )
        } else {
          return <CellBoolean cell={true} colourless />
        }
      },
      exportSelector: 'Excluded Count',
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
  const handleIncludedList = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.ruleInclAll.split('<br />'),
      title: `Included`,
    })
  }
  const handleExcludedList = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.ruleExclAll.split('<br />'),
      title: `Excluded`,
    })
  }

  const columns = [
    {
      name: 'Priority',
      selector: (row) => row['rulePrio'],
      sortable: true,
      exportSelector: 'rulePrio',
    },
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      wrap: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Rule State',
      selector: (row) => row['ruleState'],
      sortable: true,
      exportSelector: 'ruleState',
    },
    {
      name: 'Included',
      selector: (row) => row['ruleInclAllCount'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return (
            <CButton className="btn-primary" size="sm" onClick={() => handleIncludedList({ row })}>
              {cell} Inclusion{cell > 1 ? 's' : ''}
            </CButton>
          )
        } else if (cell === 0) {
          return <CellBoolean cell={false} />
        } else {
          return <CellBoolean cell={true} colourless />
        }
      },
      exportSelector: 'Included Count',
    },
    {
      name: 'Excluded',
      selector: (row) => row['ruleExclAllCount'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return (
            <CButton className="btn-primary" size="sm" onClick={() => handleExcludedList({ row })}>
              {cell} Exclusion{cell > 1 ? 's' : ''}
            </CButton>
          )
        } else {
          return <CellBoolean cell={true} colourless />
        }
      },
      exportSelector: 'Excluded Count',
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
