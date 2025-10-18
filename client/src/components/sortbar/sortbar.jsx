import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const sortbar = (props) => {
    let cloneFilters = { ...props.filters };

    async function clickFilter(obj) {
        const promise = new Promise((resolve, reject) => {
            Object.keys(obj).forEach(key => {
                //console.log(`Key: ${key}, Value: ${obj[key]}`);
                if(["game_category", "availability", "sales"].indexOf(key) >= 0) {
                    if(obj[key]) {
                        if(cloneFilters[key].includes(obj[key])) {
                            let index = cloneFilters[key].indexOf(obj[key]);

                            if (index !== -1) {
                                cloneFilters[key].splice(index, 1);
                            }
                        } else {
                            cloneFilters[key].push(obj[key]);
                        }
                    } else {
                        cloneFilters[key] = [];
                    }
                    return;
                }

                cloneFilters[key] = obj[key]
            });

            resolve(cloneFilters);
        });

        await Promise.all([promise]);
        console.log(cloneFilters);
        props.sendToParent(cloneFilters);
    }

    return (
    <>
    <ButtonGroup aria-label="Side-by-side dropdown buttons">
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue">Sort By</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => { clickFilter({sort_by:"featured", sort_dir:""}); }}>Featured {props.filters.sort_by == "featured" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({sort_by:"title", sort_dir:"asc"}); }}>Title <i className="fa-solid fa-arrow-down-a-z"></i> {props.filters.sort_by == "title" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({sort_by:"title", sort_dir:"desc"}); }}>Title <i className="fa-solid fa-arrow-down-z-a"></i> {props.filters.sort_by == "title" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({sort_by:"price", sort_dir:"asc"}); }}>Price <i className="fa-solid fa-arrow-down-1-9"></i> {props.filters.sort_by == "price" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({sort_by:"price", sort_dir:"desc"}); }}>Price <i className="fa-solid fa-arrow-down-9-1"></i> {props.filters.sort_by == "price" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue ms-3">Category</Dropdown.Toggle>
      <Dropdown.Menu style={{ width: '250px', }}>
        <Dropdown.Item onClick={() => { clickFilter({game_category:"games"}); }}>Games {props.filters.game_category.includes("games") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({game_category:"dlc"}); }}>DLC {props.filters.game_category.includes("dlc") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({game_category:"both"}); }}>Games + DLC {props.filters.game_category.includes("both") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({game_category:"demo"}); }}>Has Demo {props.filters.game_category.includes("demo") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({game_category:"voucher"}); }}>Game Voucher Eligible {props.filters.game_category.includes("voucher") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <hr/>
        <Dropdown.Item onClick={() => { clickFilter({game_category:null }); }}>Clear</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue ms-3">Format</Dropdown.Toggle>
      <Dropdown.Menu style={{ width: '250px', }}>
        <Dropdown.Item onClick={() => { clickFilter({format:"all"}); }}>All {props.filters.format == "all" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({format:"digital"}); }}>Digital {props.filters.format == "digital" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({format:"physical"}); }}>Physical {props.filters.format == "physical" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue ms-3">Sales</Dropdown.Toggle>
      <Dropdown.Menu style={{ width: '250px', }}>
        <Dropdown.Item onClick={() => { clickFilter({sales:"sales"}); }}>On Sale ({props.gameCategoryCount.deals ?? 0}) {props.filters.sales.includes("sales") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <hr/>
        <Dropdown.Item onClick={() => { clickFilter({sales:null }); }}>Clear</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue ms-3">Console</Dropdown.Toggle>
      <Dropdown.Menu style={{ width: '250px', }}>
        <Dropdown.Item onClick={() => { clickFilter({console:"all"}); }}>All {props.filters.console == "all" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({console:"switch1"}); }}>Switch {props.filters.console == "switch1" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({console:"switch2"}); }}>Switch 2 {props.filters.console == "switch2" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue ms-3">Availability</Dropdown.Toggle>
      <Dropdown.Menu style={{ width: '250px', }}>
        <Dropdown.Item onClick={() => { clickFilter({availability:"Available now"}); }}>Available Now {props.filters.availability.includes("Available now") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({availability:"Coming soon"}); }}>Coming Soon {props.filters.availability.includes("Coming soon") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({availability:"New releases"}); }}>New Releases {props.filters.availability.includes("New releases") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({availability:"Pre-order"}); }}>Pre-Order {props.filters.availability.includes("Pre-order") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <hr/>
        <Dropdown.Item onClick={() => { clickFilter({availability:null }); }}>Clear</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="" className="bg-steel-blue ms-3">Price Range</Dropdown.Toggle>
      <Dropdown.Menu style={{ width: '250px', }}>
        <Dropdown.Item onClick={() => { clickFilter({price_range:"all"}); }}>All {props.filters.price_range == "all" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({price_range:0}); }}>Free To Start {props.filters.price_range == 0 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({price_range:1}); }}>$0 - $4.99 {props.filters.price_range == 1 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({price_range:2}); }}>$10 - $19.99 {props.filters.price_range == 2 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({price_range:3}); }}>$20 - $39.99 {props.filters.price_range == 3 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
        <Dropdown.Item onClick={() => { clickFilter({price_range:4}); }}>$40+ {props.filters.price_range == 4 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </ButtonGroup>
    {/* <Form>
        {['radio'].map((type) => (
            <div key={"inline-${type}"} className="col-sm-6 offset-sm-3 my-3">
                <label>Sort By:</label>
                <Form.Check className="ms-3" inline checked={filters.sort_by === "featured"} label="Featured" name="sort-by" type={type} id="sort-by-featured" onClick={() => { setFilters({sort_by:"featured", sort_dir:""}); }}/>
                <Form.Check className="ms-3" inline checked={filters.sort_by === "title-a-z"} label="Title (A-Z)" name="sort-by" type={type} id="sort-by-title-a-z" onClick={() => { setFilters({sort_by:"title", sort_dir:"asc"}); }}/>
                <Form.Check className="ms-3" inline checked={filters.sort_by === "title-z-a"} label="Title (Z-A)" name="sort-by" type={type} id="sort-by-title-z-a" onClick={() => { setFilters({sort_by:"title", sort_dir:"desc"}); }}/>
            </div>
        ))}
    </Form> */}
    </>
    )
}

export default sortbar