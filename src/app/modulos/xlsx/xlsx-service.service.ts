import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XlsxServiceService {

  public saveDataInCSV(data: Array<any>): string {
    if (data.length == 0) {
      return '';
    }

    let propertyNames = Object.keys(data[0]);
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;
    console.log('saveDataInCSV => csvContent ' + csvContent);
    
    let rows: string[] = [];

    data.forEach((item) => {
      let values: string[] = [];

      propertyNames.forEach((key) => {
        let val: any = item[key];

        if (val !== undefined && val !== null) {
          val = new String(val);
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    return csvContent;
  }

  public importDataFromCSV(csvText: string): Array<any> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');

      let obj: any = new Object();

      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];

        let val: any = values[index];
        if (val === '') {
          val = null;
        }

        obj[propertyName] = val;
      }

      dataArray.push(obj);
    });

    return dataArray;
  }

  public importDataFromCSVByType(csvText: string, obj: any): Array<any> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    console.log('importDataFromCSVByType => propertyNames ' + propertyNames);
    console.log('importDataFromCSVByType => dataRows ' + dataRows);

    
    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');
      console.log('dataObj values >> ' + values);

      let dataObj: any = new Object();

      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];
        let value: any = values[index];
        
        console.log('dataObj propertyName >> ' + propertyName);
        console.log('dataObj value >> ' + typeof value + ' >> ' + value);
        
        /* 
        if (value === '') {
          value = null;
        }

        if (typeof obj[propertyName] === 'undefined') {
          dataObj[propertyName] = undefined;
        } 
        else if (typeof obj[propertyName] === 'boolean') {
          dataObj[propertyName] = value.toLowerCase() === 'true';
        } 
        else if (typeof obj[propertyName] === 'number') {
          dataObj[propertyName] = Number(value);
        } 
        else if (typeof obj[propertyName] === 'string') {
          dataObj[propertyName] = value;
        }
        else if (typeof obj[propertyName] === 'object') {
          console.error("do no have algorithm to convert object");
        } 
        */
       
        dataObj[propertyName] = value;
      }

      console.log('dataObj >> ' + dataObj);
      console.log('dataObj >> >> ' + Object.keys(dataObj).length + ' >> ' + Object.keys(dataObj));
      console.log('dataObj.record_id >> ' + dataObj.record_id);
      dataArray.push(dataObj);
    });


    return dataArray;
  }
}
