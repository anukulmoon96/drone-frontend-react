import React from "react";
import { PageHeader } from "antd";

function header() {
	return (
		<PageHeader
			// className="site-page-header"
			style={{
				border: "1px solid rgb(235, 237, 240)",
				backgroundColor: "#f5f5f5",
			}}
			title="Alpha"
			// subTitle="This is a subtitle"
		/>
	);
}

export default header;

// .site-page-header {
//   border: 1px solid rgb(235, 237, 240);
// }
