import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      loading:true,
    };
  }
  async getUsersData(){
    const res = await axios.get('https://restcountries.com/v3/region/asia')
    console.log(res.data)
    this.setState({loading:false, users: res.data})
  }
  componentDidMount(){
    this.getUsersData()
  }
  greetUser() {
    this.componentDidMount();
  }
  render() {
    const columns =  
    [          
        {
            Header: 'Flag',
                Cell: (row) => {
                    return <div><img width={100} height={50} src={row.original.flags[1]}/></div>
                },
                id: "flags",
                width: 120, 
        },
        {  
            Header: 'Name',  
            accessor: 'name.common'
        },{  
            Header: 'Capital',  
            accessor: 'capital'  
        },{  
            Header: 'Region',  
            accessor: 'region'
        },{  
            Header: 'Subregion',  
            accessor: 'subregion'  
        },{  
            Header: 'Borders',
                id: "borders",
                accessor: data => {
                    let output = [];
                    if(data.borders != "undefined" && data.borders != null)
                    {  
                      if(data.borders.length != 0){
                        data.borders.map(data1 => {
                          output.push(data1);
                      });
                        return output.join(' / ');
                      }
                      else{
                        return (
                          "No data available"
                        )
                      } 
                    }
                    else{
                      return (
                        "No data available"
                      )
                    }
                }
            },{  
                Header: 'Population',  
                id: "population",
                accessor: data => {
                  if(data.population != "undefined" && data.population != null)
                  {  
                    return {data}
                  }
                  else{
                    return (
                      "No data available"
                    )
                  }
                }
              }
    ]
    return (
      <div>
        <div className={"hero"}>
          <button className={"btn"} onClick={() => window.location.reload(false)}>Refresh Data</button>
        </div>
        <ReactTable  
          data={this.state.users}  
          columns={columns}  
          minRows={0}
        />
      </div>
    )
  }
}