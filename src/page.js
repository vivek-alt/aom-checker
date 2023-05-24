import React, { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/index.css'
import '@inovua/reactdatagrid-enterprise/theme/default-dark.css'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter';
const REACT_APP_API_URL = "https://east.albion-online-data.com/api/v2/stats/prices/"
const items = require('./transport.json');
const categories = require('./categories.json');
const cities = require('./cities.json');
function Page() {
    const [types, setTypes] = useState(categories["Lymhurst"]);
    const gridStyle = { minHeight: "100vh" };
    const defaultSortInfo = { name: 'profitpw', dir: -1 }
    const selectStyle = { backgroundColor: "#313943", color: "#9ba7b4" };
    const columns = [
      { name: 'weapon', header: 'Weapon',defaultWidth:200, defaultLocked: true },
      { name: 'enc', header: 'Enchant' },
      {
        name: 'type', header: 'Type', filterEditor: SelectFilter,
        filterEditorProps: {
          multiple: true,
          wrapMultiple: false,
          dataSource: types.map(c => {
            return { id: c, label: c }
          }),
        }
      },
      { name: 'bp', header: 'Buy Price',type:"number" },
      { name: 'sp', header: 'Sell Price',type:"number" },
      { name: 'weight', header: 'Weight',type:"number" },
      { name: 'profit', header: 'Profit',type:"number" },
      { name: 'profitper', header: 'Profit %',type:"number" },
      { name: 'profitpw', header: 'Profit/Weight', type:"number"}
    ];
    const defaultFilterValue = [
      { name: 'type', operator: 'inlist', type: 'select', value: [] },
      { name: 'bp', operator: 'gte', type: 'number', value: 1 },
      { name: 'sp', operator: 'gte', type: 'number', value: 1 }
    ];
    const [dataSource, setDataSource] = useState([]);
    const [city, setCity] = useState({ "city": "Lymhurst", "id": 1 });
    useEffect(()=>{
      setTypes(categories[city["city"]]);
      var item_json=items[city["city"]];
      var it=item_json.map(item=>item.uniquename+"@1").join(',')+","+item_json.map(item=>item.uniquename).join(',');
      fetch(`${REACT_APP_API_URL}${it}.json?locations=Black Market,${city["city"]}&qualities=2&refresh=false`)
      .then((resp)=>resp.json())
      .then((res)=>{
        res=Object.values(res.reduce((a, { item_id, city,sell_price_min }) => {
          if (!a[item_id]) a[item_id] = { item_id, data: [] };
          a[item_id][city]=sell_price_min;
          return a;
        }, {}));
        var final=[];
        var c=1;
        for(var i of res){
          //eslint-disable-next-line
          var item=item_json.filter((x)=>(i["item_id"].includes(x["uniquename"]) && i["item_id"].endsWith('@1'))||i["item_id"]===(x["uniquename"]))[0];
          var row={'weapon':item["name"],
          'enc':i["item_id"].includes('@1')?1:0,
          'type':item["shopsubcategory1"],
          "bp":i[city["city"]],
          "sp":i["Black Market"],
          "weight":parseFloat(item["weight"]),
          "profit":i["Black Market"]-i[city["city"]],
          "profitper":0,
          "profitpw":0,
          'id':c}
          row["profitpw"]=parseInt(row["profit"]/row["weight"]);
          row["profitper"]=parseFloat(row["profit"]*100.0/row["bp"]).toFixed(2);
          c+=1;
          final.push(row);
        }
        setDataSource(final);
      })
    },[city]);
    return (
      <div>
        <div>
          <Select searchable={false} values={[city]} style={selectStyle} options={cities} labelField="city" valueField="id" onChange={(city) => setCity(city[0])} />
        </div>
        <ReactDataGrid idProperty="id" defaultSortInfo={defaultSortInfo} theme="default-dark" style={gridStyle} enableFiltering defaultFilterValue={defaultFilterValue} columns={columns} dataSource={dataSource} showZebraRows={true}
        />
      </div>);
  }
  export default Page;
  