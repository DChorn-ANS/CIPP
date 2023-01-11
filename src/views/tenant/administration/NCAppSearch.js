import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CCollapse,
  CForm,
  CRow,
} from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { Field, Form, FormSpy } from 'react-final-form'
import { RFFCFormInput, RFFSelectSearch } from 'src/components/forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CippTable } from 'src/components/tables'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CippPage } from 'src/components/layout/CippPage'
import { useLazyGenericGetRequestQuery } from 'src/store/api/app'
import { OnChange } from 'react-final-form-listeners'
import { queryString } from 'src/helpers'
import { cellGenericFormatter } from 'src/components/tables/CellGenericFormat'
import { useNCListClientsQuery } from 'src/store/api/ncentral'

const NCAppSearch = () => {
  let navigate = useNavigate()
  const tenant = useSelector((state) => state.app.currentTenant)
  let query = useQuery()
  const AppName = query.get('AppName')
  const ClientID = query.get('Client')
  const SearchNow = query.get('SearchNow')
  const [visibleA, setVisibleA] = useState(true)
  const handleSubmit = async (values) => {
    setVisibleA(false)

    const shippedValues = {
      tenantFilter: tenant.defaultDomainName,
      SearchNow: true,
      AppName: encodeURIComponent(values.AppName),
      ClientID: encodeURIComponent(values.Client.value),
      random: (Math.random() + 1).toString(36).substring(7),
    }
    var queryString = Object.keys(shippedValues)
      .map((key) => key + '=' + shippedValues[key])
      .join('&')

    navigate(`?${queryString}`)
  }
  const [NCAppSearch, AppSearch] = useLazyGenericGetRequestQuery()
  const {
    data: NCClients = [],
    isFetching: NCClientsIsFetching,
    error: NCClientsError,
  } = useNCListClientsQuery()
  const QueryColumns = { set: false, data: [] }

  if (AppSearch.isSuccess) {
    if (AppSearch.data.length === 0) {
      AppSearch.data = [{ data: 'No Data Found' }]
    }

    //set columns

    const flatObj = Object.keys(AppSearch.data[0]).flat(100)
    flatObj.map((value) =>
      QueryColumns.data.push({
        name: value,
        selector: (row) => row[`${value.toString()}`],
        sortable: true,
        exportSelector: value,
        cell: cellGenericFormatter(),
      }),
    )
    QueryColumns.set = true
  }

  useEffect(() => {
    NCAppSearch({
      path: 'api/NCListDeviceAppSearch',
      params: {
        tenantFilter: tenant.defaultDomainName,
        AppName: AppName,
        ClientID: ClientID,
      },
    })
  }, [AppName, NCAppSearch, tenant.defaultDomainName, query])

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="options-card">
            <CCardHeader>
              <CCardTitle className="d-flex justify-content-between">
                Report Settings
                <CButton size="sm" variant="ghost" onClick={() => setVisibleA(!visibleA)}>
                  <FontAwesomeIcon icon={visibleA ? faChevronDown : faChevronRight} />
                </CButton>
              </CCardTitle>
            </CCardHeader>
            <CCollapse visible={visibleA}>
              <CCardBody>
                <Form
                  initialValues={{
                    tenantFilter: tenant.defaultDomainName,
                    AppName: AppName,
                  }}
                  onSubmit={handleSubmit}
                  render={({ handleSubmit, submitting, values }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <CRow>
                          <CCol>
                            <RFFSelectSearch
                              label="Client"
                              values={NCClients?.map((NCClients) => ({
                                value: NCClients.customerid,
                                name: NCClients.customername,
                              }))}
                              placeholder={!NCClientsIsFetching ? 'Select Client' : 'Loading...'}
                              name="Client"
                            />
                            {NCClientsError && <span>Failed to load list of Clients</span>}
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <RFFCFormInput
                              type="text"
                              name="AppName"
                              label="enter an AppName"
                              placeholder="Enter the Application Name you'd like to search for."
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CButton type="submit" disabled={submitting}>
                              <FontAwesomeIcon className="me-2" icon={faSearch} />
                              Query
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )
                  }}
                />
              </CCardBody>
            </CCollapse>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <CippPage title="Report Results" tenantSelector={false}>
        {!SearchNow && <span>Execute a search to get started.</span>}
        {AppSearch.isSuccess && QueryColumns.set && SearchNow && (
          <CCard className="content-card">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle>Results</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CippTable
                reportName="AppSearch"
                dynamicColumns={false}
                columns={QueryColumns.data}
                data={AppSearch.data}
                isFetching={AppSearch.isFetching}
              />
            </CCardBody>
          </CCard>
        )}
      </CippPage>
    </>
  )
}

export default NCAppSearch
