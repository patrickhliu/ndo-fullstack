import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import $ from 'jquery';

const sortbar = (props) => {
    let cloneFilters = { ...props.filters };

    async function clickFilter(obj) {
        //console.log(obj);

        const promise = new Promise((resolve, reject) => {
            Object.keys(obj).forEach(key => {
                console.log(`Key: ${key}, Value: ${obj[key]}`);
                if([].indexOf(key) >= 0) {
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

                if(cloneFilters[key] == obj[key]) {
                    cloneFilters[key] = "";
                } else {
                    cloneFilters[key] = obj[key]
                }

                if(key == "sort_by" && obj[key] == "discount") {
                    cloneFilters.sales = true;
                }
            });

            resolve(cloneFilters);
        });

        await Promise.all([promise]);
        //console.log(cloneFilters);
        props.sendToParent(cloneFilters);
    }

    return (
    <>
    <button className="btn bg-steel-blue" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters" aria-controls="offcanvasFilters">
        <b>Filter + Sort</b>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasFilters" aria-labelledby="offcanvasFiltersLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasFiltersLabel">
                <b>Filter + Sort</b>
            </h5>
            <button type="button" className="btn btn-sm btn-warning ms-3" onClick={props.clearFilter}>Clear</button>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            {/* <p>Applied Filters....</p> */}
            <div className="accordion" id="accordionDiv">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="btn btn-primary accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionSortByList" aria-expanded="false" aria-controls="accordionSortByList">
                            <b className="me-5">Sort By</b>
                            { props.filters.sort_by == "title" && props.filters.sort_dir == "asc" && <b>Title Asc</b>}
                            { props.filters.sort_by == "title" && props.filters.sort_dir == "desc" && <b>Title Desc</b>}

                            { props.filters.sort_by == "price" && props.filters.sort_dir == "asc" && <b>Price Asc</b>}
                            { props.filters.sort_by == "price" && props.filters.sort_dir == "desc" && <b>Price Desc</b>}

                            { props.filters.sort_by == "discount" && props.filters.sort_dir == "asc" && <b>Discount Asc</b>}
                            { props.filters.sort_by == "discount" && props.filters.sort_dir == "desc" && <b>Discount Desc</b>}

                            { props.filters.sort_by == "release_date" && props.filters.sort_dir == "asc" && <b>Release Date Asc</b>}
                            { props.filters.sort_by == "release_date" && props.filters.sort_dir == "desc" && <b>Release Date Desc</b>}
                        </button>
                    </h2>
                    <div id="accordionSortByList" className="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"title", sort_dir:"asc"}); }}>
                            Title <i className="fa-solid fa-arrow-down-a-z"></i>
                            {props.filters.sort_by == "title" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"title", sort_dir:"desc"}); }}>
                            Title <i className="fa-solid fa-arrow-down-z-a"></i>
                            {props.filters.sort_by == "title" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"price", sort_dir:"asc"}); }}>
                            Price <i className="fa-solid fa-arrow-down-1-9"></i>
                            {props.filters.sort_by == "price" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"price", sort_dir:"desc"}); }}>
                            Price <i className="fa-solid fa-arrow-down-9-1"></i>
                            {props.filters.sort_by == "price" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"discount", sort_dir:"asc"}); }}>
                            Discount <i className="fa-solid fa-arrow-down-1-9"></i>
                            {props.filters.sort_by == "discount" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"discount", sort_dir:"desc"}); }}>
                            Discount <i className="fa-solid fa-arrow-down-9-1"></i>
                            {props.filters.sort_by == "discount" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"release_date", sort_dir:"asc"}); }}>
                            Release Date <i className="fa-solid fa-arrow-down-1-9"></i>
                            {props.filters.sort_by == "release_date" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({sort_by:"release_date", sort_dir:"desc"}); }}>
                            Release Date <i className="fa-solid fa-arrow-down-9-1"></i>
                            {props.filters.sort_by == "release_date" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionPriceList" aria-expanded="false" aria-controls="accordionPriceList">
                            <b className="me-5">Price Range</b>
                            { props.filters.price_range == 1 && <b>$0 - $9.99</b>}
                            { props.filters.price_range == 2 && <b>$10 - $19.99</b>}
                            { props.filters.price_range == 3 && <b>$20 - $39.99</b>}
                            { props.filters.price_range == 4 && <b>$40+</b>}
                        </button>
                    </h2>
                    <div id="accordionPriceList" className="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        {/* <div className="accordion-body pointer" onClick={() => { clickFilter({price_range:0}); }}>
                            Free {props.filters.price_range == 0 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div> */}
                        <div className="accordion-body pointer" onClick={() => { clickFilter({price_range:1}); }}>
                            $0 - $9.99 {props.filters.price_range == 1 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({price_range:2}); }}>
                            $10 - $19.99 {props.filters.price_range == 2 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({price_range:3}); }}>
                            $20 - $39.99 {props.filters.price_range == 3 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({price_range:4}); }}>
                            $40+ {props.filters.price_range == 4 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        {/* <div className="accordion-body pointer" onClick={() => { clickFilter({price_range:"all"}); }}>
                            All {props.filters.price_range == "all" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div> */}
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionGameCategoryList" aria-expanded="false" aria-controls="accordionGameCategoryList">
                            <b className="me-5">Game Category</b>
                            { props.filters.game_category == "featured" && <b>Featured</b> }
                            { props.filters.game_category == "games" && <b>Full Games</b> }
                            { props.filters.game_category == "dlc" && <b>DLC</b> }
                            { props.filters.game_category == "both" && <b>Game + DLC Bundles</b> }
                            { props.filters.game_category == "upgrade" && <b>Upgrade Packs</b> }
                        </button>
                    </h2>
                    <div id="accordionGameCategoryList" className="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div className="accordion-body pointer" onClick={() => { clickFilter({game_category:"featured", sort_dir:""}); }}>
                            Featured {props.filters.game_category == "featured" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({game_category:"games"}); }}>
                            Full Games {props.filters.game_category.includes("games") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({game_category:"dlc"}); }}>
                            DLC {props.filters.game_category.includes("dlc") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({game_category:"both"}); }}>
                            Full Games + DLC Bundles {props.filters.game_category.includes("both") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({game_category:"upgrade"}); }}>
                            Switch 2 Upgrade Pack {props.filters.game_category.includes("upgrade") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        {/* <div className="accordion-body pointer" onClick={() => { clickFilter({game_category:"voucher"}); }}>
                            Voucher {props.filters.game_category.includes("voucher") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div> */}
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionEditionsList" aria-expanded="false" aria-controls="accordionEditionsList">
                            <b className="me-5">Format</b>
                            { props.filters.format.includes("digital")  && <b>Digital</b> }
                            { props.filters.format.includes("physical") && <b>Physical</b> }
                        </button>
                    </h2>
                    <div id="accordionEditionsList" className="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div className="accordion-body pointer" onClick={() => { clickFilter({format:"digital"}); }}>
                            Digital {props.filters.format.includes("digital") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({format:"physical"}); }}>
                            Physical {props.filters.format.includes("physical") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        {/* <div className="accordion-body pointer" onClick={() => { clickFilter({format:"all"}); }}>
                            Both {props.filters.format.includes("all") && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div> */}
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionPlatformList" aria-expanded="false" aria-controls="accordionPlatformList">
                            <b className="me-5">System</b>
                            { props.filters.console == "switch1" && <b>Switch </b> }
                            { props.filters.console == "switch2" && <b>Switch 2</b> }
                        </button>
                    </h2>
                    <div id="accordionPlatformList" className="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div className="accordion-body pointer" onClick={() => { clickFilter({ console:"switch1"}); }}>
                            Switch {props.filters.console == "switch1" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({ console:"switch2"}); }}>
                            Switch 2 {props.filters.console == "switch2" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        {/* <div className="accordion-body pointer" onClick={() => { clickFilter({console:"all"}); }}>
                            Both {props.filters.console == "all" && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div> */}
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionAvailabilityList" aria-expanded="false" aria-controls="accordionAvailabilityList">
                            <b className="me-5">Availability</b>
                            { props.filters.availability == 1 && <b>Available Now</b> }
                            { props.filters.availability == 2 && <b>Coming Soon</b> }
                            { props.filters.availability == 3 && <b>New Releases</b> }
                            { props.filters.availability == 4 && <b>Pre-Order</b> }
                        </button>
                    </h2>
                    <div id="accordionAvailabilityList" className="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div className="accordion-body pointer" onClick={() => { clickFilter({ availability:1}); }}>
                            Available Now { props.filters.availability == 1 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({ availability:2}); }}>
                            Coming Soon { props.filters.availability == 2 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({ availability:3}); }}>
                            New Releases { props.filters.availability == 3 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                        <div className="accordion-body pointer" onClick={() => { clickFilter({ availability:4}); }}>
                            Pre-Order { props.filters.availability == 4 && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-body accordion-single pointer" onClick={() => { clickFilter({demo:true}); }}>
                        <b>Has Demo</b> {props.filters.demo == true && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-body pointer" onClick={() => { clickFilter({sales:true}); }}>
                        <b>On Sale</b> {props.filters.sales == true && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-body pointer" onClick={() => { clickFilter({coming_soon:true}); }}>
                        <b>Coming Soon</b> {props.filters.coming_soon == true && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-body pointer" onClick={() => { clickFilter({pre_order:true}); }}>
                        <b>Pre Order</b> {props.filters.pre_order == true && <i className="mt-1 fa-regular fa-circle-check float-end forest-green"></i>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default sortbar