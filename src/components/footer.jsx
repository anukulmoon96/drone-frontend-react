import React from "react";
import { PageHeader } from "antd";

function footer() {
	return (
		<PageHeader
			// className="site-page-header"
			style={{
				// border: "1px solid rgb(235, 237, 240)",
				display: "flex",
				justifyContent: "center",
				backgroundColor: "#f5f5f5",
				padding: "0%",
			}}
			// title="Alpha"
			subTitle="Footer"
		/>
	);
}

export default footer;
