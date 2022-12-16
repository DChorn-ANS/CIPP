import React from 'react'
import { CButton, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { ModalService } from 'src/components/utilities'
import { CellBoolean, CellBadge, cellBooleanFormatter } from 'src/components/tables'

const ANSSecurityAudit = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const handleGlobalAdminsList = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.GlobalAdminList.split('<br />'),
      title: `Enabled Global Admins`,
    })
  }
  const handleUserMFAbyCAname = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.UserMFAbyCAname.split('<br />'),
      title: `Conditional Policies containing mfa for all users`,
    })
  }
  const columns = [
    {
      name: 'Admin MFA Enabled',
      selector: (row) => row['AdminMFAV2'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        }
      },
      exportSelector: 'AdminMFAV2',
    },
    {
      name: 'Global Admin Count',
      selector: (row) => row['GlobalAdminCount'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell >= 2 && cell <= 4) {
          return (
            <CButton
              className="btn-success"
              size="sm"
              onClick={() => handleGlobalAdminsList({ row })}
            >
              {cell} Admin{cell > 1 ? 's' : ''}
            </CButton>
          )
        } else {
          return (
            <CButton
              className="btn-danger"
              size="sm"
              onClick={() => handleGlobalAdminsList({ row })}
            >
              {cell} Admin{cell > 1 ? 's' : ''}
            </CButton>
          )
        }
      },
      exportSelector: 'GlobalAdminCount',
    },
    {
      name: 'ATP Enabled',
      selector: (row) => row['ATPEnabled'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'ATPEnabled',
    },
    {
      name: 'MFA for all users',
      selector: (row) => row['MFARegistrationV2'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        }
      },
      exportSelector: 'MFARegistrationV2',
    },
    {
      name: 'Usermfabyca',
      selector: (row) => row['Usermfabyca'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp1') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBadge label="No All Users Policy" color={'warning'} />
        } else if (cell > 0) {
          return (
            <CButton className="btn-success" size="sm" onClick={() => handleUserMFAbyCAname({ row })}>
              {cell} Polic{cell > 1 ? 'ies' : 'y'}
            </CButton>
          )
        }
      },
      exportSelector: 'Usermfabyca',
    },
    {
      name: 'BlockLegacyAuthentication',
      selector: (row) => row['BlockLegacyAuthentication'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp1') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
    },
    {
      name: 'SPSharing',
      selector: (row) => row['SPSharing'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'externalUserAndGuestSharing') {
          return <CellBadge label={cell} color={'danger'} />
        } else {
          return <CellBadge label={cell} color={'success'} />
        }
      },
      exportSelector: 'SPSharing',
    },
    {
      name: 'Backupify',
      selector: (row) => row['Backupify'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Backupify not present') {
          return <CellBadge label={cell} color={'danger'} />
        } else {
          return <CellBadge label={'Backupify Deployed'} color={'success'} />
        }
      },
      exportSelector: 'Backupify',
    },
    {
      name: 'SelfServicePasswordReset',
      selector: (row) => row['SelfServicePasswordReset'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Off') {
          return <CellBadge label="Off All Users" color="warning" />
        } else if (cell === 'On') {
          return <CellBadge label="On All Users" color="success" />
        } else if (cell === 'Specific Users') {
          return <CellBadge label="Specific Users" color="info" />
        }
        return <CellBadge label="No Data" color="info" />
      },
      exportSelector: 'SelfServicePasswordReset',
    },
    {
      name: 'SecureDefaultState',
      selector: (row) => row['SecureDefaultState'],
      sortable: true,
      cell: cellBooleanFormatter({ warning: true }),
      exportSelector: 'SecureDefaultState',
    },
    {
      name: 'accessPackages',
      selector: (row) => row['accessPackages'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBadge label="No Access Packages" color={'warning'} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'info'} />
        }
      },
      exportSelector: 'accessPackages',
    },
    {
      name: 'SigninRiskPolicy',
      selector: (row) => row['SigninRiskPolicy'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
      exportSelector: 'SigninRiskPolicy',
    },
    {
      name: 'UserRiskPolicy',
      selector: (row) => row['UserRiskPolicy'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
      exportSelector: 'UserRiskPolicy',
    },
    {
      name: 'DLP',
      selector: (row) => row['DLP'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for DLP') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 'true') {
          return <CellBoolean cell={true} />
        } else if (cell === 'false') {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
      exportSelector: 'DLP',
    },
    {
      name: 'CustomerLockbox',
      selector: (row) => row['CustomerLockbox'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'CustomerLockbox',
    },
    {
      name: 'enableBannedPassworCheckOnPremise',
      selector: (row) => row['enableBannedPassworCheckOnPremise'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'enableBannedPassworCheckOnPremise',
    },
  ]

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="ANS Security Audit"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-ANSSecurityAudit`,
        path: '/api/ANSSecurityAudit',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default ANSSecurityAudit
