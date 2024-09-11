import React, { useRef, useState } from "react";
import {
	DocumentEditorContainerComponent,
	Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
DocumentEditorContainerComponent.Inject(Toolbar);

registerLicense(
	"Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhIfkx3RXxbf1x0ZFRMYlpbR3VPMyBoS35RckVqWH9ecXZTQmVbV0Z/"
);

const Editor2 = () => {
	const containerRef = useRef(null);
	const contentChanged = useRef(false);

	const onClick = () => {
		const http = new XMLHttpRequest();
		// Add your URL in which you want to open document inside the ""
		const content = { fileUrl: "" };
		const baseurl = "/api/documenteditor/ImportFileURL";

		http.open("POST", baseurl, true);
		http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		http.onreadystatechange = () => {
			if (http.readyState === 4) {
				if (http.status === 200 || http.status === 304) {
					// Open the SFDT text in Document Editor
					if (containerRef.current) {
						containerRef.current.documentEditor.open(http.responseText);
					}
				}
			}
		};

		http.send(JSON.stringify(content));
	};

	return (
		<div>
			<button id="import" onClick={onClick}>
				Import
			</button>
			<DocumentEditorContainerComponent
				id="container"
				ref={containerRef}
				height={"590px"}
				serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
				enableToolbar={true}
			/>
		</div>
	);
};

export default Editor2;
