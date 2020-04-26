import React, {Component, createRef, useEffect, useState} from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import {HotTable} from '@handsontable/react';
import Handsontable from 'handsontable';
import "bootstrap/scss/bootstrap.scss";
const TestTask = (props) => {
    let hotTableComponent = createRef();
    const [fileUploaded,setFileUploaded] = useState([]);
    const arrayColumn = (arr, n) => arr.map(x => x[n]);
    useEffect((res) => {
        if (Object.keys(fileUploaded).length > 0) {
            console.log("if fileUploaded \n", fileUploaded);
        }
    }, [fileUploaded, setFileUploaded]);
    const handleUpload = (e) => {
        e.preventDefault();

        var files = e.target.files, file = files[0];
        var reader = new FileReader();
        console.log(reader);
        if (!reader.error){
            reader.onload = function (e) {
                var data = e.target.result;
                let readedData = XLSX.read(data, {type: 'binary'});
                const wsname = readedData.SheetNames[0];
                const ws = readedData.Sheets[wsname];

                /* Convert array to json*/
                const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});

                //console.log(arrayColumn(dataParse,4));
                hotTableComponent.current.hotInstance.loadData(dataParse);
                setFileUploaded(dataParse);
            };
            reader.readAsBinaryString(file);
        }

    }
    const id = 'hot';
    const emailListFromDB = [
        "Joe.Fabiano@ex.com",
        "Fred.Weclerx@ex.com",
        "Steve.Wilson@ex.com",
        "M.Fernandez@ex.com",
        "Pierre.Barbault@ex.com",
        "Nancy.Moore@ex.com",
        "B.MacDonald@ex.com"
    ]
    const people = [
        [1, "Joe", "Fabiano", "0.0.0.1", "Joe.Fabiano@ex.com"],
        [2, "Fred", "Weclersdd", "0.0.0.1", "Fred.Weclerx@ex.com"],
        [3, "Steve", "Wilson", "0.0.0.1", "Steve.Wilson@ex.com"],
        [4, "Maria", "Fernandez", "0.0.0.1", "M.Fernandez@ex.com"],
        [5, "Pierre", "Barbault", "0.0.0.1", "Pierre.Barbault@ex.com"],
        [6, "Nancy", "Moore", "0.0.0.1", "Nancy.Moore@ex.com"],
        [7, "Barbara", "MacDonald", "0.0.0.1", "B.MacDonald@ex.com"]
    ];
    let ipValidatorRegexp = /^(?:\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|null)$/;
    let emailValidator = function (value, callback) {
        console.log("validation works",value)
        setTimeout(function(){
            if (/.+@.+/.test(value)) {
                callback(true);
            }
            else {
                console.log("plz check mail format")
                callback(false);
            }
        }, 1000);
    };
    const hotSettings = {
        //data: Handsontable.helper.createSpreadsheetData(4, 11),
        // colHeaders: false,
        rowHeaders: false,
        width: 912,
        height: 300,
        rowHeights: 30,
        colWidths: [55, 215, 215, 215, 215],
        manualColumnResize: true,
        manualRowResize: true,
        dropdownMenu: true,
        filters: true,
        search: true,
        data: people,
        beforeChange: function (changes, source) {
            console.log("beforeChanges");
            console.log(changes,source);
            console.log(...changes[0][1]);
            /*for (var i = changes.length - 1; i >= 0; i--) {
                // gently don't accept the word "foo" (remove the change at index i)
                if (changes[i][3] === 'foo') {
                    changes.splice(i, 1);
                }
                // if any of pasted cells contains the word "nuke", reject the whole paste
                else if (changes[i][3] === 'nuke') {
                    return false;
                }
                // capitalise first letter in column 1 and 2
                else if ((changes[i][1][0] === 1 || changes[i][1][0] === 2) && (changes[i][3] && changes[i][3].charAt(0))) {
                    changes[i][3] = changes[i][3].charAt(0).toUpperCase() + changes[i][3].slice(1);
                }
            }*/

            if (source === "edit") {
                changes.forEach(([row, col, oldValue, newValue]) => {
                    console.log("row ",row);
                    console.log("col ",col);
                    console.log("oldValue ",oldValue);
                    console.log("newValue ", newValue);
                    //console.log("hotTableComponent ", hotTableComponent);
                    if (newValue !== oldValue) {
                        if(col[0] === 4){
                            if (/.+@.+/.test(newValue)) {
                                if(emailListFromDB.includes(newValue)){
                                    hotTableComponent.current.hotInstance.setCellMeta(row, ...col, 'className', '')
                                    hotTableComponent.current.hotInstance.render();
                                    console.log("email validate");
                                    let xLData = fileUploaded;
                                    xLData[row][col[0]] = newValue;
                                    // console.log(xLData)
                                    setFileUploaded([...xLData]);

                                }
                                else {
                                    hotTableComponent.current.hotInstance.setCellMeta(row, ...col, 'className', 'bg-danger text-white')
                                    hotTableComponent.current.hotInstance.render();
                                    console.log("email not in list from inner else");
                                }

                            }
                            else {
                                hotTableComponent.current.hotInstance.setCellMeta(row, ...col, 'className', 'bg-danger text-white')
                                hotTableComponent.current.hotInstance.render();
                                console.log("email not validate from outer else");
                            }
                        }else{
                            let xLData = fileUploaded;
                            xLData[row][col[0]] = newValue;
                            // console.log(xLData)
                            setFileUploaded([...xLData]);
                        }
                    }
                })
            }
        },
        afterChange: function (changes, source) {
            console.log("afterChanges")
            console.log(changes)
            console.log(source)
            if (source !== 'loadData') {
                //example1console.innerText = JSON.stringify(changes);
            }
        },
        colHeaders: ['ID', 'First_name', 'Last_name', 'IP', 'E_mail'],
        columns: [
            {data: [0], type: 'numeric', readOnly: true,editor: false},
            {data: [1]},
            {data: [2]},
            {data: [3], validator: ipValidatorRegexp, allowInvalid: true},
            {data: [4], validator: emailValidator,
                allowInvalid: false,
                type: 'dropdown',
                source: emailListFromDB
            }
        ]
    };



    return (
        <div className="container mt-5">
            <div className="form-group">
                <input
                    className="form-control"
                    type="file"
                    onChange={handleUpload}
                />
            </div>
            <div className="form-group">
                <div className="border p-3">
                    <HotTable
                        ref={hotTableComponent}
                        id={id}
                        width={1000}
                        settings={hotSettings}
                    />
                </div>
            </div>

        </div>
    )
};
export default TestTask
