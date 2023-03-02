import React, { useState } from "react";

export default function Tabs(props) {
  const { defaultTab, children } = props;
  const totalTabs = children.map((element) => ({
    name: element.props.name,
    id: element.props.id
  }));
  const [activetab, setActiveTab] = useState(defaultTab);

  const handleOnClick = (e) => {
    setActiveTab(e.target.id);
  };

  return (
    <>
      <div className="tab-navigation">
        {totalTabs.map(({ name, id }) => (
          <span id={id} onClick={handleOnClick} key={id}>
            {name}
          </span>
        ))}
      </div>
      <div className="tab-content">
        {children.filter((ele) => ele.props.id === activetab)}
      </div>
    </>
  );
}

/**
 * Usagge
 * 
 <Tabs defaultTab="item3">
    <div name="Tab1" id="item1">
      Content of Tab Pane 1
    </div>
    <div id="item2" name="Tab2">
      Content of Tab Pane 2
    </div>
    <div id="item3" name="Tab3">
      Content of Tab Pane 3
    </div>
  </Tabs>
 */
