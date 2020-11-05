import React from 'react'
import api from "src/_helpers/api";
import Pagination from "antd/lib/pagination";
import Table from "antd/lib/table";
import config from 'src/config';
import urlHelper from 'src/_helpers/urlHelper';
import _ from 'lodash'

/*
 
When child class extends this TableDataHandler it shoud have set:

1.
getHandleTableDataUrl() {
  return Routing.generate('XXXX')
}

2. if use renderItemsWithPagination then:
method "renderItemRecord" set.

renderItemRecord(item){
  ...
}

3. if use renderTable need to pass table columns definition

 */
const TableDataHandler = base => class extends base {
  constructor(arg, ...superArgs) {
    super(arg, ...superArgs);

    this.state = {      
      isFirstInitialFetchCall: true,
      updateUrlSearchQuery: false,
      data: [],
      fetchRequestQueryParams: {},
      pagination: {
        current: 1
      },
      sortField: null,
      sortOrder: null,
      filters: {},
    }
    this.fireTableUpdateOnFilterChanedTimeoutHandler = null
  }

  async componentDidMount() {
    if (this.state.updateUrlSearchQuery) {
      await this.initQueryParams()
    }
    if (!this.filterChanged()) {
      // return false if filter values were not changed
      this.handleTableFetch();
    }
    this.setState({
      isFirstInitialFetchCall: false
    })
  }

  initQueryParams = () => {
    let {page, filters, ...rest} = urlHelper.parseSearchContentToObject() || {}
    page = page || this.state.pagination.current    
    
    this.setState((curState, curProps) => {
      return {
        ...curState,
        ...{
          filters: filters, 
          pagination: {...this.state.pagination, current: page},
          sortField: rest.sortField,
          sortOrder: rest.sortOrder
        }
      }      
    })
  }

  buildRequestQueryParams = (overwriteParams = {}) => {
    let fetchRequestQueryParams = { 
      // ...this.state.fetchRequestQueryParams, 
      filters: { ...this.state.filters },
      page: this.state.pagination.current,
      ...overwriteParams, 
    };

    this.setState({
      fetchRequestQueryParams
    })

    if (this.state.updateUrlSearchQuery && !this.state.isFirstInitialFetchCall) {
      urlHelper.replaceStateWithFilterParams(fetchRequestQueryParams)
    }
    return fetchRequestQueryParams
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      pagination
    }, () => {
      return this.handleTableFetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        filters: { ...this.state.filters, ...filters }
      })
    })
  }

  getHandleTableDataUrl() {
    alert('define getHandleTableDataUrl() when extension the TableDataHandler')
  }

  handleTableFetch = (overwriteParams = {}) => {
    let params = this.buildRequestQueryParams(overwriteParams)

    this.setState({ loading: true });

    return api.get(this.getHandleTableDataUrl(), {
      params,
      type: "json"
    }).then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = response.data.count;
      pagination.pageSize = config.pagination.pageSize;

      this.setState({
        loading: false,
        data: response.data.rows,
        pagination
      });

      return response;
    });
  };


  /**
   * @return Object of the latest filters
   */
  filterChanged = (values) => {
    if (!values || _.isEqual(values, this.state.filters)) {
      return false
    }

    Object.keys(values).map( (key) => {
      if (values[key] === null || values[key] === '') {
        delete(values[key])
      }
    })
    this.setState( curState => { 
      return { 
          filters: values, 
          pagination: {...curState.pagination, current: 1} 
        }
      },
      () => {
        if (this.fireTableUpdateOnFilterChanedTimeoutHandler) {
          clearTimeout(this.fireTableUpdateOnFilterChanedTimeoutHandler)
        }
        this.fireTableUpdateOnFilterChanedTimeoutHandler = setTimeout(()=>{
          this.handleTableFetch();
        }, 500)
        
      });    
    return values
  };  

  onPaginationChange = (page, pageSize) => {
    this.setState(prevState => {
      return {
        pagination: { ...prevState.pagination, current: page }
      };
    }, () => {
      this.handleTableFetch();
    });
  };

  renderItemRecord(item){
    return <div key={item.id || item.uuid}>!Overwrite me!</div>
  }

  renderItemsWithPagination = () => {
    if (null === this.state.data) {
      return '';
    }

    return (
        this.state.data && this.state.data.length >0
        ? <>
            {this.state.data.map(item => {
              return this.renderItemRecord(item);
            })}
            <div className="text-center margin">
              <Pagination
                defaultCurrent={this.state.pagination.current}
                current={this.state.pagination.current}
                total={this.state.pagination.total}
                pageSize={this.state.pagination.pageSize || config.pagination.pageSize}
                onChange={this.onPaginationChange}
              />
            </div>
          </>
        : ''
    );
  };

  renderTable = (columns, customProps = {}) => {
    return (
      <Table 
        columns={columns}
        className="table"
        size="small"
        // scroll={{x:true}}
        rowKey={record => record.id || record.uuid}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        {...customProps}
      />
    )
  }
};

export default TableDataHandler;
