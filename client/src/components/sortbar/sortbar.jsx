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
        //console.log(cloneFilters);
        props.sendToParent(cloneFilters);
    }

    return (
    <>
    <button class="btn bg-khaki-br" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters" aria-controls="offcanvasFilters">Filter + Sort</button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasFilters" aria-labelledby="offcanvasFiltersLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasFiltersLabel">Filter + Sort</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>Applied Filters....</p>
            <div class="accordion" id="accordionDiv">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionSortByList" aria-expanded="false" aria-controls="accordionSortByList">Sort By</button>
                    </h2>
                    <div id="accordionSortByList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" onClick={() => { clickFilter({sort_by:"featured", sort_dir:""}); }}>
                            Featured {props.filters.sort_by == "featured" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({sort_by:"title", sort_dir:"asc"}); }}>
                            Title <i className="fa-solid fa-arrow-down-a-z"></i>
                            {props.filters.sort_by == "title" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({sort_by:"title", sort_dir:"desc"}); }}>
                            Title <i className="fa-solid fa-arrow-down-z-a"></i>
                            {props.filters.sort_by == "title" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({sort_by:"price", sort_dir:"asc"}); }}>
                            Price <i className="fa-solid fa-arrow-down-1-9"></i>
                            {props.filters.sort_by == "price" && props.filters.sort_dir == "asc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({sort_by:"price", sort_dir:"desc"}); }}>
                            Price <i className="fa-solid fa-arrow-down-9-1"></i>
                            {props.filters.sort_by == "price" && props.filters.sort_dir == "desc" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionPriceList" aria-expanded="false" aria-controls="accordionPriceList">Price Range</button>
                    </h2>
                    <div id="accordionPriceList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" oonClick={() => { clickFilter({price_range:0}); }}>
                            Free {props.filters.price_range == 0 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" oonClick={() => { clickFilter({price_range:1}); }}>
                            $0 - $9.99 {props.filters.price_range == 1 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" oonClick={() => { clickFilter({price_range:2}); }}>
                            $10 - $19.99 {props.filters.price_range == 2 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" oonClick={() => { clickFilter({price_range:3}); }}>
                            $20 - $39.99 {props.filters.price_range == 3 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" oonClick={() => { clickFilter({price_range:4}); }}>
                            $40+ {props.filters.price_range == 4 && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" oonClick={() => { clickFilter({price_range:"all"}); }}>
                            All {props.filters.price_range == "all" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionGameCategoryList" aria-expanded="false" aria-controls="accordionGameCategoryList">Game Category</button>
                    </h2>
                    <div id="accordionGameCategoryList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" onClick={() => { clickFilter({game_category:"games"}); }}>
                            Games {props.filters.game_category.includes("games") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({game_category:"dlc"}); }}>
                            DLC {props.filters.game_category.includes("dlc") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({game_category:"both"}); }}>
                            Both {props.filters.game_category.includes("both") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({game_category:"demo"}); }}>
                            Has Demo {props.filters.game_category.includes("demo") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({game_category:"voucher"}); }}>
                            Voucher {props.filters.game_category.includes("voucher") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionEditionsList" aria-expanded="false" aria-controls="accordionEditionsList">Console</button>
                    </h2>
                    <div id="accordionEditionsList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" onClick={() => { clickFilter({format:"digital"}); }}>
                            Digital {props.filters.format.includes("digital") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({format:"physical"}); }}>
                            Physical {props.filters.format.includes("physical") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({format:"all"}); }}>
                            Both {props.filters.format.includes("all") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionSalesList" aria-expanded="false" aria-controls="accordionSalesList">Sales</button>
                    </h2>
                    <div id="accordionSalesList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" onClick={() => { clickFilter({sales:"sales"}); }}>
                            On Sale {props.filters.sales.includes("sales") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionPlatformList" aria-expanded="false" aria-controls="accordionPlatformList">Format</button>
                    </h2>
                    <div id="accordionPlatformList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" onClick={() => { clickFilter({ console:"switch1"}); }}>
                            Switch {props.filters.console == "switch1" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({ console:"switch2"}); }}>
                            Switch {props.filters.console == "switch2" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({console:"all"}); }}>
                            Both {props.filters.console == "all" && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionAvailabilityList" aria-expanded="false" aria-controls="accordionAvailabilityList">Availability</button>
                    </h2>
                    <div id="accordionAvailabilityList" class="accordion-collapse collapse hide" data-bs-parent="#accordionDiv">
                        <div class="accordion-body pointer" onClick={() => { clickFilter({ availability:"Available now"}); }}>
                            Available Now { props.filters.availability.includes("Available now") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({ availability:"Coming soon"}); }}>
                            Coming Soon { props.filters.availability.includes("Coming soon") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({ availability:"New releases"}); }}>
                            New Releases { props.filters.availability.includes("New releases") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                        <div class="accordion-body pointer" onClick={() => { clickFilter({ availability:"Pre-order"}); }}>
                            Pre-Order { props.filters.availability.includes("Pre-order") && <i className="mt-1 fa-regular fa-circle-check float-end"></i>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default sortbar