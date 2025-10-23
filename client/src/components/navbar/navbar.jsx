import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';

function navbar(props) {
    const [currentTab, setCurrentTab] = useState(props.currentTab);

    //console.log('b', data);
    function clickNav(eventKey) {
        //console.log('nav click', eventKey);
        setCurrentTab(eventKey);
        props.sendToParent(eventKey);
    }

  return (
    <>
    <Nav justify fill variant="tabs">
        <Nav.Item>
            <Nav.Link className={`${currentTab == 1 ? 'bg-steel-blue' : ''}`} eventKey="1" onClick={() => clickNav(1)}>Games<i className="ms-3 fa-solid fa-gamepad"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className={`${currentTab == 2 ? 'bg-steel-blue' : ''}`} eventKey="2"  onClick={() => clickNav(2)}>Tab 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className={`${currentTab == 3 ? 'bg-steel-blue' : ''}`} eventKey="3"  onClick={() => clickNav(3)}>Tab 3</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className={`${currentTab == 4 ? 'bg-steel-blue' : ''}`} eventKey="4"  onClick={() => clickNav(4)}>Tab4</Nav.Link>
        </Nav.Item>
    </Nav>
    </>
  );
}

export default navbar;